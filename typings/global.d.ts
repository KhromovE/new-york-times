declare module '*.png' {
  const content: string
  export default content
}

declare module '*.svg' {
  const content: React.FC
  export default content
}

declare module '*.woff2' {
  const content: string
  export default content
}

declare namespace global {
  declare function camelcaseKeys<T extends { [key: string]: any }, D>(
    input: T,
    options?: camelcaseKeys.Options,
  ): D
}
