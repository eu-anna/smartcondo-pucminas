export function capitalizeFullName(name) {
  return name
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

capitalizeFullName("vInIcIuS OlivEira"); // ➜ "Vinicius Oliveira"
