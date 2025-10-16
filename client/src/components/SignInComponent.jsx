// client/src/components/SignInComponent.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  auth, 
  signInWithGoogle, 
  signInWithFacebook, 
  signInWithPhone 
} from "../firebase";
import aiBg from "../assets/ai-background.gif"; // <-- import GIF here

export default function SignInComponent() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [phoneStep, setPhoneStep] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Google sign-in failed");
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithFacebook();
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Facebook sign-in failed");
    }
  };

  const handlePhoneSignIn = async () => {
    try {
      const confirmationResult = await signInWithPhone(phone);
      setVerificationId(confirmationResult.verificationId);
      alert("OTP sent to your phone");
    } catch (err) {
      console.error(err);
      alert("Phone sign-in failed");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        otp
      );
      await auth.signInWithCredential(credential);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("OTP verification failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background GIF */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          backgroundImage: `url(${aiBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Overlay to improve readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Sign In Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border border-white/20">
        <h1 className="text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          HarmoniqMind
        </h1>
        <p className="text-center text-gray-300 mb-6 text-sm">
          AI-Powered Mental Equilibrium & Relationship Optimizer
        </p>

        {/* Google */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full mb-3 py-3 bg-red-500 text-white rounded-lg font-medium shadow-md hover:bg-red-600 transition transform hover:scale-105"
        >
          Sign in with Google
        </button>

        {/* Facebook */}
        <button
          onClick={handleFacebookSignIn}
          className="w-full mb-3 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 transition transform hover:scale-105"
        >
          Sign in with Facebook
        </button>

        {/* Phone Auth Flow */}
        {!phoneStep && !verificationId && (
          <button
            onClick={() => setPhoneStep(true)}
            className="w-full py-3 bg-green-500 text-white rounded-lg font-medium shadow-md hover:bg-green-600 transition transform hover:scale-105"
          >
            Sign in with Phone Number
          </button>
        )}

        {phoneStep && !verificationId && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="+1234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-cyan-400 outline-none text-black"
            />
            <button
              onClick={handlePhoneSignIn}
              className="w-full py-3 bg-green-500 text-white rounded-lg font-medium shadow-md hover:bg-green-600 transition transform hover:scale-105"
            >
              Send OTP
            </button>
          </div>
        )}

        {verificationId && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-purple-400 outline-none text-black"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full py-3 bg-indigo-500 text-white rounded-lg font-medium shadow-md hover:bg-indigo-600 transition transform hover:scale-105"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
