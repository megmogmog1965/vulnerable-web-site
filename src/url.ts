import getConfig from 'next/config'

export function isValidUrl(urlStr: string): boolean {
  return validateUrl(urlStr) !== null
}

export function isAllowedUrl(urlStr: string): boolean {
  const url = validateUrl(urlStr)
  if (url === null) {
    return false
  }

  // ignore SSRF validation, if ENABLE_SSRF is `true`.
  if (process.env.ENABLE_SSRF === 'true') {
    return true
  }

  // SSRF validation.
  const { publicRuntimeConfig } = getConfig()
  if (!publicRuntimeConfig.remoteHosts.includes(url.host)) {
    return false
  }

  // all green.
  return true
}

function validateUrl(urlStr: string): URL | null {
  try {
    // if the url is invalid, throws an exception.
    return new URL(urlStr)

  } catch (err) {
    return null
  }
}