export type IngredientCategory =
  | "protein"
  | "vegetable"
  | "carb"
  | "dairy"
  | "fat"
  | "sauce"
  | "spice"
  | "aromatic"
  | "fruit"
  | "other";

export type Ingredient = {
  raw: string;
  normalized: string;
  category: IngredientCategory;
  staple: boolean;
};

export type RecipeTemplate = {
  id: string;
  title: string;
  cuisine: string;
  baseTime: number;
  cost: 1 | 2 | 3;
  difficulty: "easy" | "medium";
  tags: string[];
  requiredAnyOf: string[];
  preferred: string[];
  pantryDefaults: string[];
  method: string;
  nutritionAngle: string;
};

export type Recommendation = {
  id: string;
  title: string;
  score: number;
  time: number;
  costLabel: string;
  matchedIngredients: string[];
  missingIngredients: string[];
  why: string;
  method: string;
  cuisine: string;
  tags: string[];
};

const aliasMap: Record<string, string> = {
  eggs: "egg",
  tomatoes: "tomato",
  potatoes: "potato",
  onions: "onion",
  scallions: "green onion",
  spring_onion: "green onion",
  green_onions: "green onion",
  chickpeas: "chickpea",
  garbanzo: "chickpea",
  garbanzo_beans: "chickpea",
  beans: "bean",
  lentils: "lentil",
  peppers: "pepper",
  bell_peppers: "pepper",
  spinach_leaves: "spinach",
  mushrooms: "mushroom",
  noodles: "noodle",
  pastas: "pasta",
  yogurts: "yogurt",
  greek_yogurt: "yogurt",
  shredded_cheese: "cheese",
  mozzarella: "cheese",
  cheddar: "cheese",
  tortillas: "tortilla",
  wraps: "tortilla",
  breads: "bread",
  rice_noodles: "noodle",
  soy_sauce: "soy sauce",
  hot_sauce: "chili sauce",
  garlic_cloves: "garlic",
};

const pantryStaples = new Set([
  "salt",
  "pepper",
  "oil",
  "olive oil",
  "butter",
  "water",
  "garlic",
  "onion",
  "soy sauce",
  "vinegar",
  "lemon",
  "lime",
  "sugar",
  "flour",
  "rice",
  "pasta",
  "bread",
  "tortilla",
  "cumin",
  "paprika",
  "oregano",
  "chili flakes",
  "chili sauce",
]);

const categoryMap: Record<string, IngredientCategory> = {
  egg: "protein",
  tofu: "protein",
  chickpea: "protein",
  lentil: "protein",
  bean: "protein",
  chicken: "protein",
  tuna: "protein",
  yogurt: "dairy",
  cheese: "dairy",
  milk: "dairy",
  spinach: "vegetable",
  tomato: "vegetable",
  onion: "aromatic",
  garlic: "aromatic",
  "green onion": "aromatic",
  mushroom: "vegetable",
  pepper: "vegetable",
  broccoli: "vegetable",
  carrot: "vegetable",
  cucumber: "vegetable",
  potato: "carb",
  rice: "carb",
  pasta: "carb",
  noodle: "carb",
  tortilla: "carb",
  bread: "carb",
  oats: "carb",
  avocado: "fat",
  "peanut butter": "fat",
  "olive oil": "fat",
  butter: "fat",
  "soy sauce": "sauce",
  "chili sauce": "sauce",
  salsa: "sauce",
  pesto: "sauce",
  lemon: "fruit",
  lime: "fruit",
  apple: "fruit",
  banana: "fruit",
};

export const recipeTemplates: RecipeTemplate[] = [
  {
    id: "fried-rice",
    title: "Loaded fridge fried rice",
    cuisine: "Asian-inspired",
    baseTime: 15,
    cost: 1,
    difficulty: "easy",
    tags: ["one-pan", "high-utility", "great leftovers"],
    requiredAnyOf: ["rice"],
    preferred: [
      "egg",
      "onion",
      "garlic",
      "green onion",
      "carrot",
      "broccoli",
      "mushroom",
      "soy sauce",
      "tofu",
    ],
    pantryDefaults: ["oil", "salt"],
    method:
      "Cook aromatics, add chopped vegetables and protein, then stir-fry cold rice with soy sauce until everything gets a little crispy.",
    nutritionAngle: "Balances carbs with protein and vegetables in one bowl.",
  },
  {
    id: "scramble-wrap",
    title: "Savory veggie egg wrap",
    cuisine: "Student staple",
    baseTime: 10,
    cost: 1,
    difficulty: "easy",
    tags: ["fast", "breakfast-for-dinner", "portable"],
    requiredAnyOf: ["egg", "tortilla", "bread"],
    preferred: [
      "egg",
      "cheese",
      "spinach",
      "tomato",
      "onion",
      "pepper",
      "yogurt",
      "chili sauce",
    ],
    pantryDefaults: ["oil", "salt", "pepper"],
    method:
      "Soft-scramble eggs with vegetables, fold into a warm tortilla or toast, and finish with cheese or sauce.",
    nutritionAngle:
      "Quick protein with vegetables and a satisfying carb base.",
  },
  {
    id: "sheet-pan-bowl",
    title: "Roasted bowl with crispy chickpeas",
    cuisine: "Mediterranean-inspired",
    baseTime: 25,
    cost: 1,
    difficulty: "easy",
    tags: ["meal-prep", "budget", "fiber-rich"],
    requiredAnyOf: ["chickpea", "potato", "broccoli", "carrot"],
    preferred: [
      "chickpea",
      "potato",
      "broccoli",
      "carrot",
      "onion",
      "yogurt",
      "lemon",
      "spinach",
    ],
    pantryDefaults: ["oil", "salt", "paprika", "cumin"],
    method:
      "Roast vegetables and chickpeas until crisp, then pile into a bowl with a yogurt-lemon drizzle.",
    nutritionAngle:
      "High fiber and protein with a filling roasted texture.",
  },
  {
    id: "pasta-skillet",
    title: "Creamy tomato pantry pasta",
    cuisine: "Italian-inspired",
    baseTime: 18,
    cost: 1,
    difficulty: "easy",
    tags: ["comfort", "cheap", "crowd-pleaser"],
    requiredAnyOf: ["pasta"],
    preferred: [
      "pasta",
      "tomato",
      "garlic",
      "onion",
      "spinach",
      "cheese",
      "yogurt",
      "mushroom",
    ],
    pantryDefaults: ["oil", "salt", "oregano"],
    method:
      "Boil pasta, sauté aromatics, simmer tomatoes, then stir in greens and a creamy finish from cheese or yogurt.",
    nutritionAngle:
      "More balanced than plain pasta because it folds in vegetables and protein-rich dairy.",
  },
  {
    id: "tofu-noodle",
    title: "Saucy tofu noodle toss",
    cuisine: "Takeout-style",
    baseTime: 20,
    cost: 2,
    difficulty: "easy",
    tags: ["takeout-feel", "high-protein", "pantry-friendly"],
    requiredAnyOf: ["tofu", "noodle", "pasta"],
    preferred: [
      "tofu",
      "noodle",
      "broccoli",
      "mushroom",
      "garlic",
      "soy sauce",
      "chili sauce",
      "green onion",
    ],
    pantryDefaults: ["oil", "salt"],
    method:
      "Brown tofu, cook noodles, then coat everything in a quick soy-chili sauce with vegetables.",
    nutritionAngle:
      "Protein-forward and satisfying without needing a lot of ingredients.",
  },
  {
    id: "loaded-toast",
    title: "Loaded savory toast",
    cuisine: "Cafe-style",
    baseTime: 8,
    cost: 1,
    difficulty: "easy",
    tags: ["very fast", "snack or meal", "minimal cooking"],
    requiredAnyOf: ["bread"],
    preferred: ["bread", "egg", "avocado", "tomato", "cheese", "yogurt", "spinach"],
    pantryDefaults: ["salt", "pepper", "olive oil"],
    method:
      "Toast bread and layer with whatever combination of egg, vegetables, cheese, or avocado you have.",
    nutritionAngle: "Simple way to add protein and produce to a carb base.",
  },
  {
    id: "lentil-soup",
    title: "Fast lentil tomato soup",
    cuisine: "Cozy pantry meal",
    baseTime: 22,
    cost: 1,
    difficulty: "easy",
    tags: ["one-pot", "warming", "freezer-friendly"],
    requiredAnyOf: ["lentil", "bean"],
    preferred: [
      "lentil",
      "bean",
      "tomato",
      "onion",
      "garlic",
      "carrot",
      "spinach",
      "lemon",
    ],
    pantryDefaults: ["oil", "salt", "cumin"],
    method:
      "Simmer lentils with aromatics and tomato until soft, then finish with greens or lemon if you have them.",
    nutritionAngle: "Affordable plant protein with strong satiety.",
  },
  {
    id: "quesadilla",
    title: "Crispy fridge-cleanout quesadilla",
    cuisine: "Tex-Mex-inspired",
    baseTime: 12,
    cost: 1,
    difficulty: "easy",
    tags: ["crispy", "kid-friendly", "easy win"],
    requiredAnyOf: ["tortilla", "cheese"],
    preferred: [
      "tortilla",
      "cheese",
      "bean",
      "egg",
      "spinach",
      "tomato",
      "onion",
      "pepper",
      "salsa",
    ],
    pantryDefaults: ["oil"],
    method:
      "Toast tortillas with cheese and chopped fillings until crisp, then dip into salsa or yogurt.",
    nutritionAngle:
      "Turns random leftovers into a filling, protein-supported meal.",
  },
];

const normalize = (value: string) => {
  const cleaned = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z\\s]/g, " ")
    .replace(/\\s+/g, " ");
  const aliasKey = cleaned.replace(/\\s+/g, "_");
  return aliasMap[aliasKey] ?? aliasMap[cleaned] ?? cleaned;
};

export const parseIngredients = (input: string): Ingredient[] => {
  const tokens = input
    .split(/[\\n,]/)
    .map((item) => normalize(item))
    .filter(Boolean);

  return [...new Set(tokens)].map((normalized) => ({
    raw: normalized,
    normalized,
    category: categoryMap[normalized] ?? "other",
    staple: pantryStaples.has(normalized),
  }));
};

const costLabel = (cost: 1 | 2 | 3) =>
  cost === 1 ? "$" : cost === 2 ? "$$" : "$$$";

export const generateRecommendations = (
  ingredients: Ingredient[],
  recentRecipeIds: string[] = []
): Recommendation[] => {
  const names = ingredients.map((item) => item.normalized);

  const scored = recipeTemplates
    .map((recipe) => {
      const hasRequired = recipe.requiredAnyOf.some((item) =>
        names.includes(item)
      );
      if (!hasRequired) return null;

      const matchedIngredients = recipe.preferred.filter((item) =>
        names.includes(item)
      );
      const missingIngredients = recipe.preferred
        .filter((item) => !names.includes(item))
        .slice(0, 3);
      const coverage = matchedIngredients.length / recipe.preferred.length;
      const usesManyIngredientsBonus = matchedIngredients.length * 12;
      const coverageBonus = coverage * 35;
      const pantryPenalty =
        missingIngredients.filter((item) => !pantryStaples.has(item)).length * 6;
      const repeatPenalty = recentRecipeIds.includes(recipe.id) ? 24 : 0;
      const categorySpread = new Set(
        matchedIngredients.map((item) => categoryMap[item] ?? "other")
      ).size;
      const spreadBonus = categorySpread * 4;
      const score =
        40 +
        usesManyIngredientsBonus +
        coverageBonus +
        spreadBonus -
        pantryPenalty -
        repeatPenalty;

      const whyBits = [
        `Uses ${matchedIngredients.length} of your ingredients`,
        missingIngredients.length
          ? `only really needs ${missingIngredients.join(", ")}`
          : "needs almost nothing extra",
        recipe.nutritionAngle.toLowerCase(),
      ];

      return {
        id: recipe.id,
        title: recipe.title,
        score,
        time: recipe.baseTime + Math.max(0, 4 - matchedIngredients.length),
        costLabel: costLabel(recipe.cost),
        matchedIngredients,
        missingIngredients,
        why: whyBits.join(" · "),
        method: recipe.method,
        cuisine: recipe.cuisine,
        tags: recipe.tags,
      } satisfies Recommendation;
    })
    .filter((item): item is Recommendation => Boolean(item))
    .sort((a, b) => b.score - a.score);

  const final: Recommendation[] = [];
  const usedTitles = new Set<string>();

  for (const rec of scored) {
    if (usedTitles.has(rec.title)) continue;
    if (
      final.some(
        (existing) =>
          existing.cuisine === rec.cuisine && existing.score > rec.score - 10
      )
    )
      continue;
    final.push(rec);
    usedTitles.add(rec.title);
    if (final.length === 3) break;
  }

  return final.length ? final : scored.slice(0, 3);
};

