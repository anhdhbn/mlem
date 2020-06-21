import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";

import { TextInput } from "react-native-paper";
import { Rating, AirbnbRating } from "react-native-elements";
const BASE_URL = "http://admin.wepick.vn:20000";

import Header from "../components/header/header";

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
    descreption: "Món này khá ngon",
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

  const [comment, setComment] = useState(null);

  ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
  };

  return (
    <View style={styles.container}>
      {/* <Header title="Chi tiết món ăn" hideButtonBack={true} /> */}
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
            //
            flexDirection: "row",
          }}
        >
          <View style={{}}>
            <Image
              source={{
                uri:
                  BASE_URL +
                  "/api/image/download/food/20200524/ba9ddc69-b8a9-4636-80f1-8a26aa0e1005.jpg",
              }}
              style={styles.avatar}
            ></Image>
          </View>
          <View>
            <View style={{ flex: 1, flexDirection: "column" }}>
              <View style={{ flex: 4, margin: 5 }}>
                <Text
                  style={{
                    fontFamily: "Regular",
                    fontSize: 24,
                  }}
                >
                  {data.name}
                </Text>
              </View>
              <View
                style={{
                  marginHorizontal: 10,
                  alignContent: "stretch",
                  flex: 1,

                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Regular",
                    fontSize: 21,
                    marginBottom: 7,
                    textAlignVertical: "bottom",
                    fontWeight: "bold",
                    color: "#DC0000",
                  }}
                >
                  4.4
                </Text>
                <Image source={StarIcon} style={styles.starIcon}></Image>
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 2,
              marginHorizontal: 10,
              marginVertical: 5,
              alignItems: "flex-end",
            }}
          >
            {data.discountRate ? (
              <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
                <Text
                  style={{
                    fontFamily: "Regular",
                    textDecorationLine: "line-through",
                    fontSize: 21,

                    color: "#ABABAB",
                  }}
                >
                  {formatPrice(data.priceEach)}
                </Text>
                <Text
                  style={{
                    fontFamily: "Regular",

                    fontSize: 21,
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
        <View style={{ margin: 10 }}>
          <Text
            style={{
              fontFamily: "Regular",
              fontSize: 21,
              color: "#8A8F9C",
            }}
          >
            Đánh giá
          </Text>
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

            flexDirection: "column",
          }}
        >
          <View style={{ marginVertical: 10 }}>
            <Rating
              ratingCount={5}
              imageSize={30}
              defaultRating={1}
              showRating={false}
              onFinishRating={ratingCompleted}
            />
          </View>
          <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
            <TextInput
              label="Đánh giá của bạn"
              value={comment}
              onChangeText={(text) => setComment(text)}
            />
          </View>
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
    marginLeft: 10,
    marginTop: 9,
    height: 24,
    width: 24,
  },

  avatar: {
    height: 100,
    width: 100,
    margin: 10,
  },
});
