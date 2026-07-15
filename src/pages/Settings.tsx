import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Lock, ShieldAlert, Key, Smartphone, HardDrive, Sparkles, CheckCircle2 } from "lucide-react";

export const Settings: React.FC = () => {
  const { user, apiFetch, showToast } = useApp();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill out all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await apiFetch("/api/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      showToast("Password updated successfully!", "success");
    } catch (err: any) {
      setError(err.message || "Incorrect current password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-left">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-display font-black tracking-tight">Security Settings</h1>
        <p className="text-xs text-gray-400">Configure your password, security parameters, and credential integrations.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Left column: Security Overview */}
        <div className="flex flex-col gap-4">
          <div className="p-5 rounded-2xl glass-panel border border-gray-150 dark:border-gray-900 bg-white dark:bg-gray-950 flex flex-col gap-3.5">
            <h3 className="text-xs font-bold font-mono text-gray-400 uppercase tracking-wider">Account Security</h3>
            <div className="flex items-center gap-3">
              <img
                src={user?.avatarUrl}
                alt="user avatar"
                className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-800 bg-emerald-50"
              />
              <div>
                <p className="text-sm font-bold">{user?.name}</p>
                <p className="text-[10px] text-gray-400">{user?.role.toUpperCase()} LEVEL</p>
              </div>
            </div>
            <hr className="border-gray-100 dark:border-gray-900" />
            <div className="flex flex-col gap-2.5 text-xs text-gray-500 leading-snug">
              <p className="flex items-center gap-2"><Key className="w-4 h-4 text-emerald-500" /> <span>JWT Token Authorization Active</span></p>
              <p className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-emerald-500" /> <span>SSO Login Gateways Ready</span></p>
              <p className="flex items-center gap-2"><HardDrive className="w-4 h-4 text-emerald-500" /> <span>Data Persisted on Disk JSON</span></p>
            </div>
          </div>
        </div>

        {/* Right column: Update Forms */}
        <div className="md:col-span-2 flex flex-col gap-6">
          
          {/* Form Card */}
          <div className="p-6 rounded-2xl glass-panel border border-gray-150 dark:border-gray-900 bg-white dark:bg-gray-950 flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <Lock className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">Change Credentials Password</h3>
                <p className="text-[10px] text-gray-400">Update your account login security key below.</p>
              </div>
            </div>

            {error && (
              <div className="p-3 text-xs font-semibold text-red-600 bg-red-50 dark:bg-red-950/20 border border-red-500/10 rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label htmlFor="settings-curr-pass" className="text-xs font-bold text-gray-700 dark:text-gray-300">Current Password</label>
                  <input
                    id="settings-curr-pass"
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-sm px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/35"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="settings-new-pass" className="text-xs font-bold text-gray-700 dark:text-gray-300">New Password</label>
                  <input
                    id="settings-new-pass"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="w-full text-sm px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/35"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="settings-conf-pass" className="text-xs font-bold text-gray-700 dark:text-gray-300">Confirm New Password</label>
                  <input
                    id="settings-conf-pass"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Min 8 characters"
                    className="w-full text-sm px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500/35"
                  />
                </div>
              </div>

              <button
                id="settings-password-submit"
                type="submit"
                disabled={loading}
                className="w-fit flex items-center justify-center gap-2 text-white font-semibold py-2.5 px-6 rounded-xl brand-gradient hover:brand-gradient-hover disabled:opacity-50 text-xs shadow-md mt-2 transition-all hover:scale-[1.01]"
              >
                {loading ? "Updating Security Password..." : "Save Password Changes"}
              </button>
            </form>
          </div>

          {/* Connected API Keys Secrets panel */}
          <div className="p-6 rounded-2xl glass-panel border border-gray-150 dark:border-gray-900 bg-white dark:bg-gray-950 flex flex-col gap-4">
            <h3 className="text-xs font-bold font-mono text-gray-400 uppercase tracking-wider">Integrations & API Secrets</h3>
            <div className="p-4 rounded-xl border border-gray-200/50 bg-gray-50/50 dark:border-gray-900 dark:bg-gray-900/30 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
              <div className="flex-1 text-xs leading-relaxed text-gray-500">
                <p className="font-bold text-gray-800 dark:text-gray-200">Gemini AI Key Integration Status</p>
                <p className="mt-1">The application uses the <b>GEMINI_API_KEY</b> defined inside your Secrets configurations on AI Studio to run real-time resume extraction. No custom key entry is required here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;
