import React, { useEffect, useState, Component } from "react";
import { View, Text, SafeAreaView, StatusBar } from "react-native";
import ScrollableTabView, {
  DefaultTabBar,
} from "react-native-scrollable-tab-view";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import styles from "../styles/homeStyle";
import TabBar from "../components/tabBar/tabBar";
import HomePage from "./home";
console.disableYellowBox = true;

const Tab = createMaterialTopTabNavigator();

export default class MainBody extends Component {
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

      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Order" component={HomePage} />
        <Tab.Screen name="Diary" component={HomePage} />
        <Tab.Screen name="Settings" component={HomePage} />
      </Tab.Navigator>

    );
  }
}
