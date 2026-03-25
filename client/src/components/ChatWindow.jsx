import React, { useEffect, useState, useRef } from 'react';
import { auth } from '../firebase';
import { postChat } from '../api';

export default function ChatWindow({ apiBase, assistantType }) {
  const [messages, setMessages] = useState([]); // {role, text}
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const boxRef = useRef();

  useEffect(() => {
    // optionally fetch existing history from server when component loads
    async function loadHistory(){
      if (!auth.currentUser) return;
      const token = await auth.currentUser.getIdToken();
      const res = await fetch(`${apiBase}/api/history`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      const conversation = data.history?.find(h => h.assistantType === assistantType);
      if (conversation) {
        // fetch conversation details
        const convRes = await fetch(`${apiBase}/api/chat/${conversation.id}`, { headers: { Authorization: `Bearer ${token}` } });
        const convData = await convRes.json();
        if (convData.chat) {
          setConversationId(convData.chat._id);
          setMessages(convData.chat.messages.map(m => ({role: m.role, text: m.text})));
        }
      }
    }
    loadHistory();
  }, [apiBase, assistantType]);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  async function handleSend() {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages(prev => [...prev, { role:'user', text }]);
    setInput('');
    setLoading(true);
    try {
      const resp = await postChat(assistantType, text, conversationId);
      if (resp.assistantText) {
        setConversationId(resp.conversationId || conversationId);
        setMessages(prev => [...prev, { role:'assistant', text: resp.assistantText }]);
      } else if (resp.chat && resp.chat.messages) {
        setMessages(resp.chat.messages.map(m => ({role: m.role, text: m.text})));
      } else if (resp.error) {
        setMessages(prev => [...prev, { role:'assistant', text: `Server error: ${resp.error}` }]);
      } else {
        setMessages(prev => [...prev, { role:'assistant', text: 'Sorry — no response.' }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role:'assistant', text: 'Error communicating with server.' }]);
    } finally {
      setLoading(false);
    }
  }

  const quicks = [
    "I'm feeling anxious about...",
    "I keep having worrying thoughts",
    "Help me with breathing exercises",
    "I'm stressed about work/school"
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">🤖</div>
          <div>
            <div className="font-semibold">Hello! I'm Dr. Sarah 👋</div>
            <div className="text-sm text-slate-500">I can help you manage anxiety with CBT techniques.</div>
          </div>
        </div>

        <div ref={boxRef} className="h-80 overflow-auto p-4 bg-slate-50 rounded-lg mb-4">
          {messages.length === 0 && <div className="text-sm text-slate-500">No messages yet — start the conversation.</div>}
          {messages.map((m, i) => (
            <div key={i} className={`mb-3 ${m.role==='user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block px-4 py-2 rounded-lg ${m.role==='user' ? 'bg-sky-100' : 'bg-white shadow-sm'}`}>
                <div className="text-sm">{m.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 items-center">
          <input value={input} onChange={e=>setInput(e.target.value)}
            className="flex-1 border rounded-full px-4 py-2" placeholder="Share what's on your mind... How are you feeling today?" />
          <button onClick={handleSend} disabled={loading} className="px-3 py-2 rounded-full bg-sky-500 text-white">
            {loading ? '...' : 'Send'}
          </button>
        </div>

        <div className="mt-3 text-sm text-slate-500">Quick starters:</div>
        <div className="flex gap-2 mt-2">
          {quicks.map((q,i)=> (
            <button key={i} className="px-3 py-1 text-xs bg-slate-100 rounded-full" onClick={()=> setInput(q)}>{q}</button>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-2">Resources & Tips</h3>
        <p className="text-sm text-slate-600">Try breathing exercises, grounding techniques, or ask Dr. Sarah for CBT framing of your thoughts.</p>

        <div className="mt-6">
          <h4 className="font-semibold">Suggested exercises</h4>
          <ul className="list-disc list-inside text-sm text-slate-600 mt-2">
            <li>Box Breathing: 4 in, 4 hold, 4 out, 4 hold (repeat)</li>
            <li>5-4-3-2-1 grounding exercise</li>
            <li>Identify automatic thoughts & reframe them</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
