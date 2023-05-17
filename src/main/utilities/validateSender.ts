export function validateSender(frame: { url: string | URL }): boolean {
  // Value the host of the URL using an actual URL parser and an allowlist
  if ((new URL(frame.url)).host === 'electronjs.org' || (new URL(frame.url)).host === 'localhost:1212') return true
  return false
}
//
