import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProfileUsers extends BaseSchema {
  protected tableName = 'profile_users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('users.id')
      table.integer('profile_id').unsigned().references('profiles.id')
      table.unique(['user_id', 'profile_id'])

      table.dateTime('created_at', { useTz: true })
      table.dateTime('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
