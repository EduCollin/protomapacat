import { useEffect, useState } from 'react';
import { LayerGroup, GeoJSON, Popup } from 'react-leaflet';

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
      >
        {(feature: any) => (
          <Popup>
            <div className="comarca-popup">
              <h3>{feature.properties.nom}</h3>
              <p>Código: {feature.properties.codi}</p>
              {feature.properties.poblacio && (
                <p>Población: {feature.properties.poblacio.toLocaleString()} habitantes</p>
              )}
            </div>
          </Popup>
        )}
      </GeoJSON>
    </LayerGroup>
  );
} 