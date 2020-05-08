import React from "react";
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

export default function (props) {
  return (
    <Overlay
      visible={props.visible}
      onBackdropPress={props.hideModal}
      overlayStyle={{
        width: "100%",
        backgroundColor: "#FFFFFF",
        height: 410,

        position: "absolute",
        bottom: 0,
      }}
    >
      {console.log("[INFO] Props in modelSelectDish: ", props.modal)}
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 27, marginTop: 4, fontFamily: "regular" }}>
          Tuỳ chỉnh món
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          borderWidth: 0.8,
          borderColor: "#adaaaa",
          marginTop: 4,
          marginBottom: 4,
        }}
      ></View>
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
          marginVertical: 6,
          // Another
          flexDirection: "row",
        }}
      >
        <Image
          source={{
            uri: props.modal.linkImageDish,
          }}
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
          <View>
            <Text
              style={{
                textDecorationLine: "line-through",
                color: "grey",
              }}
            >
              {props.modal.price} đ
            </Text>
            <Text>{props.modal.promoPrice} đ</Text>
          </View>
        </View>
        <View style={{ right: 20, marginTop: 50 }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => props.subNumOfDish(props.modal.nameDish)}
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
              onPress={() => props.addNumOfDish(props.modal.nameDish)}
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
          backgroundColor: "#d6d5d2",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 16, paddingLeft: 10 }}>Size</Text>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            position: "relative",
            padding: 2,
          }}
        >
          <View>
            <Text>Size nhỏ</Text>
            <Text>{props.modal.promoPrice * 0.5}</Text>
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
                // console.log("[INFO] smail type: ", props.modal.smallSize);
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            position: "relative",
            padding: 2,
          }}
        >
          <View>
            <Text>Size Vừa</Text>
            <Text>{props.modal.promoPrice * 0.8}</Text>
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
        <View
          style={{
            flexDirection: "row",
            position: "relative",
            padding: 2,
          }}
        >
          <View>
            <Text>Size Lớn</Text>
            <Text>{props.modal.promoPrice}</Text>
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
                {props.totalPromoPrice}đ
              </Text>
              <Text
                style={{
                  textDecorationLine: "line-through",
                  color: "grey",
                }}
              >
                {props.totalPrice}đ
              </Text>
            </View>
            <View style={{ position: "absolute", right: 20 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#DC0000",
                  borderRadius: 8,
                  width: 90,
                  height: 40,
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    padding: 8,
                    paddingLeft: 10,
                    color: "#fff",
                  }}
                >
                  Thêm vào
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Overlay>
  );
}
