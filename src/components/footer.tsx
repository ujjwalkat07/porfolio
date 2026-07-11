import { Github, Linkedin, Twitter, Youtube, Instagram, Facebook } from "@/components/icons"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socials = [
    { name: "GitHub", href: "https://github.com/ujjwalkat07", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/ujjwalkatiyar07", icon: Linkedin },
    { name: "X (Twitter)", href: "https://x.com/ujjwalkatiyar07", icon: Twitter },
  ]

  const legalLinks = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Disclaimer", href: "/terms" },
  ]

  return (
    <footer className="flex flex-col gap-6 py-8 border-t border-border/40 mt-8 transition-colors duration-300">
      {/* Top Row: Name and Legal/Sub Pages */}
      <div className="flex flex-col gap-4 items-center justify-between sm:flex-row text-center sm:text-left">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Ujjwal Katiyar
          </span>
          <span className="text-xs text-muted-foreground font-light">
            Full Stack Engineer &amp; Web Systems Architect
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {legalLinks.map((link) => (
            <Link
              key={link.label}
              id={`footer-link-${link.label.toLowerCase().replace(/[^a-z0-9]/g, "")}`}
              href={link.href}
              className="text-xs font-normal text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Row: Info and Socials */}
      <div className="flex flex-col gap-4 pt-4 border-t border-border/10 items-center justify-between sm:flex-row text-center sm:text-left">
        <span className="text-xs text-muted-foreground/80 font-light">
          Noida, India · © {currentYear} Ujjwal Katiyar. All rights reserved.
        </span>
        <div className="flex items-center gap-1.5 -mr-2">
          {socials.map((social) => {
            const Icon = social.icon
            return (
              <a
                key={social.name}
                id={`footer-social-${social.name.toLowerCase().replace(/[^a-z0-9]/g, "")}`}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Ujjwal Katiyar's ${social.name} profile`}
                className="flex items-center justify-center w-10 h-10 text-muted-foreground/60 hover:text-foreground hover:scale-110 active:scale-90 transition-all duration-200"
              >
                <Icon className="h-4 w-4" />
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
