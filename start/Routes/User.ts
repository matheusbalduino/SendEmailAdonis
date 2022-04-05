import Route from '@ioc:Adonis/Core/Route'

Route.get('/usertest', async () => {
  return { hello: 'world 2' }
})

Route.resource('/user', 'UsersController').apiOnly()
