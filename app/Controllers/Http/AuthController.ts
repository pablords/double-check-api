//import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserModel from '../../Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'

export default class AuthController {
  public async login({ auth, request, response }) {
    const matricula = request.input('matricula')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(matricula, password, {
        name: 'auth',
        expiresIn: '2days',
      })

      return response.json({ user: auth.user, token: token })
    } catch {
      return response.status(400).json({
        message: 'Credenciais invalidas',
      })
    }
  }

  public async register({ request, response }) {
    await request.validate(RegisterValidator)
    const data = request.body()
    try {
      const user = await UserModel.create(data)

      await Mail.send((message) => {
        message
          .from(Env.get('SMTP_FROM_ADDRESS'))
          .to(user.email)
          .subject('Bem vindo ao Double Check!')
          .htmlView('emails/welcome', { name: user.name, url: Env.get('HOST') + Env.get('PORT') })
      })

      return response.send(user)
    } catch (error) {
      return response.badRequest('Erro ao cadastrar usuario')
    }
  }

  public async logout({ auth }) {
    await auth.use('api').revoke()
    const isLoggedOut = auth.use('api').isLoggedOut
    return {
      revoked: isLoggedOut,
    }
  }
}
