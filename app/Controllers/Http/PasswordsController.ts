import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import { randomBytes } from 'crypto'
import { promisify } from 'util'

export default class PasswordsController {
  public async forgotPassword({ request, response }: HttpContextContract) {
    const { email, resetPassword } = request.only(['email', 'resetPassword'])

    const random = await promisify(randomBytes)(24)

    const token = random.toString('hex')

    const user = await User.findByOrFail('email', email)

    await user.related('linkToken').updateOrCreate(
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
        .text(`Redefinir email ${email}, ${user.username}, ${resetPassword}`)
    })

    return response.json({ message: `email enviado para ${email}` })
  }
}
