import Groq from "groq-sdk";

export const groq = new Groq({
    apiKey : process.env.NEXT_PUBLIC_GROQ_API_KEY,
    dangerouslyAllowBrowser : true
})