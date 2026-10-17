// MAPA: Integración dede Leaflet
// Instancia actual del mapa

let mapaActual = null;

export function destruirMapa() {
  if (mapaActual) {
    mapaActual.remove();
    mapaActual = null;
  }
}

//  crear mapa:

export function crearMapa(latitud, longitud, nombre) {
  //Validar las coordenadas
  if (typeof latitud !== 'number' || typeof longitud !== 'number') {
    console.warn('Coordenadas no disponibles.');
    return;
  }
  destruirMapa();

  mapaActual = L.map('destination-map').setView([latitud, longitud], 4);

  // Agregar capa de openstreetmap
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapaActual);

  // Agregar marcador

  L.marker([latitud, longitud]).addTo(mapaActual).bindPopup(`<strong>${nombre}</strong>`).openPopup();



}
