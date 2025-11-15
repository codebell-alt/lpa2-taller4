/**
 * Pruebas para hooks de Usuarios
 * Autor: Isabella Ramirez Franco
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useUsuarios } from '@/hooks/useUsuarios'
import React from 'react'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('useUsuarios Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debe retornar la estructura correcta del hook', () => {
    const { result } = renderHook(() => useUsuarios(), {
      wrapper: createWrapper(),
    })

    expect(result.current).toHaveProperty('usuarios')
    expect(result.current).toHaveProperty('isLoading')
    expect(result.current).toHaveProperty('error')
  })

  it('debe manejar el estado de carga correctamente', () => {
    const { result } = renderHook(() => useUsuarios(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isLoading).toBeDefined()
  })
})
