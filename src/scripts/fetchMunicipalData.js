import fetch from 'node-fetch';
import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function fetchMunicipalData() {
  try {
    // URL del servicio WFS del ICGC para municipios
    const url = 'https://geoserveis.icgc.cat/servei/catalunya/divisions-administratives/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=divisions_administratives_municipis&outputFormat=application/json';
    
    // Descargar los datos
    const response = await fetch(url);
    const data = await response.json();
    const features = data.features;

    // Procesar los datos
    const municipalities = features.map(feature => ({
      name: feature.properties.nomMunicipi,
      population: 0, // Añadiremos la población más tarde
      geometry: feature.geometry
    }));

    // Guardar los datos
    await writeFile(
      join(__dirname, '../data/catalunya-municipalities.json'),
      JSON.stringify({ type: 'FeatureCollection', features: municipalities }, null, 2)
    );

    console.log('Datos descargados y guardados correctamente');
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

fetchMunicipalData(); 