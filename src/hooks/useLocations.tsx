
import { useEffect, useRef, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';

export const useLocations = () => {

    const [ hasLocation, setHasLocation ] = useState(false);
    const [ routeLines, setRouteLines ] = useState<Location[]>([]);

    const [ initialPosition, setInitialPosition ] = useState<Location>({
        latitude: 0,
        longitude: 0,
    });

    const [ userLocation, setUseLocation ] = useState<Location>({
        longitude: 0,
        latitude: 0,
    });

    const watchId = useRef<number>();
    const isMounted = useRef<boolean>(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);


    useEffect(() => {

        getCurrentLocation()
            .then( location => {
                if( !isMounted.current ) return;
                setInitialPosition(location);
                setUseLocation(location);
                setRouteLines( routes => [ ...routes, location ]);
                setHasLocation(true);
            });

    }, []);

    const getCurrentLocation = (): Promise<Location> => {

        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({ coords }) => {
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                    });
                },
                (err) => reject(err), { enableHighAccuracy: true }
            );

        });
    };

    const followUserLocation = () => {
        watchId.current = Geolocation.watchPosition(
            ({ coords }) => {
               // TODO: OPCION DE OBSERVABLE rjx
               //if( !isMounted.current ) return;
               const location: Location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
               };

               setUseLocation({

                   latitude: coords.latitude,
                   longitude: coords.longitude,

               });

               setRouteLines( routes => [ ...routes, location ]);

            },
            (err) => console.log(err), { enableHighAccuracy: true, distanceFilter: 10 }
        );
    };

    const stopFollowUserLocation = () => {
        if( watchId.current ) {
            Geolocation.clearWatch( watchId.current );
        }
    }


    return {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowUserLocation,
        routeLines,
    }
};
