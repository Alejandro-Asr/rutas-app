import React from 'react';
import MapView from 'react-native-maps';

export const Map = () => {

  return (
    <>
        <MapView
            style={{ flex: 1 }}
            showsUserLocation
            initialRegion={{
                latitude: 37.9986879,
                longitude: -1.1381658,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            {/* <Marker
                image={ require('../assets/custom-marker.png') }
                coordinate={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                }}
                title="Título del marcador"
                description="Descripción del marcador"
            /> */}

        </MapView>
    </>
  );

};
