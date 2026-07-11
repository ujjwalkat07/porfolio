import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center antialiased selection:bg-indigo-500/10 selection:text-indigo-500">
      <div className="flex flex-col items-center gap-4 max-w-md">
        {/* Error Code Badge */}
        <span className="text-xs font-semibold tracking-widest text-indigo-500 uppercase select-none">
          404 Error
        </span>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Page not found
        </h1>

        {/* Description */}
        <p className="text-sm font-light text-muted-foreground leading-relaxed">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
        </p>

        {/* Back Link */}
        <Link
          id="notfound-back-link"
          href="/"
          className="inline-flex items-center gap-2 text-xs font-normal text-muted-foreground px-4 py-2 border border-border/50 rounded-lg bg-card/50 hover:bg-muted hover:text-foreground hover:border-foreground/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xs mt-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to homepage</span>
        </Link>
      </div>
    </div>
  )
}
