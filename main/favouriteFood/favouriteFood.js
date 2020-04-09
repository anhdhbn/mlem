// import React, { Component } from "react";
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   KeyboardAvoidingView,
// } from "react-native";

// import styles from "./style";
// export default class Header extends Component {
//   constructor(props) {
//     super(props);

//     // this.state = {
//     //   nameScreen: "",
//     // };
//   }

//   render() {
//     return <></>;
//   }
// }

import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import ScrollableTabView, {
  DefaultTabBar,
} from "react-native-scrollable-tab-view";
import Header from "../../template/header/header";
import TabBar from "../../template/tabBar/tabBar";
import styles from "./style";
export default class FavouriteFood extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   nameScreen: "",
    // };
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          {/* <StatusBar barStyle="dark-content" backgroundColor='transparent' translucent={true} /> */}
          <ScrollableTabView
            style={styles.container}
            tabBarPosition="bottom"
            initialPage={0}
            renderTabBar={() => <TabBar />}
          >
            <View tabLabel="Trang chủ" style={styles.tabView}>
              <Header title="Món yêu thích"></Header>
              <Text>Tab 1</Text>
            </View>
            <View tabLabel="Đặt bàn" style={styles.tabView}>
              <Text>Tab 2</Text>
            </View>
            <View tabLabel="Nhật ký" style={styles.tabView}>
              <Text>Tab 3</Text>
            </View>
            <View tabLabel="Tài khoản" style={styles.tabView}>
              <Text>Tab 4</Text>
            </View>
          </ScrollableTabView>
        </SafeAreaView>
      </>
    );
  }
}
