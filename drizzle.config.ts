import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	dialect: 'sqlite',
	schema: './src/lib/db/schema/*',
	out: './src/lib/db/migrations',
	dbCredentials: {
		url: process.env.DB_FILE_NAME!
	}
})
