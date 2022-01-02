import Database from '@ioc:Adonis/Lucid/Database'
import Auditoria from 'App/Models/Auditoria'
import Application from '@ioc:Adonis/Core/Application'
import Foto from 'App/Models/Foto'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import AuditoriaValidator from '../../Validators/AuditoriaValidator'
import { ResponseContract } from '@ioc:Adonis/Core/Response'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'

interface IFoto {
  path: string
  auditoria_id: number
}

export default class DoubleChecksController {
  public async pendente(response: ResponseContract) {
    const data = await Database.rawQuery(
      'select * from zeus LEFT JOIN auditorias on zeus.recurso = auditorias.nome where PON is not null and contador_repetido > 0 and Tecnologia_Acesso = "GPON" '
    )
    return response.json(data[0])
  }
  public async pendenteTecnico(auth: AuthContract, response: ResponseContract) {
    const user: any = auth.user
    const data = await Database.rawQuery(
      `select * from zeus LEFT JOIN auditorias on zeus.recurso = auditorias.nome where PON is not null and Tecnologia_Acesso = "GPON" and Recurso = "${user.name}"`
    )
    return response.json(data[0])
  }

  public async finalizar({ auth, request, response }) {
    await request.validate(AuditoriaValidator)
    try {
      const data = request.except(['fotos'])
      const fotos = request.files('fotos')

      const doubleCheck = await Auditoria.create({
        ...data,
        nome: auth.user.name,
        matricula: auth.user.matricula,
      })

      const dataFoto: IFoto[] = []
      for (let foto of fotos) {
        const fileName = `${cuid()}.${foto.extname}`
        await foto.move(Application.tmpPath('uploads'), {
          name: fileName,
        })
        dataFoto.push({ path: 'fotos/auditoria' + fileName, auditoria_id: doubleCheck.id })
      }

      await Foto.createMany(dataFoto)
      return response.json(doubleCheck)
    } catch {
      return response.status(500).json({
        message: 'Erro ao finalizar Double check',
      })
    }
  }
}
