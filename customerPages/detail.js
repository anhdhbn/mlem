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

import homeServices from "../customerServices/homeServices";

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.handClickIcon = this.handClickIcon.bind(this);

    this.state = {
      listFavourite: this.props.route.params.listFavourite,
      isUpdating: false,
    };
  }

  handClickIcon = async (newDish) => {
    // console.log("[INFO] CLick icon in favouriteDish.js");
    // let newListFavouriteDishs = this.state.listFavouriteDishs.map((dish) =>
    //   dish.nameDish === newDish ? { ...dish, isLike: !dish.isLike } : dish
    // );
    // this.setState({ listFavouriteDishs: newListFavouriteDishs });
    console.log("[INFO] Clicked dish: ", newDish);
    let newListFavourite = [];
    let isAdded = false;
    for (let index = 0; index < this.state.listFavourite.length; index++) {
      if (this.state.listFavourite[index].foodId === newDish.id) {
        isAdded = true;
        continue;
      } else {
        newListFavourite.push(this.state.listFavourite[index]);
      }
    }

    if (isAdded === false) {
      newListFavourite.push({ foodId: newDish.id });
    }

    this.setState({ listFavourite: newListFavourite }, () => {
      console.log("[INFO] list Favourite dish: ", this.state.listFavourite);
    });

    this.setIsUpdating(true);
    let params = { account_AccountFoodFavorites: newListFavourite };
    let response = await homeServices.updateLikedFood(params);
    this.setIsUpdating(false);
    this.props.route.params.setListLikedDish(
      response.account_AccountFoodFavorites
    );

    this.props.route.params.fetchFavourite();

    console.log(
      "[INFO] Response in detail.js, called updateLikedFood. New list: ",
      response.account_AccountFoodFavorites
    );
  };

  setIsUpdating = (value) => {
    this.setState({ isUpdating: value });
  };

  checkLikedFood = (id2Check) => {
    if (this.state.listFavourite) {
      for (let index = 0; index < this.state.listFavourite.length; index++) {
        if (this.state.listFavourite[index].foodId === id2Check) {
          return true;
        }
      }
    }
    return false;
  };

  render() {
    return (
      <>
        {/* {console.log(this.props.route.params.listDishs)} */}
        <View tabLabel="Trang chủ" style={styles.tabView}>
          <Header
            // onPressBack={navigation.navigate("MainBody")}
            title={this.props.route.params.titleHeader}
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
                id={dish.id}
                linkImageDish={dish.image}
                nameDish={dish.name}
                describeDish={dish.descreption}
                price={dish.priceEach}
                // promoPrice={dish.discountRate * dish.priceEach}
                promoPrice={
                  dish.discountRate
                    ? (dish.priceEach * (100 - dish.discountRate)) / 100
                    : dish.discountRate
                }
                // For icon
                linkIconActive={require("../assets/icon/heart.png")}
                linkIconInactive={require("../assets/icon/heart-unlike.png")}
                handClickIcon={this.handClickIcon}
                isActive={this.checkLikedFood(dish.id)}
              ></SmartDishCard>
            ))}
          </ScrollView>
        </View>
      </>
    );
  }
}
