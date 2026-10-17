/* =========================================
INTERFAZ DE USUARIO
Funciones encargadas de actualizar el DOM
========================================= */

/* =========================================
MOSTRAR ESTADO DE CARGA
========================================= */
export function mostrarCargando(contenedor) {
    console.log('Explorador de Viajes iniciado');
  //resultsCount.textContent = `1 destino`;

  contenedor.innerHTML = `
    <div> class="
    col-span-full
    bg-white
    border
    border-dashed
    border-slate-300
    rounded-xl
    p-12
    text-center
    " >

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
    </p>
    </div>`;
    ;
}

export function mostrarError(contenedor) {
    contenedor.innerHTML = `
    <div> class="
    col-span-full
    bg-white
    border
    border-dashed
    border-slate-300
    rounded-xl
    p-12
    text-center
    " >
    <div class="text5x1 mb-4">
    ⚠️
    </div>
    <h3 class="text-x1 font-semibold text-slate-800 mb-2">
    Error al cargar destinos
    </h3>
    <p>
    No se pudieron obtener los destinos. Por favor, intente nuevamente más tarde.
    </p>
    </div>`;
    
}

export function actualizarContador(total, elementoContador) {
    //Actualizar el contador
    elementoContador.textContent = `${total} destinos`;

}

export function renderizarPaises(paises, contenedor) {

    //Validación
    if(paises.length === 0){
        contenedor.innerHTML = `
        <div
            class="
                col-span-full
                bg-white
                border
                border-dashed
                border-slate-300
                rounded-xl
                p-12
                text-center
            "
        >

            <div class="text-5xl mb-4">
                🔎
            </div>

            <h3
                class="
                    text-xl
                    font-semibold
                    text-slate-800
                    mb-2
                "
            >
                No encontramos destinos
            </h3>

            <p class="text-slate-500">
                Intenta cambiar los criterios
                de búsqueda.
            </p>

        </div>
    `;

    return;
    }
    
    // Utilizar map() para crear un array de elementos HTML
    const tarjetas = paises.map((pais) => {
        // Obtener nombre
        const nombre = pais.names?.common ?? 'Nombre no disponible';

        // Obtener región
        const region = pais.region ?? 'Región no disponible';

        // Obtener pobleación
        const poblacion = pais.population ?? 0;

        // Obtener bandera
        const bandera = pais.flag?.url_png ?? '';

        // Obtener código
        const codigo = pais.codes?.alpha_3 ?? '';

        const poblacionFormateada = poblacion.toLocaleString('es-MX');

        return `
        <article class="
            bg-white
            rounded-xl
            border
            border-slate-200
            overflow-hidden
            shadow-sm
            hover:shadow-md
            transition
        "
    > 
    <!-- =================================
             BANDERA
        ================================== -->

        <div
            class="
                h-48
                bg-slate-100
                overflow-hidden
            "
        >

            <img
                src="${bandera}"
                alt="Bandera de ${nombre}"
                class="
                    w-full
                    h-full
                    object-cover
                "
            >

        </div>


        <!-- =================================
             INFORMACIÓN DEL DESTINO
        ================================== -->

        <div class="p-5">

            <div
                class="
                    flex
                    items-start
                    justify-between
                    gap-4
                    mb-4
                "
            >

                <div>

                    <h3
                        class="
                            text-xl
                            font-bold
                            text-slate-900
                        "
                    >
                        ${nombre}
                    </h3>

                    <p class="text-sm text-slate-500">
                        ${region}
                    </p>

                </div>


                <span
                    class="
                        px-3
                        py-1
                        bg-blue-50
                        text-blue-600
                        text-xs
                        font-medium
                        rounded-full
                    "
                >
                    ${codigo}
                </span>

            </div>


            <!-- =================================
                 POBLACIÓN
            ================================== -->

            <div class="mb-5">

                <p class="text-xs text-slate-500">
                    Población
                </p>

                <p
                    class="
                        text-lg
                        font-semibold
                        text-slate-800
                    "
                >
                    ${poblacionFormateada}
                </p>

            </div>


            <!-- =================================
                 ACCIONES
            ================================== -->

            <div class="flex gap-3">

                <button
                    type="button"
                    data-action="detail"
                    data-country-code="${codigo}"
                    class="
                        flex-1
                        px-4
                        py-2
                        bg-blue-600
                        text-white
                        rounded-lg
                        font-medium
                        cursor-pointer
                        hover:bg-blue-700
                        transition
                    "
                >
                    Ver más
                </button>


                <button
                    type="button"
                    data-action="favorite"
                    data-country-code="${codigo}"
                    aria-label="Agregar ${nombre} a favoritos"
                    class="
                        px-4
                        py-2
                        border
                        border-slate-300
                        text-slate-600
                        rounded-lg
                        cursor-pointer
                        hover:bg-slate-100
                        transition
                    "
                >
                    ♡
                </button>

            </div>

        </div>


        </article>
        `
    }).join(''); // Unir todos los elementos en un solo string
    
    // Insertar las tarjetas en el contenedor
    contenedor.innerHTML = tarjetas;
}