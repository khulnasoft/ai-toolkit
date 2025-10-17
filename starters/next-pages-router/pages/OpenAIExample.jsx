import React, { useState } from 'react';

export default function OpenAIExample() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    setLoading(true);
    setResponse('');
    try {
      // Replace YOUR_OPENAI_API_KEY with your actual key or use a proxy in production
      const res = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_OPENAI_API_KEY',
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: input,
          max_tokens: 50,
        }),
      });
      const data = await res.json();
      setResponse(data.choices?.[0]?.text || 'No response');
    } catch (err) {
      setResponse('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: 32 }}>
      <h2>OpenAI API Example</h2>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ask something..."
        style={{ width: 300, padding: 8 }}
      />
      <button onClick={handleSend} disabled={loading} style={{ marginLeft: 8 }}>
        {loading ? 'Loading...' : 'Send'}
      </button>
      <div style={{ marginTop: 16, minHeight: 24 }}>
        {response}
      </div>
      <p style={{ fontSize: 12, color: '#888' }}>
        (You must set your OpenAI API key in the code to use this demo.)
      </p>
    </div>
  );
} 