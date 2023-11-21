import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class QueryBuilderProvider {
  constructor(protected app: ApplicationContract) {}

  public async boot() {
    const { BaseModel } = this.app.container.resolveBinding('Adonis/Lucid/Orm')
    const HttpContext = this.app.container.resolveBinding('Adonis/Core/HttpContext')
    const { Database } = this.app.container.resolveBinding('Adonis/Lucid/Database')

    BaseModel.$defineProperty(
      'queryTenant',
      function () {
        return this.query().withSchema(HttpContext.get()?.tenant!)
      },
      'define'
    )

    Database.macro('scFrom', function (table: string) {
      return this.from(table).withSchema(HttpContext.get()?.tenant!)
    })
  }
}
