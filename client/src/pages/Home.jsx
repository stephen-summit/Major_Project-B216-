import React from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithGoogle,
  signInWithFacebook,
  auth,
  logout,
} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion } from "framer-motion";

// Import icons from lucide-react
import {
  Brain,
  Heart,
  Users,
  Target,
  Activity,
  PhoneCall,
} from "lucide-react";

const assistants = [
  {
    key: "anxiety",
    title: "Anxiety Relief",
    color: "blue",
    subtitle: "AI-powered CBT support",
    icon: Brain,
  },
  {
    key: "emotional",
    title: "Emotional Analysis",
    color: "pink",
    subtitle: "Understand your emotional patterns",
    icon: Heart,
  },
  {
    key: "relationship",
    title: "Relationship Advisor",
    color: "purple",
    subtitle: "Navigate relationships",
    icon: Users,
  },
  {
    key: "productivity",
    title: "Productivity Coach",
    color: "green",
    subtitle: "Optimize your routines",
    icon: Target,
  },
  {
    key: "wellness",
    title: "Wellness Guide",
    color: "teal",
    subtitle: "Personalized health advice",
    icon: Activity,
  },
  {
    key: "crisis",
    title: "Crisis Support",
    color: "red",
    subtitle: "Immediate support & resources",
    icon: PhoneCall,
  },
];

export default function Home({ apiBase }) {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <header className="bg-white shadow-sm rounded-xl px-6 py-4 mb-8 flex items-center justify-between">
        {/* Logo */}
        <h1
          className="text-2xl font-bold text-sky-600 tracking-wide cursor-pointer"
          onClick={() => navigate("/")}
        >
          Harmoniq<span className="text-slate-700">Mind</span>
        </h1>

        {/* Nav items */}
        <nav className="hidden md:flex gap-6 text-slate-600 font-medium">
          <button onClick={() => navigate("/")} className="hover:text-sky-600 transition">Home</button>
          <button onClick={() => navigate("/history")} className="hover:text-sky-600 transition">History</button>
          <button onClick={() => navigate("/about")} className="hover:text-sky-600 transition">About</button>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <button
                onClick={() => signInWithGoogle()}
                className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg border hover:bg-slate-200 transition"
              >
                {/* Google SVG */}
                <svg className="w-5 h-5" viewBox="0 0 533.5 544.3">
                  <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.3h147.2c-6.4 34.7-25.6 64.1-54.6 83.8v69.6h88.5c51.6-47.5 80.4-117.5 80.4-198.3z"/>
                  <path fill="#34A853" d="M272 544.3c73.6 0 135.3-24.5 180.4-66.7l-88.5-69.6c-24.6 16.5-56.1 26.2-91.9 26.2-70.7 0-130.6-47.7-152-111.5H29v70.2c45.2 89.1 138 151.4 243 151.4z"/>
                  <path fill="#FBBC05" d="M120 322.7c-10.8-32-10.8-66.3 0-98.3V154.2H29c-38.8 76.6-38.8 168.3 0 244.9l91-76.4z"/>
                  <path fill="#EA4335" d="M272 107.7c39.9 0 75.8 13.8 104.1 40.8l78.1-78.1C407.2 24.5 345.6 0 272 0 167 0 74.2 62.3 29 151.4l91 70.2c21.4-63.8 81.3-111.5 152-111.5z"/>
                </svg>
                <span>Google</span>
              </button>
              <button
                onClick={() => signInWithFacebook()}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {/* Facebook SVG */}
                <svg className="w-5 h-5" viewBox="0 0 320 512" fill="currentColor">
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 
                  12.42-50.06 52.24-50.06h40.42V6.26S293.3 0 
                  268.08 0c-73.52 0-121.44 44.38-121.44 
                  124.72v70.62H86.4V288h60.24v224h92.66V288z"/>
                </svg>
                <span>Facebook</span>
              </button>
            </>
          ) : (
            <>
              <img
                src={user.photoURL}
                alt="me"
                className="w-8 h-8 rounded-full border"
              />
              <span className="font-medium">{user.displayName || user.email}</span>
              <button
                onClick={() => logout()}
                className="px-4 py-2 rounded-lg border bg-slate-100 hover:bg-slate-200 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      {/* Title */}
      <section className="mb-6 text-center">
        <h2 className="text-2xl font-semibold">
          How can we support you today?
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Choose one of our specialized AI assistants.
        </p>
      </section>

      {/* Assistants Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {assistants.map((a) => {
          const Icon = a.icon;
          return (
            <motion.button
              key={a.key}
              onClick={() => navigate(`/assistant/${a.key}`)}
              className="bg-white shadow rounded-xl text-left p-6 hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className={`text-${a.color}-600 mb-4`}>
                <Icon size={32} strokeWidth={2} />
              </div>
              <h3 className="text-lg font-semibold">{a.title}</h3>
              <p className="text-sm text-slate-500 mt-2">{a.subtitle}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="mt-10 bg-white rounded-xl p-4 text-sm text-slate-600 text-center">
        <strong>Important Notice:</strong> HarmoniqMind provides supportive
        AI-driven guidance and is not a replacement for professional mental
        health care.
      </footer>
    </div>
  );
}