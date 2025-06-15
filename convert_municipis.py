import json

# Leer el archivo JSON original
with open('data/municipis.json', 'r', encoding='utf-8') as f:
    raw_data = json.load(f)

# Imprimir información sobre la estructura
print("Estructura del JSON:")
print("\nPrimera fila de datos completa:")
if 'data' in raw_data and len(raw_data['data']) > 0:
    first_row = raw_data['data'][0]
    print(f"Longitud de la primera fila: {len(first_row)}")
    print("Contenido de la primera fila:")
    for i, value in enumerate(first_row):
        print(f"Índice {i}: {value}")

# Obtener la información de las columnas
columns = raw_data['meta']['view']['columns']
data_columns = [col for col in columns if not col['name'] in ['sid', 'id', 'position', 'created_at', 'created_meta', 'updated_at', 'updated_meta', 'meta']]

# Crear un diccionario para mapear nombres de columnas a índices
column_indices = {col['name']: i for i, col in enumerate(data_columns)}

# Crear la estructura GeoJSON
geojson = {
    "type": "FeatureCollection",
    "features": []
}

# Convertir cada municipio a un feature GeoJSON
for i, row in enumerate(raw_data.get('data', [])):
    try:
        # Los índices están basados en la estructura del JSON que vimos
        codi = row[8]  # índice de 'Codi'
        nom = row[9]   # índice de 'Nom'
        comarca_codi = row[10]  # índice de 'Codi comarca'
        comarca_nom = row[11]   # índice de 'Nom comarca'
        lon = float(row[14])    # índice de 'Longitud'
        lat = float(row[15])    # índice de 'Latitud'
        
        # Crear el feature
        feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [lon, lat]
            },
            "properties": {
                "codi": codi,
                "nom": nom,
                "comarca_codi": comarca_codi,
                "comarca_nom": comarca_nom
            }
        }
        geojson['features'].append(feature)
        
        # Imprimir progreso cada 100 municipios
        if (i + 1) % 100 == 0:
            print(f"Procesados {i + 1} municipios...")
            
    except (ValueError, IndexError) as e:
        print(f"Error procesando fila {i}: {e}")
        print(f"Contenido de la fila con error:")
        for j, value in enumerate(row):
            print(f"Índice {j}: {value}")
        continue

# Guardar el GeoJSON resultante
with open('data/municipis_geo.json', 'w', encoding='utf-8') as f:
    json.dump(geojson, f, ensure_ascii=False, indent=2)

print("\nConversión completada. Archivo guardado como municipis_geo.json") 