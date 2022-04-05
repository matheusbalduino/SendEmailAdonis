import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import { randomBytes } from 'crypto'
import { promisify } from 'util'
import TokenExpired from 'App/Exceptions/TokenExpiredException'

export default class PasswordsController {
  public async forgotPassword({ request, response }: HttpContextContract) {
    const { email, resetPassword } = request.only(['email', 'resetPassword'])

    const random = await promisify(randomBytes)(24)

    const token = random.toString('hex')

    const user = await User.findByOrFail('email', email)

    await user.related('tokens').updateOrCreate(
      { userId: user.id },
      {
        token
      }
    )

    await Mail.send((message) => {
      message
        .from('matheus@gmail.com')
        .to(email)
        .subject('Recuperação de senha')
        .text(`Redefinir email ${email}, ${user.username}, ${token}`)
    })

    return response.json({ message: `email enviado para ${email}` })
  }

  public async resetPassword({ request, response }: HttpContextContract) {
    const { token, password } = request.all()

    const userByToken = await User.query()
      .whereHas('tokens', (query) => {
        query.where('token', token)
      })
      .preload('tokens')
      .firstOrFail()

    console.log(userByToken)

    const AgeToken = Math.abs(userByToken.tokens[0].createdAt.diffNow('hours').hours)

    console.log(AgeToken)

    if (AgeToken > 2) throw new TokenExpired()

    userByToken.password = password

    userByToken.tokens.forEach(async (tok) => {
      await tok.delete()
    })

    await userByToken.save()

    return response.noContent()
  }
}
