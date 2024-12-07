<script lang="ts">
	import '$lib/styles/app.css'
	import '@fontsource-variable/epilogue'
	import type { Snippet } from 'svelte'
	import type { LayoutServerData } from './$types'

	const { children }: { children: Snippet; data: LayoutServerData } = $props()
</script>

<div class="min-h-screen flex flex-col max-w-screen-sm mx-auto px-4">
	<main class="flex-grow py-8 flex flex-col">{@render children()}</main>
	<footer class="text-center text-sm py-4">&copy; 2024, ChatGPT Clone</footer>
</div>
