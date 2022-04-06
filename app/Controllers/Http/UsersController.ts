import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import { CreateUserValidator, UpdateUserValidator } from 'App/Validators/UserValidator'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = User.all()
    return users
  }

  public async store({ request, response }: HttpContextContract) {
    const user = await request.validate(CreateUserValidator)

    const createdUser = await User.create(user)

    return response.created({ createdUser })
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({ params, request }: HttpContextContract) {
    console.log('update')
    const data = await request.validate(UpdateUserValidator)

    const user = await User.findOrFail(params.id)

    user.merge(data)

    user.save()

    return user
  }

  public async destroy({}: HttpContextContract) {}
}
