const backend_base_url = import.meta.env.VITE_BACKEND_URL;

export function constructUrl(suffix: string) {
  return backend_base_url + suffix;
};

export async function fetchApi<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(path, options);

  if (!res.ok) {
    throw new Error(`Error fetching from backend: ${res.status}`);
  }

  return res.json() as Promise<T>;
}
