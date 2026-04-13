import { Clock3, Sparkles, WalletCards } from "lucide-react";
import type { Recommendation } from "../lib/recipeEngine";

type Props = {
  recipe: Recommendation;
  index: number;
};

export const RecipeCard = ({ recipe, index }: Props) => {
  return (
    <article className="group rounded-3xl border border-orange-100 bg-white/90 p-5 shadow-[0_10px_40px_rgba(99,61,20,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(99,61,20,0.12)]">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-orange-700">
            Pick {index + 1}
          </div>
          <h3 className="text-xl font-bold tracking-tight text-stone-900">
            {recipe.title}
          </h3>
          <p className="mt-1 text-sm text-stone-500">{recipe.cuisine}</p>
        </div>
        <div className="rounded-2xl bg-stone-900 px-3 py-2 text-sm font-semibold text-white">
          {recipe.costLabel}
        </div>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-orange-50 p-3 text-sm text-stone-700">
          <div className="mb-1 flex items-center gap-2 font-semibold text-stone-900">
            <Clock3 className="h-4 w-4 text-orange-600" />
            Time
          </div>
          <p>{recipe.time} min</p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-3 text-sm text-stone-700">
          <div className="mb-1 flex items-center gap-2 font-semibold text-stone-900">
            <WalletCards className="h-4 w-4 text-emerald-600" />
            Why it fits
          </div>
          <p>{recipe.why}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-900">
          <Sparkles className="h-4 w-4 text-orange-500" />
          Uses from your kitchen
        </div>
        <div className="flex flex-wrap gap-2">
          {recipe.matchedIngredients.map((item) => (
            <span
              key={item}
              className="rounded-full bg-stone-100 px-3 py-1.5 text-sm text-stone-700"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="mb-2 text-sm font-semibold text-stone-900">
          Method
        </div>
        <p className="text-sm leading-7 text-stone-600">{recipe.method}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {recipe.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
};

export default RecipeCard;