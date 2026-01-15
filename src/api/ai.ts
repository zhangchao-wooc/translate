import axios from "./axios";

type AIConfig = {
    apiUrl: string;
    apiKey?: string;
    model?: string;
    temperature?: number;
    max_tokens?: number;
}

export const AIApi = async (prompt: string, config?: AIConfig) => {
    try {
        const response = await axios.post(config?.apiUrl || '', {
            model: config?.model || 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional translator. Always respond with valid JSON only.'
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            response_format: { type: "json_object" },
            temperature: config?.temperature,
            max_tokens: config?.max_tokens || 4000,
        },
            {
                headers: {
                    'Authorization': `Bearer ${config?.apiKey}`,
                },
                // signal: this.abortController!.signal,
            });
        const content = response.data.choices[0]?.message?.content?.trim()
        if (!content) {
            throw new Error('Empty response from OpenAI')
        }

        return content
    } catch (error) {
        console.error("Error:", error);
    }
};