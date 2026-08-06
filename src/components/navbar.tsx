"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export function Navbar() {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === "/#projects") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-border/40 bg-background/80 px-6 backdrop-blur-md transition-colors duration-300 md:px-10">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight hover:text-foreground/80 transition-colors"
        >
          Ujjwal Katiyar
        </Link>

        <ul className="hidden gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-xs font-normal px-3 py-1.5 rounded-md transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-muted text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <ThemeToggle />
    </nav>
  )
}
