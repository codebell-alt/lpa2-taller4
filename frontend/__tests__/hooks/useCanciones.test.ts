/**
 * Pruebas para hooks de Canciones
 * Autor: Isabella Ramirez Franco
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCanciones } from '@/hooks/useCanciones'
import React from 'react'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children)
  }
  return Wrapper
}

describe('useCanciones Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debe retornar la estructura correcta del hook', () => {
    const { result } = renderHook(() => useCanciones(), {
      wrapper: createWrapper(),
    })

    expect(result.current).toHaveProperty('canciones')
    expect(result.current.canciones).toHaveProperty('isLoading')
    expect(result.current.canciones).toHaveProperty('error')
  })

  it('debe manejar el estado de carga correctamente', () => {
    const { result } = renderHook(() => useCanciones(), {
      wrapper: createWrapper(),
    })

    expect(result.current.canciones.isLoading).toBeDefined()
  })
})
