// api/chat.js - Vercel Edge Function Proxy
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  // A chave de API fica protegida aqui no servidor
  const GROQ_KEY = process.env.GROQ_KEY;

  if (req.method !== 'POST') {
    return new Response('Método não permitido', { status: 405 });
  }

  try {
    const body = await req.json();

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: body.messages,
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro no servidor proxy' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
