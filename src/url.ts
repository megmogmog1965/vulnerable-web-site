import getConfig from 'next/config'

export function isValidUrl(urlStr: string): boolean {
  try {
    // if the url is invalid, throws an exception.
    const url = new URL(urlStr)

    const { publicRuntimeConfig } = getConfig()
    if (!publicRuntimeConfig.remoteHosts.includes(url.host)) {
      return false
    }

    return true

  } catch (err) {
    return false
  }
}