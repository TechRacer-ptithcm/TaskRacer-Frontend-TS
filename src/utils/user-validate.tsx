export const getLastInitial = (name: string) => {
    const parts = name.trim().split(" ");
    const lastWord = parts[parts.length - 1] || "";
    return lastWord.charAt(0).toUpperCase();
  };

export const formatBirthDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}T00:00:00`;
};

export const formatGender = (gender: string) => {
  switch (gender) {
    case 'Nam':
      return 'MALE';
    case 'Nữ':
      return 'FEMALE';
    default:
      return 'MALE';
  }
};
  