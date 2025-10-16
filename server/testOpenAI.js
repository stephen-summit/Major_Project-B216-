require('dotenv').config();
const fetch = require('node-fetch');

async function testOpenAI() {
  const key = process.env.OPENAI_API_KEY;
  console.log("Using key:", key);

  const res = await fetch("https://api.openai.com/v1/models", {
    headers: { Authorization: `Bearer ${key}` }
  });

  const data = await res.json();
  console.log("Response:", data);
}

testOpenAI();
