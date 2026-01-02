import knex, { Knex } from 'knex'
import { env } from './env'

const dbConfig: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: env.DATABASE_URL, // relativo à raiz
  },
  useNullAsDefault: true,
}

export const database = knex(dbConfig)
