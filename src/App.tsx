import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TryIt from "./pages/TryIt";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/try-it" element={<TryIt />} />
    </Routes>
  );
}

