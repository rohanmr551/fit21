import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/generate-workout', async (req, res) => {
  const { muscle } = req.body;

  if (!muscle) {
    return res.status(400).json({ error: 'Muscle group is required' });
  }

  const prompt = `Create a workout plan for the "${muscle}" muscle group. Include:
- Title
- Short description
- Duration (in minutes)
- Difficulty (Easy/Medium/Hard)
- 5 exercises`;

  try {
    const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      body: JSON.stringify({
        model: 'llama3',
        prompt,
        stream: false, // required for res.json()
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const streamData = (await ollamaResponse.json()) as { response: string };
    res.json({ text: streamData.response });
  } catch (err) {
    console.error('Ollama error:', err);
    res.status(500).json({ error: 'Failed to generate workout' });
  }
});

export default router;
