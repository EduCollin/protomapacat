import { useEffect, useState } from 'react';
import { GeoJSON, Popup } from 'react-leaflet';

interface MunicipalityProperties {
  NOMMUNI: string;
  NOMCOMAR: string;
  POBLACIO?: number;
  CODIMUNI: string;
}

interface MunicipalityFeature {
  type: 'Feature';
  properties: MunicipalityProperties;
  geometry: any;
}

interface MunicipalityCollection {
  type: 'FeatureCollection';
  features: MunicipalityFeature[];
}

interface MunicipalityLayerProps {
  visible: boolean;
}

export function MunicipalityLayer({ visible }: MunicipalityLayerProps) {
  const [municipalities, setMunicipalities] = useState<MunicipalityCollection | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visible) {
      fetch('/data/municipis-geo.json')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data: MunicipalityCollection) => {
          console.log('Datos de municipios cargados:', data);
          setMunicipalities(data);
        })
        .catch(error => {
          console.error('Error cargando municipios:', error);
          setError(error.message);
        });
    }
  }, [visible]);

  if (!visible || error) {
    if (error) console.error('Error en la capa de municipios:', error);
    return null;
  }

  if (!municipalities) return null;

  return (
    <GeoJSON
      data={municipalities}
      style={{
        fillColor: '#3388ff',
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
      }}
      onEachFeature={(feature, layer) => {
        const props = feature.properties;
        layer.bindPopup(`
          <div class="municipality-popup">
            <h3>${props.NOMMUNI || 'Nombre no disponible'}</h3>
            <p><strong>Comarca:</strong> ${props.NOMCOMAR || 'No disponible'}</p>
            <p><strong>Población:</strong> ${props.POBLACIO ? props.POBLACIO.toLocaleString('es-ES') : 'No disponible'}</p>
            <p><strong>Código INE:</strong> ${props.CODIMUNI || 'No disponible'}</p>
          </div>
        `);
      }}
    />
  );
} 