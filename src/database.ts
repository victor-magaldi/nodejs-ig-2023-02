import knex, { Knex } from 'knex'

const dbConfig: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './db/app.db', // relativo à raiz
  },
  useNullAsDefault: true,
}

export const database = knex(dbConfig)
