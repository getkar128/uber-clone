import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'
import "intl";


const data = [
  {
    id: 'Uber-X-123',
    title: 'UberX',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn'
  },
  {
    id: 'Uber-XL-456',
    title: 'Uber XL',
    multiplier: 1.2,
    image: 'https://links.papareact.com/5w8'
  },
  {
    id: 'Uber-LUX-789',
    title: 'Uber LUX',
    multiplier: 1.75,
    image: 'https://links.papareact.com/7pf'
  },
]

const SURGE_CHANGE_RATE = 1.5

const RideOptionsCard = () => {
  const navigation = useNavigation()
  const [selected, setSelected] = useState(null)
  const travelTimeInformation = useSelector(selectTravelTimeInformation)

  return (
    <SafeAreaView className='bg-white'>
      <View >
          <TouchableOpacity className='top-3 left-5 p-3 rounded-full absolute z-50' onPress={navigation.goBack}>
              <Icon name='chevron-left' type='font-awesome'/>
          </TouchableOpacity>
        <Text className='text-center py-5 text-xl'>Select a Ride - {travelTimeInformation?.distance.text}</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item)=> item.id}
        renderItem={({item: {id, image, title, multiplier}, item})=>{
          return (
            <TouchableOpacity
              className={`flex-row justify-between items-center px-10 ${id === selected?.id && 'bg-gray-200'}`}
              onPress={()=> setSelected(item)}
            >
                <Image
                  source={{uri: image}}
                  style={{
                    width: 80,
                    height: 80,
                    resizeMode: 'contain'
                  }}
                />
                <View style='-ml-6'>
                  <Text className='text-xl font-semibold'>{title}</Text>
                  <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
                </View>
                <Text className='text-xl'>₹{Math.round( travelTimeInformation?.duration.value * SURGE_CHANGE_RATE * multiplier)/100}
                  {/* {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR'
                  }).format(
                    ()
                  )} */}
                </Text>
            </TouchableOpacity>
           
          )
        }}
      />
      <View>
        <TouchableOpacity disabled={!selected} className={`bg-black m-3 py-3 ${!selected && 'bg-gray-300'}`}>
          <Text className='text-center text-white text-xl'>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>

      
    </SafeAreaView>
  )
}

export default RideOptionsCard