/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
//import User from 'App/Models/User'

Route.get('/', async ({ response }: HttpContextContract) => {
  const report = await Database.manager.report()

  const reportData = report.meta.map((report) => ({
    connection_name: report.connection,
    status: report.message,
    error: report.error,
  }))
  reportData['message'] = report.health.message

  return response.ok(reportData)
})

Route.group(() => {
  Route.get('/users', async ({}: HttpContextContract) => {
    //return await Database.query('users')
    return await User.queryTenant()
  }).as('users')
  Route.post('/login', 'AuthController.login').as('login')
  //Route.resource('users', 'UsersController.index')
})
  .prefix(':tenant')
  .middleware(['tenant'])
  .as(':tenant')
