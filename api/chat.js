// api/chat.js - Proxy para Google Gemini 1.5 Flash
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const GEMINI_KEY = process.env.GEMINI_KEY;

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: { message: 'Método não permitido' } }), { status: 405 });
  }

  if (!GEMINI_KEY) {
    return new Response(JSON.stringify({ error: { message: 'GEMINI_KEY não configurada na Vercel.' } }), { status: 500 });
  }

  try {
    const body = await req.json();
    
    // Converte formato OpenAI/Groq para formato Gemini
    const systemMessage = body.messages.find(m => m.role === 'system')?.content || '';
    const chatMessages = body.messages.filter(m => m.role !== 'system').map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content || m.text || '' }]
    }));

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: chatMessages,
        system_instruction: { parts: { text: systemMessage } },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        }
      }),
    });

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      return new Response(JSON.stringify({ error: { message: data.error?.message || 'Erro na API do Gemini' } }), { status: geminiResponse.status });
    }

    // Converte resposta do Gemini de volta para o formato que o frontend espera (OpenAI-like)
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    const responseData = {
      choices: [{
        message: {
          content: text
        }
      }]
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: { message: 'Erro interno no proxy: ' + error.message } }), { status: 500 });
  }
}
