import type { IconProps } from './icons/props.ts'
import { BRAND_ALT_MARK, BRAND_ASSETS } from './brand.ts'

/** Native viewBox of {@link FishLogo} (width and height in user units). */
export const FISH_LOGO_VIEWBOX = { width: 24, height: 24 }

/** Compatibility path export for callers referencing vector contour geometry. */
export const FISH_LOGO_PATH = ''

/**
 * Render the helloglitch brand mark.
 * @param props.size - width in px (default 24; height maintains square 1:1 ratio).
 * @param props.className - extra class for layout placement.
 * @returns the logo svg element (aria-hidden; decorative brand art).
 */
export function FishLogo({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 1536 1536"
      fill="none"
      aria-hidden="true"
      role="img"
      aria-label={BRAND_ALT_MARK}
    >
      <image width="1536" height="1536" href={BRAND_ASSETS.markSvg} xlinkHref={BRAND_ASSETS.markSvg} />
    </svg>
  )
}
