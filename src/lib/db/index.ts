import { DB_FILE_NAME } from '$env/static/private'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

const client = createClient({ url: DB_FILE_NAME })
export const db = drizzle(client, { schema })
