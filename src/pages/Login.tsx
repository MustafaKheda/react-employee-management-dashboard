import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DEMO_EMAIL = "admin@company.com";
const DEMO_PASSWORD = "admin123";

export default function Login() {
  const { login,isLoggedIn,logout } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Login - Employee Portal";
    if (isLoggedIn) {
      logout();
    }

  }, []);

  const hasError = Boolean(error);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ⛔ prevent page reload
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError("Invalid email or password.");
      return;
    }

    login();
    navigate("/dashboard");
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-[#F7F9FC] px-4"
      aria-labelledby="login-title"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-8"
        aria-describedby={hasError ? "login-error" : undefined}
      >
        {/* Header */}
        <h1
          id="login-title"
          className="text-2xl font-semibold text-[#1F2937] mb-1"
        >
          Employee Portal
        </h1>
        <p className="text-sm text-[#6B7280] mb-8">
          Sign in to continue
        </p>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => {  setError("");setEmail(e.target.value)}}
            placeholder="admin@company.com"
            aria-invalid={hasError}
            className="w-full px-4 py-3 rounded-md border border-[#E5E7EB]
                       focus:outline-none focus:ring-2 focus:ring-[#22B8A7]"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => { setError("");setPassword(e.target.value);}}
            placeholder="••••••••"
            aria-invalid={hasError}
            className="w-full px-4 py-3 rounded-md border border-[#E5E7EB]
                       focus:outline-none focus:ring-2 focus:ring-[#22B8A7]"
          />
        </div>

        {/* Error */}
        {hasError && (
          <p
            id="login-error"
            role="alert"
            className="text-sm text-red-600 mb-4"
          >
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 rounded-md bg-[#22B8A7]
                     hover:bg-[#179E91] text-white font-medium transition
                     focus:outline-none focus:ring-2 focus:ring-offset-2
                     focus:ring-[#22B8A7]"
        >
          Sign In
        </button>

        {/* Demo Info */}
        <p className="text-xs text-[#9CA3AF] text-center mt-6">
          Demo credentials: admin@company.com / admin123
        </p>
      </form>
    </main>
  );
}
