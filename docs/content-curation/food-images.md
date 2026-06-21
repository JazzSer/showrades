# Food Category — Image Sourcing Summary

Real-world photographic images sourced for the "Food" charades category (the 16 words live in
`lib/data/words.ts`). All sources are Pexels (Pexels License — free for commercial and personal
use, no attribution required, though photographer credit is included where known).

Direct image URLs use the standard Pexels CDN pattern
(`https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?auto=compress&cs=tinysrgb&w=800`),
sized for a game card (w=800).

| Word | Image URL | Source Page | License |
| :--- | :--- | :--- | :--- |
| Pizza | https://images.pexels.com/photos/2619970/pexels-photo-2619970.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/close-up-photo-of-pizza-2619970/ | Pexels License |
| Hamburger * | https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/cooked-burger-1639557/ | Pexels License |
| Spaghetti | https://images.pexels.com/photos/17499766/pexels-photo-17499766.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/spaghetti-with-sauce-on-the-plate-17499766/ | Pexels License (Photo: Luisa Bastidas) |
| Ice Cream | https://images.pexels.com/photos/1294943/pexels-photo-1294943.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/cream-ice-cream-in-cone-1294943/ | Pexels License |
| Pancake | https://images.pexels.com/photos/2280545/pexels-photo-2280545.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/close-up-photo-of-stacked-pancakes-2280545/ | Pexels License |
| Taco | https://images.pexels.com/photos/4958778/pexels-photo-4958778.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/a-person-holding-a-taco-4958778/ | Pexels License (Photo: ROMAN ODINTSOV) |
| Popcorn | https://images.pexels.com/photos/806880/pexels-photo-806880.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/close-up-photo-of-popcorn-806880/ | Pexels License |
| Sandwich | https://images.pexels.com/photos/14415398/pexels-photo-14415398.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/a-sandwich-on-a-plate-14415398/ | Pexels License |
| Donut | https://images.pexels.com/photos/11975889/pexels-photo-11975889.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/a-close-up-shot-of-a-delicious-donut-11975889/ | Pexels License |
| Hot Dog * | https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/hot-dog-with-toppings-1239291/ | Pexels License |
| Sushi * | https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/sushi-rolls-on-black-plate-2098085/ | Pexels License |
| Cupcake * | https://images.pexels.com/photos/264918/pexels-photo-264918.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/cupcake-with-sprinkles-on-top-264918/ | Pexels License |
| French Fries | https://images.pexels.com/photos/4109234/pexels-photo-4109234.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/close-up-photo-of-french-fries-4109234/ | Pexels License |
| Pretzel * | https://images.pexels.com/photos/8169248/pexels-photo-8169248.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/close-up-of-a-pretzel-8169248/ | Pexels License |
| Waffle * | https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/waffle-with-strawberries-and-syrup-1126359/ | Pexels License |
| Cookie * | https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/chocolate-chip-cookies-230325/ | Pexels License |

`*` = newly sourced for this task (Hamburger, Hot Dog, Sushi, Cupcake, Pretzel, Waffle, Cookie were
not in the original 25-item research set).

## Notes

- 9 of the 16 words reuse `sourcePage` URLs already present in the earlier research pass;
  `imageUrl` has been resolved to the direct Pexels CDN file using the standard pattern
  `https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg`, with
  `?auto=compress&cs=tinysrgb&w=800` applied for a card-sized variant.
- 7 words (Hamburger, Hot Dog, Sushi, Cupcake, Pretzel, Waffle, Cookie) are new additions sourced
  for this task — single clear subject, kid-friendly, no people/branding/watermarks, consistent
  with the photographic style of the rest of the set.
- 9 of the 25 research-only entries not used in the live Food category (Banana, Apple, Broccoli,
  Orange, Soup, Lemon, Watermelon, Carrot, Coconut, Honey, Peas, Cheese, Milk, Grapes, Strawberry,
  Cereal) were dropped from `food-images.json` to keep the file scoped to exactly the 16 words in
  `lib/data/words.ts`. They remain documented in git history if needed for a future "Nature" /
  expanded Fruits/Veggies pack.
- All 16 `imageUrl`s have been verified to return HTTP 200 (checked 2026-06-14). No replacements
  were needed for this category.
