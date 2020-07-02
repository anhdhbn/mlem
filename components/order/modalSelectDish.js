import React, { useEffect, useState } from "react";
import {
  Image,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";

import { Overlay, CheckBox } from "react-native-elements";
import { Button } from "react-native-elements";

import Snackbar from "../common/snackbarUpdating";

import formatPrice from "../formatPrice";
import orderServices from "../../customerServices/orderServices";

export default function (props) {
  const [isloading, setIsLoading] = useState(true);

  const [food, setFood] = useState(null);
  const [smallSize, setSmallSize] = useState(false);
  const [normalSize, setNormalSize] = useState(false);
  const [bigSize, setBigSize] = useState(false);

  // Alert
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const onDismissError = () => {
    setIsError(false);
  };

  const createAlert = async (textAlert) => {
    // //console.log("Create alert");
    await setError(textAlert);
    setIsError(true);
  };
  const processSize = (food) => {
    foodFoodTypeMappings = food.foodFoodTypeMappings;
    let length = foodFoodTypeMappings.length;
    for (let index = 0; index < length; index++) {
      if (foodFoodTypeMappings[index].foodTypeId === 1) {
        setSmallSize(true);
      }
      if (foodFoodTypeMappings[index].foodTypeId === 2) {
        setNormalSize(true);
      }
      if (foodFoodTypeMappings[index].foodTypeId === 3) {
        setBigSize(true);
      }
    }
  };
  //
  const onDismissLoading = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // //console.log("[INFO] Props modal in modalSelectDish: ", props.modal);
    fetchSize();
    setSmallSize(false);
    setNormalSize(false);
    setBigSize(false);
  }, [props.modal.id]);

  const fetchSize = async () => {
    // //console.log("Call fetch size in modalSelectDish");
    if (props.modal.id) {
      let params = { id: props.modal.id };
      //console.log(params);
      setIsLoading(true);
      let res = await orderServices
        .getFood(params)
        .then((res) => {
          /*console.log(
            "[INFO] Response fetch size in modalSelectDish",
            JSON.stringify(res)
          );*/
          setFood(res);
          processSize(res);
          setIsLoading(false);
        })
        .catch((err) => {
          // //console.log(
          //   "[INFO] Error fecch size in modalSelectDish",
          //   JSON.stringify(err)
          // );
          //console.log("[INFO] Error fetch size in modalSelectDish: ", err.data);
          setIsLoading(false);
          createAlert(err.data);
        });
    }
  };
  return (
    <Overlay
      visible={props.visible}
      onBackdropPress={() => {
        props.hideModal();
        props.removeDish2Order();
      }}
      overlayStyle={{
        width: "100%",
        backgroundColor: "#FFFFFF",
        height: 410,

        position: "absolute",
        bottom: 0,
      }}
    >
      <Snackbar
        visible={isError}
        _onDismissSnackBar={onDismissError}
        style={{ zIndex: 1, marginBottom: 20, opacity: 0.8 }}
        text={error}
      />

      {/* {//console.log("[INFO] Props in modelSelectDish: ", props.modal)} */}
      {/* {props.modal.nameDish ? props.addDish2Order() : null} */}
      <View style={{ alignItems: "center", borderBottomWidth: 0.5 }}>
        <Text
          style={{
            fontSize: 20,
            marginTop: 4,
            marginBottom: 8,
            fontFamily: "regular",
          }}
        >
          Tuỳ chỉnh món
        </Text>
      </View>

      <View
        style={{
          // Card
          borderRadius: 6,
          elevation: 3,
          backgroundColor: "#fff",
          shadowOffset: { width: 1, height: 1 },
          shadowColor: "#fff",
          shadowOpacity: 0.3,
          shadowRadius: 2,
          marginVertical: 6,
          // Another
          flexDirection: "row",
        }}
      >
        <Image
          source={
            props.modal.linkImageDish
              ? {
                uri:
                  "http://112.213.88.49:20000" +
                  props.modal.linkImageDish.url,
              }
              : null
          }
          style={{
            width: 100,
            height: 100,
            marginHorizontal: 10,
            flex: 3,
          }}
        ></Image>
        <View style={{ flex: 5, flexDirection: "column", marginLeft: 10 }}>
          <Text style={{ fontSize: 20 }}>{props.modal.nameDish}</Text>
          <Text style={{ fontSize: 10 }}>{props.modal.describeDish}</Text>
          {props.modal.promoPrice ? (
            <View>
              {props.modal.promoPrice != props.modal.price && <Text
                style={{
                  textDecorationLine: "line-through",
                  color: "grey",
                  fontSize: 15,
                }}
              >
                {formatPrice(props.modal.price)}
              </Text>}
              <Text style={{ fontSize: 20 }}>
                {formatPrice(props.modal.promoPrice)}
              </Text>
            </View>
          ) : (
              <View>
                <Text style={{ fontSize: 20 }}>
                  {formatPrice(props.modal.price)}
                </Text>
              </View>
            )}
        </View>
        <View style={{ right: 20, marginTop: 50 }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                props.subNumOfDish();
              }}
            >
              <Image
                source={require("../../assets/icon/-.png")}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
            <Text style={{ marginLeft: 8, marginRight: 8, fontSize: 16 }}>
              {props.modal.quantity}
            </Text>
            <TouchableOpacity
              onPress={() => {
                props.addNumOfDish();
              }}
            >
              <Image
                source={require("../../assets/icon/+.png")}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 30,
          backgroundColor: "#F5F6F7",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 16, paddingLeft: 10 }}>Size</Text>
      </View>
      {isloading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button type="clear" loading={true} loadingStyle={{ height: 50 }} />
        </View>
      ) : (
          <View>
            {!smallSize ? (
              <View
                style={{
                  flexDirection: "row",
                  position: "relative",
                  padding: 2,
                }}
              >
                <View>
                  <Text style={{ paddingLeft: 10, color: "#8A8F9C" }}>Nhỏ</Text>
                  <Text style={{ paddingLeft: 10, color: "#8A8F9C" }}>
                    {formatPrice(props.modal.promoPrice)}
                  </Text>
                </View>
              </View>
            ) : (
                <View
                  style={{
                    flexDirection: "row",
                    position: "relative",
                    padding: 2,
                  }}
                >
                  <View>
                    <Text style={{ paddingLeft: 10 }}>Nhỏ</Text>
                    <Text style={{ paddingLeft: 10 }}>
                      {formatPrice(props.modal.promoPrice)}
                    </Text>
                  </View>
                  <View style={{ right: -30, position: "absolute" }}>
                    <CheckBox
                      checked={props.modal.smallSize}
                      checkedColor="red"
                      onPress={() => {
                        let selectSize = {
                          smallSize: true,
                          normalSize: false,
                          bigSize: false,
                        };

                        props.selectOrderSize(selectSize);

                        // //console.log("[INFO] smail type: ", props.modal.smallSize);
                      }}
                    />
                  </View>
                </View>
              )}
            {normalSize ? (
              <View
                style={{
                  flexDirection: "row",
                  position: "relative",
                  padding: 2,
                }}
              >
                <View>
                  <Text style={{ paddingLeft: 10 }}>Vừa (+ 20%)</Text>
                  <Text style={{ paddingLeft: 10 }}>
                    {formatPrice(props.modal.promoPrice * 1.2)}
                  </Text>
                </View>
                <View style={{ right: -30, position: "absolute" }}>
                  <CheckBox
                    checked={props.modal.normalSize}
                    checkedColor="red"
                    onPress={() => {
                      let selectSize = {
                        smallSize: false,
                        normalSize: true,
                        bigSize: false,
                      };

                      props.selectOrderSize(selectSize);
                    }}
                  />
                </View>
              </View>
            ) : (
                <View
                  style={{
                    flexDirection: "row",
                    position: "relative",
                    padding: 2,
                  }}
                >
                  <View>
                    <Text style={{ paddingLeft: 10, color: "#8A8F9C" }}>
                      Vừa (+ 20%)
                </Text>
                    <Text style={{ paddingLeft: 10, color: "#8A8F9C" }}>
                      {formatPrice(props.modal.promoPrice * 1.2)}
                    </Text>
                  </View>
                </View>
              )}
            {bigSize ? (
              <View
                style={{
                  flexDirection: "row",
                  position: "relative",
                  padding: 2,
                }}
              >
                <View>
                  <Text style={{ paddingLeft: 10 }}>Lớn (+ 50%)</Text>
                  <Text style={{ paddingLeft: 10 }}>
                    {formatPrice(props.modal.promoPrice * 1.5)}
                  </Text>
                </View>
                <View style={{ right: -30, position: "absolute" }}>
                  <CheckBox
                    checked={props.modal.bigSize}
                    checkedColor="red"
                    onPress={() => {
                      let selectSize = {
                        smallSize: false,
                        normalSize: false,
                        bigSize: true,
                      };
                      props.selectOrderSize(selectSize);
                    }}
                  />
                </View>
              </View>
            ) : (
                <View
                  style={{
                    flexDirection: "row",
                    position: "relative",
                    padding: 2,
                  }}
                >
                  <View>
                    <Text style={{ paddingLeft: 10, color: "#8A8F9C" }}>
                      Lớn (+ 50%)
                </Text>
                    <Text style={{ paddingLeft: 10, color: "#8A8F9C" }}>
                      {formatPrice(props.modal.promoPrice * 1.5)}
                    </Text>
                  </View>
                </View>
              )}
            <View
              style={{
                bottom: 0,
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  position: "relative",
                  height: 40,
                  padding: 10,
                  marginBottom: 30,
                  marginTop: 10,
                }}
              >
                <View style={{ paddingLeft: 10 }}>
                  <Text style={{ fontSize: 19, fontWeight: "bold" }}>
                    {formatPrice(props.totalPromoPrice)}
                  </Text>
                  {props.totalPromoPrice != props.totalPrice && <Text
                    style={{
                      textDecorationLine: "line-through",
                      color: "grey",
                    }}
                  >
                    {formatPrice(props.totalPrice)}
                  </Text>}
                </View>
                <View style={{ position: "absolute", right: 20 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#DC0000",
                      borderRadius: 8,
                      width: 100,
                      height: 45,
                      marginTop: 10,
                    }}
                    onPress={() => {
                      props.addDish2Order();
                      props.hideModal();
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        padding: 8,
                        paddingBottom: 8,
                        paddingLeft: 10,
                        color: "#fff",
                      }}
                    >
                      Thêm món
                  </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
    </Overlay>
  );
}
