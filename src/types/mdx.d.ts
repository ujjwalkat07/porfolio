import type { ComponentType } from "react"

declare module "*.md" {
  const Component: ComponentType<{ components?: Record<string, unknown> }>
  export default Component
}

declare module "*.mdx" {
  const Component: ComponentType<{ components?: Record<string, unknown> }>
  export default Component
}
