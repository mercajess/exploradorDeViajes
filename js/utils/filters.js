// Filtros y ordenamiento
// Buscar paises por nombre

export function buscarPaises(paises, texto){
    //Normalizar el texto de búsqueda
    const textoNormalizado = texto.trim().toLowerCase();
    // Validar si el texto de búsqueda está vacío
    if(!textoNormalizado){
        return paises;
    }

    return paises.filter(pais => {
        const nombre = pais.names?.common.toLowerCase() ?? '';
        return nombre.includes(textoNormalizado);
    });
}

// Filtrar paises por continente
export function filtrarPorContinente(paises, continente){
    // Filtrado all
    if(continente === 'all') {
        return paises;
    }

    // Filtrado por region
    return paises.filter(pais => pais.region === continente);

}

export function ordenarPaises(paises, criterio){

    const paisesOrdenados = [...paises];

    if(criterio === 'az'){

        return paisesOrdenados.sort((a, b) => {
            const nombreA = a.names?.common ?? '';
            const nombreB = b.names?.common ?? '';

            return nombreA.localeCompare(nombreB);
        })
    } else if (criterio === 'za') {
        return paisesOrdenados.sort((a, b) => {
            const nombreA = a.names?.common ?? '';
            const nombreB = b.names?.common ?? '';
            return nombreB.localeCompare(nombreA);
        })
    };

    return paisesOrdenados;
}

export function processPaises(paises, texto, continente, criterioOrden){
    let resultado = buscarPaises(paises, texto);
    resultado = filtrarPorContinente(resultado, continente);
    resultado = ordenarPaises(resultado, criterioOrden);
    return resultado;
}
