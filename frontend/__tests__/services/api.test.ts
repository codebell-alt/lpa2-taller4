/**
 * Pruebas para servicios de API
 * Autor: Isabella Ramirez Franco
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { usuariosService } from '@/services/usuarios.service'
import { cancionesService } from '@/services/canciones.service'
import { api } from '@/lib/api'

vi.mock('@/lib/api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('Usuarios Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getAll debe llamar al endpoint correcto', async () => {
    const mockData = { items: [], total: 0, page: 1, size: 10, pages: 0 }
    vi.mocked(api.get).mockResolvedValue({ data: mockData })

    const result = await usuariosService.getAll()

    expect(api.get).toHaveBeenCalledWith(
      '/api/usuarios/',
      expect.objectContaining({
        params: expect.objectContaining({ page: 1, size: 10 })
      })
    )
    expect(result).toEqual(mockData)
  })

  it('create debe enviar los datos correctamente', async () => {
    const mockUsuario = { nombre: 'Test', correo: 'test@test.com' }
    const mockResponse = { id: 1, ...mockUsuario, fecha_registro: '2024-01-01' }
    vi.mocked(api.post).mockResolvedValue({ data: mockResponse })

    const result = await usuariosService.create(mockUsuario)

    expect(api.post).toHaveBeenCalledWith('/api/usuarios/', mockUsuario)
    expect(result).toEqual(mockResponse)
  })
})

describe('Canciones Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getAll debe llamar al endpoint correcto', async () => {
    const mockData = { items: [], total: 0, page: 1, size: 10, pages: 0 }
    vi.mocked(api.get).mockResolvedValue({ data: mockData })

    const result = await cancionesService.getAll()

    expect(api.get).toHaveBeenCalledWith(
      '/api/canciones/',
      expect.objectContaining({
        params: expect.objectContaining({ page: 1, size: 10 })
      })
    )
    expect(result).toEqual(mockData)
  })

  it('create debe enviar los datos correctamente', async () => {
    const mockCancion = {
      titulo: 'Test Song',
      artista: 'Test Artist',
      album: 'Test Album',
      duracion: 180,
      año: 2024,
      genero: 'Rock'
    }
    const mockResponse = { id: 1, ...mockCancion, fecha_creacion: '2024-01-01' }
    vi.mocked(api.post).mockResolvedValue({ data: mockResponse })

    const result = await cancionesService.create(mockCancion)

    expect(api.post).toHaveBeenCalledWith('/api/canciones/', mockCancion)
    expect(result).toEqual(mockResponse)
  })
})
