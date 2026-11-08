"use client"

import React, { useState } from "react"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { User, Mail, Lock, Eye, EyeOff, BriefcaseBusiness } from "lucide-react"

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);

  const formData = new FormData(e.currentTarget);

  const { data, error } = await authClient.signUp.email({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    callbackURL: "/",
  });

  if (error) {
    console.log("Signup Error:", error);
    alert(error.message || "Signup failed");
    setIsLoading(false);
    return;
  }

  if (data) {
    console.log("Signup Successful:", data);
    window.location.href = "/";
  }

  setIsLoading(false);
};
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#090a0f] px-4 py-12 text-white">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="rounded-lg bg-indigo-600 p-2">
            <BriefcaseBusiness className="h-6 w-6 text-white" />
          </div>

          <span className="text-2xl font-bold">HireLoop</span>
        </Link>

        {/* Signup Card */}
        <div className="rounded-2xl border border-slate-800 bg-[#11131c] p-6 shadow-2xl sm:p-8">
          {/* Heading */}
          <div className="mb-7 text-center">
            <h1 className="text-3xl font-bold">Create Your Account</h1>

            <p className="mt-2 text-slate-400">
              Join HireLoop and find your dream opportunity.
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-200">
                Full Name
              </Label>

              <div className="relative">
                <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-500" />

                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="h-12 border-slate-800 bg-[#090a0f] pl-11 text-white placeholder:text-slate-500 focus-visible:ring-indigo-600"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">
                Email Address
              </Label>

              <div className="relative">
                <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-500" />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="h-12 border-slate-800 bg-[#090a0f] pl-11 text-white placeholder:text-slate-500 focus-visible:ring-indigo-600"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">
                Password
              </Label>

              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-500" />

                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  minLength={8}
                  required
                  className="h-12 border-slate-800 bg-[#090a0f] pr-11 pl-11 text-white placeholder:text-slate-500 focus-visible:ring-indigo-600"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-500 hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-500">
                Password must be at least 8 characters.
              </p>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 h-4 w-4 accent-indigo-600"
              />

              <Label
                htmlFor="terms"
                className="text-sm leading-5 text-slate-400"
              >
                I agree to the{" "}
                <Link href="/terms" className="text-indigo-400 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-indigo-400 hover:underline"
                >
                  Privacy Policy
                </Link>
              </Label>
            </div>

            {/* Create Account */}
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full bg-indigo-600 font-semibold text-white hover:bg-indigo-500"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-800" />
            </div>

            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#11131c] px-3 text-slate-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Signup UI Only */}
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full border-slate-700 bg-transparent text-white hover:bg-slate-800"
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.73 6c4.51-4.16 7.06-10.29 7.06-17.65Z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.75-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Sign In */}
          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-600">
          © 2026 HireLoop. All rights reserved.
        </p>
      </div>
    </section>
  )
}

export default SignUpPage
