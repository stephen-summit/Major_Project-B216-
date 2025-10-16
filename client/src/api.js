// client/src/api.js
import { auth } from "./firebase";

// 🔑 Get Firebase ID token for authenticated user
async function getIdToken() {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken();
}

// Base URL for API (Vite proxy handles /api -> http://localhost:5000/api)
const API_BASE = "/api";

// 📨 Send chat request to backend
export async function postChat(assistantType, input, conversationId = null) {
  const token = await getIdToken();
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ assistantType, input, conversationId }),
  });

  return res.json();
}

// 📜 Fetch conversation history
export async function fetchHistory() {
  const token = await getIdToken();
  const res = await fetch(`${API_BASE}/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
