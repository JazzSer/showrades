# Fruits Category — Image Sourcing Summary

Real-world photographic images sourced for the "Fruits" charades category (the 16 words live in
`lib/data/words.ts`). All sources are Pexels (Pexels License — free for commercial and personal
use, no attribution required).

Direct image URLs use the standard Pexels CDN pattern
(`https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?auto=compress&cs=tinysrgb&w=800`),
sized for a game card (w=800). Where possible, fruits that show their interior when cut
(e.g. watermelon, mango, kiwi, lemon, orange) were chosen to make Picture Charades clearer.

| Word | Image URL | Source Page | License |
| :--- | :--- | :--- | :--- |
| Pineapple | https://images.pexels.com/photos/947879/pexels-photo-947879.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/sliced-pineapple-fruit-947879/ | Pexels License |
| Banana | https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/yellow-banana-fruit-2872755/ | Pexels License |
| Watermelon | https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/sliced-watermelon-fruit-1313267/ | Pexels License |
| Strawberry | https://images.pexels.com/photos/1207918/pexels-photo-1207918.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/red-strawberries-1207918/ | Pexels License |
| Grapes | https://images.pexels.com/photos/23042/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/green-grapes-23042/ | Pexels License |
| Cherry | https://images.pexels.com/photos/2230738/pexels-photo-2230738.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/red-cherries-2230738/ | Pexels License |
| Mango | https://images.pexels.com/photos/918643/pexels-photo-918643.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/sliced-mango-fruit-918643/ | Pexels License |
| Peach | https://images.pexels.com/photos/1141795/pexels-photo-1141795.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/close-up-photo-of-peach-fruit-1141795/ | Pexels License |
| Lemon | https://images.pexels.com/photos/1414130/pexels-photo-1414130.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/photo-of-sliced-kiwi-lemon-and-orange-fruits-1414130/ | Pexels License |
| Coconut | https://images.pexels.com/photos/1652299/pexels-photo-1652299.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/coconut-fruit-1652299/ | Pexels License |
| Apple | https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/red-apple-fruit-102104/ | Pexels License |
| Blueberry | https://images.pexels.com/photos/1395958/pexels-photo-1395958.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/blueberries-in-bowl-1395958/ | Pexels License |
| Kiwi | https://images.pexels.com/photos/5876005/pexels-photo-5876005.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/sliced-of-kiwi-fruit-on-white-background-5876005/ | Pexels License |
| Avocado | https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/avocado-fruit-on-brown-wooden-table-557659/ | Pexels License |
| Orange | https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/sliced-orange-fruit-161559/ | Pexels License |
| Pear | https://images.pexels.com/photos/11170935/pexels-photo-11170935.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/pear-fruits-on-brown-wooden-table-11170935/ | Pexels License |

## Notes

- All 16 `imageUrl`s have been verified to return HTTP 200 (checked 2026-06-14).
- Two of the predicted IDs were stale and have been replaced with freshly-sourced, verified
  Pexels photos: Kiwi (was 51312 → now 5876005, sliced kiwi on white background) and Pear
  (was 2872899 → now 11170935, whole pears on a wooden table).
- Lemon (1414130, "Sliced Kiwi, Lemon, and Orange Fruits") and Pumpkin in
  `veggies-images.json` previously shared the same photo ID by mistake. Lemon keeps 1414130
  (it's a valid, verified lemon photo); Pumpkin has been re-sourced to a dedicated pumpkin
  photo (see `veggies-images.md`).
- No images were downloaded; only direct CDN URLs and source page URLs were recorded.
- `lib/data/words.ts` was not modified here — wiring these into a `FRUIT_IMAGES` map
  (mirroring `ANIMAL_IMAGES`) is the SR-057 follow-up step.
