import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import Migrator from '@ioc:Adonis/Lucid/Migrator'
import { getTenant } from 'App/Helpers/TenantHelper'
import Tenant from 'App/Models/Tenant'

export default class TenantListener {
  public async onUpdateMigration() {
    const tenantExists = await Database.rawQuery(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'tenants')"
    ).exec()

    if (tenantExists.rows[0].exists) {
      const tenants = await Tenant.all()

      for (const tenant of tenants) {
        getTenant(tenant.slug)
        // console.log(Database.manager.get('tenant')?.config)
        await Database.rawQuery(`CREATE SCHEMA IF NOT EXISTS ${tenant.slug}`)

        const migrator = new Migrator(Database, Application, {
          direction: 'up',
          dryRun: false,
          connectionName: 'tenant',
        })
        await migrator.run()
        if (JSON.stringify(migrator.migratedFiles) === '{}') {
          // console.log(tenant, '- nothing to update')
          console.log(tenant.slug, '- nothing to update')
        } else {
          // console.log(tenant, migrator.migratedFiles)
          console.log(tenant.slug, migrator.migratedFiles)
        }
      }
    }
  }
}
