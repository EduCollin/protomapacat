import { GeoJSON, Popup } from 'react-leaflet';
import { Municipality } from '../data/municipalities';

interface MunicipalityLayerProps {
  data: Municipality[];
}

export function MunicipalityLayer({ data }: MunicipalityLayerProps) {
  return (
    <>
      {data.map((municipality, index) => (
        <GeoJSON
          key={index}
          data={municipality.geometry}
          style={{
            fillColor: '#3388ff',
            weight: 1,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7
          }}
        >
          <Popup>
            <div>
              <h3>{municipality.name}</h3>
              <p>Población: {municipality.population.toLocaleString()} habitantes</p>
            </div>
          </Popup>
        </GeoJSON>
      ))}
    </>
  );
} 