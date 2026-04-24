import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TryIt from "./pages/TryIt";
import AuthPage from "./pages/AuthPage";
import OnboardingPage from "./pages/OnboardingPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/try-it" element={<TryIt />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
    </Routes>
  );
}