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
import moment from "moment";
import { Avatar, Button, Overlay } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";

import { TextInput } from "react-native-paper";
import { Rating, AirbnbRating } from "react-native-elements";
const BASE_URL = "http://admin.wepick.vn:20000";

import Header from "../components/header/header";

import TickIcon from "../assets/icon/tick.png";
import StarIcon from "../assets/icon/star.png";
import PreviousIcon from "../assets/icon/previous.png";
import SendIcon from "../assets/icon/icons8-send-letter-96.png";

import formatPrice from "../components/formatPrice";
import calculatePrice from "../components/order/calculatePrice";
import reviewServices from "../customerServices/reviewServices";
import { useSafeArea } from "react-native-safe-area-context";
/*  NotificationStackScreen*/

const window = Dimensions.get("window");

export default (props) => {
  const [data, setData] = useState({
    errors: null,
    id: 8,
    name: "Lẩu - Buffet 3",
    priceEach: 10000.0,
    discountRate: 10.0,
    imageId: 8,
    statusId: 1,
    descreption:
      "Cơ hội nào cho các bạn trẻ, góc nhìn thực tế về ngành CNTT hiện tại và tương lai, Cơ hội nào cho các bạn trẻ, góc nhìn thực tế về ngành CNTT hiện tại và tương lai",
    rate: 5.0,
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
    comments: [
      {
        errors: null,
        id: 1,
        foodId: 8,
        content:
          "Cơ hội nào cho các bạn trẻ, góc nhìn thực tế về ngành CNTT hiện tại và tương lai, Cơ hội nào cho các bạn trẻ, góc nhìn thực tế về ngành CNTT hiện tại và tương lai",
        time: "2020-06-29T21:21:38.23",
        accountId: 11,
        foodAccountMapping: {
          errors: null,
          foodId: 8,
          accountId: 11,
          rate: 5,
        },
        account: {
          errors: null,
          id: 11,
          email: "vietlinh15@coldmail.com",
          displayName: "Nguyen Viet Linh",
          imageId: 20121,
          image: {
            errors: null,
            id: 20121,
            name: "7de04aaa-bd1c-4f6a-886e-6a34cd445cc2.jpg",
            content: null,
            mimeType: "application/octet-stream",
            path: "/food/20200628/cd4272b4-1977-4fcf-9da6-b71c297d4cbe.jpg",
            url:
              "/api/image/download/food/20200628/cd4272b4-1977-4fcf-9da6-b71c297d4cbe.jpg",
          },
        },
      },
    ],
    foodFoodTypeMappings: [
      {
        errors: null,
        id: 1,
        foodId: 8,
        foodTypeId: 1,
        food: null,
        foodType: {
          errors: null,
          id: 1,
          name: "Size nhỏ",
          statusId: 1,
        },
      },
      {
        errors: null,
        id: 2,
        foodId: 8,
        foodTypeId: 2,
        food: null,
        foodType: {
          errors: null,
          id: 2,
          name: "Size vừa",
          statusId: 1,
        },
      },
      {
        errors: null,
        id: 3,
        foodId: 8,
        foodTypeId: 3,
        food: null,
        foodType: {
          errors: null,
          id: 3,
          name: "Size lớn",
          statusId: 1,
        },
      },
    ],
    foodFoodGroupingMappings: [
      {
        errors: null,
        foodId: 8,
        foodGroupingId: 1,
        foodGrouping: {
          errors: null,
          id: 1,
          name: "Lẩu - Buffet",
          statusId: 1,
        },
      },
    ],
  });

  const [changeReview, setChangeReview] = useState(false);

  const [comment, setComment] = useState(null);

  ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
    setChangeReview(true);
  };

  const submitReview = async () => {
    setChangeReview(false);
  };

  return (
    <View style={styles.container}>
      <Overlay isVisible={true} fullScreen={true} overlayStyle={{ padding: 0 }}>
        <Header title="Chi tiết món ăn" hideButtonBack={true} />
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
              flex: 1,
              //
              flexDirection: "column",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{}}>
                <Image
                  source={{
                    uri: BASE_URL + data.image.url,
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
                        fontWeight: "bold",
                        fontSize: 27,
                      }}
                    >
                      {data.name}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 2,
                      marginHorizontal: 10,
                      marginVertical: 5,

                      justifyContent: "center",
                    }}
                  >
                    {data.discountRate ? (
                      <View style={{ flexDirection: "column" }}>
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
              </View>

              <View
                style={{
                  // marginHorizontal: 10,

                  flex: 1,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 5,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 5,
                    margin: 10,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    width: 70,
                    elevation: 5,
                    alignItems: "center",
                    flex: 1,
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      borderBottomColor: "#8A8F9C",
                      borderBottomWidth: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Regular",
                        fontSize: 26,
                        marginBottom: 7,
                        textAlignVertical: "bottom",
                        fontWeight: "bold",
                        color: "#DC0000",

                        opacity: 1,
                      }}
                    >
                      {data.rate}
                    </Text>
                  </View>

                  <Image source={StarIcon} style={styles.starIcon}></Image>
                </View>
              </View>
            </View>

            <View style={{ margin: 10 }}>
              <Text style={{ color: "#8A8F9C", fontSize: 17 }}>
                {data.descreption}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  marginHorizontal: 10,
                  fontFamily: "Regular",
                  fontSize: 17,
                  color: "#232A2F",
                }}
              >
                Đánh giá món ăn này
              </Text>
              <View style={{ marginVertical: 10 }}>
                <AirbnbRating
                  count={5}
                  starContainerStyle={{}}
                  defaultRating={0}
                  onFinishRating={ratingCompleted}
                  size={30}
                  showRating={false}
                  starStyle={{ marginHorizontal: 10 }}
                />
              </View>
              {changeReview ? (
                <View
                  style={{
                    marginHorizontal: 10,
                    marginBottom: 10,
                    flexDirection: "column",
                  }}
                >
                  <TextInput
                    label="Chia sẻ về cảm nhận của bạn (Tùy chọn)"
                    value={comment}
                    multiline={true}
                    mode="outlined"
                    onChangeText={(text) => setComment(text)}
                  />
                  <View style={{ right: 0, alignItems: "flex-end" }}>
                    <TouchableOpacity
                      onPress={() => {
                        submitReview();
                      }}
                    >
                      <Text
                        style={{
                          color: "#DF0000",
                          fontSize: 17,
                          padding: 10,
                          right: 0,
                        }}
                      >
                        Gửi
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
            </View>
          </View>

          <View style={{ margin: 10 }}>
            <Text
              style={{
                fontFamily: "Regular",
                fontSize: 17,
                color: "#8A8F9C",
                textAlign: "justify",
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
              flex: 1,
              //
              flexDirection: "column",
            }}
          >
            {data.comments.map((item) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <View style={{ justifyContent: "center" }}>
                    <Avatar
                      rounded
                      size={80}
                      source={
                        item.account.image.url
                          ? {
                              uri:
                                "http://admin.wepick.vn:20000" +
                                item.account.image.url,
                            }
                          : require("../assets/icon/user.png")
                      }
                      imageProps={(resizeMode = "center")}
                      containerStyle={{
                        marginVertical: 10,
                        marginHorizontal: 10,
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                      {item.account.displayName}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <AirbnbRating
                        count={5}
                        defaultRating={item.foodAccountMapping.rate}
                        isDisabled={true}
                        size={15}
                        showRating={false}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#8A8F9C",
                          paddingTop: 1.5,
                          paddingLeft: 2,
                        }}
                      >
                        {moment(item.time).format("HH:mm") +
                          " - " +
                          moment(item.time).format("DD/MM/YYYY")}
                      </Text>
                    </View>

                    <View style={{ paddingRight: 10 }}>
                      <Text style={{ fontSize: 16, color: "#232A2F" }}>
                        {item.content}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",

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
            position: "absolute",
            padding: 10,
            elevation: 5,
            bottom: 0,
            flex: 1,
          }}
        >
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                title="Yêu thích"
                buttonStyle={{ width: 185, backgroundColor: "#DF0000" }}
              />
            </View>

            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                title="Đặt ngay"
                buttonStyle={{ width: 185, backgroundColor: "#DF0000" }}
              />
            </View>
          </View>
        </View>
      </Overlay>
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
    margin: 9,
    height: 24,
    width: 24,

    opacity: 1,
  },

  avatar: {
    height: 100,
    width: 100,
    margin: 10,
    borderRadius: 5,
  },
});
