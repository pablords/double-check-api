import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Foto from './Foto'

export default class Auditoria extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public matricula: string

  @column()
  public pon_auditoria: string

  @column()
  public designador_auditoria: string

  @column()
  public data_baixa: DateTime

  @column()
  public conexao_cto: string

  @column()
  public trajeto_drop_externo: string

  @column()
  public drop_interno: string

  @column()
  public cordao_optico: string

  @column()
  public navegacao_velocidade: string

  @column()
  public iptv: string

  @column()
  public voip: string

  @column()
  public orientacao_cliente: string

  @column()
  public satisfacao_cliente: number

  @column()
  public obs_baixa: string

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Foto)
  public fotos: HasMany<typeof Foto>
}
