import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import Order from './Order/Order';
import Menu from './Menu/Menu';
import Table from './Tables/Table';
import { NavigationContainer } from '@react-navigation/native';
const OrderStack = createStackNavigator();
const MenuStack = createStackNavigator();
const TableStack = createStackNavigator();
const OrderStackScreen = ({ navigation }) => (
  <OrderStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#D20000',
    },
    headerTitleAlign: 'center',
    headerTintColor: '#fff'

  }}>
    <OrderStack.Screen
      name="Home"
      component={Order}
      options={{
        title: 'Đơn Đặt Hàng',
        headerLeft: () => (
          <Icon.Button name='ios-menu' size={25} backgroundColor='#D20000' onPress={() => { navigation.openDrawer() }}></Icon.Button>
        )
      }}
    />
  </OrderStack.Navigator>
)
const MenuStackScreen = ({ navigation }) => (
  <MenuStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#D20000',
    },
    headerTitleAlign: 'center',
    headerTintColor: '#fff'
  }}>
    <MenuStack.Screen
      name="Menu"
      component={Menu}
      options={{
        title: 'Thực Đơn',
        headerLeft: () => (
          <Icon.Button name='ios-menu' size={25} backgroundColor='#D20000' onPress={() => { navigation.openDrawer() }}></Icon.Button>
        )
      }}
    />
  </MenuStack.Navigator>
)
const TableStackScreen = ({ navigation }) => (
  <TableStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#D20000',
    },
    headerTitleAlign: 'center',
    headerTintColor: '#fff'
  }}>
    <TableStack.Screen
      name="Table"
      component={Table}
      options={{
        title: 'Bàn',
        headerLeft: () => (
          <Icon.Button name='ios-menu' size={25} backgroundColor='#D20000' onPress={() => { navigation.openDrawer() }}></Icon.Button>
        )
      }}
    />
  </TableStack.Navigator>
)
export default function () {
  const drawer = createDrawerNavigator();
  return (
    <drawer.Navigator initialRouteName="Home">
      <drawer.Screen
        name="Home"
        component={OrderStackScreen}
      />
      <drawer.Screen
        name="Thực Đơn"
        component={MenuStackScreen}
      />
      <drawer.Screen
        name="Table"
        component={TableStackScreen}
      />
    </drawer.Navigator>

  )

}