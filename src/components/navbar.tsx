"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/#projects" },
  { label: "GitHub", href: "/github" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  function isActive(href: string) {
    if (href === "/#projects") return pathname === "/"
    return pathname.startsWith(href)
  }

  // Close mobile menu when pathname changes
  React.useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 px-4 sm:px-6 md:px-10 backdrop-blur-md transition-colors duration-300">
      <div className="flex h-14 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight hover:text-foreground/80 transition-colors"
          >
            Ujjwal Katiyar
          </Link>

          {/* Desktop Navigation Links */}
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

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile Hamburger Toggle Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex md:hidden items-center justify-center h-9 w-9 rounded-md border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 border-t border-border/30 transition-all duration-200">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-sm px-4 py-2.5 rounded-lg transition-colors ${
                    isActive(link.href)
                      ? "bg-muted text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40 font-normal"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

