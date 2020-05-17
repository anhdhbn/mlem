
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Order from './Order/Order';
import Menu from './Menu/Menu';
import Table from './Tables/Table';
import Notification from './Notification/Notification';

const OrderStack = createStackNavigator();
const MenuStack = createStackNavigator();
const TableStack = createStackNavigator();
const NotificationStack = createStackNavigator();
/*OrderStackScreen  */
const OrderStackScreen = ({ navigation }) => (
  <OrderStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#D20000",
      },
      headerTitleAlign: "center",
      headerTintColor: "#fff",
    }}
  >
    <OrderStack.Screen
      name="Home"
      component={Order}
      options={{
        title: "Đơn Đặt Hàng",
        headerLeft: () => (

          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#D20000"
            onPress={() => {
              navigation.openDrawer();
            }}
          ></Icon.Button>
        ),
      }}
    />
  </OrderStack.Navigator>
);

const MenuStackScreen = ({ navigation }) => (
  <MenuStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#D20000",
      },
      headerTitleAlign: "center",
      headerTintColor: "#fff",
    }}
  >
    <MenuStack.Screen
      name="Menu"
      component={Menu}
      options={{
        title: "Thực Đơn",
        headerLeft: () => (

          <Icon.Button name='ios-menu' size={25} backgroundColor='#D20000' onPress={() => { navigation.openDrawer() }}></Icon.Button>
        ),
        headerRight: () => (
          <AntDesign.Button name='plus' size={25} backgroundColor='#D20000' onPress={() => { navigation.openDrawer() }}></AntDesign.Button>

        ),
      }}
    />
  </MenuStack.Navigator>


);

const TableStackScreen = ({ navigation }) => (
  <TableStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#D20000",
      },
      headerTitleAlign: "center",
      headerTintColor: "#fff",
    }}
  >
    <TableStack.Screen
      name="Table"
      component={Table}
      options={{
        title: "Bàn",
        headerLeft: () => (

          <Icon.Button name='ios-menu' size={25} backgroundColor='#D20000' onPress={() => { navigation.openDrawer() }}></Icon.Button>
        ),
        headerRight: () => (
          <AntDesign.Button name='plus' size={25} backgroundColor='#D20000' onPress={() => { navigation.openDrawer() }}></AntDesign.Button>

        ),
      }}
    />
  </TableStack.Navigator>

  
);
/*  NotificationStackScreen*/
const NotificationStackScreen = ({ navigation }) => (
  <NotificationStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#D20000',
    },
    headerTitleAlign: 'center',
    headerTintColor: '#fff'
  }}>
    <NotificationStack.Screen
      name="Notification"
      component={Notification}
      options={{
        title: 'Thông báo',
        headerLeft: () => (
          <Icon.Button name='ios-menu' size={25} backgroundColor='#D20000' onPress={() => { navigation.openDrawer() }}></Icon.Button>
        )
      }}
    />
  </NotificationStack.Navigator>

);
export default function () {
  const drawer = createDrawerNavigator();
  return (

    <drawer.Navigator initialRouteName="Table">
      <drawer.Screen
        name="Home"
        component={OrderStackScreen}
      />
      <drawer.Screen
        name="Menu"
        component={MenuStackScreen}
      />
      <drawer.Screen
        name="Table"
        component={TableStackScreen}
      />
      <drawer.Screen
        name="Notification"
        component={NotificationStackScreen}
      />

    </drawer.Navigator>
  );
}
