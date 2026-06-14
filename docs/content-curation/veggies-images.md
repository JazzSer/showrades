# Veggies Category — Image Sourcing Summary

Real-world photographic images sourced for the "Veggies" charades category (the 15 words live in
`lib/data/words.ts`). All sources are Pexels (Pexels License — free for commercial and personal
use, no attribution required).

Direct image URLs use the standard Pexels CDN pattern
(`https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?auto=compress&cs=tinysrgb&w=800`),
sized for a game card (w=800).

| Word | Image URL | Source Page | License |
| :--- | :--- | :--- | :--- |
| Carrot | https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/heap-of-carrots-143133/ | Pexels License |
| Broccoli | https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/broccoli-vegetable-food-healthy-47347/ | Pexels License |
| Potato | https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/potatoes-vegetables-erdfrucht-bio-144248/ | Pexels License |
| Corn | https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/yellow-corn-on-brown-wooden-surface-2252584/ | Pexels License |
| Pumpkin * | https://images.pexels.com/photos/18967728/pexels-photo-18967728.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/pumpkin-and-fallen-leaves-18967728/ | Pexels License |
| Mushroom * | https://images.pexels.com/photos/1643394/pexels-photo-1643394.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/macro-photo-of-mushroom-1643394/ | Pexels License |
| Onion | https://images.pexels.com/photos/175415/pexels-photo-175415.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/onion-vegetable-food-healthy-175415/ | Pexels License |
| Pepper | https://images.pexels.com/photos/128536/pexels-photo-128536.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/three-assorted-color-bell-peppers-128536/ | Pexels License |
| Tomato | https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/red-tomatoes-533280/ | Pexels License |
| Pea | https://images.pexels.com/photos/255469/pexels-photo-255469.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/green-peas-in-pod-255469/ | Pexels License |
| Cucumber | https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/sliced-cucumber-on-white-background-2329440/ | Pexels License |
| Lettuce | https://images.pexels.com/photos/1352247/pexels-photo-1352247.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/green-lettuce-1352247/ | Pexels License |
| Garlic | https://images.pexels.com/photos/928251/pexels-photo-928251.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/garlic-bulb-and-cloves-928251/ | Pexels License |
| Eggplant | https://images.pexels.com/photos/321551/pexels-photo-321551.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/eggplants-on-display-321551/ | Pexels License |
| Sweet Potato | https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/sweet-potatoes-on-brown-wooden-surface-2294471/ | Pexels License |

`*` = original predicted IDs returned 404 (Mushroom) or duplicated another category's photo
(Pumpkin previously shared ID 1414130 with Fruits/Lemon) and were replaced with freshly-sourced,
verified Pexels photos.

## Notes

- All 15 `imageUrl`s have been verified to return HTTP 200 (checked 2026-06-14).
- All images are standard Pexels stock photos under the Pexels License (free for
  commercial/personal use, no attribution required) — single clear subject (the vegetable,
  whole or cut), kid-friendly, no people/branding/watermarks.
- No images were downloaded; only direct CDN URLs and source page URLs were recorded.
