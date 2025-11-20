import type { Knex } from 'knex'

const config: Knex.Config = {
  client: 'sqlite3', // detalhe: normalmente é 'sqlite3', não 'sqlite'
  connection: {
    filename: './db/app.db',
  },
  migrations: {
    directory: '../db/migrations',
    extension: 'ts',
  },
  useNullAsDefault: true,
}

export default config
export { config }
