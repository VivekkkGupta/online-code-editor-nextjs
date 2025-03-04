import { OPENAI_API_KEY, OPENAI_MODEL } from "@/constants/constants";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function generatePrompts(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are an expert coding instructor specializing in algorithmic problem-solving and competitive programming. Your responses should:
          1. Provide clean, optimized code solutions
          2. Include time and space complexity analysis
          3. Explain the approach briefly but clearly
          4. Use proper variable naming and comments
          5. Focus on commonly used programming languages (Python, Java, C++, JavaScript)
          6. Provide solutions that would pass online judge systems
          7. Include edge cases consideration
          Keep explanations concise and focus on the most efficient solution.
          Answer should mostly contain code not text explaining that code`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_tokens: 800,
      top_p: 0.9,
      frequency_penalty: 0.2,
      presence_penalty: 0.1,
    });
    console.log(response);
    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return "" + error;
  }
}

export default generatePrompts;
