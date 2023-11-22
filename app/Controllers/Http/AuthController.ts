import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const { userId, password } = request.all()
    const user = await User.queryTenant().where('email', userId)

    if (!user) return response.notFound({ data: 'User not found' })

    try {
      const guard = auth.use('api')
      guard.tokenProvider.setConnection(request.ctx?.tenant!)
      guard.provider.setConnection(request.ctx?.tenant!)
      const token = await guard.attempt(userId, password, { expiresIn: '30 days' })
      if (auth.user) {
        return { token: token, data: auth.user }
      } else return response.forbidden('User cannot authenticate')
    } catch (error) {
      console.log('error' + error)
      return response.unauthorized({ data: error })
    }
  }
}
