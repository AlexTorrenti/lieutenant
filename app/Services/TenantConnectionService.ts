import Database, { PostgreConfig } from '@ioc:Adonis/Lucid/Database'
import Env from '@ioc:Adonis/Core/Env'

export default class TenantConnectionService {
  public static async hasConnect(tenant: string) {
    if (!Database.manager.has(tenant)) {
      await this.addConnection(tenant)
    }
  }

  public static async addConnection(tenant: string) {
    const config: PostgreConfig = {
      client: 'pg',
      connection: {
        host: Env.get('PG_HOST'),
        port: Env.get('PG_PORT'),
        user: Env.get('PG_USER'),
        password: Env.get('PG_PASSWORD', ''),
        database: Env.get('PG_DB_NAME'),
        ssl: ['localhost', 'db'].includes(Env.get('PG_HOST'))
          ? false
          : {
              rejectUnauthorized: false,
            },
      },
      pool: {
        min: 2,
        max: 30,
        createTimeoutMillis: 3000,
        acquireTimeoutMillis: 30000,
        idleTimeoutMillis: 30000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 100,
        propagateCreateError: false,
      },
      searchPath: [tenant],
      seeders: {
        paths: ['./database/tenant/seeders'],
      },
      migrations: {
        tableName: 'tenant_schema',
        paths: ['./database/tenant/migrations'],
        disableRollbacksInProduction: true,
      },
      healthCheck: true,
      debug: false,
    }

    Database.manager.add(tenant, config)
  }
}
