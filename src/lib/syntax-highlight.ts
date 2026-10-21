/**
 * Syntax highlighter and code block formatter
 * Matches modern shadcn dark code blocks with line numbers and syntax coloring.
 */

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function highlightTokens(line: string): string {
  if (!line || line.trim() === "") {
    return "&nbsp;"
  }

  const tokens: string[] = []
  const saveToken = (html: string) => {
    const placeholder = `\x00TOK_${tokens.length}\x00`
    tokens.push(html)
    return placeholder
  }

  let code = line

  // 1. Comments (// and /* */ and #)
  code = code.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*)/g, (match) => {
    return saveToken(`<span class="text-neutral-500 italic">${escapeHtml(match)}</span>`)
  })

  // 2. Strings ('...', "...", `...`)
  code = code.replace(/('([^'\\]|\\.)*'|"([^"\\]|\\.)*"|`([^`\\]|\\.)*`)/g, (match) => {
    return saveToken(`<span class="text-emerald-400">${escapeHtml(match)}</span>`)
  })

  // 3. Escape the remaining code
  code = escapeHtml(code)

  // 4. Keywords (rose/pink matching the screenshot)
  const keywordsRegex = /\b(import|export|from|const|let|var|await|async|function|return|class|extends|if|else|try|catch|finally|new|typeof|instanceof|type|interface|as|default|switch|case|break|continue|while|for|of|in|yield)\b/g
  code = code.replace(keywordsRegex, '<span class="text-[#f43f5e] font-medium">$1</span>')

  // 5. Booleans, null & undefined (purple)
  const booleansRegex = /\b(true|false|null|undefined)\b/g
  code = code.replace(booleansRegex, '<span class="text-purple-400">$1</span>')

  // 6. Numeric literals (sky cyan)
  const numbersRegex = /\b(\d+(\.\d+)?)\b/g
  code = code.replace(numbersRegex, '<span class="text-sky-400">$1</span>')

  // 7. Method/Function calls
  const methodRegex = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()/g
  code = code.replace(methodRegex, (match) => {
    // Avoid double-wrapping keywords
    if (/^(import|export|from|const|let|var|await|async|function|return|class|if|else|try|catch)$/.test(match)) {
      return match
    }
    return `<span class="text-zinc-100">${match}</span>`
  })

  // 8. Restore strings and comments
  for (let i = 0; i < tokens.length; i++) {
    code = code.replace(`\x00TOK_${i}\x00`, tokens[i])
  }

  return code
}

export function renderShadcnCodeBlock(codeText: string, lang?: string): string {
  const encoded = encodeURIComponent(codeText)
  const rawLines = codeText.trimEnd().split("\n")

  const linesHtml = rawLines
    .map((line, idx) => {
      const lineNum = idx + 1
      const highlighted = highlightTokens(line)
      return `
        <div class="code-line flex items-baseline leading-relaxed font-mono text-xs sm:text-[13px] hover:bg-white/[0.02] transition-colors">
          <span class="select-none text-right w-7 sm:w-9 pr-4 text-neutral-600 font-mono text-xs sm:text-[13px] shrink-0 font-normal">${lineNum}</span>
          <span class="flex-1 whitespace-pre text-zinc-100 font-mono text-xs sm:text-[13px]">${highlighted}</span>
        </div>
      `.trim()
    })
    .join("\n")

  return `
    <div class="shadcn-code-block not-prose relative my-6 sm:my-8 rounded-xl sm:rounded-2xl border border-neutral-800/80 bg-[#09090b] text-[#f4f4f5] overflow-hidden shadow-lg group">
      <!-- Shadcn Minimal Copy Button in top right -->
      <button
        type="button"
        class="code-copy-btn absolute top-3.5 right-3.5 z-10 inline-flex items-center justify-center h-8 w-8 rounded-lg border border-neutral-800/90 bg-neutral-900/90 text-neutral-400 hover:text-white hover:bg-neutral-800 hover:border-neutral-700 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200 cursor-pointer shadow-xs backdrop-blur-xs"
        data-code="${encoded}"
        aria-label="Copy code snippet"
      >
        <svg class="copy-icon h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <svg class="check-icon h-4 w-4 text-emerald-400 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </button>

      <!-- Code lines container with horizontal scroll -->
      <div class="overflow-x-auto p-4 sm:p-5 scrollbar-thin">
        <div class="inline-block min-w-full font-mono">
          ${linesHtml}
        </div>
      </div>
    </div>
  `.trim()
}
