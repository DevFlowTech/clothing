"use client";

import Link from "next/link";
import { siteConfig, footerLinks } from "@/config/site";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert("Thanks for subscribing to our newsletter!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-black text-white border-t border-zinc-800">
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand & Newsletter - Left Side */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link
              href="/"
              className="font-sans text-3xl font-black uppercase tracking-tighter mb-6"
            >
              {siteConfig.name}
            </Link>
            <p className="text-zinc-400 mb-8 max-w-sm leading-relaxed">
              Elevating streetwear culture with premium materials and
              avant-garde design. Join the movement.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-sm gap-2"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 rounded-none focus-visible:ring-zinc-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="bg-white text-black hover:bg-zinc-200 rounded-none font-bold uppercase"
              >
                Join
              </Button>
            </form>
          </div>

          {/* Links - Right Side */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-zinc-500">
                Shop
              </h4>
              <ul className="space-y-4">
                {footerLinks.shop.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-zinc-300 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-zinc-500">
                Support
              </h4>
              <ul className="space-y-4">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-zinc-300 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-zinc-500">
                Company
              </h4>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-zinc-300 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-zinc-500">
                Social
              </h4>
              <div className="flex gap-4">
                <Link
                  href={siteConfig.links.instagram}
                  className="text-white hover:text-zinc-400"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href={siteConfig.links.twitter}
                  className="text-white hover:text-zinc-400"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href={siteConfig.links.facebook}
                  className="text-white hover:text-zinc-400"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600 uppercase tracking-widest">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-xs text-zinc-600 hover:text-zinc-400 uppercase tracking-widest"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-zinc-600 hover:text-zinc-400 uppercase tracking-widest"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
