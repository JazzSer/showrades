# Jobs Category — Image Sourcing Summary

Real-world photographic images sourced for the "Jobs" charades category (the 16 words live in
`lib/data/words.ts`). All sources are Pexels (Pexels License — free for commercial and personal
use, no attribution required).

Direct image URLs use the standard Pexels CDN pattern
(`https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?auto=compress&cs=tinysrgb&w=800`),
sized for a game card (w=800).

| Word | Image URL | Source Page | License |
| :--- | :--- | :--- | :--- |
| Firefighter | https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/firefighters-in-action-672532/ | Pexels License |
| Doctor | https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/a-doctor-with-a-stethoscope-4173251/ | Pexels License |
| Teacher | https://images.pexels.com/photos/8466776/pexels-photo-8466776.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/a-teacher-helping-a-student-8466776/ | Pexels License |
| Astronaut | https://images.pexels.com/photos/2152/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/astronaut-on-spaceship-2152/ | Pexels License |
| Chef | https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/man-wearing-white-chef-uniform-887827/ | Pexels License |
| Pilot | https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/pilot-in-cockpit-2026324/ | Pexels License |
| Police Officer | https://images.pexels.com/photos/8434791/pexels-photo-8434791.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/a-police-officer-in-uniform-8434791/ | Pexels License |
| Farmer | https://images.pexels.com/photos/2284166/pexels-photo-2284166.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/farmer-working-in-the-field-2284166/ | Pexels License |
| Dentist | https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/dentist-examining-patient-teeth-3845810/ | Pexels License |
| Artist * | https://images.pexels.com/photos/8036838/pexels-photo-8036838.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/photo-of-a-person-painting-8036838/ | Pexels License |
| Magician | https://images.pexels.com/photos/6311589/pexels-photo-6311589.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/a-magician-performing-a-card-trick-6311589/ | Pexels License |
| Lifeguard | https://images.pexels.com/photos/4148897/pexels-photo-4148897.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/lifeguard-tower-on-the-beach-4148897/ | Pexels License |
| Singer | https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/woman-singing-on-microphone-with-spotlight-167636/ | Pexels License |
| Mechanic | https://images.pexels.com/photos/4480505/pexels-photo-4480505.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/a-mechanic-working-under-a-car-4480505/ | Pexels License |
| Scientist | https://images.pexels.com/photos/3993212/pexels-photo-3993212.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/a-scientist-holding-a-test-tube-3993212/ | Pexels License |
| Construction Worker | https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800 | https://www.pexels.com/photo/man-wearing-yellow-hard-hat-1216589/ | Pexels License |

`*` = Artist's originally predicted ID (1796612) returned 404 and was replaced with a
freshly-sourced, verified Pexels photo of a person painting on canvas.

## Notes

- All 16 `imageUrl`s have been verified to return HTTP 200 (checked 2026-06-14).
- Lifeguard image is a lifeguard tower/stand on a beach rather than a person — a clear,
  unambiguous visual representation of the profession that avoids depicting an identifiable
  person.
- Police Officer and Firefighter entries show uniform/badge/truck imagery, not weapons, per
  the kid-friendly guidance for this content set.
