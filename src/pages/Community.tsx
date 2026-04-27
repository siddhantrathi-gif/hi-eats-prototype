import { useMemo, useState } from "react";

type Recipe = {
  id: number;
  title: string;
  emoji: string;
  creator: string;
  description: string;
  time: string;
  calories: string;
  protein: string;
  tags: string[];
};

const recipes: Recipe[] = [
  {
    id: 1,
    title: "Peanut Butter Berry Protein Smoothie",
    emoji: "🥤",
    creator: "Hi! Eats Community",
    description: "Creamy, fruity, and filling for rushed mornings.",
    time: "5 min",
    calories: "340 cal",
    protein: "24g protein",
    tags: ["High Protein", "Quick", "Breakfast"],
  },
  {
    id: 2,
    title: "Mango Spinach Green Smoothie",
    emoji: "🥭",
    creator: "Creator-Inspired",
    description: "A tropical smoothie packed with greens and easy flavor.",
    time: "5 min",
    calories: "260 cal",
    protein: "11g protein",
    tags: ["Vegan", "Quick", "Breakfast"],
  },
  {
    id: 3,
    title: "Vanilla Cinnamon Overnight Oats",
    emoji: "🥣",
    creator: "Hi! Eats Community",
    description: "A simple meal-prep breakfast with warm cinnamon notes.",
    time: "10 min prep",
    calories: "300 cal",
    protein: "18g protein",
    tags: ["Meal Prep", "Budget", "Breakfast"],
  },
  {
    id: 4,
    title: "Berry Chia Yogurt Oat Jar",
    emoji: "🫐",
    creator: "Campus Favorites",
    description: "Creamy, layered, and perfect for grab-and-go mornings.",
    time: "10 min prep",
    calories: "320 cal",
    protein: "20g protein",
    tags: ["High Protein", "Meal Prep", "Breakfast"],
  },
  {
    id: 5,
    title: "Chickpea Crunch Wrap",
    emoji: "🌯",
    creator: "Hi! Eats Community",
    description: "A crunchy, creamy lunch wrap that feels easy and affordable.",
    time: "12 min",
    calories: "410 cal",
    protein: "17g protein",
    tags: ["Vegan", "Budget", "Quick"],
  },
  {
    id: 6,
    title: "Greek Yogurt Chickpea Wrap",
    emoji: "🥙",
    creator: "Creator-Inspired",
    description: "A high-protein wrap for quick lunches between classes.",
    time: "12 min",
    calories: "430 cal",
    protein: "22g protein",
    tags: ["High Protein", "Lunch", "Quick"],
  },
  {
    id: 7,
    title: "Sriracha Peanut Noodles",
    emoji: "🍜",
    creator: "Campus Favorites",
    description: "Comforting noodles with bold flavor and quick prep.",
    time: "15 min",
    calories: "470 cal",
    protein: "16g protein",
    tags: ["Budget", "Quick", "Dinner"],
  },
  {
    id: 8,
    title: "Veggie Fried Rice Bowl",
    emoji: "🍚",
    creator: "Hi! Eats Community",
    description: "A leftover-friendly rice bowl with colorful vegetables.",
    time: "18 min",
    calories: "420 cal",
    protein: "14g protein",
    tags: ["Budget", "Meal Prep", "Dinner"],
  },
  {
    id: 9,
    title: "Tofu Rice Power Bowl",
    emoji: "🥬",
    creator: "Plant-Powered Picks",
    description: "A satisfying bowl with tofu, rice, and a strong protein boost.",
    time: "25 min",
    calories: "460 cal",
    protein: "23g protein",
    tags: ["Vegan", "High Protein", "Meal Prep"],
  },
  {
    id: 10,
    title: "Chicken & Rainbow Veggie Sheet Pan",
    emoji: "🍗",
    creator: "Creator-Inspired",
    description: "Balanced, colorful, and easy to prep for multiple meals.",
    time: "30 min",
    calories: "490 cal",
    protein: "35g protein",
    tags: ["High Protein", "Meal Prep", "Dinner"],
  },
  {
    id: 11,
    title: "Lemon Garlic Chicken Rice Bowl",
    emoji: "🍋",
    creator: "Hi! Eats Community",
    description: "A bright chicken bowl that works well for lunch prep.",
    time: "28 min",
    calories: "510 cal",
    protein: "34g protein",
    tags: ["High Protein", "Budget", "Meal Prep"],
  },
  {
    id: 12,
    title: "Turkey Veggie Stir-Fry Bowl",
    emoji: "🥦",
    creator: "Campus Favorites",
    description: "Lean protein and crisp vegetables in a quick dinner bowl.",
    time: "20 min",
    calories: "440 cal",
    protein: "33g protein",
    tags: ["High Protein", "Quick", "Dinner"],
  },
  {
    id: 13,
    title: "Sweet Potato Black Bean Bowl",
    emoji: "🍠",
    creator: "Plant-Powered Picks",
    description: "Hearty, affordable, and packed with fiber-rich ingredients.",
    time: "25 min",
    calories: "430 cal",
    protein: "18g protein",
    tags: ["Vegan", "Budget", "Dinner"],
  },
  {
    id: 14,
    title: "Cottage Cheese Toast Trio",
    emoji: "🍞",
    creator: "Creator-Inspired",
    description: "Three easy toast ideas with a strong protein base.",
    time: "10 min",
    calories: "290 cal",
    protein: "21g protein",
    tags: ["High Protein", "Snack", "Quick"],
  },
  {
    id: 15,
    title: "Avocado Egg Breakfast Boats",
    emoji: "🥑",
    creator: "Campus Favorites",
    description: "A rich breakfast with simple ingredients and a polished feel.",
    time: "15 min",
    calories: "350 cal",
    protein: "19g protein",
    tags: ["Breakfast", "High Protein", "Quick"],
  },
  {
    id: 16,
    title: "Chia Pudding with Berries",
    emoji: "🍓",
    creator: "Hi! Eats Community",
    description: "A make-ahead snack with fruit and a light wholesome feel.",
    time: "8 min prep",
    calories: "250 cal",
    protein: "12g protein",
    tags: ["Meal Prep", "Snack", "Vegetarian"],
  },
  {
    id: 17,
    title: "Trail Mix Energy Bites",
    emoji: "🥜",
    creator: "Creator-Inspired",
    description: "No-bake bites for quick energy during busy days.",
    time: "12 min prep",
    calories: "210 cal",
    protein: "9g protein",
    tags: ["Snack", "Budget", "Meal Prep"],
  },
  {
    id: 18,
    title: "Pumpkin Oat Blender Waffles",
    emoji: "🧇",
    creator: "Seasonal Favorites",
    description: "A cozy breakfast with wholesome oats and warm spice flavor.",
    time: "20 min",
    calories: "360 cal",
    protein: "14g protein",
    tags: ["Breakfast", "Meal Prep", "Wholesome"],
  },
  {
    id: 19,
    title: "High Protein Garlic Naan Pocket",
    emoji: "🥪",
    creator: "Campus Favorites",
    description: "Comfort-food energy with a strong protein edge.",
    time: "14 min",
    calories: "450 cal",
    protein: "26g protein",
    tags: ["High Protein", "Quick", "Lunch"],
  },
  {
    id: 20,
    title: "Banana Almond Smoothie Bowl",
    emoji: "🍌",
    creator: "Creator-Inspired",
    description: "A thick smoothie bowl topped with fruit and crunch.",
    time: "8 min",
    calories: "380 cal",
    protein: "15g protein",
    tags: ["Breakfast", "Quick", "Vegetarian"],
  },
];

const filters = [
  { label: "All", emoji: "✨" },
  { label: "High Protein", emoji: "💪" },
  { label: "Budget", emoji: "💸" },
  { label: "Quick", emoji: "⚡" },
  { label: "Vegan", emoji: "🌱" },
  { label: "Meal Prep", emoji: "📦" },
  { label: "Breakfast", emoji: "☀️" },
  { label: "Lunch", emoji: "🥪" },
  { label: "Dinner", emoji: "🍽️" },
  { label: "Snack", emoji: "🍿" },
];

export default function Community() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filteredRecipes = useMemo(() => {
    const q = query.toLowerCase().trim();

    return recipes.filter((recipe) => {
      const matchesFilter =
        activeFilter === "All" || recipe.tags.includes(activeFilter);

      const matchesQuery =
        q === "" ||
        recipe.title.toLowerCase().includes(q) ||
        recipe.description.toLowerCase().includes(q) ||
        recipe.creator.toLowerCase().includes(q) ||
        recipe.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <section className="border-b border-stone-200 bg-gradient-to-br from-emerald-50 via-white to-orange-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <span className="inline-flex rounded-full border border-emerald-200 bg-white px-4 py-1 text-sm font-medium text-emerald-700">
            Community recipes preview 🥗
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
            Explore what the Hi! Eats community is cooking 🍽️
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-stone-600">
            Browse nutritious, creator-inspired ideas across smoothies, bowls, wraps,
            meal prep favorites, and quick student-friendly meals.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-white px-4 py-2 ring-1 ring-stone-200">20 featured cards ✨</span>
            <span className="rounded-full bg-white px-4 py-2 ring-1 ring-stone-200">Community + creator inspired 👩‍🍳</span>
            <span className="rounded-full bg-white px-4 py-2 ring-1 ring-stone-200">Nutrition-forward discovery 🥬</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Browse recipes 🔥</h2>
              <p className="mt-1 text-sm text-stone-600">
                A polished preview of how community discovery can feel inside Hi! Eats.
              </p>
            </div>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search smoothies, wraps, high protein, meal prep..."
              className="w-full max-w-xl rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter.label}
                type="button"
                onClick={() => setActiveFilter(filter.label)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeFilter === filter.label
                    ? "bg-emerald-600 text-white"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {filter.label} {filter.emoji}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <p className="mb-6 text-sm text-stone-500">
          Showing <span className="font-semibold text-stone-900">{filteredRecipes.length}</span> recipes 🍴
        </p>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <article
              key={recipe.id}
              className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="mt-4 text-xl font-semibold leading-tight">
                <span className="mr-2">{recipe.emoji}</span>
                {recipe.title}
              </h3>

              <p className="mt-2 text-sm font-medium text-stone-500">
                By {recipe.creator} 👩‍🍳
              </p>

              <p className="mt-3 text-sm leading-6 text-stone-600">{recipe.description}</p>

              <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-2xl bg-stone-50 px-3 py-3">
                  <p className="text-xs uppercase tracking-wide text-stone-400">Time</p>
                  <p className="mt-1 font-semibold text-stone-900">{recipe.time}</p>
                </div>
                <div className="rounded-2xl bg-stone-50 px-3 py-3">
                  <p className="text-xs uppercase tracking-wide text-stone-400">Calories</p>
                  <p className="mt-1 font-semibold text-stone-900">{recipe.calories}</p>
                </div>
                <div className="rounded-2xl bg-stone-50 px-3 py-3">
                  <p className="text-xs uppercase tracking-wide text-stone-400">Protein</p>
                  <p className="mt-1 font-semibold text-stone-900">{recipe.protein}</p>
                </div>
              </div>

              <button
                type="button"
                className="mt-5 w-full rounded-2xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                View recipe preview 🍽️
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}