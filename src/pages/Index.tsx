import { Link } from "react-router-dom";
import {
  ChefHat,
  Lightbulb,
  Utensils,
  Heart,
  Wallet,
  Clock,
} from "lucide-react";

const steps = [
  {
    icon: "🥫",
    title: "Tell us what you have",
    desc: "Type a few ingredients from your fridge or pantry. That's it.",
  },
  {
    icon: "🍽️",
    title: "Get 2–3 meal ideas",
    desc: "Simple, budget-friendly meals you can actually make right now.",
  },
  {
    icon: "💡",
    title: "Learn why it's better",
    desc: "A quick, plain-language explanation — no jargon, no guilt.",
  },
];

const differentiators = [
  {
    icon: <Wallet className="h-6 w-6" />,
    title: "Budget-first",
    desc: "Every suggestion uses what you already have. No fancy grocery runs.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Low effort",
    desc: "No calorie counting, no meal plans. Just one better choice at a time.",
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Actually teaches you",
    desc: "Each meal comes with a bite-sized tip so you learn as you go.",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Zero judgment",
    desc: "We're not here to lecture. We're here to help you feel good about your food.",
  },
];

const Index = () => {
  return (
    <div className="flex flex-col">
      <section className="bg-orange-50 py-20 md:py-28">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <span className="mb-4 inline-block text-5xl">🍊</span>

          <h1 className="mb-6 text-3xl font-extrabold leading-tight text-stone-900 md:text-5xl">
            One tap to pick a better meal that still fits your{" "}
            <span className="text-orange-600">budget</span>,{" "}
            <span className="text-emerald-600">schedule</span>, and{" "}
            <span className="text-stone-700">cravings</span>.
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-lg text-stone-600">
            Tell us what's in your fridge and we'll suggest easy meals in plain
            language — no calorie counting, no diet rules, no judgment. Just
            better options.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/try-it"
              className="inline-flex items-center gap-2 rounded-2xl bg-orange-600 px-6 py-4 text-white shadow-sm transition hover:bg-orange-700"
            >
              <ChefHat className="h-5 w-5" />
              What can I eat with what's in my fridge?
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex items-center rounded-2xl border border-orange-200 bg-white px-5 py-4 text-stone-800 transition hover:bg-orange-100"
            >
              See how it works ↓
            </a>
          </div>

          <p className="mt-6 text-sm text-stone-500">
            100% free · No sign-up needed · Made by students, for students
          </p>
        </div>
      </section>

      <section id="how-it-works" className="py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-12 text-center text-2xl font-bold text-stone-900 md:text-3xl">
            Three steps. That's all.
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-xl border border-stone-200 bg-white p-6 text-center shadow-sm"
              >
                <span className="mb-4 inline-block text-4xl">{step.icon}</span>
                <h3 className="mb-2 text-lg font-bold text-stone-900">
                  {step.title}
                </h3>
                <p className="text-sm text-stone-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-center text-2xl font-bold text-stone-900 md:text-3xl">
            Why Hi! Eats is different
          </h2>

          <p className="mx-auto mb-12 max-w-lg text-center text-stone-600">
            We're not another calorie tracker or recipe database. We're a
            friendly food-decision coach.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {differentiators.map((d) => (
              <div
                key={d.title}
                className="flex gap-4 rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
                  {d.icon}
                </div>
                <div>
                  <h3 className="mb-1 font-bold text-stone-900">{d.title}</h3>
                  <p className="text-sm text-stone-600">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center md:py-24">
        <div className="container mx-auto max-w-2xl px-4">
          <Utensils className="mx-auto mb-4 h-10 w-10 text-orange-600" />
          <h2 className="mb-4 text-2xl font-bold text-stone-900 md:text-3xl">
            Ready to eat a little better?
          </h2>
          <p className="mb-8 text-stone-600">
            It starts with what's already in your kitchen.
          </p>

          <Link
            to="/try-it"
            className="inline-flex items-center gap-2 rounded-2xl bg-orange-600 px-6 py-4 text-white shadow-sm transition hover:bg-orange-700"
          >
            <ChefHat className="h-5 w-5" />
            Let's find a meal
          </Link>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-stone-50 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-stone-500">
          <p>🍊 Hi! Eats — A college entrepreneurship project</p>
          <p className="mt-1">
            Made with care for students who want to eat better without the hassle.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;