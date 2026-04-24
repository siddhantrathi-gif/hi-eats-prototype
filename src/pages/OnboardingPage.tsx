import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    school: "",
    budget_level: "",
    dietary_preferences: "",
    allergies: "",
    favorite_cuisines: "",
    cooking_time_preference: "",
    cooking_skill: "",
    living_setup: "",
  });

  const updateField = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error("You must be signed in first.");

      const { error } = await supabase.from("profiles").upsert(
        {
          id: user.id,
          ...form,
          onboarding_complete: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

      if (error) throw error;

      setMessage("Preferences saved successfully.");
      navigate("/");
    } catch (error: any) {
      setMessage(error.message || "Failed to save preferences.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl border border-stone-200 bg-white p-8 shadow-sm md:p-10">
        <h1 className="mb-2 text-3xl font-extrabold text-stone-900">
          Tell us a little about how you eat
        </h1>
        <p className="mb-8 text-stone-600">
          We’ll use this to personalize meal suggestions later.
        </p>

        <form onSubmit={handleSave} className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Full name
            </label>
            <input
              name="full_name"
              value={form.full_name}
              onChange={updateField}
              className="w-full rounded-2xl border border-stone-300 px-4 py-3"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              School
            </label>
            <input
              name="school"
              value={form.school}
              onChange={updateField}
              className="w-full rounded-2xl border border-stone-300 px-4 py-3"
              placeholder="Tufts University"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Budget level
            </label>
            <select
              name="budget_level"
              value={form.budget_level}
              onChange={updateField}
              className="w-full rounded-2xl border border-stone-300 px-4 py-3"
            >
              <option value="">Select one</option>
              <option value="tight">Tight budget</option>
              <option value="moderate">Moderate budget</option>
              <option value="flexible">Flexible budget</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Dietary preferences
            </label>
            <input
              name="dietary_preferences"
              value={form.dietary_preferences}
              onChange={updateField}
              className="w-full rounded-2xl border border-stone-300 px-4 py-3"
              placeholder="Vegetarian, halal, high protein..."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Allergies
            </label>
            <input
              name="allergies"
              value={form.allergies}
              onChange={updateField}
              className="w-full rounded-2xl border border-stone-300 px-4 py-3"
              placeholder="Peanuts, dairy..."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Favorite cuisines
            </label>
            <input
              name="favorite_cuisines"
              value={form.favorite_cuisines}
              onChange={updateField}
              className="w-full rounded-2xl border border-stone-300 px-4 py-3"
              placeholder="Indian, Mexican, Mediterranean..."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Preferred cooking time
            </label>
            <select
              name="cooking_time_preference"
              value={form.cooking_time_preference}
              onChange={updateField}
              className="w-full rounded-2xl border border-stone-300 px-4 py-3"
            >
              <option value="">Select one</option>
              <option value="under_10">Under 10 min</option>
              <option value="under_20">Under 20 min</option>
              <option value="under_30">Under 30 min</option>
              <option value="anything">Anything is fine</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Cooking skill
            </label>
            <select
              name="cooking_skill"
              value={form.cooking_skill}
              onChange={updateField}
              className="w-full rounded-2xl border border-stone-300 px-4 py-3"
            >
              <option value="">Select one</option>
              <option value="beginner">Beginner</option>
              <option value="comfortable">Comfortable</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Living setup
            </label>
            <select
              name="living_setup"
              value={form.living_setup}
              onChange={updateField}
              className="w-full rounded-2xl border border-stone-300 px-4 py-3"
            >
              <option value="">Select one</option>
              <option value="dorm">Dorm</option>
              <option value="apartment">Apartment</option>
              <option value="with_family">With family</option>
            </select>
          </div>

          {message && (
            <div className="md:col-span-2 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
              {message}
            </div>
          )}

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save preferences"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}