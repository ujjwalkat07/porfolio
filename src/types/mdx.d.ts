import type { ComponentType } from "react"

declare module "*.md" {
  const Component: ComponentType<{ components?: Record<string, any> }>
  export default Component
}

declare module "*.mdx" {
  const Component: ComponentType<{ components?: Record<string, any> }>
  export default Component
}

