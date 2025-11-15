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
  function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children)
  }
  return Wrapper
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
    expect(result.current.usuarios).toHaveProperty('isLoading')
    expect(result.current.usuarios).toHaveProperty('error')
  })

  it('debe manejar el estado de carga correctamente', () => {
    const { result } = renderHook(() => useUsuarios(), {
      wrapper: createWrapper(),
    })

    expect(result.current.usuarios.isLoading).toBeDefined()
  })
})
