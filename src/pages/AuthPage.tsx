import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    alert(error ? error.message : "Signup successful. Check your email if confirmation is enabled.");
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    alert(error ? error.message : "Signed in successfully.");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Hi Eats Auth</h1>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <button onClick={handleSignUp}>Sign up</button>
        <button onClick={handleSignIn}>Sign in</button>
      </div>
    </div>
  );
}