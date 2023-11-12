export const readFile = async () => {
  try {
    const response = await fetch('/users.txt');
    if (!response.ok) {
      throw new Error('Failed to fetch the file');
    }

    const text = await response.text();
    return text.split('\n');
  } catch (error) {
    console.error('Error reading the file:', error);
    return null;
  }
};
