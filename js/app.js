/* =
   EXPLORADOR DE VIAJES
   Archivo principal de la aplicación
= */


/* =
   IMPORTACIONES
= */

import {
    obtenerPaises
} from "./api/countriesApi.js";


/* =
   ESTADO DE LA APLICACIÓN
= */

let paises = [];


/* =
   REFERENCIAS DEL DOM
= */

const destinationsContainer = document.querySelector(
    "#destinations-container"
);

const resultsCount = document.querySelector(
    "#results-count"
);

const initialMessage = document.querySelector(
    "#initial-message"
);


/* =
   INICIALIZACIÓN DE LA APLICACIÓN
= */

async function init() {

    console.log(
        "Explorador de Viajes iniciado"
    );


    /* =
       MOSTRAR ESTADO DE CARGA
     */

    initialMessage.innerHTML = `
        <div class="text-5xl mb-4">
            🌎
        </div>

        <h3
            class="
                text-xl
                font-semibold
                text-slate-800
                mb-2
            "
        >
            Cargando destinos...
        </h3>

        <p class="text-slate-500">
            Estamos consultando información
            de países alrededor del mundo.
        </p>
    `;


    /* =
       OBTENER PAÍSES DESDE LA API
     */

    paises = await obtenerPaises();


    /* =
       COMPROBAR RESULTADOS
     */

    console.log(
        "Países obtenidos:",
        paises
    );


    /* =
       ACTUALIZAR CONTADOR
     */

    resultsCount.textContent =
        `${paises.length} destinos`;


    /* =
       MOSTRAR RESULTADO DE LA CARGA
     */

    if (paises.length > 0) {

        initialMessage.innerHTML = `
            <div class="text-5xl mb-4">
                ✅
            </div>

            <h3
                class="
                    text-xl
                    font-semibold
                    text-slate-800
                    mb-2
                "
            >
                Destinos cargados
            </h3>

            <p class="text-slate-500">
                Se obtuvieron ${paises.length}
                destinos correctamente.
            </p>
        `;

    } else {

        initialMessage.innerHTML = `
            <div class="text-5xl mb-4">
                ⚠️
            </div>

            <h3
                class="
                    text-xl
                    font-semibold
                    text-slate-800
                    mb-2
                "
            >
                No fue posible cargar los destinos
            </h3>

            <p class="text-slate-500">
                Verifica tu conexión e intenta
                nuevamente.
            </p>
        `;

    }

}


/* =
   INICIAR APLICACIÓN
= */

init();