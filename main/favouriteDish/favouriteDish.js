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
import SmartDishCard from "../smartDishCard/smartDishCard";
import styles from "./style";

export default class FavouriteDish extends Component {
  constructor(props) {
    super(props);
    this.handClickIcon = this.handClickIcon.bind(this);

    this.state = {
      listFavouriteDishs: [
        {
          linkImageDish:
            "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
          nameDish: "Món 1",
          describeDish: "Miêu tả món ăn",
          price: "100000",
          promoPrice: "50000",
          isLike: true,
        },
        {
          linkImageDish:
            "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
          nameDish: "Món 2",
          describeDish: "Miêu tả món ăn",
          price: "100000",
          promoPrice: "50000",
          isLike: false,
        },
        {
          linkImageDish:
            "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
          nameDish: "Món 3",
          describeDish: "Món này không được giảm giá",
          price: "100000",
          promoPrice: null,
          isLike: false,
        },
      ],
    };
  }

  handClickIcon(nameDish) {
    // console.log("[INFO] CLick icon in favouriteDish.js");
    let newListFavouriteDishs = this.state.listFavouriteDishs.map((dish) =>
      dish.nameDish === nameDish ? { ...dish, isLike: !dish.isLike } : dish
    );
    this.setState({ listFavouriteDishs: newListFavouriteDishs });
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
              {this.state.listFavouriteDishs.map((dish) => (
                <SmartDishCard
                  linkImageDish={dish.linkImageDish}
                  nameDish={dish.nameDish}
                  describeDish={dish.describeDish}
                  price={dish.price}
                  promoPrice={dish.promoPrice}
                  // For icon
                  linkIconActive={require("../../icon/heart.png")}
                  linkIconInactive={require("../../icon/heart-unlike.png")}
                  handClickIcon={this.handClickIcon}
                  isActive={dish.isLike}
                ></SmartDishCard>
              ))}
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
