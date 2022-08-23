export const httpSend = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  if (response.ok) {
    return await response.json();
  } else {
    throw await response.json();
  }
};
