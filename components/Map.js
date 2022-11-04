import { View, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import  MapView, { Marker }  from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice'
import MapViewDirections  from 'react-native-maps-directions'
import { GOOGLE_MAPS_API_KEYS } from '@env'

const Map = () => {
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const mapRef = useRef(null);
  const dispatch = useDispatch()
  
  useEffect(()=> {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50},
    });
  }, [origin, destination]);

  useEffect(()=>{
    if (!origin || !destination ) return
    const getTravelTime = async () => {
      fetch (`https://maps.googleapis.com/maps/api/distancematrix/json?units=matrix&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_API_KEYS}`)
      .then((res)=> res.json())
      .then((data) => {
        dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
        // console.log(data.rows[0].elements[0]);
      })
    }
    getTravelTime()
  }, [origin, destination, GOOGLE_MAPS_API_KEYS])

  return (  
      <MapView className='flex-1'
          initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
          mapType='mutedStandard'
          ref={mapRef}          
        >
        {origin && destination &&(
          <MapViewDirections
            origin={origin.description}
            destination={destination.description}
            apikey = {GOOGLE_MAPS_API_KEYS}
            strokeWidth = {3}
            strokeColor = 'black'
          />
        )}
        {origin?.location && (
          <Marker
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            title="Origin"
            description={origin.description}
            identifier='origin'
          />
        )}

        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            title="Destination"
            description={destination.description}
            identifier='destination'
          />
        )}
      </MapView>
  )
}

export default Map