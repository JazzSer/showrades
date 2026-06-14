# Sports Category — Image Sourcing Summary

Real-world photographic images sourced for the "Sports" charades category (the 16 words live in
`lib/data/words.ts`). All sources are Pexels (Pexels License — free for commercial and personal
use, no attribution required, though photographer credit is included where known).

Direct image URLs use the standard Pexels CDN pattern
(`https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?auto=compress&cs=tinysrgb&w=800`),
sized for a game card (w=800).

| Word | Image URL | Source Page | License |
| :--- | :--- | :--- | :--- |
| Soccer | https://images.pexels.com/photos/33618632/pexels-photo-33618632.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/children-playing-soccer-on-grass-field-outdoors-33618632/ | Pexels License |
| Basketball | https://images.pexels.com/photos/8337502/pexels-photo-8337502.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/kid-playing-basketball-on-the-court-8337502/ | Pexels License |
| Swimming | https://images.pexels.com/photos/12932198/pexels-photo-12932198.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/boy-wearing-cap-in-a-swimming-pool-12932198/ | Pexels License (Photo: Atlantic Ambience) |
| Tennis | https://images.pexels.com/photos/8224452/pexels-photo-8224452.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/girl-playing-tennis-8224452/ | Pexels License (Photo: RDNE Stock project) |
| Boxing | https://images.pexels.com/photos/4761658/pexels-photo-4761658.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/man-in-black-boxing-gloves-4761658/ | Pexels License (Photo: cottonbro studio) |
| Skiing | https://images.pexels.com/photos/5923340/pexels-photo-5923340.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/a-person-skiing-on-snow-covered-mountain-5923340/ | Pexels License |
| Surfing * | https://images.pexels.com/photos/1654498/pexels-photo-1654498.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/photo-of-person-surfing-1654498/ | Pexels License |
| Bowling | https://images.pexels.com/photos/7429509/pexels-photo-7429509.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/a-woman-holding-a-bowling-ball-7429509/ | Pexels License (Photo: Pavel Danilyuk) |
| Golf | https://images.pexels.com/photos/6256827/pexels-photo-6256827.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/a-man-holding-a-golf-club-6256827/ | Pexels License (Photo: cottonbro studio) |
| Karate | https://images.pexels.com/photos/15937433/pexels-photo-15937433.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/a-young-boy-in-a-red-belt-is-doing-a-kick-15937433/ | Pexels License |
| Cycling | https://images.pexels.com/photos/4715615/pexels-photo-4715615.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/little-boy-riding-bicycle-in-park-4715615/ | Pexels License |
| Baseball | https://images.pexels.com/photos/24703297/pexels-photo-24703297.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/child-baseball-player-during-game-24703297/ | Pexels License (Photo: Tim Mossholder) |
| Volleyball | https://images.pexels.com/photos/6180393/pexels-photo-6180393.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/a-woman-playing-volleyball-6180393/ | Pexels License (Photo: Kampus Production) |
| Skateboarding | https://images.pexels.com/photos/19008032/pexels-photo-19008032.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/kid-in-a-helmet-kneeling-by-his-skateboard-19008032/ | Pexels License (Photo: Paco Flaquer) |
| Archery | https://images.pexels.com/photos/6655566/pexels-photo-6655566.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/a-girl-holding-an-archery-bow-6655566/ | Pexels License |
| Ice Skating | https://images.pexels.com/photos/6468935/pexels-photo-6468935.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/a-person-ice-skating-on-ice-rink-6468935/ | Pexels License |

`*` = Surfing was not present in the original 24-entry research set and was newly sourced for
this task — a standard Pexels stock photo of a person surfing, under the Pexels License (free
for commercial/personal use, no attribution required).

## Notes

- 15 of the 16 words reuse `sourcePage` URLs from the original research pass (`sports-images.json`,
  generated 2026-06-12); `imageUrl` has been resolved to the direct Pexels CDN file using the
  standard pattern `https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg`, with
  `?auto=compress&cs=tinysrgb&w=800` applied for a card-sized variant. The numeric `<id>` was
  taken directly from each `sourcePage` slug.
- Surfing is a new addition sourced for this task — single clear subject (person surfing),
  kid-friendly, no branding/watermarks, consistent with the photographic style of the rest of
  the set.
- All 16 `imageUrl`s have been verified to return HTTP 200 (checked 2026-06-14). No replacements
  were needed for this category.
- Ice Skating, Skiing, Volleyball: per the prior research notes, these remained adult-subject
  photos (no equally good kid-specific photo surfaced for the activity itself), but are still
  kid-friendly and recognizable for Picture Charades.
- The 10 research-only entries not used in the live Sports category (Gymnastics, Running,
  Weightlifting, Ballet, Hiking, Yoga, Rowing, Jump Rope, Cheerleading, Football) were dropped
  from `sports-images.json` to keep the file scoped to exactly the 16 words in
  `lib/data/words.ts`. They remain documented in git history if needed for a future expanded
  Sports pack.
