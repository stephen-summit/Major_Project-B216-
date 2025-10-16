import React, { useState } from "react";
import { postChat } from "../../api";

export default function EmotionalPanel() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE || "";

  async function handleSubmit() {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await postChat(API_BASE, "emotional", { text });
      setResponse(res.reply || "No response received.");
    } catch (err) {
      console.error(err);
      setResponse("Error contacting server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 bg-blue-50 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Emotional Support</h2>
      <textarea
        className="w-full border p-2 rounded mb-4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share what’s on your mind..."
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
      >
        {loading ? "Analyzing..." : "Analyze My Feelings"}
      </button>
      {response && (
        <div className="mt-6 p-4 bg-white rounded-lg border">
          <h3 className="font-semibold mb-2">Assistant Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
