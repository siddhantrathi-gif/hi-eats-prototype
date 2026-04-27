import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { supabase } from "../lib/supabase";

type NavUser = {
  id: string;
  email: string | null;
} | null;

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-xl px-3 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-emerald-100 text-emerald-700"
      : "text-stone-700 hover:bg-stone-100"
  }`;

export default function Navbar() {
  const [user, setUser] = useState<NavUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(
        user
          ? {
              id: user.id,
              email: user.email ?? null,
            }
          : null
      );
      setLoading(false);
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUser = session?.user;

      setUser(
        nextUser
          ? {
              id: nextUser.id,
              email: nextUser.email ?? null,
            }
          : null
      );
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      window.location.href = "/";
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-extrabold tracking-tight text-stone-900">
          Hi-Eats
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/try-it" className={navItemClass}>
            Try It
          </NavLink>

          <NavLink to="/community" className={navItemClass}>
            Community
          </NavLink>

          {!loading && !user && (
            <>
              <Link
                to="/auth"
                className="rounded-xl px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
              >
                Sign in
              </Link>
              <Link
                to="/auth"
                className="rounded-xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-700"
              >
                Sign up
              </Link>
            </>
          )}

          {!loading && user && (
            <>
              <NavLink to="/profile" className={navItemClass}>
                Profile
              </NavLink>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800"
              >
                Sign out
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}