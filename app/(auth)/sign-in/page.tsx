"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { authClient } from "@/lib/auth-client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  BriefcaseBusiness,
  UserRound,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState("seeker")

  const router = useRouter()
  const searchParams = useSearchParams()

  const redirectTo = searchParams.get("redirect")

  const redirectPath =
    redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
      ? redirectTo
      : "/"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)

    const { data, error } = await authClient.signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      rememberMe: formData.get("remember") === "on",
    })

    if (error) {
      alert(error.message || "Sign in failed")
      setIsLoading(false)
      return
    }

    if (data) {
      const { data: sessionData } = await authClient.getSession()

      const actualRole = sessionData?.user?.role

      if (selectedRole !== actualRole) {
        await authClient.signOut()

        alert("Your selected role does not match your account role.")

        setIsLoading(false)
        return
      }

      router.push(redirectPath)
      router.refresh()
    }

    setIsLoading(false)
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#090a0f] px-4 py-12 text-white">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="rounded-xl bg-indigo-600 p-2.5 shadow-lg shadow-indigo-600/20">
            <BriefcaseBusiness className="h-6 w-6 text-white" />
          </div>

          <span className="text-2xl font-bold tracking-tight">
            Hire<span className="text-indigo-400">Loop</span>
          </span>
        </Link>

        {/* Sign In Card */}
        <div className="rounded-2xl border border-slate-800 bg-[#11131c] p-6 shadow-2xl sm:p-9">
          {/* Heading */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10">
              <UserRound className="h-7 w-7 text-indigo-400" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight">Welcome Back!</h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Sign in to your HireLoop account and continue your professional
              journey.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-slate-200"
              >
                Email Address
              </Label>

              <div className="relative">
                <Mail className="absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-slate-500" />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="h-12 rounded-xl border-slate-800 bg-[#090a0f] pl-11 text-white placeholder:text-slate-500 focus-visible:ring-indigo-500"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-slate-200">
                  Sign in as
                </Label>

                <p className="mt-1 text-xs text-slate-500">
                  Select the role associated with your account.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {/* Seeker */}
                <button
                  type="button"
                  onClick={() => setSelectedRole("seeker")}
                  className={`relative flex flex-col items-center gap-2 rounded-xl border p-3 transition ${
                    selectedRole === "seeker"
                      ? "border-indigo-500 bg-indigo-500/10"
                      : "border-slate-800 bg-[#090a0f] hover:border-slate-600"
                  }`}
                >
                  {selectedRole === "seeker" && (
                    <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-indigo-400" />
                  )}

                  <UserRound className="h-6 w-6 text-indigo-400" />

                  <span className="text-xs font-semibold text-white">
                    Seeker
                  </span>
                </button>

                {/* Recruiter */}
                <button
                  type="button"
                  onClick={() => setSelectedRole("recruiter")}
                  className={`relative flex flex-col items-center gap-2 rounded-xl border p-3 transition ${
                    selectedRole === "recruiter"
                      ? "border-indigo-500 bg-indigo-500/10"
                      : "border-slate-800 bg-[#090a0f] hover:border-slate-600"
                  }`}
                >
                  {selectedRole === "recruiter" && (
                    <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-indigo-400" />
                  )}

                  <Building2 className="h-6 w-6 text-indigo-400" />

                  <span className="text-xs font-semibold text-white">
                    Recruiter
                  </span>
                </button>

                {/* Admin */}
                <button
                  type="button"
                  onClick={() => setSelectedRole("admin")}
                  className={`relative flex flex-col items-center gap-2 rounded-xl border p-3 transition ${
                    selectedRole === "admin"
                      ? "border-indigo-500 bg-indigo-500/10"
                      : "border-slate-800 bg-[#090a0f] hover:border-slate-600"
                  }`}
                >
                  {selectedRole === "admin" && (
                    <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-indigo-400" />
                  )}

                  <ShieldCheck className="h-6 w-6 text-indigo-400" />

                  <span className="text-xs font-semibold text-white">
                    Admin
                  </span>
                </button>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-200"
                >
                  Password
                </Label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-indigo-400 transition hover:text-indigo-300"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <Lock className="absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-slate-500" />

                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="h-12 rounded-xl border-slate-800 bg-[#090a0f] pr-12 pl-11 text-white placeholder:text-slate-500 focus-visible:ring-indigo-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3.5 -translate-y-1/2 text-slate-500 transition hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3 pt-1">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="h-4 w-4 accent-indigo-600"
              />

              <Label htmlFor="remember" className="text-sm text-slate-400">
                Remember me
              </Label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full rounded-xl bg-indigo-600 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
            >
              {isLoading ? (
                "Signing In..."
              ) : (
                <span className="flex items-center gap-2">
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-800" />
            </div>

            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#11131c] px-3 text-slate-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Button */}
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full rounded-xl border-slate-700 bg-transparent text-white transition hover:bg-slate-800"
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

          {/* Sign Up */}
          <p className="mt-7 text-center text-sm text-slate-400">
            Dont have an account?{" "}
            <Link
              href={
                redirectPath === "/"
                  ? "/sign-up"
                  : `/sign-up?redirect=${encodeURIComponent(redirectPath)}`
              }
              className="font-semibold text-indigo-400 transition hover:text-indigo-300"
            >
              Create Account
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

export default SignInPage
