"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
Mail,
Lock,
Eye,
EyeOff,
BriefcaseBusiness,
} from "lucide-react";

const SignInPage = () => {
const [showPassword, setShowPassword] = useState(false);
const [isLoading, setIsLoading] = useState(false);

const router = useRouter();

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);

  const formData = new FormData(e.currentTarget);

  const { data, error } = await authClient.signIn.email({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    rememberMe: formData.get("remember") === "on",
  });

  if (error) {
    alert(error.message || "Sign in failed");
    setIsLoading(false);
    return;
  }

  if (data) {
    router.push("/");
    router.refresh();
  }

  setIsLoading(false);
};

return (
<section className="min-h-screen bg-[#090a0f] flex items-center justify-center px-4 py-12 text-white">
<div className="w-full max-w-md">

    <Link href="/" className="flex justify-center items-center gap-2 mb-8">
      <div className="bg-indigo-600 p-2 rounded-lg">
        <BriefcaseBusiness className="w-6 h-6 text-white" />
      </div>
      <span className="text-2xl font-bold">HireLoop</span>
    </Link>

    <div className="bg-[#11131c] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Welcome Back!</h1>
        <p className="text-slate-400 mt-2">
          Sign in to continue your job search.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-200">
            Email Address
          </Label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="h-12 pl-11 bg-[#090a0f] border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-indigo-600"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="text-slate-200">
              Password
            </Label>

            <Link
              href="/forgot-password"
              className="text-sm text-indigo-400 hover:text-indigo-300"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
              className="h-12 pl-11 pr-11 bg-[#090a0f] border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-indigo-600"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            name="remember"
            className="accent-indigo-600 w-4 h-4"
          />

          <Label htmlFor="remember" className="text-sm text-slate-400">
            Remember me
          </Label>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>

      </form>

      <div className="flex items-center gap-4 my-6">
        <div className="h-px bg-slate-800 flex-1" />
        <span className="text-xs text-slate-500">
          OR CONTINUE WITH
        </span>
        <div className="h-px bg-slate-800 flex-1" />
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full h-11 bg-transparent border-slate-700 text-white hover:bg-slate-800 hover:text-white"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
          <path
            fill="#FFC107"
            d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11c-.5 2.5-1.9 4.6-4.1 6v5h6.6c3.9-3.6 6.1-8.8 6.1-14.7z"
          />
          <path
            fill="#4CAF50"
            d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2C9.2 39.5 16.1 44 24 44z"
          />
          <path
            fill="#1976D2"
            d="M12.6 27.8c-.4-1.2-.7-2.5-.7-3.8s.3-2.6.7-3.8V15H5.8C4.4 17.7 3.5 20.8 3.5 24s.9 6.3 2.3 9l6.8-5.2z"
          />
          <path
            fill="#E53935"
            d="M24 9.6c3 0 5.7 1 7.8 3l5.8-5.8C34.1 3.5 29.5 1.5 24 1.5 16.1 1.5 9.2 6 5.8 15l6.8 5.2C14.2 15.4 18.7 9.6 24 9.6z"
          />
        </svg>

        Continue with Google
      </Button>

      <p className="text-center text-sm text-slate-400 mt-6">
        Don't have an account?{" "}
        <Link
          href="/sign-up"
          className="text-indigo-400 font-semibold hover:text-indigo-300"
        >
          Create Account
        </Link>
      </p>

    </div>

    <p className="text-center text-xs text-slate-600 mt-6">
      © 2026 HireLoop. All rights reserved.
    </p>

  </div>
</section>

);
};

export default SignInPage;