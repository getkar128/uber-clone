import { View, Text, SafeAreaView, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_API_KEYS } from '@env'
import { useDispatch } from 'react-redux'
import { setDestination } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import NavFavourites from './NavFavourites'
import { TouchableOpacity } from 'react-native'
import { Icon } from '@rneui/themed'

const NavigateCard = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
  return (
    <SafeAreaView className='bg-white flex-1'>
      <Text className='text-center py-5 text-xl'>Good Morning Karthik</Text>
      <View className='border-t border-gray-200 flex-shrink'>
         <View>
            <GooglePlacesAutocomplete
                placeholder='Where to ?'
                styles={toInputBoxStyles}
                fetchDetails={true}
                returnKeyType={'search'}
                minLength={2}
                onPress={(data, details = null)=>{
                    dispatch(setDestination({
                        location: details.geometry.location,
                        description: data.description
                    }))
                    navigation.navigate('RideOptionsCard')
                }}
                enablePoweredByContainer={false}
                query={{
                    key: GOOGLE_MAPS_API_KEYS,
                    language: 'en'  
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
            />
         </View>
         <NavFavourites/>
        </View>

        <View 
        className='flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100'
        >
        <TouchableOpacity 
            onPress={()=> navigation.navigate('RideOptionsCard')}
            className='flex-row bg-black w-24 px-4 py-3
            rounded-full flex justify-between'>
            <Icon 
                name='car'
                type='font-awesome'
                color='white'
                size={16}
            />
            <Text className='text-white text-center'>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity className='flex-row bg-white w-24 px-4 py-3
        rounded-full flex justify-between'>
            <Icon 
                name='car'
                type='font-awesome'
                color='black'
                size={16}
            />
            <Text className=' text-center'>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 8,
        paddingVertical: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: '#DDDDDf',
        borderRadius: 2,
        fontSize: 18
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0
    }
})