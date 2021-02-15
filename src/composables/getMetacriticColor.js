export default function getMetacriticColor(val) {
  if (!val) return 'gray';
  if (val > 60) return 'green';
  if (val <= 60 && val > 40) return 'yellow';
  return 'red';
}
