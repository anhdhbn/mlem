import React, { Component, useState, useEffect } from "react";
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

import search from "../assets/icon/search.png";
import SmartDishCard from "../components/smartDishCard/smartDishCard";

import homeServices from "../customerServices/homeServices";

import { Avatar, Button, Overlay } from "react-native-elements";

const base_url = "http://112.213.88.49:20000";
export default function (props) {
  const [listFavourite, setListFavourite] = useState(
    props.route.params.listFavourite
  );
  const [listSearch, setListSearch] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  useEffect(() => {
    //console.log("[INFO] List Favourite: ", props.route.params.listFavourite);
  }, []);
  const handClickIcon = async (newDish) => {
    //console.log("[INFO] Clicked dish: ", newDish);
    let newListFavourite = [];
    let isAdded = false;
    for (let index = 0; index < listFavourite.length; index++) {
      if (listFavourite[index].foodId === newDish.id) {
        isAdded = true;
        continue;
      } else {
        newListFavourite.push(listFavourite[index]);
      }
    }

    if (isAdded === false) {
      newListFavourite.push({ foodId: newDish.id });
    }

    setListFavourite(newListFavourite);

    setIsUpdating(true);
    let params = { account_AccountFoodFavorites: newListFavourite };
    //console.log("[INFO] Params to updateLikeFood: ", JSON.stringify(params));
    let response = await homeServices.updateLikedFood(params);
    setIsUpdating(false);
    props.route.params.setListLikedDish(response.account_AccountFoodFavorites);

    props.route.params.fetchFavourite();

    /*console.log(
      "[INFO] Response in detail.js, called updateLikedFood. New list: ",
      response.account_AccountFoodFavorites
    );*/
  };

  checkLikedFood = (id2Check) => {
    if (listFavourite) {
      for (let index = 0; index < listFavourite.length; index++) {
        if (listFavourite[index].foodId === id2Check) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <>
      <Overlay isVisible={true} fullScreen={true} overlayStyle={{ padding: 0 }}>
        <View style={styles.header}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => props.route.params.navigateHomePage()}
              activeOpacity={0.5}
              style={styles.button}
            >
              <Image
                source={require("../assets/icon/back.png")}
                style={styles.icon_button}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              flex: 10,
            }}
          >
            <View style={styles.viewInput}>
              <Image
                source={search}
                style={{ width: 15, height: 15, marginLeft: 10, marginTop: 12 }}
              />
              <TextInput
                style={styles.input}
                placeholder={"MlemMlem"}
                placeholderTextColor="#B21"
                onChangeText={(text) => {
                  props.route.params.searchDish(text).then((data) => {
                    // //console.log("[INFO] Response after search: ", data);
                    setListSearch(data);
                  });
                }}
              ></TextInput>
            </View>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {listSearch
            ? listSearch.map((dish) => (
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
                  handClickIcon={handClickIcon}
                  isActive={checkLikedFood(dish.id)}
                ></SmartDishCard>
              ))
            : null}
        </ScrollView>
      </Overlay>
    </>
  );
}

const styles = StyleSheet.create({
  icon_button: {
    width: 20,
    height: 20,
    marginTop: 5,
  },
  header: {
    flexDirection: "row",
  },
  image: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: 155,
    width: null,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  viewInput: {
    position: "relative",
    width: 350,
    borderRadius: 10,
    height: 40,
    marginLeft: 30,
    marginTop: 10,
    backgroundColor: "#c4c1c0",
    flexDirection: "row",
    overflow: "hidden",
    opacity: 0.8,
  },
  input: {
    textAlignVertical: "center",
    paddingLeft: 10,
    height: 40,
    borderRadius: 10,
    width: 350,
    color: "#B21",
  },
});
