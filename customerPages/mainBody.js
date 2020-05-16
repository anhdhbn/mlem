import React, { useEffect, useState, Component } from "react";
import { View, Text, SafeAreaView, StatusBar, YellowBox } from "react-native";
// import ScrollableTabView, {
//   DefaultTabBar,
// } from "react-native-scrollable-tab-view";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/FontAwesome";
// import styles from "../styles/homeStyle";
// import TabBar from "../components/tabBar/tabBar";

import HomePage from "./home";
import Detail from "./detail";

import Order from "./order";
import SelectDish from "./selectDish";

import History from "./history";
import Profile from "./profile";

YellowBox.ignoreWarnings([
  "Non-serializable values were found in the navigation state",
]);

const HomeStack = createStackNavigator();

function HomeStackScreen(props) {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomePage}
        initialParams={{ response: props.route.params.response }}
      />
      <HomeStack.Screen name="Detail" component={Detail} />
    </HomeStack.Navigator>
  );
}

const OrderStack = createStackNavigator();

function OrderStackScreen() {
  return (
    <OrderStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <OrderStack.Screen name="Order" component={Order} />
      <OrderStack.Screen name="SelectDish" component={SelectDish} />
    </OrderStack.Navigator>
  );
}

const Tab = createMaterialTopTabNavigator();

export default class MainBody extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      // <SafeAreaView style={styles.container}>
      //   {/* <StatusBar barStyle="dark-content" backgroundColor='transparent' translucent={true} /> */}
      //   <ScrollableTabView
      //     style={styles.container}
      //     tabBarPosition="bottom"
      //     initialPage={0}
      //     renderTabBar={() => <TabBar />}
      //   >
      //     <View tabLabel="Trang chủ" style={styles.tabView}>
      //       <HomePage />
      //     </View>
      //     <View tabLabel="Đặt bàn" style={styles.tabView}>
      //       <Text>Tab 2</Text>
      //     </View>
      //     <View tabLabel="Nhật ký" style={styles.tabView}>
      //       <Text>Tab 3</Text>
      //     </View>
      //     <View tabLabel="Tài khoản" style={styles.tabView}>
      //       <Text>Tab 4</Text>
      //     </View>
      //   </ScrollableTabView>
      // </SafeAreaView>
      // console.log("[INFO] Props in body: ", this.props),
      <Tab.Navigator
        initialRouteName="Home"
        tabBarPosition="bottom"
        lazy="true"
        tabBarOptions={{
          activeTintColor: "#DF0000",
          inactiveTintColor: "grey",
          labelStyle: { fontSize: 12, textTransform: "capitalize" },
          showIcon: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          initialParams={{ response: this.props.response }}
          options={{
            tabBarLabel: "Trang chủ".toLocaleLowerCase(),
            tabBarIcon: ({ _, color }) => (
              <Icon name="home" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Order"
          component={OrderStackScreen}
          options={{
            tabBarLabel: "Đặt bàn",
            tabBarIcon: ({ focused, color }) => (
              <Icon name="group" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Diary"
          component={History}
          options={{
            tabBarLabel: "Nhật ký",
            tabBarIcon: ({ _, color }) => (
              <Icon name="address-book" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          initialParams={{
            response: this.props.response,
            _signOut: this.props._signOut,
          }}
          component={Profile}
          options={{
            tabBarLabel: "Tôi",
            tabBarIcon: ({ _, color }) => (
              <Icon name="user" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}