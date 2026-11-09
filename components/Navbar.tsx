"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/app/images/logo.png";
import { Menu, User, LogOut, ChevronDown } from "lucide-react";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import {
Sheet,
SheetContent,
SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
const [open, setOpen] = useState(false);
const [showProfile, setShowProfile] = useState(false);

const router = useRouter();

const { data: session, isPending } = authClient.useSession();

const navLinks = [
{ name: "Browse Jobs", href: "/jobs" },
{ name: "Company", href: "/company" },
{ name: "Pricing", href: "/pricing" },
{ name: "Dashboard", href: `/dashboard/${session?.user?.role || 'seeker'}` },
] as const

const handleLogout = async () => {
await authClient.signOut();
setShowProfile(false);
setOpen(false);
router.push("/");
router.refresh();
};

return (
<header className="w-full bg-[#121212] border-b border-neutral-800">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
      <nav className="hidden md:flex items-center gap-8">
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
      <div className="hidden md:flex items-center gap-4">
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
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold">
            {session.user.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}

        <span>{session.user.name}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {showProfile && (
        <div className="absolute right-0 top-14 w-44 bg-[#181818] border border-neutral-700 rounded-lg p-2 z-50">
          <Link
            href="/profile"
            onClick={() => setShowProfile(false)}
            className="flex items-center gap-2 p-3 text-white hover:bg-neutral-800 rounded"
          >
            <User className="w-4 h-4" />
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full p-3 text-red-400 hover:bg-neutral-800 rounded"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    <>
      <Link href="/sign-in" className="text-sm text-neutral-300 hover:text-white px-4 py-2">
        Sign In
      </Link>

      <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
        <Link href="/sign-up">Get Started</Link>
      </Button>
    </>
  )}
</div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>

          <SheetTrigger className="h-10 w-10 flex items-center justify-center rounded-md border border-neutral-700 text-white">
            <Menu className="w-5 h-5" />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="bg-[#121212] border-neutral-800 text-white w-[280px]"
          >

            <div className="flex flex-col gap-8 mt-8">

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
              <div className="border-t border-neutral-800 pt-6 flex flex-col gap-3">

                {!isPending && (
                  session?.user ? (
                    <>
                      <div className="flex items-center gap-3 text-white">
                        {session.user.image ? (
                          <img
                            src={session.user.image}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold">
                            {session.user.name?.charAt(0).toUpperCase() || "U"}
                          </div>
                        )}

                        <span>{session.user.name}</span>
                      </div>

                      <Link
                        href="/profile"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 p-3 text-white hover:bg-neutral-800 rounded"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 p-3 text-red-400 hover:bg-neutral-800 rounded"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/sign-in"
                        onClick={() => setOpen(false)}
                        className="w-full text-center border border-neutral-700 py-2 rounded-md"
                      >
                        Sign In
                      </Link>

                      <Link
                        href="/sign-up"
                        onClick={() => setOpen(false)}
                        className="w-full text-center bg-blue-600 py-2 rounded-md"
                      >
                        Get Started
                      </Link>
                    </>
                  )
                )}

              </div>
            </div>

          </SheetContent>
        </Sheet>
      </div>

    </div>
  </div>
</header>

);
};

export default Navbar;