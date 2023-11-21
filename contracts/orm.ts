declare module '@ioc:Adonis/Lucid/Orm' {
  interface LucidModel {
    queryTenant(): ModelQueryBuilderContract<LucidModel, LucidRow>
  }
}
