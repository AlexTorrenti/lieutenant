import Rollback from '@adonisjs/lucid/build/commands/Migration/Rollback'
import { flags } from '@adonisjs/ace/build'
import { inject } from '@adonisjs/fold/build'
import Database from '@ioc:Adonis/Lucid/Database'
import Tenant from 'App/Models/Tenant'
import { getTenant } from 'App/Helpers/TenantHelper'
import { Kernel } from '@adonisjs/core/build/standalone'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Migrator from '@ioc:Adonis/Lucid/Migrator'
import Application from '@ioc:Adonis/Core/Application'

@inject([null, null, 'Adonis/Lucid/Database'])
export default class RollbackTenantMigrations extends Rollback {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'migration:tenants:rollback'
  public static description = 'Rollback the last tenant migration.'

  constructor(app: ApplicationContract, kernel: Kernel) {
    super(app, kernel)
  }
  /**
   * Custom connection for running migrations.
   */
  @flags.string({ description: 'Define a custom database connection', alias: 'c' })
  public connection: string

  /**
   * Force run migrations in production
   */
  @flags.boolean({ description: 'Explicitly force to run migrations in production' })
  public force: boolean

  /**
   * Perform dry run
   */
  @flags.boolean({ description: 'Print SQL queries, instead of running the migrations' })
  public dryRun: boolean

  /**
   * Only run a specific tenant.
   */
  @flags.string({
    description: 'Supply a tenant handle to limit the migration to a specific tenant.',
  })
  public tenant: string

  /**
   * This command loads the application, since we need the runtime
   * to find the migration directories for a given connection
   */
  public static settings = {
    loadApp: true,
  }

  public async run() {
    //Handle a single tenant
    if (this.tenant) {
      const tenant = await Tenant.findByOrFail('slug', this.tenant)
      await this.handleTenant(tenant)
      return
    }

    //Handle all tenants
    const tenants = await Tenant.all()
    for (const tenant of tenants) {
      await this.handleTenant(tenant)
    }
  }

  public async handleTenant(tenant: Tenant) {
    console.log(`Rollback migration of tenant ${tenant.slug}`)

    getTenant(tenant.slug)

    const migrator = new Migrator(Database, Application, {
      direction: 'down',
      dryRun: false,
      connectionName: 'tenant',
    })

    await super.runMigrations(migrator, 'tenant')
  }
}
