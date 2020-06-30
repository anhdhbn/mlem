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

import Snackbar from "../components/common/snackbarUpdating";
import { SafeAreaView } from "react-native-safe-area-context";

/*  NotificationStackScreen*/

const window = Dimensions.get("window");

export default (props) => {
  const [data, setData] = useState(null);

  const [changeReview, setChangeReview] = useState(false);
  const [rate, setRate] = useState(0);

  const [comment, setComment] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
    setRate(rating);
    setChangeReview(true);
  };

  const submitReview = async () => {
    setChangeReview(false);
    createAlert("Đang cập nhật");
    let paramsVote = { foodId: data.id, rate: rate };
    let paramsComment = { foodId: data.id, content: comment };
    console.log("INFO Param to vote: ", paramsVote);
    console.log("INFO Param to comment: ", paramsComment);
    await reviewServices
      .vote(paramsComment)
      .then((res) => {
        createAlert("Chúng tôi đã nhận được nhận xét của bạn");
      })
      .catch((err) => {
        createAlert("Cập nhật đánh giá sao thất bại");
      });

    await reviewServices
      .vote(paramsVote)
      .then((res) => {
        createAlert("Cập nhật đánh giá sao thành công");
      })
      .catch((err) => {
        createAlert("Cập nhật đánh giá sao thất bại");
      });

    getReview(data.id);
  };

  useEffect(() => {
    console.log("Props in review: ", props.route.params.data);

    getReview(props.route.params.data.id);
  }, [props.route.params.data.id]);

  const getReview = async (id) => {
    let params = { id: id };
    console.log("[INFO] Params to get review: ", params);
    setIsLoading(true);
    await reviewServices
      .get(params)
      .then((res) => {
        console.log("response in get food: ", JSON.stringify(res));
        setData(res);
      })
      .catch((err) => {
        console.log("Error in get food: ", err);
      });
    setIsLoading(false);
  };

  // Auto Alert
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const onDismissError = () => {
    setIsError(false);
  };

  const createAlert = async (textAlert) => {
    // console.log("Create alert");
    await setError(textAlert);
    setIsError(true);
  };

  return (
    <View style={styles.container}>
      <Overlay isVisible={true} fullScreen={true} overlayStyle={{ padding: 0 }}>
        <Snackbar
          visible={isError}
          _onDismissSnackBar={onDismissError}
          actionText={"HIDE"}
          text={error}
        />

        <Header title="Chi tiết món ăn" hideButtonBack={true} />

        {isLoading ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Button type="clear" loading={true} />
          </View>
        ) : (
          <>
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
                                (data.priceEach * (100 - data.discountRate)) /
                                  100
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
                <SafeAreaView>
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
                        onFinishRating={(rate) => ratingCompleted(rate)}
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
                </SafeAreaView>
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
                // position: "absolute",
                padding: 10,
                elevation: 5,
                bottom: 0,

                height: 70,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  height: 50,
                }}
              >
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
          </>
        )}
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
