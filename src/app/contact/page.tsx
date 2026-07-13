import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Mail, MapPin } from "lucide-react"
import { Linkedin, Github, Twitter } from "@/components/icons"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact | Ujjwal Katiyar — Full Stack Engineer",
  description: "Get in touch with Ujjwal Katiyar. Send a message, find contact details, or connect on LinkedIn and GitHub.",
  alternates: {
    canonical: "https://ujjwalkatiyar.in/contact",
  },
}

export default function ContactPage() {
  const contactDetails = [
    {
      icon: Mail,
      title: "Email",
      value: "ukcode07@gmail.com",
      href: "mailto:ukcode07@gmail.com",
      label: "Send email",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Noida, Uttar Pradesh, India",
      href: null,
      label: null,
    },
  ]

  const socials = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/ujjwalkatiyar07", icon: Linkedin },
    { name: "GitHub", href: "https://github.com/ujjwalkat07", icon: Github },
    { name: "X (Twitter)", href: "https://x.com/ujjwalkatiyar07", icon: Twitter },
  ]

  return (
    <main className="min-h-screen bg-background py-16 px-6 antialiased selection:bg-indigo-500/10 selection:text-indigo-500">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Back Link */}
        <Link
          id="contact-back-link"
          href="/"
          className="self-start inline-flex items-center gap-2 text-xs font-normal text-muted-foreground px-4 py-2.5 border border-border/50 rounded-lg bg-card/50 hover:bg-muted hover:text-foreground hover:border-foreground/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xs"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Get in touch
          </h1>
          <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-xl">
            Have an opportunity, a project proposal, or just want to say hi? Drop a message below or reach out via email.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pt-4 border-t border-border/20">
          
          {/* Contact Details Column */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              Contact Details
            </h2>
            
            <div className="flex flex-col gap-4">
              {contactDetails.map((detail, idx) => {
                const Icon = detail.icon
                return (
                  <div key={idx} className="flex items-start gap-4 p-4 border border-border/40 bg-muted/10 rounded-xl">
                    <span className="p-2 rounded-lg bg-indigo-500/5 text-indigo-500 flex-shrink-0">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                        {detail.title}
                      </span>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          aria-label={detail.label || undefined}
                          className="text-sm font-normal text-foreground hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors break-all"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <span className="text-sm font-normal text-foreground break-all">
                          {detail.value}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Socials Connection */}
            <div className="flex flex-col gap-3 pt-2">
              <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                Connect elsewhere
              </span>
              <div className="flex items-center gap-2">
                {socials.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      id={`contact-social-${social.name.toLowerCase().replace(/[^a-z0-9]/g, "")}`}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit Ujjwal Katiyar's ${social.name}`}
                      className="flex items-center justify-center w-11 h-11 border border-border/40 bg-card rounded-xl text-muted-foreground hover:text-foreground hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </a>
                  )
                })}
              </div>
            </div>

          </div>

          {/* Form Column */}
          <div className="md:col-span-3">
            <ContactForm />
          </div>

        </div>

      </div>
    </main>
  )
}
