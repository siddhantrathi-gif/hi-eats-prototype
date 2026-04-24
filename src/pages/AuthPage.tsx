import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AuthPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) throw error;

        if (data.user) {
          navigate("/onboarding");
        } else {
          setMessage("Check your email to confirm your account.");
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        const user = data.user;
        if (!user) throw new Error("No user returned after sign in.");

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("id, onboarding_complete")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        if (!profile || !profile.onboarding_complete) {
          navigate("/onboarding");
        } else {
          navigate("/");
        }
      }
    } catch (error: any) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-10">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-center">
        <div className="hidden rounded-3xl bg-gradient-to-br from-orange-100 via-amber-50 to-white p-10 lg:block">
          <div className="max-w-md">
            <p className="mb-3 inline-flex rounded-full border border-orange-200 bg-white/80 px-3 py-1 text-sm font-medium text-orange-700">
              Hi-Eats
            </p>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-stone-900">
              Eat better without overthinking every meal.
            </h1>
            <p className="text-lg leading-8 text-stone-600">
              Save preferences, discover meals that fit your budget and lifestyle,
              and build a food routine that actually works for you.
            </p>

            <div className="mt-8 space-y-3 text-sm text-stone-700">
              <div className="rounded-2xl border border-stone-200 bg-white/80 px-4 py-3">
                Personalized meal suggestions
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white/80 px-4 py-3">
                Budget- and dorm-friendly choices
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white/80 px-4 py-3">
                Preferences saved in one place
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md rounded-3xl border border-stone-200 bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8">
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-orange-600">
              Welcome
            </p>
            <h2 className="text-3xl font-extrabold text-stone-900">
              {mode === "signin" ? "Sign in to Hi-Eats" : "Create your account"}
            </h2>
            <p className="mt-2 text-stone-600">
              {mode === "signin"
                ? "Pick up where you left off."
                : "Start with a few details so we can personalize your experience."}
            </p>
          </div>

          <div className="mb-6 flex rounded-2xl bg-stone-100 p-1">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`flex-1 rounded-2xl px-4 py-2 text-sm font-medium transition ${
                mode === "signin"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-600"
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-2xl px-4 py-2 text-sm font-medium transition ${
                mode === "signup"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-600"
              }`}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {mode === "signup" && (
              <div>
                <label className="mb-1 block text-sm font-medium text-stone-700">
                  Full name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-orange-500"
                  placeholder="Your name"
                />
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-orange-500"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-orange-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {message && (
              <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700 disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : mode === "signin"
                ? "Sign in"
                : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}