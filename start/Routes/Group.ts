import Route from '@ioc:Adonis/Core/Route'

Route.post('/group', 'GroupsController.store').middleware('auth')
Route.post('/groupPlayer', 'GroupsController.addUserToGroup').middleware('auth')
Route.delete('/group/:id', 'GroupsController.destroyGroup').middleware('auth')
