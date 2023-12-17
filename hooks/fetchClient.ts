export const fetchClient = async (url: string, options?: any) => {
  const response = await fetch(`${process.env.API_URL}${url}`, {
    ...options,
    headers: {
      'X-API-KEY': process.env.X_API_KEY || '',
    }
  });
  console.log(process.env.API_URL);
  const data = await response.json();
  return data;
}