import type { Knex } from 'knex'

const databaseClient = process.env.DATABASE_CLIENT as string

let connection = databaseClient === 'sqlite'
  ? {
    filename: process.env.DATABASE_URL as string,
  }
  : process.env.DATABASE_URL as string

const config: Knex.Config = {
  client: 'sqlite3',
  connection,
  migrations: {
    directory: 'db/migrations',
    extension: 'ts',
  },
  useNullAsDefault: true,
}

export default config
