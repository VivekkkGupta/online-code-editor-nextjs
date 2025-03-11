import { OPENAI_API_KEY, OPENAI_MODEL } from "@/lib/constants/constants";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function generateResponse(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are a code-only assistant specializing in algorithmic problem-solving and competitive programming. You can ONLY help with:
                    1. Code generation
                    2. Debugging code
                    3. Code optimization
                    4. Code review
                    5. Programming concepts explanation
                    6. Code Explanation
                    7. If it has programming language and code in context then give the reponse

                    For ANY other topics or requests, respond with:
                    "Sorry, I can only help with coding-related questions. I can generate code, debug your code, optimize and review it."

                    When providing code solutions:
                    - Write clean, optimized code
                    - Include time/space complexity
                    - Add proper comments
                    - Consider edge cases
                    - Keep approach brief and technical but clearly
                    - Use proper variable naming and comments
                    - focus on the language selected or inputted by user
                    - Explanation should be less than 50 words
                    - Keep explanations concise and focus on the most efficient solution.
                    `,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5, // Lower temperature for more focused coding responses
      max_tokens: 499, // Increased for longer solutions
      top_p: 0.9,
      frequency_penalty: 0.2, // Slight penalty to avoid repetitive code patterns
      presence_penalty: 0.1,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw error;
  }
}

export default generateResponse;
