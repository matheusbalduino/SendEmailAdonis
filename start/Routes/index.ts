import Route from '@ioc:Adonis/Core/Route'
import './User'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/email', 'PasswordsController.forgotPassword')
