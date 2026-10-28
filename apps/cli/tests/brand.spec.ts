import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  ART_WIDTH,
  BRAND_ASCII_ART,
  BRAND_COLORS,
  BRAND_NAME,
  BRAND_TAGLINE,
  printBanner,
  renderBanner,
  shouldPrintBanner,
} from '../src/brand.ts'

afterEach(() => {
  vi.restoreAllMocks()
  delete process.env.NO_COLOR
})

describe('brand module', () => {
  it('exposes canonical brand constants', () => {
    expect(BRAND_NAME).toBe('helloglitch')
    expect(BRAND_TAGLINE).toBe('new era for vibe coder')
    expect(BRAND_ASCII_ART.length).toBeGreaterThan(0)
    expect(ART_WIDTH).toBe(87)
    expect(BRAND_COLORS.darkRed).toEqual({ r: 139, g: 0, b: 0 })
    expect(BRAND_COLORS.brightRed).toEqual({ r: 255, g: 68, b: 68 })
  })

  it('renders full truecolor ASCII banner when width is sufficient', () => {
    const rendered = renderBanner({ forceColor: true, columns: 100 })
    expect(rendered).toContain('\x1b[38;2;')
    expect(rendered).toContain('new era for vibe coder')
    const plain = rendered.replace(/\x1b\[[0-9;]*m/gu, '')
    expect(plain).toContain('██╗')
    expect(plain).toContain('new era for vibe coder')
  })

  it('falls back to compact bold-red line when terminal width is smaller than art width', () => {
    const rendered = renderBanner({ forceColor: true, columns: 80 })
    expect(rendered).not.toContain('██╗')
    expect(rendered).toContain('helloglitch')
    expect(rendered).toContain('new era for vibe coder')
    expect(rendered).toContain('\x1b[1;38;2;')
  })

  it('renders without escape codes when NO_COLOR is set (full width)', () => {
    process.env.NO_COLOR = '1'
    const rendered = renderBanner({ forceColor: false, columns: 100 })
    expect(rendered).not.toContain('\x1b')
    expect(rendered).toContain('██╗')
    expect(rendered).toContain('new era for vibe coder')
  })

  it('renders without escape codes when NO_COLOR is set (compact fallback)', () => {
    process.env.NO_COLOR = '1'
    const rendered = renderBanner({ forceColor: false, columns: 60 })
    expect(rendered).not.toContain('\x1b')
    expect(rendered).not.toContain('██╗')
    expect(rendered).toBe('helloglitch\n  new era for vibe coder\n')
  })

  it('determines whether to print banner based on TTY and profile', () => {
    const original = Object.getOwnPropertyDescriptor(process.stdout, 'isTTY')
    try {
      Object.defineProperty(process.stdout, 'isTTY', { value: false, configurable: true, writable: true })
      expect(shouldPrintBanner('web')).toBe(false)
      expect(shouldPrintBanner(undefined)).toBe(false)

      Object.defineProperty(process.stdout, 'isTTY', { value: true, configurable: true, writable: true })
      expect(shouldPrintBanner('web')).toBe(true)
      expect(shouldPrintBanner(undefined)).toBe(true)
      expect(shouldPrintBanner('custom')).toBe(true)
      expect(shouldPrintBanner('headless')).toBe(false)
      expect(shouldPrintBanner('acp')).toBe(false)
      expect(shouldPrintBanner('sdk')).toBe(false)
      expect(shouldPrintBanner('sdk-minimal')).toBe(false)
    } finally {
      if (original !== undefined) {
        Object.defineProperty(process.stdout, 'isTTY', original)
      } else {
        delete (process.stdout as { isTTY?: boolean }).isTTY
      }
    }
  })

  it('prints the banner to stdout via printBanner', () => {
    const write = vi.spyOn(process.stdout, 'write').mockReturnValue(true)
    printBanner({ forceColor: true, columns: 100 })
    expect(write).toHaveBeenCalledOnce()
    expect(write.mock.calls[0]![0]).toContain('new era for vibe coder')
  })
})
