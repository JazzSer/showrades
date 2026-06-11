import { Category, CategoryKey } from "@/lib/game/types";

export const CATEGORIES: Record<CategoryKey, Category> = {
  animals: { key: "animals", name: "Animals", emoji: "🐾", color: "mint" },
  food: { key: "food", name: "Food", emoji: "🍎", color: "sun" },
  fruits: { key: "fruits", name: "Fruits", emoji: "🍊", color: "coral" },
  jobs: { key: "jobs", name: "Jobs", emoji: "🧑‍⚕️", color: "sky" },
  veggies: { key: "veggies", name: "Veggies", emoji: "🥦", color: "plum" },
  sports: { key: "sports", name: "Sports", emoji: "⚽", color: "sky" },
};
