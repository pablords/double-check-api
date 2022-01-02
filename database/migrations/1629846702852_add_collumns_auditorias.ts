import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Auditoria extends BaseSchema {
  protected tableName = 'auditorias'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('pon_auditoria').nullable()
      table.string('designador_auditoria').nullable()
      table.dateTime('data_baixa').nullable()
      table.string('conexao_cto').nullable()
      table.string('trajeto_drop_externo').nullable()
      table.string('drop_interno').nullable()
      table.string('cordao_optico').nullable()
      table.string('navegacao_velocidade').nullable()
      table.string('iptv').nullable()
      table.string('voip').nullable()
      table.string('orientacao_cliente').nullable()
      table.integer('satisfacao_cliente').nullable()
      table.string('obs_baixa').nullable()
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumns(
        'pon_auditoria',
        'designador_auditoria',
        'data_baixa',
        'conexao_cto',
        'trajeto_drop_externo',
        'drop_interno',
        'cordao_optico',
        'navegacao_velocidade',
        'iptv',
        'voip',
        'satisfacao_cliente',
        'orientacao_cliente',
        'obs_baixa'
      )
    })
  }
}
