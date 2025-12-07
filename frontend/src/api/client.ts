export async function fetchApi<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(path, options);

  if (!res.ok) {
    throw new Error(`Error fetching from backend: ${res.status}`);
  }

  return res.json() as Promise<T>;
}
