// api/chat.js — Vercel Serverless Function (proxy seguro para a API Groq)
// A chave de API fica AQUI no servidor e nunca é enviada ao navegador.

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  // --- Validação do método ---
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: { message: 'Método não permitido' } }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // --- Validação da chave ---
  const GROQ_KEY = process.env.GROQ_KEY;
  if (!GROQ_KEY) {
    return new Response(
      JSON.stringify({
        error: {
          message: 'GROQ_KEY não está configurada nas variáveis de ambiente da Vercel. Vá em Settings > Environment Variables e adicione a chave.',
        },
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // --- Ler e validar o body ---
    const body = await req.json();

    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      return new Response(
        JSON.stringify({ error: { message: 'O campo "messages" é obrigatório e deve ser um array.' } }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // --- Chamar a API da Groq ---
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

    // --- Se a Groq retornou erro, repassar o erro ao frontend ---
    if (!groqResponse.ok) {
      const errorMsg = data?.error?.message || `Erro da API Groq: HTTP ${groqResponse.status}`;
      return new Response(
        JSON.stringify({ error: { message: errorMsg } }),
        { status: groqResponse.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // --- Validar que a resposta contém conteúdo ---
    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      return new Response(
        JSON.stringify({ error: { message: 'A API Groq retornou uma resposta vazia.' } }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // --- Sucesso: repassar a resposta completa ---
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(
      JSON.stringify({ error: { message: `Erro interno do servidor proxy: ${error.message}` } }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
