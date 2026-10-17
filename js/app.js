/* =========================================
EXPLORADOR DE VIAJES
Archivo principal de la aplicación
========================================= */
/* =========================================
REFERENCIAS DEL DOM
========================================= */

//IMPORTS
import { getCountries } from './api/countriesAPI.js';
import { mostrarCargando, mostrarError, renderizarPaises, actualizarContador } from './ui/ui.js';

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

  //MOSTRAR RESULTADOS DE LA CARGA
  mostrarCargando(destinationsContainer);

 // mostrarCargando(destinationsContainer);
  //OBTENER DATOS DE LA API
  countries = await getCountries();
  console.log(countries);



  //Validar paises
  if(countries.length === 0){
    mostrarError(destinationsContainer);
    actualizarContador(0, resultsCount);
    return;
  }
    //RENDERIZAR PAISES
    renderizarPaises(countries, destinationsContainer);

    //ACTUALIZAR CONTADOR
    actualizarContador(countries.length, resultsCount);
  
}

/* =========================================
INICIAR APLICACIÓN
========================================= */
init();
