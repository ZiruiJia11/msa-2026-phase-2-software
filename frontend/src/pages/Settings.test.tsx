import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Settings from './Settings'

afterEach(() => {
  cleanup()
})

describe('Settings', () => {
  it('requests dark mode when the theme toggle is enabled', () => {
    const onThemeChange = vi.fn()

    render(<Settings theme="light" onThemeChange={onThemeChange} />)

    fireEvent.click(screen.getByRole('checkbox'))

    expect(screen.getByText('Light mode')).toBeInTheDocument()
    expect(onThemeChange).toHaveBeenCalledWith('dark')
  })

  it('requests light mode when the theme toggle is disabled', () => {
    const onThemeChange = vi.fn()

    render(<Settings theme="dark" onThemeChange={onThemeChange} />)

    fireEvent.click(screen.getByRole('checkbox'))

    expect(screen.getByText('Dark mode')).toBeInTheDocument()
    expect(onThemeChange).toHaveBeenCalledWith('light')
  })
})
