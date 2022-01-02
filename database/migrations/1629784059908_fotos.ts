import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Fotos extends BaseSchema {
  protected tableName = 'fotos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('path')
      table.integer('auditoria_id').unsigned().references('auditorias.id').onDelete('CASCADE') // delete post when user is deleted

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.dateTime('created_at', { useTz: true })
      table.dateTime('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
