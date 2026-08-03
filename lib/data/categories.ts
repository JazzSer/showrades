import { Category, CategoryKey } from "@/lib/game/types";

export const CATEGORIES: Record<CategoryKey, Category> = {
  animals: { key: "animals", name: "Animals", emoji: "🐾", color: "mint" },
  food: { key: "food", name: "Food", emoji: "🍎", color: "sun" },
  jobs: { key: "jobs", name: "Jobs", emoji: "🧑‍⚕️", color: "sky" },
  sports: { key: "sports", name: "Sports", emoji: "⚽", color: "coral" },
};
