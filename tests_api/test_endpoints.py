"""
Pruebas de contrato para la API de Música
Autor: Isabella Ramirez Franco
Usuario: codebell-alt
"""

import pytest
import requests
from typing import Dict, Any

BASE_URL = "http://localhost:3001"


class TestHealthEndpoints:
    """Tests para endpoints de salud y estado"""

    def test_health_check(self):
        """Verificar que el endpoint de health check responde correctamente"""
        response = requests.get(f"{BASE_URL}/health")
        assert response.status_code == 200
        data = response.json()
        assert data.get("status") == "healthy"

    def test_api_root(self):
        """Verificar que el endpoint raíz de la API responde"""
        response = requests.get(f"{BASE_URL}/api")
        assert response.status_code == 200

    def test_stats_endpoint(self):
        """Verificar que el endpoint de estadísticas responde"""
        response = requests.get(f"{BASE_URL}/stats")
        assert response.status_code == 200


class TestUsuariosEndpoints:
    """Tests para endpoints de usuarios"""

    def test_get_usuarios_list(self):
        """Verificar que se puede obtener la lista de usuarios"""
        response = requests.get(f"{BASE_URL}/api/usuarios/")
        assert response.status_code in (200, 201)
        data = response.json()
        assert "items" in data
        assert "total" in data
        assert "page" in data

    def test_get_usuarios_with_pagination(self):
        """Verificar paginación de usuarios"""
        response = requests.get(f"{BASE_URL}/api/usuarios/", params={"skip": 0, "limit": 5})
        assert response.status_code == 200
        data = response.json()
        assert len(data["items"]) <= 5

    def test_create_usuario(self):
        """Verificar creación de usuario"""
        usuario_data = {
            "nombre": "Test Usuario",
            "correo": f"test_{pytest.__version__}@example.com"
        }
        response = requests.post(f"{BASE_URL}/api/usuarios/", json=usuario_data)
        assert response.status_code in (200, 201)
        data = response.json()
        assert "id" in data
        assert data["nombre"] == usuario_data["nombre"]

    def test_get_usuario_by_id(self):
        """Verificar obtención de usuario por ID"""
        response = requests.get(f"{BASE_URL}/api/usuarios/1")
        assert response.status_code in (200, 404)

    def test_usuario_estadisticas(self):
        """Verificar endpoint de estadísticas de usuarios"""
        response = requests.get(f"{BASE_URL}/api/usuarios/estadisticas/resumen")
        assert response.status_code == 200


class TestCancionesEndpoints:
    """Tests para endpoints de canciones"""

    def test_get_canciones_list(self):
        """Verificar que se puede obtener la lista de canciones"""
        response = requests.get(f"{BASE_URL}/api/canciones/")
        assert response.status_code in (200, 201)
        data = response.json()
        assert "items" in data
        assert "total" in data

    def test_get_canciones_with_filters(self):
        """Verificar filtros de canciones"""
        response = requests.get(f"{BASE_URL}/api/canciones/", params={"skip": 0, "limit": 10})
        assert response.status_code == 200
        data = response.json()
        assert len(data["items"]) <= 10

    def test_create_cancion(self):
        """Verificar creación de canción"""
        cancion_data = {
            "titulo": "Test Song",
            "artista": "Test Artist",
            "album": "Test Album",
            "duracion": 180,
            "año": 2024,
            "genero": "Rock"
        }
        response = requests.post(f"{BASE_URL}/api/canciones/", json=cancion_data)
        assert response.status_code in (200, 201)
        data = response.json()
        assert "id" in data
        assert data["titulo"] == cancion_data["titulo"]

    def test_get_cancion_by_id(self):
        """Verificar obtención de canción por ID"""
        response = requests.get(f"{BASE_URL}/api/canciones/1")
        assert response.status_code in (200, 404)

    def test_get_generos_lista(self):
        """Verificar endpoint de lista de géneros"""
        response = requests.get(f"{BASE_URL}/api/canciones/generos/lista")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)

    def test_get_artistas_lista(self):
        """Verificar endpoint de lista de artistas"""
        response = requests.get(f"{BASE_URL}/api/canciones/artistas/lista")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)

    def test_cancion_estadisticas(self):
        """Verificar endpoint de estadísticas de canciones"""
        response = requests.get(f"{BASE_URL}/api/canciones/estadisticas/resumen")
        assert response.status_code == 200


class TestFavoritosEndpoints:
    """Tests para endpoints de favoritos"""

    def test_get_favoritos_list(self):
        """Verificar que se puede obtener la lista de favoritos"""
        response = requests.get(f"{BASE_URL}/api/favoritos/")
        assert response.status_code in (200, 201)
        data = response.json()
        assert "items" in data
        assert "total" in data

    def test_create_favorito(self):
        """Verificar creación de favorito"""
        favorito_data = {
            "id_usuario": 1,
            "id_cancion": 1
        }
        response = requests.post(f"{BASE_URL}/api/favoritos/", json=favorito_data)
        assert response.status_code in (200, 201, 400, 404)

    def test_get_favorito_by_id(self):
        """Verificar obtención de favorito por ID"""
        response = requests.get(f"{BASE_URL}/api/favoritos/1")
        assert response.status_code in (200, 404)

    def test_get_favoritos_usuario(self):
        """Verificar obtención de favoritos por usuario"""
        response = requests.get(f"{BASE_URL}/api/favoritos/usuario/1")
        assert response.status_code in (200, 404)
        if response.status_code == 200:
            data = response.json()
            assert isinstance(data, list)

    def test_verificar_favorito(self):
        """Verificar endpoint de verificación de favorito"""
        response = requests.get(f"{BASE_URL}/api/favoritos/verificar/1/1")
        assert response.status_code in (200, 404)

    def test_favorito_estadisticas(self):
        """Verificar endpoint de estadísticas de favoritos"""
        response = requests.get(f"{BASE_URL}/api/favoritos/estadisticas/resumen")
        assert response.status_code == 200


class TestErrorHandling:
    """Tests para manejo de errores"""

    def test_usuario_not_found(self):
        """Verificar error 404 para usuario inexistente"""
        response = requests.get(f"{BASE_URL}/api/usuarios/999999")
        assert response.status_code == 404

    def test_cancion_not_found(self):
        """Verificar error 404 para canción inexistente"""
        response = requests.get(f"{BASE_URL}/api/canciones/999999")
        assert response.status_code == 404

    def test_invalid_usuario_data(self):
        """Verificar error de validación con datos inválidos"""
        usuario_data = {
            "nombre": "A",
            "correo": "invalid-email"
        }
        response = requests.post(f"{BASE_URL}/api/usuarios/", json=usuario_data)
        assert response.status_code == 422

    def test_invalid_cancion_data(self):
        """Verificar error de validación con datos inválidos de canción"""
        cancion_data = {
            "titulo": "",
            "artista": "",
            "album": "",
            "duracion": -10,
            "año": 1800,
            "genero": ""
        }
        response = requests.post(f"{BASE_URL}/api/canciones/", json=cancion_data)
        assert response.status_code == 422
