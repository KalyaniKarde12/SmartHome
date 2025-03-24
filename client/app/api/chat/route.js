import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(req) {
  const { message } = await req.json();
  console.log("Received message from frontend:", message);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.data.choices[0].message.content;
    console.log("OpenAI response:", reply);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("OpenAI API error:", error.response?.data || error.message);
    return NextResponse.json({ reply: "Error connecting to AI 🤖" }, { status: 500 });
  }
}
