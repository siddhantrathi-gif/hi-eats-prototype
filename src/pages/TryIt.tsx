import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChefHat, Sparkles } from "lucide-react";

type Item = {
  id: string;
  label: string;
  emoji: string;
  helper?: string;
};

const ingredientOptions: Item[] = [
  { id: "egg", label: "Eggs", emoji: "🥚" },
  { id: "cheese", label: "Cheese", emoji: "🧀" },
  { id: "butter", label: "Butter", emoji: "🧈" },
  { id: "milk", label: "Milk", emoji: "🥛" },
  { id: "bread", label: "Bread", emoji: "🍞" },
  { id: "rice", label: "Rice", emoji: "🍚" },
  { id: "pasta", label: "Pasta", emoji: "🍝" },
  { id: "tortilla", label: "Tortilla", emoji: "🌯" },
  { id: "chicken", label: "Chicken", emoji: "🍗" },
  { id: "tofu", label: "Tofu", emoji: "⬜" },
  { id: "spinach", label: "Spinach", emoji: "🥬" },
  { id: "broccoli", label: "Broccoli", emoji: "🥦" },
  { id: "tomato", label: "Tomato", emoji: "🍅" },
  { id: "onion", label: "Onion", emoji: "🧅" },
  { id: "mushroom", label: "Mushroom", emoji: "🍄" },
  { id: "potato", label: "Potato", emoji: "🥔" },
  { id: "beans", label: "Beans", emoji: "🫘" },
  { id: "yogurt", label: "Yogurt", emoji: "🥣" },
  { id: "lemon", label: "Lemon", emoji: "🍋" },
  { id: "garlic", label: "Garlic", emoji: "🧄" },
];

const equipmentOptions: Item[] = [
  { id: "stove", label: "Stove", emoji: "🔥" },
  { id: "oven", label: "Oven", emoji: "🫓" },
  { id: "microwave", label: "Microwave", emoji: "📦" },
  { id: "airfryer", label: "Air fryer", emoji: "🍟" },
  { id: "blender", label: "Blender", emoji: "🥤" },
  { id: "pot", label: "Pot", emoji: "🍲" },
  { id: "pan", label: "Pan", emoji: "🍳" },
  { id: "knife", label: "Knife", emoji: "🔪" },
  { id: "bakingtray", label: "Baking tray", emoji: "🧁" },
  { id: "toaster", label: "Toaster", emoji: "🍞" },
];

const constraintOptions: Item[] = [
  { id: "quick", label: "Quick", emoji: "⚡", helper: "Under about 15–20 min" },
  { id: "low-effort", label: "Low effort", emoji: "🛋️", helper: "Very little prep" },
  { id: "high-protein", label: "High protein", emoji: "💪", helper: "More filling" },
  { id: "green-heavy", label: "Green-heavy", emoji: "🥗", helper: "Veg-forward" },
  { id: "cheap", label: "Budget-friendly", emoji: "💸", helper: "Uses what you have" },
  { id: "comfort", label: "Comfort food", emoji: "🍲", helper: "Warm and satisfying" },
  { id: "vegetarian", label: "Vegetarian", emoji: "🌱", helper: "No meat" },
  { id: "meal-prep", label: "Meal prep", emoji: "📦", helper: "Good leftovers" },
];

const steps = [
  { key: "ingredients", title: "What ingredients do you have?", subtitle: "Tap everything that’s in your kitchen right now." },
  { key: "equipment", title: "What can you cook with?", subtitle: "Pick the tools and appliances you actually have access to." },
  { key: "constraints", title: "What matters most today?", subtitle: "Choose the kind of meal you want right now." },
  { key: "review", title: "Ready to generate", subtitle: "Here’s what we’ll send to the recipe brain later." },
] as const;

const SelectionCard = ({
  item,
  selected,
  onToggle,
}: {
  item: Item;
  selected: boolean;
  onToggle: (id: string) => void;
}) => {
  return (
    <button
      type="button"
      onClick={() => onToggle(item.id)}
      className={`relative rounded-3xl border p-4 text-left transition-all duration-200 ${
        selected
          ? "border-orange-500 bg-orange-50 shadow-md shadow-orange-100"
          : "border-stone-200 bg-white hover:border-orange-200 hover:bg-orange-50/40"
      }`}
    >
      <div className="mb-3 text-4xl">{item.emoji}</div>
      <div className="text-base font-semibold text-stone-900">{item.label}</div>
      {item.helper ? (
        <div className="mt-1 text-sm leading-5 text-stone-500">{item.helper}</div>
      ) : null}
      {selected ? (
        <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-white">
          <Check className="h-4 w-4" />
        </div>
      ) : null}
    </button>
  );
};

const TryIt = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(["stove", "pan"]);
  const [selectedConstraints, setSelectedConstraints] = useState<string[]>(["quick"]);

  const currentStep = steps[stepIndex];

  const toggleSelection = (
    value: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const ingredientLabels = useMemo(
    () =>
      ingredientOptions
        .filter((item) => selectedIngredients.includes(item.id))
        .map((item) => `${item.emoji} ${item.label}`),
    [selectedIngredients]
  );

  const equipmentLabels = useMemo(
    () =>
      equipmentOptions
        .filter((item) => selectedEquipment.includes(item.id))
        .map((item) => `${item.emoji} ${item.label}`),
    [selectedEquipment]
  );

  const constraintLabels = useMemo(
    () =>
      constraintOptions
        .filter((item) => selectedConstraints.includes(item.id))
        .map((item) => `${item.emoji} ${item.label}`),
    [selectedConstraints]
  );

  const canGoNext =
    (stepIndex === 0 && selectedIngredients.length > 0) ||
    (stepIndex === 1 && selectedEquipment.length > 0) ||
    (stepIndex === 2 && selectedConstraints.length > 0) ||
    stepIndex === 3;

  return (
    <div className="min-h-screen bg-[#fffaf4] text-stone-900">
      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">
              <ChefHat className="h-4 w-4" />
              Hi! Eats
            </div>
            <h1 className="text-3xl font-black tracking-tight md:text-5xl">
              Build your meal in three quick steps
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">
              First choose ingredients, then equipment, then what kind of meal you want.
              Later, this same data can be sent straight to your backend recipe engine.
            </p>
          </div>
        </div>

        <div className="mb-8 grid gap-3 md:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.key}
              className={`rounded-2xl border px-4 py-3 ${
                index === stepIndex
                  ? "border-orange-500 bg-orange-50"
                  : index < stepIndex
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-stone-200 bg-white"
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                Step {index + 1}
              </div>
              <div className="mt-1 font-semibold text-stone-900">{step.title}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">
                Step {stepIndex + 1}
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight md:text-4xl">
                {currentStep.title}
              </h2>
              <p className="mt-2 text-stone-600">{currentStep.subtitle}</p>
            </div>

            {stepIndex === 0 && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {ingredientOptions.map((item) => (
                  <SelectionCard
                    key={item.id}
                    item={item}
                    selected={selectedIngredients.includes(item.id)}
                    onToggle={() =>
                      toggleSelection(item.id, selectedIngredients, setSelectedIngredients)
                    }
                  />
                ))}
              </div>
            )}

            {stepIndex === 1 && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {equipmentOptions.map((item) => (
                  <SelectionCard
                    key={item.id}
                    item={item}
                    selected={selectedEquipment.includes(item.id)}
                    onToggle={() =>
                      toggleSelection(item.id, selectedEquipment, setSelectedEquipment)
                    }
                  />
                ))}
              </div>
            )}

            {stepIndex === 2 && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {constraintOptions.map((item) => (
                  <SelectionCard
                    key={item.id}
                    item={item}
                    selected={selectedConstraints.includes(item.id)}
                    onToggle={() =>
                      toggleSelection(item.id, selectedConstraints, setSelectedConstraints)
                    }
                  />
                ))}
              </div>
            )}

            {stepIndex === 3 && (
              <div className="space-y-6">
                <div className="rounded-3xl bg-orange-50 p-5">
                  <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-orange-700">
                    Ingredients selected
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ingredientLabels.length ? (
                      ingredientLabels.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-white px-3 py-1.5 text-sm text-stone-700"
                        >
                          {item}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-stone-500">None selected yet.</p>
                    )}
                  </div>
                </div>

                <div className="rounded-3xl bg-emerald-50 p-5">
                  <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
                    Equipment selected
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {equipmentLabels.length ? (
                      equipmentLabels.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-white px-3 py-1.5 text-sm text-stone-700"
                        >
                          {item}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-stone-500">None selected yet.</p>
                    )}
                  </div>
                </div>

                <div className="rounded-3xl bg-stone-100 p-5">
                  <div className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-stone-700">
                    Constraints selected
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {constraintLabels.length ? (
                      constraintLabels.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-white px-3 py-1.5 text-sm text-stone-700"
                        >
                          {item}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-stone-500">None selected yet.</p>
                    )}
                  </div>
                </div>

                <div className="rounded-3xl border border-dashed border-orange-300 bg-white p-5">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-orange-700">
                    <Sparkles className="h-4 w-4" />
                    What would happen next
                  </div>
                  <p className="leading-7 text-stone-600">
                    Later, this exact selection bundle can be posted to your backend AI route
                    to generate 2–3 customized recipe ideas.
                  </p>
                  <pre className="mt-4 overflow-x-auto rounded-2xl bg-stone-900 p-4 text-xs text-stone-100">
{`{
  "ingredients": ${JSON.stringify(selectedIngredients, null, 2)},
  "equipment": ${JSON.stringify(selectedEquipment, null, 2)},
  "constraints": ${JSON.stringify(selectedConstraints, null, 2)}
}`}
                  </pre>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                disabled={stepIndex === 0}
                className="inline-flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-5 py-3 text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>

              {stepIndex < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => canGoNext && setStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
                  disabled={!canGoNext}
                  className="inline-flex items-center gap-2 rounded-2xl bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-orange-300"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-2xl bg-stone-900 px-6 py-3 font-semibold text-white"
                >
                  Generate my recipe
                  <Sparkles className="h-4 w-4" />
                </button>
              )}
            </div>
          </section>

          <aside className="h-fit rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
              Live summary
            </div>
            <h3 className="mt-2 text-2xl font-black tracking-tight text-stone-900">
              Your cooking setup
            </h3>
            <p className="mt-2 text-stone-600">
              This panel helps users see what they’ve picked before the final generation step.
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <div className="mb-2 text-sm font-semibold text-stone-900">
                  Ingredients ({selectedIngredients.length})
                </div>
                <div className="flex flex-wrap gap-2">
                  {ingredientLabels.length ? (
                    ingredientLabels.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-orange-50 px-3 py-1.5 text-sm text-stone-700"
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-stone-400">Nothing selected yet</span>
                  )}
                </div>
              </div>

              <div>
                <div className="mb-2 text-sm font-semibold text-stone-900">
                  Equipment ({selectedEquipment.length})
                </div>
                <div className="flex flex-wrap gap-2">
                  {equipmentLabels.length ? (
                    equipmentLabels.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm text-stone-700"
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-stone-400">Nothing selected yet</span>
                  )}
                </div>
              </div>

              <div>
                <div className="mb-2 text-sm font-semibold text-stone-900">
                  Constraints ({selectedConstraints.length})
                </div>
                <div className="flex flex-wrap gap-2">
                  {constraintLabels.length ? (
                    constraintLabels.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-stone-100 px-3 py-1.5 text-sm text-stone-700"
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-stone-400">Nothing selected yet</span>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TryIt;