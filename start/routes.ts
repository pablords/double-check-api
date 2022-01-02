import Route from '@ioc:Adonis/Core/Route'
import { apiVersion } from '../package.json'

Route.group(() => {
  Route.get('/', async () => {
    return { api: 'is running' }
  })

  Route.post('login', 'AuthController.login')
  Route.post('register', 'AuthController.register')
  Route.post('logout', 'AuthController.logout')

  Route.group(() => {
    Route.get('double-check/pendente', 'DoubleChecksController.pendente')
    Route.get('double-check/pendente/tecnico', 'DoubleChecksController.pendenteTecnico')
    Route.post('double-check/pendente/tecnico/finalizar', 'DoubleChecksController.finalizar')
  }).middleware('auth:api')
}).prefix(process.env.NODE_ENV === 'development' ? '' : `api/${apiVersion}`)
