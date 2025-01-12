const express = require('express')
const cors = require('cors')
const OpenAI = require('openai');

require('dotenv').config()

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/employees/', require('./routes/employees'));
app.use('/api/departments/', require('./routes/departments'));

app.post('/letter', (req, res) => {
    try {
        const value = req.body.value;
        console.log(value)
        const apikey = process.env.API_KEY_AI
        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: apikey,

        })
        async function main() {
            const completion = await openai.chat.completions.create({
                model: "meta-llama/llama-3.1-70b-instruct:free",
                messages: [
                    {
                        "role": "user",
                        "content": `${value}`,
                    }
                ]
            })
            if (completion.choices[0] === undefined){
                return res.status(400).send({success: false})
            }
            await res.send(completion.choices[0].message.content);
        }
        main()
    } catch (error) {
        console.log(error.message)
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

