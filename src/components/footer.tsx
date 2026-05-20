export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="flex flex-col gap-3 py-7 border-t border-border/40 mt-12 items-center justify-between text-center sm:flex-row sm:text-left transition-colors duration-300">
      <span className="text-sm font-semibold tracking-tight text-foreground">
        Ujjwal Katiyar
      </span>
      <span className="text-xs text-muted-foreground font-normal">
        Full Stack Engineer · Noida, India · {currentYear}
      </span>
    </footer>
  )
}
