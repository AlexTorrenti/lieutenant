declare module '@ioc:Adonis/Lucid/Database' {
  interface DatabaseContract {
    scFrom(table: string): DatabaseQueryBuilderContract<any>
  }
}
