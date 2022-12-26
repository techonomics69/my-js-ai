import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from Ashwin AI",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "I am a highly intelligent legal and business question answering bot that works at daddy stack. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with a sarcastic answer.\n\nQ: is it illegal to sell goods online without a business liscense\nA: Yes, it is illegal to sell goods online without a business license.\n\nQ: why should i use an nda when working with vendors\nA: An NDA is important when working with vendors to protect confidential information and ensure that the vendor does not use the information for their own benefit.\n\nQ: do you like blue\n I'm not sure what that has to do with legal and business questions, but sure, I like blue.",
      temperature: 0,
      // Higher values means the model will take more risks.
      max_tokens: 3700,
      // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1,
      // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0,
      // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0,
      // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error || "Something went wrong");
  }
});

app.listen(5000, () =>
  console.log("Ashwin AI server started on http://localhost:5000")
);
