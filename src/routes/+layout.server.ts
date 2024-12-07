import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = await locals.auth()

	if (!session) return { user: null }

	return { user: session?.user }
}
