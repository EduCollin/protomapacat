export interface Municipality {
  name: string;
  population: number;
  geometry: any; // GeoJSON geometry
}
 
// Aquí añadiremos los datos reales de los municipios
export const municipalities: Municipality[] = []; 