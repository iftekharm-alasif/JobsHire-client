"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import logo from "@/app/images/logo.png"
import {
Menu,
User,
LogOut,
ChevronDown,
BriefcaseBusiness,
LayoutDashboard,
} from "lucide-react"
import { authClient } from "@/lib/auth-client"
import {
Sheet,
SheetContent,
SheetTrigger,
SheetTitle,
} from "@/components/ui/sheet"

const Navbar = () => {
const [open, setOpen] = useState(false)
const [showProfile, setShowProfile] = useState(false)

const router = useRouter()
const pathname = usePathname()

const { data: session, isPending } = authClient.useSession()

const navLinks = [
  { name: "Browse Jobs", href: "/browse-jobs" },
  { name: "Company", href: "/company" },
  { name: "Pricing", href: "/pricing" },
  {
    name: "Dashboard",
    href: `/dashboard/${session?.user?.role || "seeker"}`,
  },
]
const handleLogout = async () => {
await authClient.signOut()
setShowProfile(false)
setOpen(false)
router.push("/")
router.refresh()
}

const isActive = (href: string) => {
if (href === "/") return pathname === "/"
return pathname.startsWith(href)
}

return (
<header className="sticky top-0 z-50 w-full border-b border-[#263B55] bg-[#101B2B]/95 shadow-lg shadow-black/10 backdrop-blur-xl">
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
<div className="flex h-[76px] items-center justify-between">

      {/* Logo */}
      <Link href="/" className="flex shrink-0 items-center">
        <Image
          src={logo}
          alt="HireLoop Logo"
          width={150}
          height={50}
          priority
          className="object-contain"
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-1 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`relative rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive(link.href)
                ? "bg-blue-600/15 text-blue-400"
                : "text-slate-400 hover:bg-[#1D3048] hover:text-white"
            }`}
          >
            {link.name}

            {isActive(link.href) && (
              <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-blue-500" />
            )}
          </Link>
        ))}
      </nav>

      {/* Desktop Actions */}
      <div className="hidden items-center gap-4 md:flex">
        {isPending ? (
          <div className="h-10 w-24 animate-pulse rounded-lg bg-[#1D3048]" />
        ) : session?.user ? (
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 rounded-xl border border-[#344459] bg-[#172538] px-3 py-2 transition hover:border-blue-500/50 hover:bg-[#1D3048]"
            >
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="h-9 w-9 rounded-full border border-[#344459] object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                  {session.user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}

              <div className="text-left">
                <p className="max-w-[110px] truncate text-sm font-semibold text-white">
                  {session.user.name}
                </p>
                <p className="text-xs capitalize text-slate-400">
                  {session.user.role || "Seeker"}
                </p>
              </div>

              <ChevronDown
                className={`h-4 w-4 text-slate-400 transition ${
                  showProfile ? "rotate-180" : ""
                }`}
              />
            </button>

            {showProfile && (
              <>
                <button
                  aria-label="Close profile menu"
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setShowProfile(false)}
                />

                <div className="absolute top-14 right-0 z-50 w-56 overflow-hidden rounded-xl border border-[#344459] bg-[#172538] p-2 shadow-2xl shadow-black/30">
                  <div className="border-b border-[#344459] px-3 py-3">
                    <p className="truncate text-sm font-semibold text-white">
                      {session.user.name}
                    </p>
                    <p className="truncate text-xs text-slate-400">
                      {session.user.email}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setShowProfile(false)}
                    className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-[#263B55] hover:text-white"
                  >
                    <User size={17} />
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <Link
              href="/sign-in"
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-[#1D3048] hover:text-white"
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/20 transition hover:bg-emerald-500 hover:shadow-emerald-500/20"
            >
              Get Started
              <span>→</span>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#344459] bg-[#172538] text-white transition hover:border-blue-500">
            <Menu size={21} />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[300px] border-l border-[#263B55] bg-[#101B2B] text-white"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

            <div className="mt-8 flex flex-col gap-8">
              {/* Mobile Logo */}
              <Link href="/" onClick={() => setOpen(false)}>
                <Image
                  src={logo}
                  alt="HireLoop Logo"
                  width={140}
                  height={45}
                />
              </Link>

              {/* Mobile Navigation */}
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                      isActive(link.href)
                        ? "bg-blue-600 text-white"
                        : "text-slate-400 hover:bg-[#1D3048] hover:text-white"
                    }`}
                  >
                    {link.name === "Browse Jobs" && (
                      <BriefcaseBusiness size={18} />
                    )}
                    {link.name === "Dashboard" && (
                      <LayoutDashboard size={18} />
                    )}
                    {link.name !== "Browse Jobs" &&
                      link.name !== "Dashboard" && (
                        <span className="h-[18px] w-[18px]" />
                      )}
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="flex flex-col gap-3 border-t border-[#263B55] pt-6">
                {!isPending &&
                  (session?.user ? (
                    <>
                      <div className="flex items-center gap-3 rounded-xl bg-[#172538] p-3">
                        {session.user.image ? (
                          <img
                            src={session.user.image}
                            alt="Profile"
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold">
                            {session.user.name?.charAt(0).toUpperCase() || "U"}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {session.user.name}
                          </p>
                          <p className="truncate text-xs text-slate-400">
                            {session.user.email}
                          </p>
                        </div>
                      </div>

                      <Link
                        href="/profile"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-300 hover:bg-[#1D3048] hover:text-white"
                      >
                        <User size={18} />
                        My Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-400 hover:bg-red-500/10"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/sign-in"
                        onClick={() => setOpen(false)}
                        className="rounded-lg border border-[#344459] py-3 text-center text-sm font-medium text-slate-300 transition hover:bg-[#172538]"
                      >
                        Sign In
                      </Link>

                      <Link
                        href="/sign-up"
                        onClick={() => setOpen(false)}
                        className="rounded-lg bg-emerald-600 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-500"
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