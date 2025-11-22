import 'dotenv/config'
import knex, { Knex } from 'knex'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL en not found ')
}
const dbConfig: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: process.env.DATABASE_URL, // relativo à raiz
  },
  useNullAsDefault: true,
}

export const database = knex(dbConfig)
