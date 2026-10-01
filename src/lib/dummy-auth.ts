const STORAGE_KEY = "interwood-dummy-session";

export const DUMMY_EMAIL = "admin@gmail.com";
export const DUMMY_PASSWORD = "123";
export const DUMMY_USER_ID = "dummy-admin";

export type SessionUser = {
  id: string;
  email: string;
};

export function getDummySession(): SessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SessionUser;
    if (parsed?.id === DUMMY_USER_ID && parsed.email === DUMMY_EMAIL) return parsed;
    return null;
  } catch {
    return null;
  }
}

export function signInDummy(email: string, password: string): SessionUser | null {
  const matches = email.trim().toLowerCase() === DUMMY_EMAIL && password === DUMMY_PASSWORD;
  if (!matches) return null;
  const user: SessionUser = { id: DUMMY_USER_ID, email: DUMMY_EMAIL };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export function clearDummySession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function isDummyAdmin(user: { id: string }) {
  return user.id === DUMMY_USER_ID;
}
