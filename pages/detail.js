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

import Header from "../components/header/header";
import TabBar from "../components/tabBar/tabBar";
import SmartDishCard from "../components/smartDishCard/smartDishCard";
import styles from "../styles/favouriteDishStyle";

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.handClickIcon = this.handClickIcon.bind(this);

    this.state = {
      listFavouriteDishs: [
        {
          id: 6,
          linkImageDish:
            "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
          nameDish: "Món 1",
          describeDish: "Miêu tả món ăn",
          price: "100000",
          promoPrice: "50000",
          isLike: true,
        },
        {
          id: 5,
          linkImageDish:
            "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
          nameDish: "Món 2",
          describeDish: "Miêu tả món ăn",
          price: "100000",
          promoPrice: "50000",
          isLike: false,
        },
        {
          id: 4,
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
        <View tabLabel="Trang chủ" style={styles.tabView}>
          <Header
            // onPressBack={navigation.navigate("MainBody")}
            title="Món yêu thích"
          ></Header>
          {this.state.listFavouriteDishs.map((dish) => (
            <SmartDishCard
              key={dish.id}
              linkImageDish={dish.linkImageDish}
              nameDish={dish.nameDish}
              describeDish={dish.describeDish}
              price={dish.price}
              promoPrice={dish.promoPrice}
              // For icon
              linkIconActive={require("../assets/icon/heart.png")}
              linkIconInactive={require("../assets/icon/heart-unlike.png")}
              handClickIcon={this.handClickIcon}
              isActive={dish.isLike}
            ></SmartDishCard>
          ))}
        </View>
      </>
    );
  }
}
