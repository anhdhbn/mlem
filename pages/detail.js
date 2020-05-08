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

    this.state = {};
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
        {/* {console.log(this.props.route.params.listDishs)} */}
        <View tabLabel="Trang chủ" style={styles.tabView}>
          <Header
            // onPressBack={navigation.navigate("MainBody")}
            title="Món yêu thích"
          ></Header>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.props.route.params.listDishs.map((dish) => (
              //   {
              //     "descreption": "Món này được giảm giá",
              //     "discountRate": 10,
              //     "errors": null,
              //     "foodFoodGroupingMappings": null,
              //     "foodFoodTypeMappings": null,
              //     "id": 11,
              //     "image": null,
              //     "imageId": null,
              //     "name": "Hải sản 3",
              //     "priceEach": 10000,
              //     "statusId": 0
              // }
              <SmartDishCard
                key={dish.id}
                linkImageDish={dish.image}
                nameDish={dish.name}
                describeDish={dish.descreption}
                price={dish.priceEach}
                // promoPrice={dish.discountRate * dish.priceEach}
                promoPrice={dish.discountRate}
                // For icon
                linkIconActive={require("../assets/icon/heart.png")}
                linkIconInactive={require("../assets/icon/heart-unlike.png")}
                handClickIcon={this.handClickIcon}
                isActive={false}
              ></SmartDishCard>
            ))}
          </ScrollView>
        </View>
      </>
    );
  }
}
