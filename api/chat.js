// api/chat.js — Vercel Serverless Function (proxy seguro para a API Groq)
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const GROQ_KEY = process.env.GROQ_KEY;

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: { message: 'Método não permitido' } }), { status: 405 });
  }

  if (!GROQ_KEY) {
    return new Response(JSON.stringify({ error: { message: 'GROQ_KEY não configurada na Vercel.' } }), { status: 500 });
  }

  try {
    const body = await req.json();

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
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

    const data = await groqResponse.json();

    if (!groqResponse.ok) {
      return new Response(JSON.stringify({ error: { message: data?.error?.message || 'Erro na API Groq' } }), { status: groqResponse.status });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: { message: 'Erro interno no proxy: ' + error.message } }), { status: 500 });
  }
}
