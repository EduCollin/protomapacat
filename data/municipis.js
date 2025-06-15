const municipisData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "nom": "Barcelona",
                "comarca": "Barcelonès",
                "provincia": "Barcelona"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [2.0742, 41.3696],
                    [2.2281, 41.3696],
                    [2.2281, 41.4696],
                    [2.0742, 41.4696],
                    [2.0742, 41.3696]
                ]]
            }
        }
        // Nota: Este es solo un ejemplo con Barcelona, añadiremos más municipios después
    ]
};

export default municipisData; 