"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import logo from "@/app/images/logo.png"
import { Menu, User, LogOut, ChevronDown } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const router = useRouter()

  const { data: session, isPending } = authClient.useSession()

  const navLinks = [
    { name: "Browse Jobs", href: "/browse-jobs" },
    { name: "Company", href: "/company" },
    { name: "Pricing", href: "/pricing" },
    {
      name: "Dashboard",
      href: `/dashboard/${session?.user?.role || "seeker"}`,
    },
  ] as const

  const handleLogout = async () => {
    await authClient.signOut()
    setShowProfile(false)
    setOpen(false)
    router.push("/")
    router.refresh()
  }

  return (
    <header className="w-full border-b border-neutral-800 bg-[#121212]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="Hire Loop Logo"
              width={150}
              height={50}
              priority
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-neutral-300 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            {session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-2 text-white"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold">
                      {session.user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}

                  <span>{session.user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {showProfile && (
                  <div className="absolute top-14 right-0 z-50 w-44 rounded-lg border border-neutral-700 bg-[#181818] p-2">
                    <Link
                      href="/profile"
                      onClick={() => setShowProfile(false)}
                      className="flex items-center gap-2 rounded p-3 text-white hover:bg-neutral-800"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded p-3 text-red-400 hover:bg-neutral-800"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="px-4 py-2 text-sm text-neutral-300 hover:text-white"
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-emerald-600 px-5 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-700 text-white">
                <Menu className="h-5 w-5" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[280px] border-neutral-800 bg-[#121212] text-white"
              >
                <div className="mt-8 flex flex-col gap-8">
                  {/* Mobile Logo */}
                  <Link href="/" onClick={() => setOpen(false)}>
                    <Image
                      src={logo}
                      alt="Hire Loop Logo"
                      width={140}
                      height={45}
                    />
                  </Link>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col gap-5">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="text-neutral-300 hover:text-white"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Actions */}
                  <div className="flex flex-col gap-3 border-t border-neutral-800 pt-6">
                    {!isPending &&
                      (session?.user ? (
                        <>
                          <div className="flex items-center gap-3 text-white">
                            {session.user.image ? (
                              <img
                                src={session.user.image}
                                alt="Profile"
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold">
                                {session.user.name?.charAt(0).toUpperCase() ||
                                  "U"}
                              </div>
                            )}

                            <span>{session.user.name}</span>
                          </div>

                          <Link
                            href="/profile"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2 rounded p-3 text-white hover:bg-neutral-800"
                          >
                            <User className="h-4 w-4" />
                            Profile
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 rounded p-3 text-red-400 hover:bg-neutral-800"
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/sign-in"
                            onClick={() => setOpen(false)}
                            className="w-full rounded-md border border-neutral-700 py-2 text-center"
                          >
                            Sign In
                          </Link>

                          <Link
                            href="/sign-up"
                            onClick={() => setOpen(false)}
                            className="w-full rounded-md bg-blue-600 py-2 text-center"
                          >
                            Get Started
                          </Link>
                        </>
                      ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
