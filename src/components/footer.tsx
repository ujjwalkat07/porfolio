import { Github, Linkedin, Twitter, Youtube, Instagram, Facebook } from "@/components/icons"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socials = [
    { name: "GitHub", href: "https://github.com/ujjwalkat07", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/ujjwalkatiyar07", icon: Linkedin },
    { name: "X (Twitter)", href: "https://x.com/ujjwalkat07", icon: Twitter }
  ]

  return (
    <footer className="flex flex-col gap-4 py-6 border-t border-border/40 mt-6 items-center justify-between text-center sm:flex-row sm:text-left transition-colors duration-300">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold tracking-tight text-foreground">
          Ujjwal Katiyar
        </span>
        <span className="text-xs text-muted-foreground font-normal">
          Full Stack Engineer · Noida, India · {currentYear}
        </span>
      </div>
      <div className="flex items-center gap-3">
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
              className="flex items-center justify-center w-11 h-11 text-muted-foreground/60 hover:text-foreground hover:scale-110 active:scale-90 transition-all duration-200"
            >
              <Icon className="h-4.5 w-4.5" />
            </a>
          )
        })}
      </div>
    </footer>
  )
}
