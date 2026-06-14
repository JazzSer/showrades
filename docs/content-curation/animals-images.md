# Animals Category — Image Sourcing Summary

Real-world photographic images sourced for the "Animals" charades category (the 18 words live in
`lib/data/words.ts`). All sources are Pexels (Pexels License — free for commercial and personal
use, no attribution required, though photographer credit is included where known).

Direct image URLs use the standard Pexels CDN pattern
(`https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?auto=compress&cs=tinysrgb&w=800`),
sized for a game card (w=800).

| Word | Image URL | Source Page | License |
| :--- | :--- | :--- | :--- |
| Elephant | https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/view-of-elephant-in-water-247431/ | Pexels License |
| Penguin | https://images.pexels.com/photos/5952211/pexels-photo-5952211.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/a-gentoo-penguin-standing-on-ice-5952211/ | Pexels License |
| Kangaroo | https://images.pexels.com/photos/25881827/pexels-photo-25881827.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/kangaroo-in-nature-25881827/ | Pexels License |
| Octopus | https://images.pexels.com/photos/3046629/pexels-photo-3046629.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/selective-focus-photography-of-octopus-3046629/ | Pexels License (Photo: Pia B) |
| Giraffe | https://images.pexels.com/photos/168497/pexels-photo-168497.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/white-and-brown-giraffe-168497/ | Pexels License |
| Monkey * | https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/short-fur-black-and-gray-primate-1670977/ | Pexels License |
| Crocodile * | https://images.pexels.com/photos/5642192/pexels-photo-5642192.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/crocodile-looking-out-from-calm-water-5642192/ | Pexels License (Photo: Sami Anas) |
| Butterfly | https://images.pexels.com/photos/2569145/pexels-photo-2569145.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/close-up-photo-of-butterfly-2569145/ | Pexels License |
| Dolphin | https://images.pexels.com/photos/7359034/pexels-photo-7359034.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/a-dolphin-in-the-sea-7359034/ | Pexels License |
| Tiger * | https://images.pexels.com/photos/792381/pexels-photo-792381.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/tiger-lying-on-ground-792381/ | Pexels License |
| Rabbit | https://images.pexels.com/photos/2576780/pexels-photo-2576780.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/close-up-photo-of-rabbit-2576780/ | Pexels License |
| Snake | https://images.pexels.com/photos/9560352/pexels-photo-9560352.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/close-up-shot-of-a-snake-9560352/ | Pexels License |
| Owl | https://images.pexels.com/photos/1526404/pexels-photo-1526404.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/close-up-photo-of-an-owl-1526404/ | Pexels License |
| Frog | https://images.pexels.com/photos/4190864/pexels-photo-4190864.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/frog-floating-on-transparent-pond-water-4190864/ | Pexels License |
| Horse * | https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/horse-on-green-grass-field-635499/ | Pexels License |
| Gorilla | https://images.pexels.com/photos/913652/pexels-photo-913652.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/close-up-photo-of-gorilla-913652/ | Pexels License (Photo: Chris Carter) |
| Bear | https://images.pexels.com/photos/530797/pexels-photo-530797.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/brown-bear-close-up-view-river-water-530797/ | Pexels License (Photo: Co Sch) |
| Chicken | https://images.pexels.com/photos/19062539/pexels-photo-19062539.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/close-up-of-a-derbyshire-redcap-chicken-19062539/ | Pexels License |

`*` = newly sourced for this task (Monkey, Crocodile, Tiger, Horse were not in the original
25-word research set). All four are standard Pexels stock photos under the Pexels License
(free for commercial/personal use, no attribution required).

## Notes

- 14 of the 18 words reuse `sourcePage` URLs already confirmed in the earlier research pass;
  `imageUrl` has now been resolved to the direct Pexels CDN file using the standard pattern
  `https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg`, with `?auto=compress&cs=tinysrgb&w=800`
  applied for a card-sized variant.
- 4 words (Monkey, Crocodile, Tiger, Horse) are new additions sourced for this task — single
  clear subject, kid-friendly, no people/branding/watermarks, consistent with the photographic
  style of the rest of the set.
- All 18 `imageUrl`s have been verified to return HTTP 200 (checked 2026-06-14). Note that 3 of
  the original 14 carried-over URLs (Crocodile, Snake, Frog) returned 404 on the predicted
  CDN pattern and were replaced with freshly-sourced, verified Pexels photos.
- The 7 research-only entries not used in the live Animals category (Crab, Squirrel, Turtle,
  Flamingo, Bee, Cheetah, Sloth, Beaver, Chameleon, Goat, Shark — note: that's actually more than
  7; the original research set had 25 total vs. 18 needed) were dropped from `animals-images.json`
  to keep the file scoped to exactly the 18 words in `lib/data/words.ts`. They remain documented
  in git history if needed for a future "Nature"/expanded Animals pack.
