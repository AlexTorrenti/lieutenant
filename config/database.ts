/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import type { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig = {
  connection: Env.get('DB_CONNECTION'),

  connections: {
    pg: {
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
      seeders: {
        paths: ['./database/system/seeders'],
      },
      migrations: {
        paths: ['./database/system/migrations'],
        disableRollbacksInProduction: true,
      },
      healthCheck: true,
      debug: false,
    },
    tenant: {
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
      searchPath: ['tenant'],
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
    },
  },
}

export default databaseConfig
