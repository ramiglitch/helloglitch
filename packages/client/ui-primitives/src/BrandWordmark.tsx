import type { IconProps } from './icons/props.ts'
import { BRAND_ALT_BANNER, BRAND_ALT_LOGO, BRAND_ASSETS } from './brand.ts'

/** Display options for the official brand wordmark. */
export interface BrandWordmarkProps extends IconProps {
  /** Whether to include the leading mark / combo artwork; defaults to true. */
  includeMark?: boolean | undefined
}

/**
 * Render the full helloglitch brand wordmark or combination banner.
 * @param props.size - height in px (default 24; width follows aspect ratio).
 * @param props.className - extra class for layout placement.
 * @param props.includeMark - whether to include the leading brand mark (combo banner).
 * @returns the wordmark svg element (aria-hidden decorative brand art).
 */
export function BrandWordmark({ size = 24, className, includeMark = true }: BrandWordmarkProps) {
  if (includeMark) {
    // Combination banner (cat mark + wordmark): content bounds 1440 x 825
    const width = Math.round((size * 1440) / 825)
    return (
      <svg
        width={width}
        height={size}
        className={className}
        viewBox="60 0 1440 825"
        fill="none"
        aria-hidden="true"
        role="img"
        aria-label={BRAND_ALT_BANNER}
      >
        <image width="1536" height="864" href={BRAND_ASSETS.bannerSvg} xlinkHref={BRAND_ASSETS.bannerSvg} />
      </svg>
    )
  }

  // Pure horizontal wordmark: content bounds 1470 x 450
  const width = Math.round((size * 1470) / 450)
  return (
    <svg
      width={width}
      height={size}
      className={className}
      viewBox="45 195 1470 450"
      fill="none"
      aria-hidden="true"
      role="img"
      aria-label={BRAND_ALT_LOGO}
    >
      <image width="1536" height="864" href={BRAND_ASSETS.logoSvg} xlinkHref={BRAND_ASSETS.logoSvg} />
    </svg>
  )
}
