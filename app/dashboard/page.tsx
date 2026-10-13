"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchUserProfile, UserProfile } from "../services/api";

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    fetchUserProfile(token)
      .then(setProfile)
      .catch((caughtError: unknown) => {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Unable to load your profile.",
        );
      });
  }, [router]);

  function signOut() {
    window.localStorage.removeItem("token");
    router.replace("/login");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <section className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold tracking-wide text-indigo-600">
              ZEPHYRATECH
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Dashboard
            </h1>
          </div>
          <button
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={signOut}
            type="button"
          >
            Sign out
          </button>
        </div>

        {error ? (
          <p
            aria-live="polite"
            className="mt-8 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {error}
          </p>
        ) : profile ? (
          <div className="mt-8 rounded-xl bg-slate-50 p-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Your profile
            </h2>
            <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words text-sm text-slate-700">
              {JSON.stringify(profile, null, 2)}
            </pre>
          </div>
        ) : (
          <p className="mt-8 text-sm text-slate-600">Loading your profile...</p>
        )}
      </section>
    </main>
  );
}
