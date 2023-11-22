/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Event from '@ioc:Adonis/Core/Event'

Event.on('update:run_migration_tenants', 'TenantListener.onUpdateMigration')
Event.on('db:query', function ({ sql, bindings }) {
  console.log(sql, bindings)
})
