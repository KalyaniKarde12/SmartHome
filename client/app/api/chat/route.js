import { OpenAI } from "openai";
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure it's correctly set in .env.local
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    return new Response(JSON.stringify({ reply: response.choices[0].message.content }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return new Response(JSON.stringify({ reply: "Error connecting to AI 🤖" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// ✅ Add this to allow GET requests (fixes 405 error)
export async function GET() {
  return new Response("Chat API is working. Use POST method to send messages.", { status: 200 });
}
