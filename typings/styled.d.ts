import 'styled-components'
import 'react-router'

declare module 'react-router' {
  export function useParams(): Record<string, string>
}

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string

    colors: {
      main: string
      secondary: string
    }
  }
}
