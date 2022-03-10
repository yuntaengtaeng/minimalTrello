import React, { useEffect } from 'react';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './src/store';

import Home from './src/pages/Home';
import AddCard from './src/pages/AddCard';
import CardDetil from './src/pages/CardDetail';

import SplashScreen from 'react-native-splash-screen';

import { Card } from './src/slices/items';

export type RootStackParamList = {
  Home: undefined;
  AddCard: {
    id: string
  };
  CardDetail: {
    cardInfo: Card;
  };
};

const Stack = createNativeStackNavigator();
function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddCard"
            component={AddCard}
            options={{
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#3498db'
              },
              title: '',
            }}
          />
          <Stack.Screen
            name="CardDetail"
            component={CardDetil}
            options={{
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#3498db'
              },
              title: '',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;