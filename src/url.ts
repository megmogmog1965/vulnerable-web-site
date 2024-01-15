import getConfig from 'next/config'

export function isValidUrl(urlStr: string): boolean {
  try {
    // if the url is invalid, throws an exception.
    const url = new URL(urlStr)

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

  } catch (err) {
    return false
  }
}