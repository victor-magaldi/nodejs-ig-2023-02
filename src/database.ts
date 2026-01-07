import knex, { Knex } from 'knex'
import { env } from '../env'

const dbConfig: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection:
    env.DATABASE_CLIENT === 'sqlite'
      ? {
        filename: env.DATABASE_URL,
      }
      : env.DATABASE_URL,
  useNullAsDefault: true,
}

export const database = knex(dbConfig)
