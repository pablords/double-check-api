import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('name').notNullable()
      table.string('matricula').notNullable()
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('name')
      table.dropColumn('matricula')
    })
  }
}
