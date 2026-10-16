/* =========================================
EXPLORADOR DE VIAJES
Archivo principal de la aplicación
========================================= */
/* =========================================
REFERENCIAS DEL DOM
========================================= */

//IMPORTS
import { getCountries } from './api/countriesApi.js';

/* =========================================
ESTADO DE LA APLICACIÓN
========================================= */
let countries = [];

const destinationsContainer = document.querySelector('#destinations-container');
const resultsCount = document.querySelector('#results-count');
const initialMessage = document.querySelector('#initial-message');

/* =========================================
INICIALIZACIÓN DE LA APLICACIÓN
========================================= */
async function init() {
  console.log('Explorador de Viajes iniciado');
  //resultsCount.textContent = `1 destino`;

  initialMessage.innerHTML = `
    <div class="text5x1 mb-4">
    ✈️
    </div>
    <h3>
    class="
    text-x1
    fornt-semibold
    text-slate-800
    mb-2"
    </h3>
    <p>
    Estamos consultando los destinos alrededor del mundo...
    </p>`;

  //OBTENER DATOS DE LA API
  countries = await getCountries();
  console.log(countries);

  resultsCount.textContent = `${countries.length} destinos`;
  //MOSTRAR RESULTADOS DE LA CARGA
  if (countries.length > 0) {
    initialMessage.innerHTML = `
    <div class="text5x1 mb-4">
    ✅
    </div>
    <h3 class="text-x1 font-semibold text-slate-800 mb-2">
    Destinos cargados
    </h3>
    <p>
    Se obtuvieron ${countries.length} destinos correctamente.
    </p>`;
  } else {
    //MOSTRAR MENSAJE DE ERROR
    initialMessage.innerHTML = `
    <div class="text5x1 mb-4">
    ⚠️
    </div>
    <h3 class="text-x1 font-semibold text-slate-800 mb-2">
    Error al cargar destinos
    </h3>
    <p>
    No se pudieron obtener los destinos. Por favor, intente nuevamente más tarde.
    </p>`;
  }
  


}

/* =========================================
INICIAR APLICACIÓN
========================================= */
init();