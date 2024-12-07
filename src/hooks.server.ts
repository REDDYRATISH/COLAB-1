import { handle as authJsHandle } from '$lib/utils/auth'
import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

export const authGuardHandle: Handle = async ({ event, resolve }) => {
	const session = await event.locals.auth()
	const { pathname } = event.url

	if (!session?.user && pathname === '/') {
		redirect(301, '/login')
	}

	if (session?.user && pathname === '/login') {
		redirect(301, '/')
	}

	return resolve(event)
}

export const handle: Handle = sequence(authJsHandle, authGuardHandle)
