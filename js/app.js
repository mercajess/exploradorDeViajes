console.log('conexion exitosa');

//IMPORTS



// Referencias del DOM
const destinationsContainer = document.querySelector("#destinations-container");
const resultsCount = document.querySelector("#results-count");

/*
  INICIALIZACIÓN DE LA APLICACIÓN
*/
function init() {
    console.log("Explorador de Viajes iniciado");
    resultsCount.textContent = "1 destino";
}

//INICIAR APLICACION
init();