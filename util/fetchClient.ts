export const fetchClient = async (url: string, options?: any) => {
  const response = await fetch(`${process.env.API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      'X-API-KEY': process.env.X_API_KEY || '',
    }
  });
  const data = await response.json();
  return data;
}