import 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import { store } from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './screens/MapScreen';


const Stack = createStackNavigator()


export default function App() {
  return (
    <Provider store={store}>
      <KeyboardAvoidingView className='flex-1'>
        <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name='Home' component={HomeScreen} 
                options={{headerShown: false}}
              />
              <Stack.Screen name='MapScreen' component={MapScreen} 
                options={{headerShown: false}}
              />
            </Stack.Navigator>
        </NavigationContainer>
      </KeyboardAvoidingView>
    </Provider>
  );
}

