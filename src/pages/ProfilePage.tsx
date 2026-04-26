import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

type Profile = {
  full_name: string | null;
  school: string | null;
  budget_level: string | null;
  dietary_preferences: string | null;
  allergies: string | null;
  favorite_cuisines: string | null;
  cooking_time_preference: string | null;
  cooking_skill: string | null;
  living_setup: string | null;
  onboarding_complete: boolean | null;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;

        if (!user) {
          setMessage("You are not signed in.");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select(
            "full_name, school, budget_level, dietary_preferences, allergies, favorite_cuisines, cooking_time_preference, cooking_skill, living_setup, onboarding_complete"
          )
          .eq("id", user.id)
          .maybeSingle();

        if (error) throw error;

        setProfile(data ?? null);
      } catch (error: any) {
        setMessage(error.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl border border-stone-200 bg-white p-8 shadow-sm md:p-10">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-orange-600">
              Account
            </p>
            <h1 className="text-3xl font-extrabold text-stone-900">Your profile</h1>
            <p className="mt-2 text-stone-600">
              View the preferences saved to your Hi-Eats account.
            </p>
          </div>

          <Link
            to="/onboarding"
            className="rounded-2xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
          >
            Edit profile
          </Link>
        </div>

        {loading && (
          <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
            Loading profile...
          </div>
        )}

        {!loading && message && (
          <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
            {message}
          </div>
        )}

        {!loading && !message && !profile && (
          <div className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
            No saved profile yet.
          </div>
        )}

        {!loading && !message && profile && (
          <div className="grid gap-4 md:grid-cols-2">
            <InfoCard label="Full name" value={profile.full_name} />
            <InfoCard label="School" value={profile.school} />
            <InfoCard label="Budget level" value={profile.budget_level} />
            <InfoCard label="Dietary preferences" value={profile.dietary_preferences} />
            <InfoCard label="Allergies" value={profile.allergies} />
            <InfoCard label="Favorite cuisines" value={profile.favorite_cuisines} />
            <InfoCard
              label="Preferred cooking time"
              value={profile.cooking_time_preference}
            />
            <InfoCard label="Cooking skill" value={profile.cooking_skill} />
            <InfoCard label="Living setup" value={profile.living_setup} />
            <InfoCard
              label="Onboarding complete"
              value={profile.onboarding_complete ? "Yes" : "No"}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
      <p className="mb-1 text-sm font-medium text-stone-500">{label}</p>
      <p className="text-stone-900">{value && value.trim() ? value : "-"}</p>
    </div>
  );
}