import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SideBar from './SideBar';
import DetailOrder from './Order/DetailOrder';
import Menu from './Menu/Menu';
import Order from './Order/Order';
import {NavigationContainer} from '@react-navigation/native'

const Stack = createStackNavigator();

export default function () {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='SideBar' component={SideBar} />
        <Stack.Screen name='Menu' component={Menu} />
        <Stack.Screen name='DetailOrder' component={DetailOrder} />
        <Stack.Screen name='Order' component={Order} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}