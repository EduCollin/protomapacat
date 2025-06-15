import axios from 'axios';
import fs from 'fs';
import path from 'path';

interface MunicipalityData {
  name: string;
  population: number;
  geometry: any;
}

async function fetchMunicipalData() {
  try {
    // URL del servicio WFS del ICGC para municipios
    const url = 'https://geoserveis.icgc.cat/servei/catalunya/divisions-administratives/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=divisions_administratives_municipis&outputFormat=application/json';
    
    // Descargar los datos
    const response = await axios.get(url);
    const features = response.data.features;

    // Procesar los datos
    const municipalities: MunicipalityData[] = features.map((feature: any) => ({
      name: feature.properties.nomMunicipi,
      population: 0, // Añadiremos la población más tarde
      geometry: feature.geometry
    }));

    // Guardar los datos
    fs.writeFileSync(
      path.join(__dirname, '../data/catalunya-municipalities.json'),
      JSON.stringify({ type: 'FeatureCollection', features: municipalities }, null, 2)
    );

    console.log('Datos descargados y guardados correctamente');
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

fetchMunicipalData(); 