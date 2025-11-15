/**
 * Pruebas para servicios de API
 * Autor: Isabella Ramirez Franco
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import axios from 'axios'
import { getUsuarios, createUsuario } from '@/services/usuarios.service'
import { getCanciones, createCancion } from '@/services/canciones.service'

vi.mock('axios')

describe('Usuarios Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getUsuarios debe llamar al endpoint correcto', async () => {
    const mockData = { items: [], total: 0, page: 1, size: 10, pages: 0 }
    vi.mocked(axios.get).mockResolvedValue({ data: mockData })

    const result = await getUsuarios()

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/api/usuarios'),
      expect.any(Object)
    )
  })

  it('createUsuario debe enviar los datos correctamente', async () => {
    const mockUsuario = { nombre: 'Test', correo: 'test@test.com' }
    const mockResponse = { id: 1, ...mockUsuario, fecha_registro: '2024-01-01' }
    vi.mocked(axios.post).mockResolvedValue({ data: mockResponse })

    const result = await createUsuario(mockUsuario)

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/api/usuarios'),
      mockUsuario
    )
  })
})

describe('Canciones Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getCanciones debe llamar al endpoint correcto', async () => {
    const mockData = { items: [], total: 0, page: 1, size: 10, pages: 0 }
    vi.mocked(axios.get).mockResolvedValue({ data: mockData })

    const result = await getCanciones()

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/api/canciones'),
      expect.any(Object)
    )
  })

  it('createCancion debe enviar los datos correctamente', async () => {
    const mockCancion = {
      titulo: 'Test Song',
      artista: 'Test Artist',
      album: 'Test Album',
      duracion: 180,
      año: 2024,
      genero: 'Rock'
    }
    const mockResponse = { id: 1, ...mockCancion, fecha_creacion: '2024-01-01' }
    vi.mocked(axios.post).mockResolvedValue({ data: mockResponse })

    const result = await createCancion(mockCancion)

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/api/canciones'),
      mockCancion
    )
  })
})
