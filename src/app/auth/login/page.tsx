"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);

    router.push("/admin");
  };

  const handleGoogleLogin = async () => {
    setErrorMessage("");
    setIsGoogleLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push("/admin");
  };

  return (
    <main className="min-h-screen bg-[#f4f8ee] px-6 py-16 text-[#244c2d] sm:px-10 lg:px-20">
      <div className="mx-auto flex min-h-[calc(100vh-190px)] max-w-6xl items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-[32px] border border-[#d7e8cf] bg-white/85 p-8 shadow-[0_24px_70px_rgba(74,112,67,0.14)] backdrop-blur-md sm:p-10"
        >
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-3 text-[#1f4f29]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2d6b37]/35 bg-[#c8e8bf] text-sm font-black">
              R
            </span>
            <span className="text-lg font-black uppercase tracking-[0.16em]">
              Remocha
            </span>
          </Link>

          <p className="mb-3 text-xs font-black uppercase tracking-[0.32em] text-[#6d9368]">
            Admin Access
          </p>
          <h1 className="mb-2 text-4xl font-black text-[#1f4f29]">Login</h1>
          <p className="mb-8 font-medium leading-relaxed text-[#527d4e]">
            Masuk untuk mengelola preorder dan data toko.
          </p>

          <div className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-black text-[#416f43]">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-[#c8ddc0] bg-[#f8fbf4] px-4 py-3 font-semibold outline-none transition focus:border-[#6d9368] focus:bg-white"
                placeholder="admin@email.com"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-black text-[#416f43]">
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-[#c8ddc0] bg-[#f8fbf4] px-4 py-3 font-semibold outline-none transition focus:border-[#6d9368] focus:bg-white"
                placeholder="Password"
                required
              />
            </label>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 text-sm font-bold">
            <Link
              href="/auth/register"
              className="text-[#416f43] transition hover:text-[#1f4f29]"
            >
              Register
            </Link>
            <Link
              href="/auth/forgot-password"
              className="text-[#6d9368] transition hover:text-[#1f4f29]"
            >
              Lupa akun?
            </Link>
          </div>

          {errorMessage && (
            <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#244c2d] px-8 py-4 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_18px_45px_rgba(36,76,45,0.2)] transition hover:-translate-y-0.5 hover:bg-[#3f7344] disabled:cursor-not-allowed disabled:bg-[#9fb59e] disabled:shadow-none"
          >
            {isLoading ? "Signing in..." : "Login"}
          </button>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#d7e8cf]" />
            <span className="text-xs font-black uppercase tracking-[0.18em] text-[#6d9368]">
              or
            </span>
            <span className="h-px flex-1 bg-[#d7e8cf]" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-[#c8ddc0] bg-white px-8 py-4 text-sm font-black uppercase tracking-[0.08em] text-[#244c2d] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f8fbf4] disabled:cursor-not-allowed disabled:text-[#9fb59e]"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#244c2d] text-xs font-black text-white">
              G
            </span>
            {isGoogleLoading ? "Connecting..." : "Login with Google"}
          </button>
        </form>
      </div>
    </main>
  );
}
