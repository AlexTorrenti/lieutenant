import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class QueryBuilderProvider {
  constructor(protected app: ApplicationContract) {}

  public async boot() {
    const { BaseModel } = this.app.container.resolveBinding('Adonis/Lucid/Orm')
    const HttpContext = this.app.container.resolveBinding('Adonis/Core/HttpContext')
    const { Database } = this.app.container.resolveBinding('Adonis/Lucid/Database')

    /* THIS CODE WORKS FOR THE PREVIOUS APPROACH (creating a new connection for each tenant)
    BaseModel.$defineProperty(
      'queryTenant',
      function () {
        return this.query({ connection: HttpContext.get()?.tenant! })
      },
      'define'
    )
    */

    BaseModel.$defineProperty(
      'queryTenant',
      function () {
        console.log(HttpContext.get()?.tenant!)
        return this.query().withSchema(HttpContext.get()?.tenant!)
      },
      'define'
    )

    /* THIS CODE WORKS FOR THE PREVIOUS APPROACH (creating a new connection for each tenant)
    Database.macro('scFrom', function (table: string) {
      return this.connection(HttpContext.get()?.tenant!).from(table)
    })
    */

    Database.macro('scFrom', function (table: string) {
      return this.from(table).withSchema(HttpContext.get()?.tenant!)
    })
  }
}
