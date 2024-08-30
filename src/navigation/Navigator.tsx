import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import {SplashScreen} from '../screens/SplashScreen/SplashScreen';
import {HomeScreen} from '../screens/HomeScreen/HomeScreen';
import {WeatherScreen} from '../screens/WeatherScreen/WeatherScreen';

const Stack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerLeft: () => null,
            headerShown: false,
            title: 'Select City',
            animationEnabled: true,
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
            transitionSpec: {
              open: {animation: 'timing', config: {duration: 800}},
              close: {animation: 'timing', config: {duration: 800}},
            },
          }}
        />
        <Stack.Screen
          name="WeatherScreen"
          component={WeatherScreen}
          options={{title: 'Weather Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
