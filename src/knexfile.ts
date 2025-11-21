import type { Knex } from 'knex'

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: '../db/app.db',
  },
  migrations: {
    directory: '../db/migrations',
    extension: 'ts',
  },
  useNullAsDefault: true,
}

export default config
export { config }
