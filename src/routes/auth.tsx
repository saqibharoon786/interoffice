import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { DUMMY_EMAIL, signInDummy } from "@/lib/dummy-auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Login | Inter Office" },
      { name: "description", content: "Sign in to manage Inter Office products." },
      { property: "og:title", content: "Admin Login | Inter Office" },
      { property: "og:description", content: "Sign in to manage Inter Office products." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(DUMMY_EMAIL);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);
    const user = signInDummy(email, password);
    setBusy(false);
    if (!user) {
      setMessage("Email ya password galat hai.");
      return;
    }
    navigate({ to: "/admin" });
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={onSubmit}>
        <BrandLogo className="auth-logo" />
        <h1>Admin Login</h1>
        <p className="auth-hint">Dummy login. Admin panel ke liye neeche wale details use karein.</p>
        <label>Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" /></label>
        <label>Password<input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" /></label>
        {message && <p className="auth-message">{message}</p>}
        <button className="admin-btn" type="submit" disabled={busy}>{busy ? "Please wait..." : "Login"}</button>
        <p className="auth-demo">Email: {DUMMY_EMAIL}<br />Password: 123</p>
      </form>
    </main>
  );
}
