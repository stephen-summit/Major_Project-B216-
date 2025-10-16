import React, { useState } from "react";
import { postChat } from "../../api";

export default function CrisisPanel() {
  const [issue, setIssue] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE || "";

  async function handleSubmit() {
    if (!issue.trim()) return;
    setLoading(true);
    try {
      const res = await postChat(API_BASE, "crisis", { issue });
      setResponse(res.reply || "No support received.");
    } catch (err) {
      console.error(err);
      setResponse("Error contacting server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 bg-red-50 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-red-700">Crisis Support</h2>

      {/* Emergency Banner */}
      <div className="bg-red-600 text-white p-3 rounded-lg mb-4 font-semibold">
        🚨 If you are in immediate danger, please call your local emergency number!
      </div>

      {/* Hotline Cards (example only, you can expand) */}
      <div className="mb-4">
        <p className="font-semibold">Hotlines:</p>
        <ul className="list-disc ml-5 text-gray-700">
          <li>Suicide Prevention: 988 (US)</li>
          <li>Emergency: 112 / 911</li>
        </ul>
      </div>

      <textarea
        className="w-full border p-2 rounded mb-4"
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        placeholder="Describe your situation..."
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700"
      >
        {loading ? "Requesting Support..." : "Get Immediate Support"}
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
