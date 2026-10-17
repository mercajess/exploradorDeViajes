/* =========================================
EXPLORADOR DE VIAJES
Archivo principal de la aplicación
========================================= */
/* =========================================
REFERENCIAS DEL DOM
========================================= */

//IMPORTS
import { getCountries } from './api/countriesAPI.js';
import {
  mostrarCargando,
  mostrarError,
  renderizarPaises,
  actualizarContador,
  mostrarDetalle,
  cerrarDetalle,
} from './ui/ui.js';
import { processPaises } from './utils/filters.js';
import { crearMapa, destruirMapa } from './ui/mapUI.js';

/* =========================================
ESTADO DE LA APLICACIÓN
========================================= */
let countries = [];

const destinationsContainer = document.querySelector('#destinations-container');
const resultsCount = document.querySelector('#results-count');
const initialMessage = document.querySelector('#initial-message');
const buscador = document.querySelector('#search-input');
const continenteBuscador = document.querySelector('#continent-filter');
const sortFilter = document.querySelector('#sort-filter');
const detailModal = document.querySelector('#detail-modal');
const detailModalContent = document.querySelector('#detail-modal-content');

function obtenerPaisPorCodigo(codigo) {
  return countries.find((pais) => pais.codes?.alpha_3 === codigo);
}
// Abrir detalles
function abrirDetalles(codigo) {
  const pais = obtenerPaisPorCodigo(codigo);
  if (!pais) {
    console.warn('Pais no encontrado');
    return;
  }
  const datosMapa = mostrarDetalle(pais, detailModal, detailModalContent);
  setTimeout(() => {
    crearMapa(datosMapa.latitud, datosMapa.longitud, datosMapa.nombre);
  }, 0);
}

function aplicarFiltros() {
  const texto = buscador.value;

  const continente = continenteBuscador.value;

  const criterioOrden = sortFilter.value;

  const resultado = processPaises(countries, texto, continente, criterioOrden);

  // Renderizar los resultados filtrados
  renderizarPaises(resultado, destinationsContainer);
  actualizarContador(resultado.length, resultsCount);
}

/* =========================================
Registrar Eventos
========================================= */

function registrarEventos() {
  buscador.addEventListener('input', aplicarFiltros);
  continenteBuscador.addEventListener('change', aplicarFiltros);
  sortFilter.addEventListener('change', aplicarFiltros);
  // Acciones de las tarjetas
  destinationsContainer.addEventListener('click', (event) => {
    const boton = event.target.closest('[data-action]');
    if (!boton) {
      return;
    }
    const accion = boton.dataset.action;
    const codigo = boton.dataset.countryCode;

    if (accion === 'detail') {
      abrirDetalles(codigo);
    }
  });
  //Cerrar modal

  detailModal.addEventListener("click", (event) => {
    if (event.target.id === "btn-close-detail"){
      cerrarModalDetalle();
    }
    if(event.target === detailModal){
      cerrarModalDetalle();
    }
  });

  // Cerrar con ESC
  document.addEventListener("keydown", (event) => {
    if(event.key === "Escape" && !detailModal.classList.classList.contains("hidden")){
      cerrarModalDetalle();
    }
  });
}

function cerrarModalDetalle() {
  destruirMapa();
  cerrarDetalle(detailModal, detailModalContent);
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
  if (countries.length === 0) {
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

 
  //   renderizarPaises(paisesEncontrados, destinationsContainer)
  // })
}

/* =========================================
INICIAR APLICACIÓN
========================================= */
init();
