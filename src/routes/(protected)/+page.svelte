<script lang="ts">
	import type { Message } from '$lib/types'
	import { SignOut } from '@auth/sveltekit/components'

	let messages: Message[] = []
	let inputMessage = ''
	let isLoading = false

	async function handleSubmit(e: Event) {
		e?.preventDefault()
		if (!inputMessage.trim()) return

		const userMessage = inputMessage
		inputMessage = ''
		isLoading = true

		messages = [...messages, { role: 'user', content: userMessage }]

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					messages: [...messages]
				})
			})

			const data = await response.json()

			if (!response.ok) throw new Error(data.error)

			messages = [...messages, { role: 'assistant', content: data.message }]
		} catch (error) {
			console.error('Error:', error)
			messages = [
				...messages,
				{
					role: 'system',
					content: 'Sorry, there was an error processing your request.'
				}
			]
		} finally {
			isLoading = false
		}
	}
</script>

<div class="flex-grow flex flex-col h-full">
	<div class="flex items-center justify-between">
		<section>
			<h1 class="text-lg font-medium">ChatGPT Clone</h1>
			<p class="text-gray-400 text-xs">Powered by chatgpt-4o-mini model</p>
		</section>
		<SignOut
			signOutPage="logout"
			className="[&>button]:border [&>button]:px-2 [&>button]:pt-1.5 [&>button]:pb-1 [&>button]:rounded-md
				[&>button]:font-normal [&>button]:text-sm [&>button]:border-red-500 [&>button]:text-red-500"
		>
			<span slot="submitButton">Logout</span>
		</SignOut>
	</div>
	<div class="flex-grow"></div>
	{#if messages.length > 0}
		<div class="h-[600px] overflow-y-auto p-4 space-y-2.5">
			{#each messages as message}
				<div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}">
					<div
						class="max-w-[70%] {message.role === 'user'
							? 'bg-blue-500 text-white'
							: 'bg-gray-200 text-gray-800'} 
              rounded-md px-3 pt-2 pb-1.5 text-sm"
					>
						<div class="whitespace-pre-wrap">{message.content}</div>
					</div>
				</div>
			{/each}

			{#if isLoading}
				<div class="flex justify-start">
					<div class="bg-gray-200 rounded-lg p-3">
						<div class="flex space-x-2">
							<div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
							<div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
							<div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	{:else}
		<div class="h-[600px] grid place-items-center text-center">Hello! Start a chat :)</div>
	{/if}

	<form onsubmit={handleSubmit} class="p-4 flex space-x-2">
		<input
			type="text"
			bind:value={inputMessage}
			placeholder="Type your message..."
			class="flex-1 p-2.5 border text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
		/>
		<button
			type="submit"
			disabled={isLoading}
			class="bg-blue-500 text-white px-4 pt-2 pb-1 text-sm font-normal rounded-lg hover:bg-blue-600
				disabled:bg-blue-300 disabled:cursor-not-allowed"
		>
			Send
		</button>
	</form>
</div>
