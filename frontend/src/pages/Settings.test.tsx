import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { useThemeStore } from '../stores/useThemeStore'
import Settings from './Settings'

afterEach(() => {
  cleanup()
  window.localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  useThemeStore.setState({ theme: 'light' })
})

describe('Settings', () => {
  it('stores dark mode when the theme toggle is enabled', () => {
    useThemeStore.setState({ theme: 'light' })
    render(<Settings />)

    fireEvent.click(screen.getByRole('checkbox'))

    expect(screen.getByText('Dark mode')).toBeInTheDocument()
    expect(useThemeStore.getState().theme).toBe('dark')
    expect(window.localStorage.getItem('fitquest-theme')).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('stores light mode when the theme toggle is disabled', () => {
    useThemeStore.setState({ theme: 'dark' })
    render(<Settings />)

    fireEvent.click(screen.getByRole('checkbox'))

    expect(screen.getByText('Light mode')).toBeInTheDocument()
    expect(useThemeStore.getState().theme).toBe('light')
    expect(window.localStorage.getItem('fitquest-theme')).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
  })
})
