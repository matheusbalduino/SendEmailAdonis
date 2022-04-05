import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({}),
    password: schema.string({}, [rules.minLength(6)]),
    email: schema.string({}),
    avatar: schema.string.optional({}),
  })

  public messages = {}
}
