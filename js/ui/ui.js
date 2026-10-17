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

// Mostrar detalle destino

export function mostrarDetalle(pais, modal, modalContent){
    const nombre = pais.names?.common ?? "Nombre no disponible";
    const nombreOficial = pais.names?.common ?? "No disponible";
    const region = pais.region ?? "No disponible";
   const subregion = pais.subregion ?? "No disponible";
    const poblacion = pais.poblacion ?? "No disponible";
    const bandera = pais.flag?.url_png ?? "";
    const codigo = pais.codes?.alpha_3 ?? "";
    const capital = pais.capital?.[0]?.name ?? "No disponible";
    // Obtener coordenadas
    const latitud = pais.coordinates?.lat;
    const longitud = pais.coordinates?.lng;
    // Formatear población
    const poblacionFormateada = poblacion.toLocaleString("es-MX");
    // Crear contenido modal
    modalContent.innerHTML = `
    <article
class="
bg-white
rounded-2xl
overflow-hidden
shadow-2xl
"
>
<!-- =================================
CABECERA DEL MODAL
================================== -->
<div
class="
flex
items-center
justify-between
gap-4
p-6
border-b
border-slate-200
"
>
<div>
<p
class="
text-sm
text-blue-600
font-medium
"
>
${codigo}
</p>
<h2
class="
text-2xl
md:text-3xl
font-bold
text-slate-900
"
>
${nombre}
</h2>
</div>
<button
id="btn-close-detail"
type="button"
aria-label="Cerrar detalle"
class="
w-10
h-10
flex
items-center
justify-center
rounded-full
bg-slate-100
text-slate-600
text-xl
cursor-pointer
hover:bg-slate-200
"
>
×
</button>
</div>
<!-- =================================
BANDERA
================================== -->
<div
class="
h-64
md:h-80
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
INFORMACIÓN
================================== -->
<div class="p-6">
<div
class="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-4
mb-8
"
>
<div
class="
bg-slate-50
rounded-xl
p-4
"
>
<p class="text-xs text-slate-500">
Capital
</p>
<p class="font-semibold text-slate-900">
${capital}
</p>
</div>
<div
class="
bg-slate-50
rounded-xl
p-4
"
>
<p class="text-xs text-slate-500">
Región
</p>
<p class="font-semibold text-slate-900">
${region}
</p>
</div>
<div
class="
bg-slate-50
rounded-xl
p-4
"
>
<p class="text-xs text-slate-500">
Subregión
</p>
<p class="font-semibold text-slate-900">
${subregion}
</p>
</div>
<div
class="
bg-slate-50
rounded-xl
p-4
"
>
<p class="text-xs text-slate-500">
Población
</p>
<p class="font-semibold text-slate-900">
${poblacionFormateada}
</p>
</div>
<div
class="
bg-slate-50
rounded-xl
p-4
sm:col-span-2
"
>
<p class="text-xs text-slate-500">
Nombre oficial
</p>
<p class="font-semibold text-slate-900">
${nombreOficial}
</p>
</div>
</div>
<!-- =================================
MAPA
================================== -->
<div>
<div class="mb-3">
<h3
class="
text-xl
font-bold
text-slate-900
"
>
Ubicación
</h3>
<p class="text-sm text-slate-500">
Centro geográfico aproximado del país.
</p>
</div>
<div
id="destination-map"
class="
w-full
h-80
rounded-xl
overflow-hidden
border
border-slate-200
"
></div>
</div>
    `;

    // Mostrar modal
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");

    // Retornar datos del mapa (coordenadas)
    return {latitud, longitud, nombre};

}

export function cerrarDetalle(modal, modalContent){
    modal.classList.add("hidden");
    modalContent.innerHTML = ``;
    document.body.classList.remove("overflow-hidden");
}

