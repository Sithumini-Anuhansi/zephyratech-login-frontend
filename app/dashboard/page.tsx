"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ApiError,
  fetchUserProfile,
  type UserProfile,
} from "../services/api";
import { clearAuthToken, getAuthToken } from "../services/session";

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;
    const token = getAuthToken();

    if (!token) {
      router.replace("/login");
      return () => {
        isActive = false;
      };
    }

    fetchUserProfile(token)
      .then((userProfile) => {
        if (isActive) {
          setProfile(userProfile);
        }
      })
      .catch((caughtError: unknown) => {
        if (!isActive) {
          return;
        }

        if (caughtError instanceof ApiError && caughtError.status === 401) {
          clearAuthToken();
          router.replace("/login");
          return;
        }

        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Unable to load your profile.",
        );
      });

    return () => {
      isActive = false;
    };
  }, [router]);

  function signOut() {
    clearAuthToken();
    router.replace("/login");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-100 via-slate-100 to-violet-100 p-4 sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-indigo-300/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 right-0 h-96 w-96 rounded-full bg-violet-300/40 blur-3xl"
      />
      <section className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/80 bg-white/55 p-6 shadow-2xl shadow-indigo-900/10 backdrop-blur-2xl sm:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-violet-300/30 blur-3xl"
        />
        <div className="relative">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 bg-gradient-to-br from-white/90 to-indigo-100/80 text-xl font-black text-indigo-700 shadow-md shadow-indigo-900/10">
                Z
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.24em] text-indigo-700">
                  ZEPHYRA TECH
                </p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                  Dashboard
                </h1>
              </div>
            </div>
            <button
              className="rounded-lg border border-indigo-200/80 bg-white/60 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm backdrop-blur-md transition hover:border-indigo-500 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-violet-600 hover:to-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={signOut}
              type="button"
            >
              Sign out
            </button>
          </header>

          <div className="mt-8 h-1.5 w-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-600 to-blue-600" />
          <p className="mt-6 text-slate-600">
            Welcome back. Here is your account information.
          </p>

          {error ? (
            <p
              aria-live="polite"
              className="mt-6 rounded-xl border border-red-200/70 bg-red-50/80 px-4 py-3 text-sm text-red-700 backdrop-blur-md"
              role="alert"
            >
              {error}
            </p>
          ) : profile ? (
            <div className="mt-6 rounded-2xl border border-white/80 bg-white/60 p-5 shadow-lg shadow-indigo-900/5 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-600 to-blue-600 text-white shadow-md shadow-indigo-500/20">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="12" cy="8" r="3.5" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.8 20a7.2 7.2 0 0114.4 0"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Your profile
                  </h2>
                  <p className="text-sm text-slate-500">
                    Your account information
                  </p>
                </div>
              </div>
              <pre className="mt-5 overflow-x-auto whitespace-pre-wrap break-words rounded-xl border border-white/80 bg-white/70 p-4 text-sm text-slate-700 backdrop-blur-sm">
                {JSON.stringify(profile, null, 2)}
              </pre>
            </div>
          ) : (
            <div
              aria-live="polite"
              className="mt-6 rounded-2xl border border-white/80 bg-white/60 p-5 text-sm text-slate-600 shadow-lg shadow-indigo-900/5 backdrop-blur-xl"
            >
              Loading your profile...
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
