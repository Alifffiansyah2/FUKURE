"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);

    setMessage("Simulasi reset password berhasil. Tidak ada email yang dikirim.");
  };

  return (
    <main className="min-h-screen bg-[#f4f8ee] px-6 py-16 text-[#244c2d] sm:px-10 lg:px-20">
      <div className="mx-auto flex min-h-[calc(100vh-190px)] max-w-6xl items-center justify-center">
        <form
          onSubmit={handleResetPassword}
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
            Account Help
          </p>
          <h1 className="mb-2 text-4xl font-black text-[#1f4f29]">
            Lupa akun?
          </h1>
          <p className="mb-8 font-medium leading-relaxed text-[#527d4e]">
            Masukkan email akun kamu untuk simulasi reset password.
          </p>

          <label className="block">
            <span className="mb-2 block text-sm font-black text-[#416f43]">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-[#c8ddc0] bg-[#f8fbf4] px-4 py-3 font-semibold outline-none transition focus:border-[#6d9368] focus:bg-white"
              placeholder="email@contoh.com"
              required
            />
          </label>

          {errorMessage && (
            <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
              {errorMessage}
            </p>
          )}

          {message && (
            <p className="mt-5 rounded-2xl bg-[#eef7e8] px-4 py-3 text-sm font-bold text-[#244c2d]">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#244c2d] px-8 py-4 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_18px_45px_rgba(36,76,45,0.2)] transition hover:-translate-y-0.5 hover:bg-[#3f7344] disabled:cursor-not-allowed disabled:bg-[#9fb59e] disabled:shadow-none"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>

          <Link
            href="/auth/login"
            className="mt-5 block text-center text-sm font-black text-[#6d9368] transition hover:text-[#1f4f29]"
          >
            Back to login
          </Link>
        </form>
      </div>
    </main>
  );
}
