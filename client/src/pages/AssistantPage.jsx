import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatWindow from '../components/ChatWindow';
import EmotionalPanel from './assistant_panels/EmotionalPanel';
import RelationshipPanel from './assistant_panels/RelationshipPanel';
import ProductivityPanel from './assistant_panels/ProductivityPanel';
import WellnessPanel from './assistant_panels/WellnessPanel';
import CrisisPanel from './assistant_panels/CrisisPanel';

const mapping = {
  anxiety: { title: "Dr. Sarah — Anxiety Relief" },
  emotional: { title: "Emotional Analysis" },
  relationship: { title: "Alex — Relationship Advisor" },
  productivity: { title: "Maya — Productivity Coach" },
  wellness: { title: "Dr. Kim — Wellness Advisor" },
  crisis: { title: "Crisis Support" }
};

export default function AssistantPage({ apiBase }){
  const { type } = useParams();
  const info = mapping[type] || { title: 'Assistant' };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-6">
        <button className="text-sm text-sky-600">&larr; Back to Menu</button>
        <h2 className="text-2xl font-semibold">{info.title}</h2>
      </header>

      <main>
        {type === 'anxiety' && <ChatWindow apiBase={apiBase} assistantType="anxiety" />}
        {type === 'emotional' && <EmotionalPanel apiBase={apiBase} assistantType="emotional" />}
        {type === 'relationship' && <RelationshipPanel apiBase={apiBase} assistantType="relationship" />}
        {type === 'productivity' && <ProductivityPanel apiBase={apiBase} assistantType="productivity" />}
        {type === 'wellness' && <WellnessPanel apiBase={apiBase} assistantType="wellness" />}
        {type === 'crisis' && <CrisisPanel apiBase={apiBase} assistantType="crisis" />}
      </main>
    </div>
  );
}
