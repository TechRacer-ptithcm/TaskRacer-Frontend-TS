export const getLastInitial = (name: string) => {
    const parts = name.trim().split(" ");
    const lastWord = parts[parts.length - 1] || "";
    return lastWord.charAt(0).toUpperCase();
  };
  