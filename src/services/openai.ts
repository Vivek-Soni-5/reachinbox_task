import { OpenAI } from 'openai';
import { config } from '../config';

const openai = new OpenAI({
    apiKey: config.openai.apiKey,
});

export async function categorizeEmail(text: string): Promise<string> {
    try {
        const response = await openai.completions.create({
            model: 'text-davinci-003', // Replace with your model ID
            prompt: `Classify the following email text: "${text}". The categories are: Interested, Not Interested, More information.`,
            max_tokens: 10,
        });
        return response.choices[0].text.trim();
    } catch (error) {
        console.error('Error categorizing email:', error);
        throw error;
    }
}

export async function generateReply(text: string): Promise<string> {
    try {
        const response = await openai.completions.create({
            model: 'text-davinci-003', // Replace with your model ID
            prompt: `Respond to the following email text: "${text}". If interested, suggest a demo call. If asking for more information, provide additional details.`,
            max_tokens: 100,
        });
        return response.choices[0].text.trim();
    } catch (error) {
        console.error('Error generating reply:', error);
        throw error;
    }
}
