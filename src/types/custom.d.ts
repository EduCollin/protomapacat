declare module '*.json' {
  const value: any;
  export default value;
}

interface Municipality {
  type: 'Feature';
  properties: {
    codi: string;
    nom: string;
    comarca_codi: string;
    comarca_nom: string;
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
}

interface MunicipalityCollection {
  type: 'FeatureCollection';
  features: Municipality[];
} 