import { AUTH_SECRET } from '$env/static/private'
import { db } from '$lib/db'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { SvelteKitAuth } from '@auth/sveltekit'
import Github from '@auth/sveltekit/providers/github'

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [Github],
	trustHost: true,
	secret: AUTH_SECRET,
	adapter: DrizzleAdapter(db)
})
