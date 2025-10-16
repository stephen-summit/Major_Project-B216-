import { useState } from "react";
import { postChat } from "../../api";

export default function WellnessPanel({ apiBase }) {
  const [sleep, setSleep] = useState("");
  const [diet, setDiet] = useState("");
  const [stress, setStress] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGuidance = async () => {
    setLoading(true);
    try {
      const res = await postChat(apiBase, "wellness", { sleep, diet, stress });
      setResponse(res.reply || res.message || res.error || "No response received.");
    } catch (err) {
      console.error(err);
      setResponse("Error contacting server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-purple-50 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Wellness Guidance</h2>

      <div className="my-2">
        <label className="block font-semibold">How many hours do you sleep?</label>
        <input
          type="text"
          className="border p-2 rounded w-full"
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
        />
      </div>

      <div className="my-2">
        <label className="block font-semibold">Describe your diet:</label>
        <input
          type="text"
          className="border p-2 rounded w-full"
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
        />
      </div>

      <div className="my-2">
        <label className="block font-semibold">Stress level (1–10):</label>
        <input
          type="number"
          min="1"
          max="10"
          className="border p-2 rounded w-full"
          value={stress}
          onChange={(e) => setStress(e.target.value)}
        />
      </div>

      <button
        onClick={handleGuidance}
        disabled={loading}
        className="bg-purple-600 text-white px-4 py-2 rounded w-full font-semibold hover:bg-purple-700"
      >
        {loading ? "Processing..." : "Get Wellness Guidance"}
      </button>

      {response && (
        <div className="mt-4 p-3 border rounded bg-white">{response}</div>
      )}
    </div>
  );
}