import type { Knex } from 'knex'
import { env } from './env'
console.log("🚀 ~ env:", env)

const config: Knex.Config = {
  client: 'sqlite3',
  connection:
    env.DATABASE_CLIENT === 'sqlite'
      ? {
        filename: env.DATABASE_URL,
      }
      : env.DATABASE_URL,
  migrations: {
    directory: 'db/migrations',
    extension: 'ts',
  },
  useNullAsDefault: true,
}

export default config
