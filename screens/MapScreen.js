import { View } from 'react-native'
import React from 'react'
import Map from '../components/Map'
import { createStackNavigator } from '@react-navigation/stack'
import NavigateCard from '../components/NavigateCard'
import RideOptionsCard from '../components/RideOptionsCard'
import { TouchableOpacity } from 'react-native'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'

const MapScreen = () => {
  const Stack = createStackNavigator()
  const navigation = useNavigation()
  return (
    <View>
      <TouchableOpacity 
        className='absolute top-16 left-8 bg-gray-100 z-50 p-3
        shadow-lg rounded-full'
        onPress={()=> navigation.navigate('Home')}
    >
        <Icon name='menu' />
      </TouchableOpacity>
      <View className='h-1/2'>
        <Map />
      </View>
      <View className='h-1/2'>
        <Stack.Navigator>
          <Stack.Screen 
            name='NavigateCard'
            component={NavigateCard}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name='RideOptionsCard'
            component={RideOptionsCard}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  )
}

export default MapScreen