"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { registerUser } from "../services/api";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await registerUser({ email, password });
      router.push("/login");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to create your account. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-100 via-slate-100 to-violet-100 p-4 sm:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-indigo-300/40 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 right-0 h-96 w-96 rounded-full bg-violet-300/40 blur-3xl" />
      <section className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/80 bg-white/55 shadow-2xl shadow-indigo-900/10 backdrop-blur-2xl md:min-h-[620px] md:grid-cols-2">
        <aside className="relative isolate order-1 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-500/95 via-violet-600/90 to-blue-700/95 px-8 py-12 text-center text-white backdrop-blur-xl md:order-1">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/70 bg-white/85 text-2xl font-black text-indigo-700 shadow-lg shadow-indigo-950/20 backdrop-blur-xl">
            Z
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome!
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/90 sm:text-base">
            Already have an account? Sign in to continue where you left off.
          </p>
          <Link
            className="mt-8 inline-flex items-center justify-center rounded-full border border-white/70 bg-white/10 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/10 backdrop-blur-md transition hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
            href="/login"
          >
            Sign in <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </aside>
        <div className="order-2 flex items-center justify-center bg-white/45 px-6 py-10 backdrop-blur-xl sm:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm font-semibold tracking-[0.24em] text-indigo-700">
                ZEPHYRA TECH
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Create your account
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Register with your email and choose a password.
              </p>
            </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              autoComplete="email"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              id="email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              type="email"
              value={email}
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                autoComplete="new-password"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 pr-20 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                id="password"
                minLength={8}
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                required
                type={showPassword ? "text" : "password"}
                value={password}
              />
              <button
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="group absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-indigo-600 focus:outline-none focus:text-indigo-600"
                onClick={() => setShowPassword((visible) => !visible)}
                type="button"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  {showPassword ? (
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.3 4.5 9 7-.2.8-.8 1.8-1.6 2.8M6.2 6.2C3.9 7.7 2.4 10 2 12c.7 2.5 4 7 10 7 1.3 0 2.5-.3 3.5-.8"
                      />
                    </>
                  ) : (
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"
                      />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
                <span className="pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Use at least 8 characters.
            </p>
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-slate-700"
              htmlFor="confirm-password"
            >
              Confirm password
            </label>
            <div className="relative">
              <input
                autoComplete="new-password"
                className="w-full rounded-lg border border-slate-300 bg-white/70 px-3 py-2.5 pr-12 text-slate-900 outline-none backdrop-blur-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                id="confirm-password"
                minLength={8}
                name="confirm-password"
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                aria-invalid={Boolean(
                  confirmPassword && confirmPassword !== password,
                )}
                aria-describedby="confirm-password-hint"
              />
              <button
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                aria-pressed={showConfirmPassword}
                className="group absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-indigo-600 focus:outline-none focus:text-indigo-600"
                onClick={() =>
                  setShowConfirmPassword((visible) => !visible)
                }
                type="button"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  {showConfirmPassword ? (
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.3 4.5 9 7-.2.8-.8 1.8-1.6 2.8M6.2 6.2C3.9 7.7 2.4 10 2 12c.7 2.5 4 7 10 7 1.3 0 2.5-.3 3.5-.8"
                      />
                    </>
                  ) : (
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"
                      />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
                <span className="pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  {showConfirmPassword ? "Hide password" : "Show password"}
                </span>
              </button>
            </div>
            <p
              className={`mt-2 text-xs ${
                confirmPassword && confirmPassword !== password
                  ? "text-red-600"
                  : "text-slate-500"
              }`}
              id="confirm-password-hint"
              aria-live="polite"
            >
              {confirmPassword && confirmPassword !== password
                ? "Passwords do not match."
                : "Re-enter your password to confirm."}
            </p>
          </div>

          {error && (
            <p
              aria-live="polite"
              className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
              role="alert"
            >
              {error}
            </p>
          )}

          <button
            className="w-full rounded-lg bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 px-4 py-3 font-semibold text-white transition hover:from-indigo-700 hover:via-violet-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already registered?{" "}
              <Link
                className="font-semibold text-indigo-600 hover:text-indigo-700"
                href="/login"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
