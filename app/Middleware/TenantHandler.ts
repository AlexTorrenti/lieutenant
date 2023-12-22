import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tenant from 'App/Models/Tenant'
//import TenantConnectionService from 'App/Services/TenantConnectionService'

export default class TenantHandler {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    if (ctx.params.tenant) {
      // TODO: It would be nice to load all the tenants in memory at the beginning
      await Tenant.findByOrFail('slug', ctx.params.tenant)
      console.log('Scope for ' + ctx.params.tenant)
      ctx.tenant = ctx.params.tenant
      //await TenantConnectionService.hasConnect(ctx.params.tenant)
    }

    await next()
  }
}
