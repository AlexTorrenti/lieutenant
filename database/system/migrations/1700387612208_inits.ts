import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.raw('CREATE EXTENSION IF NOT EXISTS unaccent schema pg_catalog version "1.1";')
    this.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp" schema pg_catalog version "1.1";')
  }

  public async down() {
    this.schema.raw('DROP EXTENSION IF EXISTS "unaccent"')
    this.schema.raw('DROP EXTENSION IF EXISTS "uuid-ossp"')
  }
}
