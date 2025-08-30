// Average a subset of 1–5 breed attributes. Rounded to 0.5.
const FIELDS = [
  'affection_level',
  'child_friendly',
  'stranger_friendly',
  'dog_friendly',
  'adaptability',
  'social_needs',
  'energy_level',
  'intelligence'
];

export function breedRating(breed) {
  if (!breed) return 0;
  const vals = FIELDS.map((k) => Number(breed[k])).filter((n) => Number.isFinite(n));
  if (!vals.length) return 0;
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  return Math.round(avg * 2) / 2; // 0.5 steps
}
