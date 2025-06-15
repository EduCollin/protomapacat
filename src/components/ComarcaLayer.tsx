import { useEffect, useState } from 'react';
import { LayerGroup, GeoJSON } from 'react-leaflet';

interface ComarcaProperties {
  nom: string;
  codi: string;
  poblacio?: number;
}

interface ComarcaFeature {
  type: 'Feature';
  properties: ComarcaProperties;
  geometry: any;
}

interface ComarcaCollection {
  type: 'FeatureCollection';
  features: ComarcaFeature[];
}

export function ComarcaLayer() {
  const [comarcas, setComarcas] = useState<ComarcaCollection | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/comarques.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: ComarcaCollection) => {
        console.log('Datos de comarcas cargados:', data);
        setComarcas(data);
      })
      .catch(error => {
        console.error('Error cargando comarcas:', error);
        setError(error.message);
      });
  }, []);

  if (error) {
    console.error('Error en la capa de comarcas:', error);
    return null;
  }

  if (!comarcas) return null;

  return (
    <LayerGroup>
      <GeoJSON
        data={comarcas}
        style={() => ({
          color: '#2c3e50',
          weight: 2,
          fillColor: '#3498db',
          fillOpacity: 0.3
        })}
        onEachFeature={(feature, layer) => {
          const props = feature.properties;
          layer.bindPopup(`
            <div class="comarca-popup">
              <h3>${props.nom || 'Nombre no disponible'}</h3>
              <p><strong>Código:</strong> ${props.codi || 'No disponible'}</p>
              ${props.poblacio ? `<p><strong>Población:</strong> ${props.poblacio.toLocaleString('es-ES')} habitantes</p>` : ''}
            </div>
          `);
        }}
      />
    </LayerGroup>
  );
} 