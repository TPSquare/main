export default async function fetchJSON(api) {
  return await fetch(`${api}?t=${Date.now()}`).then((res) => res.json());
}
