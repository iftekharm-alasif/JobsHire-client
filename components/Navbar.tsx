"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/images/logo.png";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
Sheet,
SheetContent,
SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
const [open, setOpen] = useState(false);

const navLinks = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Company", href: "/company" },
    { name: "Pricing", href: "/pricing" },
];

return (
    <header className="w-full bg-[#121212] border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex h-20 items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center shrink-0">
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
                            className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">

                    <Link
                        href="/sign-in"
                        className="text-sm font-medium text-neutral-300 hover:text-white transition-colors px-4 py-2"
                    >
                        Sign In
                    </Link>

                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5">
                        <Link href="/sign-up">
                            Get Started
                        </Link>
                    </Button>

                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>

                        <SheetTrigger className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-700 bg-transparent text-white hover:bg-neutral-800">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Open menu</span>
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="bg-[#121212] border-neutral-800 text-white w-[280px]"
                        >

                            <div className="flex flex-col gap-8 mt-8">

                                {/* Mobile Logo */}
                                <Link
                                    href="/"
                                    onClick={() => setOpen(false)}
                                >
                                    <Image
                                        src={logo}
                                        alt="Hire Loop Logo"
                                        width={140}
                                        height={45}
                                        className="object-contain"
                                    />
                                </Link>

                                {/* Mobile Navigation */}
                                <nav className="flex flex-col gap-5">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setOpen(false)}
                                            className="text-neutral-300 hover:text-white transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </nav>

                                {/* Mobile Actions */}
                                <div className="border-t border-neutral-800 pt-6 flex flex-col gap-3">

                                    <Link
                                        href="/sign-in"
                                        onClick={() => setOpen(false)}
                                        className="w-full text-center border border-neutral-700 text-white hover:bg-neutral-800 py-2 rounded-md"
                                    >
                                        Sign In
                                    </Link>

                                    <Link
                                        href="/sign-up"
                                        onClick={() => setOpen(false)}
                                        className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
                                    >
                                        Get Started
                                    </Link>

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