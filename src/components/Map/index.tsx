import { useRef } from 'react'
import { useTheme } from 'styled-components/native'
import MapView, { LatLng, MapViewProps, Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'

import { MapPin } from '../MapPin'

type Props = MapViewProps & {
  coordinates: LatLng[]
}

export function Map({ coordinates, ...rest }: Props) {
  const lastCoordinate = coordinates[coordinates.length - 1]
  const mapRef = useRef<MapView>(null)
  const { colors } = useTheme()

  async function onMapLoaded() {
    if (coordinates.length > 1) {
      mapRef.current?.fitToSuppliedMarkers(
        ['departure', 'arrival'],
        {
          edgePadding: { top: 100, right: 50, bottom: 50, left: 50 },
        }
      )
    }
  }

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={{ width: '100%', height: 180 }}
      region={{
        latitude: lastCoordinate.latitude,
        longitude: lastCoordinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      onMapLoaded={onMapLoaded}
      {...rest}
    >
      <Marker identifier="departure" coordinate={coordinates[0]}>
        <MapPin />
      </Marker>
      {
        coordinates.length > 1 && (
          <>
            <Marker identifier="arrival" coordinate={lastCoordinate}>
              <MapPin />
            </Marker>
            <Polyline
              coordinates={[...coordinates]}
              strokeColor={colors.brandLight}
              strokeWidth={6}
            />
          </>
        )
      }
    </MapView>
  )
}