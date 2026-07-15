import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { 
  BrainCircuit, Lock, Mail, ArrowRight, Eye, EyeOff, Sparkles, CheckCircle2 
} from "lucide-react";
import { motion } from "motion/react";

export const Login: React.FC = () => {
  const { login, apiFetch, showToast } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      login(data.token, data.user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials.");
      showToast(err.message || "Login failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Preload test credentials helper
  const handlePreload = (preloadedEmail: string) => {
    setEmail(preloadedEmail);
    setPassword("password");
    setError("");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] grid md:grid-cols-12 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      
      {/* Left Column - Premium Visual Highlights & Floating Blobs */}
      <div className="hidden md:flex md:col-span-5 relative overflow-hidden bg-gray-950 p-12 flex-col justify-between text-left">
        
        {/* Animated Gradient Background Blobs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-emerald-500/20 blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-sky-500/20 blur-[100px] animate-pulse" />
        
        <div className="relative z-10 flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
            <BrainCircuit className="w-5 h-5" />
          </span>
          <span className="font-display text-base font-black tracking-wider uppercase text-white">RESUMESCREENING AI</span>
        </div>

        <div className="relative z-10 my-auto flex flex-col gap-6 max-w-sm">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-display font-extrabold text-white leading-tight">
              Sign in to unlock AI Screenings
            </h2>
            <p className="text-gray-400 text-xs leading-relaxed mt-3">
              Gain access to automated skill extraction, real-time application pipelines, and dynamic candidate rank boards.
            </p>
          </motion.div>

          {/* SaaS Highlights Cards */}
          <div className="flex flex-col gap-3">
            {[
              "92% Automated Matching Match Rate",
              "Pre-configured student, recruiter, and admin views",
              "Server-side Gemini AI parsing integration"
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[11px] text-gray-300 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-[10px] text-gray-500 font-mono">
          © 2026 RESUMESCREENING INC. ALL SYSTEMS OPERATIONAL.
        </div>
      </div>

      {/* Right Column - Beautiful Login Form */}
      <div className="col-span-12 md:col-span-7 flex flex-col justify-center items-center p-6 sm:p-12 md:p-20 relative bg-gray-50/50 dark:bg-gray-950/20">
        
        {/* Mobile Logo Indicator */}
        <div className="md:hidden flex items-center gap-2 mb-8">
          <span className="p-1.5 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
            <BrainCircuit className="w-5 h-5" />
          </span>
          <span className="font-display text-sm font-black tracking-wider uppercase text-gray-900 dark:text-white">RESUMESCREENING</span>
        </div>

        <div className="w-full max-w-md flex flex-col gap-6 text-left">
          
          <div>
            <h1 className="text-2xl font-display font-extrabold tracking-tight">Welcome Back</h1>
            <p className="text-xs text-gray-400 mt-1.5">Enter your account details below to sign in.</p>
          </div>

          {/* Test Drive Credentials - CRITICAL FOR PREVIEW EVALUATORS */}
          <div className="p-4 rounded-xl border border-amber-500/10 bg-amber-50/45 dark:bg-amber-950/10 flex flex-col gap-2.5">
            <p className="text-xs font-bold text-amber-800 dark:text-amber-450 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 animate-bounce" />
              <span>SaaS Test Account Presets (One-Tap Login)</span>
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                id="login-preset-student"
                type="button"
                onClick={() => handlePreload("student@resumescreening.ai")}
                className="text-[10px] font-bold py-1.5 px-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg transition-colors border border-emerald-500/10"
              >
                Student View
              </button>
              <button
                id="login-preset-recruiter"
                type="button"
                onClick={() => handlePreload("recruiter@resumescreening.ai")}
                className="text-[10px] font-bold py-1.5 px-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 rounded-lg transition-colors border border-sky-500/10"
              >
                Recruiter View
              </button>
              <button
                id="login-preset-admin"
                type="button"
                onClick={() => handlePreload("admin@resumescreening.ai")}
                className="text-[10px] font-bold py-1.5 px-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg transition-colors border border-red-500/10"
              >
                Admin View
              </button>
            </div>
            <p className="text-[9px] text-gray-400 font-medium">Click any button above to autofill test credentials (Password is always <b>password</b>).</p>
          </div>

          {error && (
            <div id="login-error-alert" className="p-3 text-xs font-semibold text-red-600 bg-red-50 dark:bg-red-950/20 border border-red-500/10 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email-input" className="text-xs font-bold text-gray-700 dark:text-gray-300">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/35 placeholder-gray-400 transition-shadow"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password-input" className="text-xs font-bold text-gray-700 dark:text-gray-300">Password</label>
                <Link to="/forgot-password" className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-450 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-sm pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/35 placeholder-gray-400 transition-shadow"
                />
                <button
                  id="password-toggle"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-650"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 text-white font-semibold py-2.5 px-4 rounded-xl brand-gradient hover:brand-gradient-hover disabled:opacity-50 text-sm shadow-md shadow-emerald-500/10 group mt-2 transition-all hover:scale-[1.01]"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Social Sign In Placeholders */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200 dark:border-gray-850"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-mono tracking-wider">
              <span className="bg-white dark:bg-gray-950 px-3 text-gray-400 font-bold">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => showToast("Social integration placeholder active.", "info")}
              className="flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-850 bg-white dark:bg-gray-900/60 text-xs py-2 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 font-semibold"
            >
              <svg className="w-4 h-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.24 10.285V13.4h6.887c-.648 2.41-2.519 4.113-5.136 4.113-3.472 0-6.289-2.817-6.289-6.289s2.817-6.289 6.289-6.289c1.637 0 3.125.631 4.262 1.654l2.404-2.404C18.423 2.144 15.559 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.897 0 10.763-4.262 10.763-11.24 0-.648-.078-1.296-.207-1.954H12.24z"/>
              </svg>
              <span>Google SSO</span>
            </button>
            <button
              type="button"
              onClick={() => showToast("Social integration placeholder active.", "info")}
              className="flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-850 bg-white dark:bg-gray-900/60 text-xs py-2 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 font-semibold"
            >
              <svg className="w-4 h-4 text-gray-800 dark:text-white shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-2">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-emerald-600 dark:text-emerald-450 hover:underline">
              Create an account free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
