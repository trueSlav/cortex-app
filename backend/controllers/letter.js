const OpenAI = require('openai')
const apikey = process.env.API_KEY_AI

const send = async (req, res) => {
	try {
		const { value } = req.body

		if(!value) {
			return res.status(400).json({message: 'Enter value'})
		}

		const openai = new OpenAI({
			baseURL: "https://openrouter.ai/api/v1",
			apiKey: apikey,
		})

		const completion = await openai.chat.completions.create({
			model: "meta-llama/llama-3.1-70b-instruct:free",
			messages: [
				{
					"role": "user",
					"content": `${value}`,
				}
			]
		})

		if (!completion.choices[0]){
			return res.status(500).json({message: 'No choices found'})
		}

		res.send(completion.choices[0].message.content)
	} catch {
		res.status(500).json({error: 'Something went wrong'})
	}
}

module.exports = send