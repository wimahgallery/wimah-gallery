"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupInput } from "@/lib/schemas";

export default function AdminSignupPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(data: SignupInput) {
    setError("");
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      if (!res.ok) {
        const json = await res.json();
        setError(json.error || "Signup failed");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Network error. Please try again.");
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F3EE] px-4">
        <div className="w-full max-w-sm text-center">
          <div className="mb-4 text-4xl">&#10003;</div>
          <h1 className="font-heading text-2xl text-[#54524D]">
            Account created
          </h1>
          <p className="mt-2 text-sm text-[#8D8A82]">
            Check your email for a confirmation link, then sign in.
          </p>
          <Link
            href="/admin/login"
            className="mt-6 inline-block rounded-lg bg-[#7C8472] px-6 py-2.5 text-sm font-semibold text-[#F5F3EE] transition-colors hover:bg-[#5F6558]"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F3EE] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-2xl text-[#54524D]">
            Wimah Gallery
          </h1>
          <p className="mt-2 text-sm text-[#8D8A82]">Create admin account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-[#54524D]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-4 py-2.5 text-sm text-[#54524D] outline-none transition-colors focus:border-[#7C8472] focus:ring-2 focus:ring-[#7C8472]/20"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-[#54524D]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-4 py-2.5 text-sm text-[#54524D] outline-none transition-colors focus:border-[#7C8472] focus:ring-2 focus:ring-[#7C8472]/20"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium text-[#54524D]"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              className="w-full rounded-lg border border-[rgba(84,82,77,0.12)] bg-white px-4 py-2.5 text-sm text-[#54524D] outline-none transition-colors focus:border-[#7C8472] focus:ring-2 focus:ring-[#7C8472]/20"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#7C8472] px-4 py-2.5 text-sm font-semibold text-[#F5F3EE] transition-colors hover:bg-[#5F6558] disabled:opacity-50"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#8D8A82]">
          Already have an account?{" "}
          <Link
            href="/admin/login"
            className="font-medium text-[#7C8472] hover:text-[#5F6558]"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
