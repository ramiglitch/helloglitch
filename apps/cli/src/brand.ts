/**
 * Brand constants, ASCII art banner, and terminal rendering for helloglitch.
 * @module @deepseek-ai/dsh/brand
 */

/** Canonical product brand name. */
export const BRAND_NAME = 'helloglitch'

/** Brand tagline displayed beneath the startup banner. */
export const BRAND_TAGLINE = 'new era for vibe coder'

/** Large, blocky ANSI Shadow ASCII art spelling helloglitch with a subtle glitch offset. */
export const BRAND_ASCII_ART: readonly string[] = [
  '██╗  ██╗███████╗██╗     ██╗      ██████╗  ██████╗ ██╗     ██╗████████╗ ██████╗██╗  ██╗',
  '██║  ██║██╔════╝██║     ██║     ██╔═══██╗██╔════╝ ██║     ██║╚══██╔══╝██╔════╝██║  ██║',
  ' ███████║█████╗  ██║     ██║     ██║   ██║██║  ███╗██║     ██║   ██║   ██║     ███████║',
  '██╔══██║██╔══╝  ██║     ██║     ██║   ██║██║   ██║██║     ██║   ██║   ██║     ██╔══██║',
  '██║  ██║███████╗███████╗███████╗╚██████╔╝╚██████╔╝███████╗██║   ██║   ╚██████╗██║  ██║',
  '╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝  ╚═════╝ ╚══════╝╚═╝   ╚═╝    ╚═════╝╚═╝  ╚═╝',
]

/** RGB color stop definition. */
export interface RgbColor {
  r: number
  g: number
  b: number
}

/** Brand gradient color stops: dark red to bright red. */
export const BRAND_COLORS = {
  darkRed: { r: 139, g: 0, b: 0 } as RgbColor,
  brightRed: { r: 255, g: 68, b: 68 } as RgbColor,
} as const

/** Maximum character width of the ASCII art lines. */
export const ART_WIDTH = Math.max(...BRAND_ASCII_ART.map(line => line.length))

/** Profiles that run machine or non-interactive protocols where banners must not print. */
const NON_INTERACTIVE_PROFILES = new Set(['headless', 'acp', 'sdk', 'sdk-minimal'])

/**
 * Linearly interpolate between two RGB colors.
 * @param from - Start color stop.
 * @param to - End color stop.
 * @param t - Normalized progress between 0 and 1.
 * @returns Interpolated RGB color.
 */
function interpolateColor(from: RgbColor, to: RgbColor, t: number): RgbColor {
  return {
    r: Math.round(from.r + (to.r - from.r) * t),
    g: Math.round(from.g + (to.g - from.g) * t),
    b: Math.round(from.b + (to.b - from.b) * t),
  }
}

/** Options for banner formatting and rendering. */
export interface RenderBannerOptions {
  /** Force ANSI truecolor escape codes even if NO_COLOR is set or TTY is absent. */
  forceColor?: boolean
  /** Explicit terminal width in columns; defaults to process.stdout.columns. */
  columns?: number
}

/**
 * Render the helloglitch banner as a formatted string.
 * @param options - Custom rendering options.
 * @returns Formatted banner text.
 */
export function renderBanner(options: RenderBannerOptions = {}): string {
  const forceColor = options.forceColor === true
  const noColor = !forceColor && process.env.NO_COLOR !== undefined && process.env.NO_COLOR !== ''
  const columns = options.columns ?? process.stdout.columns ?? 80

  if (columns < ART_WIDTH) {
    if (noColor) {
      return `${BRAND_NAME}\n  ${BRAND_TAGLINE}\n`
    }
    const { r, g, b } = BRAND_COLORS.brightRed
    return `\x1b[1;38;2;${r};${g};${b}m${BRAND_NAME}\x1b[0m\n  ${BRAND_TAGLINE}\n`
  }

  if (noColor) {
    return `${BRAND_ASCII_ART.join('\n')}\n  ${BRAND_TAGLINE}\n`
  }

  const lines = BRAND_ASCII_ART.map((line) => {
    let out = ''
    const len = line.length
    for (let i = 0; i < len; i += 1) {
      const t = len > 1 ? i / (len - 1) : 0
      const { r, g, b } = interpolateColor(BRAND_COLORS.darkRed, BRAND_COLORS.brightRed, t)
      out += `\x1b[38;2;${r};${g};${b}m${line[i]}`
    }
    return `${out}\x1b[0m`
  })

  const { r, g, b } = BRAND_COLORS.brightRed
  const tagline = `\x1b[38;2;${r};${g};${b}m  ${BRAND_TAGLINE}\x1b[0m`
  return `${lines.join('\n')}\n${tagline}\n`
}

/**
 * Whether the banner should be printed for the given profile and environment.
 * @param profile - Booted profile name.
 * @returns Whether interactive startup banner display is active.
 */
export function shouldPrintBanner(profile?: string): boolean {
  if (!process.stdout.isTTY) return false
  if (profile !== undefined && NON_INTERACTIVE_PROFILES.has(profile.toLowerCase())) return false
  return true
}

/**
 * Print the helloglitch startup banner to stdout.
 * @param options - Custom rendering options.
 */
export function printBanner(options: RenderBannerOptions = {}): void {
  process.stdout.write(renderBanner(options))
}
