import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import OnboardingPage from "./pages/OnboardingPage";
import TryIt from "./pages/TryIt";
import ProfilePage from "./pages/ProfilePage";
import Community from "./pages/Community";
import Payment from "./pages/Payment";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/try-it" element={<TryIt />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </>
  );
}