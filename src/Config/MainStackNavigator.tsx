import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen';
import RegistrationScreen from '../Screens/RegistractionScreen';
import Drawer from '../Config/MainDrawerNavigator';
const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          component={LoginScreen}
          name="Login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={RegistrationScreen}
          name="Register"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={Drawer}
          name="Drawer"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
