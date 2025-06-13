const BASE_URL = 'http://localhost:8080/api';

export async function fetchHello(): Promise<string> {
  const response = await fetch(`${BASE_URL}/hello`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.text();
}
