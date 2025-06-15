/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="leaflet" />

declare module 'react-leaflet' {
  import { FC } from 'react';
  import { LatLngTuple, PathOptions } from 'leaflet';

  interface LayerGroupProps {
    children: React.ReactNode;
  }

  interface CircleMarkerProps {
    center: LatLngTuple;
    radius?: number;
    pathOptions?: PathOptions;
    children?: React.ReactNode;
  }

  interface PopupProps {
    children: React.ReactNode;
  }

  interface MapContainerProps {
    center: LatLngTuple;
    zoom: number;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }

  interface TileLayerProps {
    url: string;
    attribution?: string;
  }

  export const LayerGroup: FC<LayerGroupProps>;
  export const CircleMarker: FC<CircleMarkerProps>;
  export const Popup: FC<PopupProps>;
  export const MapContainer: FC<MapContainerProps>;
  export const TileLayer: FC<TileLayerProps>;
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.json' {
  const content: any;
  export default content;
} 