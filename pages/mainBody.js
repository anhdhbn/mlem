import React, { useEffect, useState, Component } from "react";
// import { View, Text, SafeAreaView, StatusBar } from "react-native";
// import ScrollableTabView, {
//   DefaultTabBar,
// } from "react-native-scrollable-tab-view";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
// import styles from "../styles/homeStyle";
// import TabBar from "../components/tabBar/tabBar";

import HomePage from "./home";
import History from "./history";
import Profile from "./profile";

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
          component={HomePage}
          options={{
            tabBarLabel: "Trang chủ".toLocaleLowerCase(),
            tabBarIcon: ({ _, color }) => (
              <Icon name="home" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Order"
          component={HomePage}
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
          initialParams={{ response: this.props.route.params.response }}
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
