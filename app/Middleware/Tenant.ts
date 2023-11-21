import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TenantConnectionService from 'App/Services/TenantConnectionService'

export default class Tenant {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    if (ctx.params.tenant) {
      console.log('Scope for ' + ctx.params.tenant)
      ctx.tenant = ctx.params.tenant
      await TenantConnectionService.hasConnect(ctx.params.tenant)
    }
    await next()
  }
}
