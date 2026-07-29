"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Password dan konfirmasi password belum sama.");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);

    setSuccessMessage("Register dummy berhasil. Kamu bisa lanjut login.");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleGoogleRegister = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsGoogleLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsGoogleLoading(false);
    setSuccessMessage("Register Google dummy berhasil. Kamu bisa lanjut login.");
  };

  return (
    <main className="min-h-screen bg-[#f7f7f4] px-6 py-16 text-[#1f2420] sm:px-10 lg:px-20">
      <div className="mx-auto flex min-h-[calc(100vh-190px)] max-w-6xl items-center justify-center">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-md border border-[#deded8] bg-[#fbfbf8] p-8 sm:p-10"
        >
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-3 text-[#1f2420]"
          >
            <span className="flex h-9 w-9 items-center justify-center border border-[#1f2420] text-sm font-semibold">
              R
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.18em]">
              Remocha
            </span>
          </Link>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#858881]">
            Create Account
          </p>
          <h1 className="mb-2 text-4xl font-semibold text-[#1f2420]">
            Register
          </h1>
          <p className="mb-8 leading-7 text-[#686b65]">
            Buat akun untuk akses dashboard dan pengelolaan preorder.
          </p>

          <div className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#1f2420]">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full border border-[#c9cac4] bg-[#f7f7f4] px-4 py-3 text-sm outline-none transition focus:border-[#1f2420] focus:bg-white"
                placeholder="email@contoh.com"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#1f2420]">
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full border border-[#c9cac4] bg-[#f7f7f4] px-4 py-3 text-sm outline-none transition focus:border-[#1f2420] focus:bg-white"
                placeholder="Minimal 6 karakter"
                required
                minLength={6}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#1f2420]">
                Konfirmasi password
              </span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full border border-[#c9cac4] bg-[#f7f7f4] px-4 py-3 text-sm outline-none transition focus:border-[#1f2420] focus:bg-white"
                placeholder="Ulangi password"
                required
                minLength={6}
              />
            </label>
          </div>

          {errorMessage && (
            <p className="mt-5 border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p className="mt-5 border border-[#deded8] bg-white px-4 py-3 text-sm font-medium text-[#1f2420]">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-7 inline-flex w-full items-center justify-center border border-[#1f2420] bg-[#1f2420] px-8 py-4 text-sm font-semibold text-white transition hover:bg-transparent hover:text-[#1f2420] disabled:cursor-not-allowed disabled:border-[#c9cac4] disabled:bg-[#c9cac4]"
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#deded8]" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#858881]">
              or
            </span>
            <span className="h-px flex-1 bg-[#deded8]" />
          </div>

          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={isGoogleLoading}
            className="inline-flex w-full items-center justify-center gap-3 border border-[#c9cac4] bg-white px-8 py-4 text-sm font-semibold text-[#1f2420] transition hover:border-[#1f2420] disabled:cursor-not-allowed disabled:text-[#858881]"
          >
            <span className="flex h-6 w-6 items-center justify-center border border-[#1f2420] text-xs font-semibold">
              G
            </span>
            {isGoogleLoading ? "Connecting..." : "Register with Google"}
          </button>

          <p className="mt-6 text-center text-sm text-[#686b65]">
            Sudah punya akun?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-[#1f2420] transition hover:text-[#686b65]"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
