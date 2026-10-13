const AUTH_TOKEN_KEY = "token";

export function saveAuthToken(token: string, rememberMe: boolean): void {
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.sessionStorage.removeItem(AUTH_TOKEN_KEY);

  const storage = rememberMe ? window.localStorage : window.sessionStorage;
  storage.setItem(AUTH_TOKEN_KEY, token);
}

export function getAuthToken(): string | null {
  return (
    window.localStorage.getItem(AUTH_TOKEN_KEY) ??
    window.sessionStorage.getItem(AUTH_TOKEN_KEY)
  );
}

export function clearAuthToken(): void {
  window.localStorage.removeItem(AUTH_TOKEN_KEY);
  window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
}
