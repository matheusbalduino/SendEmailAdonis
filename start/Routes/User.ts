import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/', 'UsersController').apiOnly()
})
  .prefix('user')
  .middleware('auth')

Route.post('/session', 'SessionsController.store')
Route.delete('/session', 'SessionsController.destroy')
