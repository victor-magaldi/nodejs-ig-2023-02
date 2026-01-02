import 'dotenv/config'
import { treeifyError, z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
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
