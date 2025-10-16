import React, { useState } from "react";
import { postChat } from "../../api";

export default function RelationshipPanel() {
  const [context, setContext] = useState("");
  const [details, setDetails] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE || "";

  async function handleSubmit() {
    if (!context) return;
    setLoading(true);
    try {
      const res = await postChat(API_BASE, "relationship", { context, details });
      setResponse(res.reply || "No advice received.");
    } catch (err) {
      console.error(err);
      setResponse("Error contacting server.");
    } finally {
      setLoading(false);
    }
  }

  const options = ["Family", "Friends", "Romantic", "Work"];

  return (
    <div className="p-6 bg-pink-50 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-pink-700">Relationship Guidance</h2>

      <div className="mb-4 flex gap-2 flex-wrap">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => setContext(o)}
            className={`px-4 py-2 rounded-lg border ${
              context === o ? "bg-pink-600 text-white" : "bg-white text-gray-700"
            }`}
          >
            {o}
          </button>
        ))}
      </div>

      <textarea
        className="w-full border p-2 rounded mb-4"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Describe the situation..."
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700"
      >
        {loading ? "Fetching Advice..." : "Get Advice"}
      </button>

      {response && (
        <div className="mt-6 p-4 bg-white rounded-lg border">
          <h3 className="font-semibold mb-2">Advice:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
