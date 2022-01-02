import { schema, validator, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    matricula: schema.string({}, [rules.unique({ table: 'users', column: 'matricula' })]),
    password: schema.string({}, [rules.minLength(8)]),
  })

  public reporter = validator.reporters.api

  public messages = {
    required: 'O campo {{ field }} é obrigatório',
    unique: 'O campo {{ field }} deve ser único',
    email: 'Deve conter um email válido',
  }
}
