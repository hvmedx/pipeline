export function getApiBase(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (envUrl && envUrl.trim().length > 0) return envUrl.replace(/\/+$/, "");
  return "http://localhost:3001";
}

export function buildIncidentsUrl(base: string = getApiBase()): string {
  return `${base.replace(/\/+$/, "")}/incidents`;
}
