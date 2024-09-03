export function modifyUri(uri: string | null) {
  return uri?.endsWith('.html') ? uri.slice(0, -5) : uri
}
