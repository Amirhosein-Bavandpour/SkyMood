export function normalizeText(value = "") {
  return value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ā/g, "a")
    .replace(/ī/g, "i")
    .replace(/ū/g, "u")
    .replace(/Ā/g, "A")
    .replace(/Ī/g, "I")
    .replace(/Ū/g, "U")
    .toLowerCase()
    .trim();
}