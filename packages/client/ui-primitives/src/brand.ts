/**
 * Canonical brand definitions and asset references for helloglitch.
 * Centralizes brand names, accessible alt labels, theme colors, and public asset paths.
 */

/** The product brand display name. */
export const BRAND_NAME = 'helloglitch'

/** Accessible alt text for the brand mark. */
export const BRAND_ALT_MARK = 'helloglitch mark'

/** Accessible alt text for the brand logo wordmark. */
export const BRAND_ALT_LOGO = 'helloglitch logo'

/** Accessible alt text for the combination banner. */
export const BRAND_ALT_BANNER = 'helloglitch banner'

/** Core brand color tokens. */
export const BRAND_COLORS = {
  primary: '#FF2A2A',
  backgroundDark: '#0B0B0F',
  cyanGlitch: '#00FFFF',
} as const

/** Web public URLs for brand artwork assets. */
export const BRAND_ASSETS = {
  markSvg: '/brand/helloglitch-mark.svg',
  markPng: '/brand/helloglitch-mark.png',
  logoSvg: '/brand/helloglitch-logo.svg',
  logoPng: '/brand/helloglitch-logo.png',
  bannerSvg: '/brand/helloglitch-banner.svg',
  bannerPng: '/brand/helloglitch-banner.png',
  faviconSvg: '/favicon.svg',
  faviconDarkSvg: '/favicon-dark.svg',
  faviconIco: '/favicon.ico',
  appleTouchIcon: '/apple-touch-icon.png',
  icon192: '/icon-192.png',
  icon512: '/icon-512.png',
  iconMaskable512: '/icon-maskable-512.png',
} as const
