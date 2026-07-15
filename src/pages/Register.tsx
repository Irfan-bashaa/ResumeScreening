import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { 
  BrainCircuit, Lock, Mail, User as UserIcon, ArrowRight, Eye, EyeOff, ShieldCheck, Check, X
} from "lucide-react";
import { motion } from "motion/react";

export const Register: React.FC = () => {
  const { login, apiFetch, showToast } = useApp();
  const navigate = useNavigate();

  const [role, setRole] = useState<"student" | "recruiter">("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Password strength checklist states
  const [strength, setStrength] = useState({ score: 0, label: "Very Weak", color: "bg-red-500" });
  const [checks, setChecks] = useState({
    length: false,
    number: false,
    case: false
  });

  useEffect(() => {
    const hasLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasCase = /[A-Z]/.test(password) && /[a-z]/.test(password);

    setChecks({
      length: hasLength,
      number: hasNumber,
      case: hasCase
    });

    let score = 0;
    if (hasLength) score += 33;
    if (hasNumber) score += 33;
    if (hasCase) score += 34;

    let label = "Very Weak";
    let color = "bg-red-500";

    if (score === 100) {
      label = "Very Secure";
      color = "bg-emerald-500";
    } else if (score >= 66) {
      label = "Good Security";
      color = "bg-sky-500";
    } else if (score >= 33) {
      label = "Weak Security";
      color = "bg-amber-500";
    }

    setStrength({ score, label, color });
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all details.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await apiFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, name, role }),
      });

      login(data.token, data.user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed.");
      showToast(err.message || "Registration failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] grid md:grid-cols-12 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      
      {/* Left Column - Onboarding Graphics */}
      <div className="hidden md:flex md:col-span-5 relative overflow-hidden bg-gray-950 p-12 flex-col justify-between text-left">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-emerald-500/15 blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-cyan-500/15 blur-[100px] animate-pulse" />
        
        <div className="relative z-10 flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
            <BrainCircuit className="w-5 h-5" />
          </span>
          <span className="font-display text-base font-black tracking-wider uppercase text-white">RESUMESCREENING</span>
        </div>

        <div className="relative z-10 my-auto flex flex-col gap-5 max-w-sm">
          <h2 className="text-3xl font-display font-extrabold text-white leading-tight">
            Create your recruitment workspace
          </h2>
          <p className="text-gray-400 text-xs leading-relaxed">
            Configure candidate profiles, parse technical resumes automatically, compare readiness ratings, and coordinate bulk hiring statuses.
          </p>

          <div className="flex flex-col gap-2.5 mt-2">
            {[
              "Dual roles: Candidate or Recruiter/HR",
              "Interactive wizard onboarding panels",
              "Real-time circular progress scorers"
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[11px] text-gray-300 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-[10px] text-gray-500 font-mono">
          SECURE ONBOARDING TERMINAL V2.5
        </div>
      </div>

      {/* Right Column - Registration Form */}
      <div className="col-span-12 md:col-span-7 flex flex-col justify-center items-center p-6 sm:p-12 md:p-16 bg-gray-50/50 dark:bg-gray-950/20 text-left">
        <div className="w-full max-w-md flex flex-col gap-5">
          
          <div>
            <h1 className="text-2xl font-display font-extrabold tracking-tight">Onboard Workspace</h1>
            <p className="text-xs text-gray-400 mt-1.5">Configure your SaaS credentials to begin.</p>
          </div>

          {error && (
            <div id="register-error-alert" className="p-3 text-xs font-semibold text-red-600 bg-red-50 dark:bg-red-950/20 border border-red-500/10 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Dual Role Selector */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Choose Your Account Role</span>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  id="role-select-student"
                  type="button"
                  onClick={() => setRole("student")}
                  className={`flex flex-col gap-1.5 p-3 rounded-xl border text-left transition-all ${
                    role === "student"
                      ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-850 dark:text-emerald-350 dark:bg-emerald-950/20"
                      : "border-gray-200 dark:border-gray-850 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                  }`}
                >
                  <span className="text-xs font-extrabold flex items-center gap-1.5">
                    <UserIcon className="w-3.5 h-3.5 text-emerald-500" />
                    Candidate / Student
                  </span>
                  <span className="text-[10px] text-gray-400 leading-tight">Upload resume & scan skills score.</span>
                </button>
                <button
                  id="role-select-recruiter"
                  type="button"
                  onClick={() => setRole("recruiter")}
                  className={`flex flex-col gap-1.5 p-3 rounded-xl border text-left transition-all ${
                    role === "recruiter"
                      ? "border-sky-500/40 bg-sky-500/5 text-sky-850 dark:text-sky-350 dark:bg-sky-950/20"
                      : "border-gray-200 dark:border-gray-850 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                  }`}
                >
                  <span className="text-xs font-extrabold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                    Recruiter / HR
                  </span>
                  <span className="text-[10px] text-gray-400 leading-tight">Post jobs & screen ranking scores.</span>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="reg-name-input" className="text-xs font-bold text-gray-700 dark:text-gray-300">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <UserIcon className="w-4 h-4" />
                </span>
                <input
                  id="reg-name-input"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Irfan Khan"
                  className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/35 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="reg-email-input" className="text-xs font-bold text-gray-700 dark:text-gray-300">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  id="reg-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@workspace.com"
                  className="w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/35 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="reg-password-input" className="text-xs font-bold text-gray-700 dark:text-gray-300">Secure Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  id="reg-password-input"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full text-sm pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/35 placeholder-gray-400"
                />
                <button
                  id="reg-password-toggle"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Real Password Strength Bar Indicator */}
              {password && (
                <div className="mt-2 p-2.5 rounded-xl border border-gray-150 bg-gray-50/50 dark:border-gray-900 dark:bg-gray-900/30 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[10px] font-bold text-gray-500">
                    <span>Password Strength:</span>
                    <span className="font-mono">{strength.label}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${strength.color}`} 
                      style={{ width: `${strength.score}%` }}
                    />
                  </div>
                  {/* Strength checks list */}
                  <div className="grid grid-cols-3 gap-1 mt-0.5 text-[9px] text-gray-400 font-medium">
                    <span className="flex items-center gap-1">
                      {checks.length ? <Check className="w-3 h-3 text-emerald-500" /> : <X className="w-3 h-3 text-red-400" />} At least 8 chars
                    </span>
                    <span className="flex items-center gap-1">
                      {checks.case ? <Check className="w-3 h-3 text-emerald-500" /> : <X className="w-3 h-3 text-red-400" />} Mixed casing
                    </span>
                    <span className="flex items-center gap-1">
                      {checks.number ? <Check className="w-3 h-3 text-emerald-500" /> : <X className="w-3 h-3 text-red-400" />} Has a digit
                    </span>
                  </div>
                </div>
              )}
            </div>

            <button
              id="register-submit"
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 text-white font-semibold py-2.5 px-4 rounded-xl brand-gradient hover:brand-gradient-hover disabled:opacity-50 text-sm shadow-md shadow-emerald-500/10 group mt-2 transition-all hover:scale-[1.01]"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Onboarding Workspace...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-2">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-emerald-600 dark:text-emerald-450 hover:underline">
              Sign In here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Register;
