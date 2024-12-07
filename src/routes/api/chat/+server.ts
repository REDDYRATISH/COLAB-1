import { OPENAI_API_KEY } from '$env/static/private'
import { json, type RequestHandler } from '@sveltejs/kit'
import OpenAI from 'openai'
import type { Message } from '$lib/types'

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
})

interface RequestBody {
	messages: Message[]
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { messages }: RequestBody = await request.json()

		const completion = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: messages.map((msg) => ({
				role: msg.role,
				content: msg.content
			})),
			temperature: 0.7,
			max_tokens: 1000,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0
		})

		const assistantMessage = completion.choices[0].message.content

		if (!assistantMessage) {
			throw new Error('No response from OpenAI')
		}

		return json({ message: assistantMessage })
	} catch (error) {
		console.error('OpenAI API Error:', error)

		if (error instanceof OpenAI.APIError) {
			return json({ error: error.message }, { status: error.status || 500 })
		}

		return json({ error: 'Failed to process your request' }, { status: 500 })
	}
}
