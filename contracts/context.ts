declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    tenant: string | null
  }
}
