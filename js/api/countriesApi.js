// Código para obtener datos de la API de países
const API_URL =
  'https://juancognitus.github.io/explorador-viajes-api/paises.json';

// export se utiliza para que la función pueda ser importada en otros archivos
export async function getCountries() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const countries = await response.json();
    //console.log(countries);
    return countries;

  } catch (error) {
    console.log('Error al obtener los países:', error);
    return [];
  }
}

getCountries()