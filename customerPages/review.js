import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import * as signalR from "@aspnet/signalr";
import { Rating, AirbnbRating } from "react-native-elements";
const BASE_URL = "http://admin.wepick.vn:20000";

import TickIcon from "../assets/icon/tick.png";
import StarIcon from "../assets/icon/star.png";
import PreviousIcon from "../assets/icon/previous.png";

import formatPrice from "../components/formatPrice";
/*  NotificationStackScreen*/

const window = Dimensions.get("window");

export default (props) => {
  const data = {
    errors: null,
    id: 7,
    name: "Lẩu - Buffet 5",
    priceEach: 10000.0,
    discountRate: 10.0,
    imageId: 8,
    statusId: 1,
    descreption: null,
    image: {
      errors: null,
      id: 8,
      name:
        "352332-buffet-lau-an-tha-ga-free-coca-tai-nha-hang-t-house-dai-co-viet.jpg",
      content: null,
      mimeType: "application/octet-stream",
      path: "/food/20200524/ba9ddc69-b8a9-4636-80f1-8a26aa0e1005.jpg",
      url:
        "/api/image/download/food/20200524/ba9ddc69-b8a9-4636-80f1-8a26aa0e1005.jpg",
    },
    status: {
      errors: null,
      id: 1,
      code: "Active",
      name: "Đang bán",
    },
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            // Card
            borderRadius: 6,
            elevation: 3,
            backgroundColor: "#fff",
            shadowOffset: { width: 1, height: 1 },
            shadowColor: "#333",
            shadowOpacity: 0.3,
            shadowRadius: 2,
          }}
        >
          <Image
            source={{
              uri:
                BASE_URL +
                "/api/image/download/food/20200524/ba9ddc69-b8a9-4636-80f1-8a26aa0e1005.jpg",
            }}
            style={styles.avatar}
          ></Image>
          <TouchableOpacity
            style={{ position: "absolute", zIndex: 1 }}
            onPress={() => {
              console.log("Back");
            }}
          >
            <Image source={PreviousIcon} style={styles.icon}></Image>
          </TouchableOpacity>

          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 4, margin: 10 }}>
              <Text
                style={{
                  fontFamily: "Regular",
                  fontSize: 21,
                  fontWeight: "bold",
                }}
              >
                {data.name}
              </Text>
            </View>
            <View style={{ flex: 2, margin: 10, alignItems: "flex-end" }}>
              {data.discountRate ? (
                <View
                  style={{ flexDirection: "column", alignItems: "flex-end" }}
                >
                  <Text
                    style={{
                      fontFamily: "Regular",
                      textDecorationLine: "line-through",
                      fontSize: 21,
                      fontWeight: "bold",
                      color: "#ABABAB",
                    }}
                  >
                    {formatPrice(data.priceEach)}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Regular",

                      fontSize: 21,
                      fontWeight: "bold",
                    }}
                  >
                    {formatPrice(
                      (data.priceEach * (100 - data.discountRate)) / 100
                    )}
                  </Text>
                </View>
              ) : (
                <Text
                  style={{
                    fontFamily: "Regular",
                    fontSize: 21,
                    fontWeight: "bold",
                  }}
                >
                  {formatPrice(data.priceEach)}
                </Text>
              )}
            </View>
          </View>
          {data.descreption ? (
            <View style={{ margin: 10 }}>
              <Text
                style={{
                  fontFamily: "Regular",
                  fontSize: 21,
                  fontWeight: "bold",
                }}
              >
                {data.descreption}
              </Text>
            </View>
          ) : null}
        </View>
        <View
          style={{
            // Card
            borderRadius: 6,
            elevation: 3,
            backgroundColor: "#fff",
            shadowOffset: { width: 1, height: 1 },
            shadowColor: "#333",
            shadowOpacity: 0.3,
            shadowRadius: 2,
            //
            marginTop: 10,
            flexDirection: "column",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <View style={{ margin: 10, flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Regular",
                  fontSize: 21,
                  fontWeight: "bold",
                }}
              >
                Đánh giá
              </Text>
            </View>
            <View
              style={{
                margin: 10,
                alignItems: "flex-end",
                flex: 1,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  alignItems: "flex-end",
                  flex: 1,
                  paddingRight: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Regular",
                    fontSize: 21,
                    fontWeight: "bold",
                    color: "#DC0000",
                    alignItems: "flex-end",
                  }}
                >
                  4.4
                </Text>
              </View>

              <View
                style={{
                  alignItems: "flex-end",
                }}
              >
                <Image source={StarIcon} style={styles.starIcon}></Image>
              </View>
            </View>
          </View>
          {/* https://react-native-elements.github.io/react-native-elements/docs/rating.html */}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F7",
    flexDirection: "column",
  },
  cardView: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  icon: {
    opacity: 0.69,
    margin: 10,
    height: 40,
    width: 40,
  },
  starIcon: {
    margin: 3,
    height: 24,
    width: 24,
  },

  avatar: {
    height: window.width / 2,
    width: window.width,

    right: 10,
    marginLeft: 10,
  },
});
