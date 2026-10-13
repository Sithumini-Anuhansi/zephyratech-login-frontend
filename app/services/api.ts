export interface AuthCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export type UserProfile = Record<string, unknown>;

function getApiUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured.");
  }

  return `${baseUrl}/${path}`;
}

async function request(
  path: string,
  options: RequestInit = {},
): Promise<unknown> {
  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");

  const response = await fetch(getApiUrl(path), {
    ...options,
    headers,
  });
  const body = await response.text();
  let payload: unknown = body;

  if (body) {
    try {
      payload = JSON.parse(body);
    } catch {
      payload = body;
    }
  } else {
    payload = null;
  }

  if (!response.ok) {
    const message =
      typeof payload === "string"
        ? payload
        : payload &&
            typeof payload === "object" &&
            "message" in payload &&
            typeof payload.message === "string"
          ? payload.message
          : `Request failed with status ${response.status}.`;

    throw new Error(message);
  }

  return payload;
}

export async function registerUser(data: AuthCredentials): Promise<void> {
  await request("auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function loginUser(
  data: AuthCredentials,
): Promise<LoginResponse> {
  const payload = await request("auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const token =
    typeof payload === "string"
      ? payload
      : payload &&
          typeof payload === "object" &&
          ("token" in payload || "jwt" in payload || "accessToken" in payload)
        ? "token" in payload && typeof payload.token === "string"
          ? payload.token
          : "jwt" in payload && typeof payload.jwt === "string"
            ? payload.jwt
            : "accessToken" in payload && typeof payload.accessToken === "string"
              ? payload.accessToken
              : undefined
        : undefined;

  if (!token?.trim()) {
    throw new Error("The login response did not include a JWT token.");
  }

  return { token };
}

export async function fetchUserProfile(token: string): Promise<UserProfile> {
  const payload = await request("users/profile", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("The profile response was not a valid user object.");
  }

  return payload as UserProfile;
}
