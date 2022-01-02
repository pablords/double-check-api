import { schema, validator } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuditoriaValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome: schema.string(),
    matricula: schema.string(),
    pon: schema.string(),
    designador: schema.string(),
    data_baixa: schema.date(),
    conexao_cto: schema.string(),
    trajeto_drop_externo: schema.string(),
    drop_interno: schema.string(),
    cordao_optico: schema.string(),
    navegacao_velocidade: schema.string(),
    iptv: schema.string(),
    voip: schema.string(),
    orientacao_cliente: schema.string(),
    satisfacao_cliente: schema.number(),
    obs_baixa: schema.string(),
    status: schema.string(),

    fotos: schema.array().members(schema.file()),
  })

  public reporter = validator.reporters.api

  public messages = {
    required: 'O campo {{ field }} é obrigatório',
  }
}
