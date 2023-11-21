import { afterCreate, column } from '@ioc:Adonis/Lucid/Orm'
import AppBaseModel from './AppBaseModel'
import Database from '@ioc:Adonis/Lucid/Database'
import Migrator from '@ioc:Adonis/Lucid/Migrator'
import Application from '@ioc:Adonis/Core/Application'

export default class Tenant extends AppBaseModel {
  @column()
  public slug: string

  @column()
  public nombre: string

  @afterCreate()
  public static async createMigration(tenant: Tenant) {
    await Database.rawQuery(`CREATE SCHEMA IF NOT EXISTS ${tenant.slug}`)

    const migrator = new Migrator(Database, Application, {
      direction: 'up',
      dryRun: false,
      connectionName: tenant.slug,
    })
    console.log(migrator.status)
  }
}
