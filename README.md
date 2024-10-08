# Prueba Técnica - Desarrollador Frontend

Esta es una prueba técnica realizada para la solicitud del puesto de Desarrollador Frontend en *FractalUp*.
### Tecnologías Utilizadas
Se utilizaron las siguientes APIs para el desarrollo de esta prueba:

- *[Countries](https://countries.trevorblades.com/)*: Proporciona información de todos los paises del mundo
- *[Pexels](https://www.pexels.com/api/documentation/)*: Usada para obtener imágenes relacionadas con los países.

### Configuración
Para usar la API de imágenes, es necesario crear una clave de API. Sigue estos pasos para configurarla:

1. Regístrate en [Pexels API](https://www.pexels.com/api/documentation/) y obtén tu API Key.
2. Crea un archivo `.env.local` en la raíz del proyecto.
3. Añade la siguiente línea al archivo `.env.local`:
   ```bash
   VITE_API_KEY_PIXABAY=tu_api_key_aqui
