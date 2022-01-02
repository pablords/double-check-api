import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Auditoria from './Auditoria'

export default class Foto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public path: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public auditoria_id: number

  @belongsTo(() => Auditoria)
  public auditoria: BelongsTo<typeof Auditoria>
}
