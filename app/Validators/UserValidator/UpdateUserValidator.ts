import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({}, [
      rules.nullable(),
      rules.unique({ table: 'users', column: 'username' }),
    ]),
    password: schema.string({}, [rules.minLength(6)]),
    email: schema.string({}, [rules.nullable(), rules.unique({ table: 'users', column: 'email' })]),
    avatar: schema.string.optional({}),
  })

  public messages = {}
}
