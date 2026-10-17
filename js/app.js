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
import { processPaises } from './utils/filters.js';


/* =========================================
ESTADO DE LA APLICACIÓN
========================================= */
let countries = [];

const destinationsContainer = document.querySelector('#destinations-container');
const resultsCount = document.querySelector('#results-count');
const initialMessage = document.querySelector('#initial-message');
const buscador = document.querySelector('#search-input');
const continenteBuscador = document.querySelector('#continent-filter');
const sortFilter = document.querySelector('#sort-filter')

function aplicarFiltros() {
  const texto = buscador.value;

  const continente = continenteBuscador.value;

  const criterioOrden = sortFilter.value;

  const resultado = processPaises(countries, texto, continente, criterioOrden)

  // Renderizar los resultados filtrados
  renderizarPaises(resultado, destinationsContainer);
  actualizarContador(resultado.length, resultsCount);
  
}

/* =========================================
Registrar Eventos
========================================= */

function registrarEventos(){
  buscador.addEventListener('input', aplicarFiltros)
  continenteBuscador.addEventListener('change', aplicarFiltros)
  sortFilter.addEventListener('change', aplicarFiltros);
}

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

    //Aplicar filtros reemplaza a renderizar paises y actualizar contador.
    aplicarFiltros();

    // //RENDERIZAR PAISES
    // renderizarPaises(countries, destinationsContainer);

    // //ACTUALIZAR CONTADOR
    // actualizarContador(countries.length, resultsCount);

    registrarEventos();

  // //AGREGAR EVENTO DE BUSQUEDA
  // buscador.addEventListener('input', (event) => {
  //   // const textoBuscado = event.target.value;
  //   // const paisesFiltrados = buscarPaises(countries, textoBuscado);
  //   renderizarPaises(aplicarFiltros(), destinationsContainer);
  // });

  // Busqueda por continente

  // continenteBuscador.addEventListener('input', (event) => {
  //   // const continentSelected = event.target.value;
  //   // const paisesEncontrados = filtrarPorContinente(countries, continentSelected);
    
  //   renderizarPaises(paisesEncontrados, destinationsContainer)
  // })

}

/* =========================================
INICIAR APLICACIÓN
========================================= */
init();
