export function generateUniqueCode() {
  const prefix = "EZ";
  const length = 6; // The length of random alphanumeric characters

  // Generate random alphanumeric characters
  const randomChars = Array.from({ length }, () => {
    const alphanumeric =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
  }).join("");

  return prefix + randomChars;
}
