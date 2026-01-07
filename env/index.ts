import { config } from 'dotenv'
import { treeifyError, z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(8000),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  const errorTree = treeifyError(_env.error)
  console.error('Invalid env variables:', JSON.stringify(errorTree))
  throw new Error('Invalid env variables:')
}

export const env = _env.data
