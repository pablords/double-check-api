import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ApiTokens extends BaseSchema {
  protected tableName = 'api_tokens'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.dateTime('expires_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('expires_at')
    })
  }
}
