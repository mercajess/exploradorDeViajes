console.log('conexion exitosa');


// IMPORTS
import { obtnerPaises } from './api/countriesApi.js';

// ESTADO DE LA APLICACIÓN
let paises = [];


// REFERENCIAS DEL DOM
const destinationContainer = document.querySelector('#destinations-container');
const resultsCount = document.querySelector('#results-count');
const initialMessage = document.querySelector('#initial-message');


/*
  INICIALIZACIÓN DE LA APLICACIÓN
*/
async function init() {
    console.log("Explorador de Viajes iniciado");
    //resultsCount.textContent = "1 destino";

    // MOSTRAR ESTADO DE CARGA
initialMessage.innerHTML = /*html*/`
<div class="text-5xl mb-4">
  🌍
</div>

<h3 class="
    text-xl
    font-semibold
    text-slate-800
    mb-2
">
  Cargando destinos
</h3>

<p>
  Estamos consultando información de países alrededor del mundo...
</p>

`;

//ONTENER PAISES DESDE LA API
paises = await obtnerPaises();

console.log('PAISES OBTENIDOS: ', paises);

//ACTUALIZAR CONTADOR
resultsCount.textContent = `${paises.length} destinos`;

// MOSTRAR RESULTADOS DE LA CARGA
  if (paises.length > 0) {
    initialMessage.innerHTML = /*html*/`

    <div class="text-5xl mb-4">
      ✅
    </div>

    <h3>
      Destinos cargados
    </h3>

    <p>
      Se obtuvieron ${paises.length} destinos correctamente
    </p>

    `;
  } else {

   // MOSTRAR UN MENSAJE SI OCURRE UN ERROR
  initialMessage.innerHTML = /*html*/`

  <div class="text-5xl mb-4">
    ⚠️
  </div>

  <h3>
    No fue posible cargar los países
  </h3>

  <p>
    Verifica tu conexión e intenta nuevamente.
  </p>

  `;
}
}
// INICIAR APLICACIÓN
init();