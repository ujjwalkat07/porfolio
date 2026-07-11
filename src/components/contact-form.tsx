"use client"

import * as React from "react"
import { Send, CheckCircle2, AlertCircle } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = React.useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Basic Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus("error")
      setErrorMsg("Please fill out all required fields.")
      return
    }

    setStatus("submitting")

    // Simulate API request
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (err) {
      setStatus("error")
      setErrorMsg("Something went wrong. Please try again later.")
    }
  }

  return (
    <div className="w-full border border-border/50 bg-card/45 rounded-2xl p-6 md:p-8 shadow-xs">
      {status === "success" ? (
        <div className="flex flex-col items-center justify-center text-center py-10 gap-4 transition-all duration-300">
          <CheckCircle2 className="h-12 w-12 text-emerald-500 animate-bounce" />
          <h3 className="text-lg font-bold text-foreground">Message Sent!</h3>
          <p className="text-sm font-light text-muted-foreground max-w-sm">
            Thank you for reaching out. Ujjwal will get back to you as soon as possible.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 text-xs font-normal text-muted-foreground px-4 py-2 border border-border/50 rounded-lg bg-card/50 hover:bg-muted hover:text-foreground transition-all"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {status === "error" && (
            <div className="flex items-center gap-3 p-4 border border-rose-500/20 bg-rose-500/5 rounded-xl text-rose-500 text-xs">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Name Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-name" className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Your Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={status === "submitting"}
              placeholder="e.g. John Doe"
              className="w-full text-sm bg-muted/20 border border-border/60 rounded-xl px-4 py-2.5 text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-indigo-500/50 transition-all duration-200 disabled:opacity-50"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-email" className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={status === "submitting"}
              placeholder="e.g. john@example.com"
              className="w-full text-sm bg-muted/20 border border-border/60 rounded-xl px-4 py-2.5 text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-indigo-500/50 transition-all duration-200 disabled:opacity-50"
            />
          </div>

          {/* Subject Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-subject" className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Subject <span className="text-rose-500">*</span>
            </label>
            <input
              id="contact-subject"
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              disabled={status === "submitting"}
              placeholder="e.g. Partnership Inquiry"
              className="w-full text-sm bg-muted/20 border border-border/60 rounded-xl px-4 py-2.5 text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-indigo-500/50 transition-all duration-200 disabled:opacity-50"
            />
          </div>

          {/* Message Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-message" className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Message <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              disabled={status === "submitting"}
              placeholder="Write your message here..."
              className="w-full text-sm bg-muted/20 border border-border/60 rounded-xl px-4 py-2.5 text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-indigo-500/50 transition-all duration-200 resize-none disabled:opacity-50"
            />
          </div>

          {/* Submit Button */}
          <button
            id="contact-submit-button"
            type="submit"
            disabled={status === "submitting"}
            className="flex items-center justify-center gap-2 text-sm font-medium text-background bg-foreground hover:scale-[1.01] active:scale-[0.99] hover:bg-foreground/90 disabled:opacity-50 py-3 rounded-xl transition-all duration-200 cursor-pointer shadow-xs"
          >
            <Send className="h-4 w-4" />
            <span>{status === "submitting" ? "Sending..." : "Send Message"}</span>
          </button>
        </form>
      )}
    </div>
  )
}
