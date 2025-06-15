import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { MunicipalityLayer } from './components/MunicipalityLayer'
import { ComarcaLayer } from './components/ComarcaLayer'
import 'leaflet/dist/leaflet.css'
import './App.css'

const INITIAL_STATE = {
  municipalities: true,
  comarcas: false
} as const

export default function App() {
  const [layers, setLayers] = React.useState(INITIAL_STATE)

  const toggleLayer = React.useCallback((layer: keyof typeof INITIAL_STATE) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }))
  }, [])

  return (
    <div className="container">
      <div className="control-panel">
        <div className="control-group">
          <h3>Capas</h3>
          <div className="toggle-switch">
            <input
              type="checkbox"
              id="municipiosLayer"
              checked={layers.municipalities}
              onChange={() => toggleLayer('municipalities')}
            />
            <label htmlFor="municipiosLayer">Municipios</label>
          </div>
          <div className="toggle-switch">
            <input
              type="checkbox"
              id="comarcasLayer"
              checked={layers.comarcas}
              onChange={() => toggleLayer('comarcas')}
            />
            <label htmlFor="comarcasLayer">Comarcas</label>
          </div>
        </div>
      </div>

      <div className="map-container">
        <MapContainer
          center={[41.7, 1.8]}
          zoom={8}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {layers.municipalities && <MunicipalityLayer visible={true} />}
          {layers.comarcas && <ComarcaLayer />}
        </MapContainer>
      </div>
    </div>
  )
} 