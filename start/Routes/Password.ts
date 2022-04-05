import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'PasswordsController.forgotPassword')
  Route.post('/reset', 'PasswordsController.resetPassword')
}).prefix('email')
