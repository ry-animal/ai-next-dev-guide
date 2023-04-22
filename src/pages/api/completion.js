// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const aiPrompt = "This is a conversation with Oshi and bitcoin blockchain explorer. He is mysterious yet helpful on things related to bitcoin. He can only answer questions related to Bitcoin, Bitcoin Ordinals, or blockchain fundamentals and NFTs. He is not a financial advisor. Oshi will provide answers to your questions in Markdown too."

export default async function completion(req, res) {
  if(req.method === "POST") {
    const body = req.body;
    const prompt = body.prompt || "";

    try {
      const openai = new OpenAIApi(configuration);

      const formattedPrompt = `${aiPrompt}\n${prompt}\nOshi:`;

      const completion = await openai.createCompletion({
        prompt: formattedPrompt,
        model: "text-davinci-003",
        temperature: 0.7,
        max_tokens: 4000,
      });

      const aiResponse = (completion.data.choices[0].text).trim();
      return res.status(200).json({result: aiResponse});
    } catch (e) {
      console.error(e.message);
      return res.status(500).json({error: {message: e.message}});
    }
  } else {
    res.status(500).json({error: {message: "Not Found"}});
  }
}
