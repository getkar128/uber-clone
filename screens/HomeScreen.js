import { View, Text, Image, ScrollView} from 'react-native'
import React from 'react'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEYS } from '@env'
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';

const HomeScreen = () => {

  const dispatch = useDispatch();


  return (
    
    <View className='p-5'>
        <Image
            source={{uri: 'https://links.papareact.com/gzs'}}
            style={{
                width: 100,
                height: 100,
                resizeMode: 'contain'
            }}
        />
          <GooglePlacesAutocomplete
            placeholder='Where from?'
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              // console.log(data, details);
              dispatch(setOrigin({
                location: details.geometry.location,
                description: data.description
              }))
            }}
            fetchDetails={true}
            returnKeyType={'search'}
            styles={{
              container: {
                flex: 0
              },
              textInput: {
                fontSize: 18
              }
            }}
            query={{
              key: GOOGLE_MAPS_API_KEYS,
              language: 'en'
            }}
            onFail={error => console.error(error)}
            enablePoweredByContainer={false}
          />
        <NavOptions/>
        <NavFavourites />
  </View>
  )
}

export default HomeScreen