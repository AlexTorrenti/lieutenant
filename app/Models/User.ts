import { beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import AppBaseModel from './AppBaseModel'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends AppBaseModel {
  @column()
  public nombre: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public rememberMeToken?: string

  @column({ serializeAs: null })
  public password: string

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
