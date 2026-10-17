# Explorador de Viajes y Lugares Turísticos
Proyecto integrador desarrollado con JavaScript, APIs y librerías para
explorar información de países y destinos alrededor del mundo.
## Tecnologías
- HTML5
- JavaScript ES6+
- Tailwind CSS
- APIs REST
- LocalStorage
- Leaflet
- SweetAlert2
- Git
- GitHub
## Características
El proyecto permitirá:
- Consultar países desde una API REST.
- Buscar destinos.
- Filtrar destinos por continente.
- Ordenar resultados.
- Consultar información detallada.
- Visualizar la ubicación del destino en un mapa.
- Guardar destinos favoritos.
- Persistir favoritos mediante LocalStorage.

## countriesApi.js

- fetch()
- async / await
- try / catch
- response.ok
- response.json()
- import / export

## ui.js

- map()
- template literals
- innerHTML
- optional chaining
- data-*
- DOM dinámico
- módulos JavaScript
- separación de responsabilidades

## ./utils/filters.js

- Normalización de texto
- Aplicación de filtros
- Eventos: input, change

## Arquitectura
La aplicación utiliza una sola página HTML y divide progresivamente la lógica
JavaScript en módulos según su responsabilidad.
## Versión actual
v0.4.0 - Renderizado dinámico de Destinos.