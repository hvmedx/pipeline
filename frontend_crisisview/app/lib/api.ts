function trimTrailingSlashes(value: string): string {
  let end = value.length;
  while (end > 0 && value.charCodeAt(end - 1) === 47) {
    end -= 1;
  }
  return value.slice(0, end);
}

export function getApiBase(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (envUrl && envUrl.trim().length > 0) return trimTrailingSlashes(envUrl);
  return "http://localhost:3001";
}

export function buildIncidentsUrl(base: string = getApiBase()): string {
  return `${trimTrailingSlashes(base)}/incidents`;
}
