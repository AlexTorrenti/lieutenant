import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import CamelCaseNamingStrategy from 'App/Strategies/CamelCaseNamingStrategy'
import { DateTime } from 'luxon'

export default class AppBaseModel extends BaseModel {
  public static namingStrategy = new CamelCaseNamingStrategy()
  public serializeExtras = true

  /*
  public static tenantQuery() {
    const Model = this.constructor as LucidModel

    return Model.query().withSchema(HttpContext.get()?.tenant!)
  }
  */

  public get meta() {
    return this.$extras
  }

  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
