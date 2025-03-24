const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Remove if using Node.js 18+

const app = express();

app.use(cors({ origin: process.env.VERCEL_URL || 'http://localhost:3000' })); // Vercel sets VERCEL_URL
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  console.log('Received /api/chat request:', req.body);
  const { messages } = req.body;

  try {
    console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Set' : 'Not set');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch from OpenAI: ${errorText}`);
    }

    const data = await response.json();
    res.json({ content: data.choices[0].message.content });
  } catch (error) {
    console.error('Error in /api/chat:', error.message);
    res.status(500).json({ error: error.message || 'Server error' });
  }
});

app.post('/api/symptom-analyze', async (req, res) => {
  console.log('Received /api/symptom-analyze request:', req.body);
  const { userInput, previousMessages } = req.body;

  const systemMessage = {
    role: 'system',
    content: 'You are a health assistant AI. Analyze the symptoms thoroughly and provide potential conditions, their probability, severity, and recommendations. Format your response in a clear, well-structured way with headings for Possible Conditions, Severity Assessment, and Recommendations. Emphasize consulting a professional for serious concerns.',
  };

  try {
    console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Set' : 'Not set');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [systemMessage, ...previousMessages, { role: 'user', content: userInput }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch from OpenAI: ${errorText}`);
    }

    const data = await response.json();
    res.json({ content: data.choices[0].message.content });
  } catch (error) {
    console.error('Error in /api/symptom-analyze:', error.message);
    res.status(500).json({ error: error.message || 'Server error' });
  }
});

// Export for Vercel serverless function
module.exports = app;