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

export default class SmartDishCard extends Component {
  constructor(props) {
    super(props);
    this.displayPrice = this.displayPrice.bind(this);
    // this.displayIcon = this.displayIcon.bind(this);

    // this.state = {
    //   nameScreen: "",
    // };
  }

  displayPrice() {
    if (this.props.promoPrice === null) {
      return <Text style={{}}>{this.props.price} đ</Text>;
    } else {
      return (
        <>
          <Text style={{ textDecorationLine: "line-through", color: "grey" }}>
            {this.props.price} đ
          </Text>
          <Text>{this.props.promoPrice} đ</Text>
        </>
      );
    }
  }

  render() {
    return (
      <>
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
              uri: this.props.linkImageDish,
            }}
            style={{ width: 100, height: 100, marginHorizontal: 10, flex: 3 }}
          ></Image>
          <View style={{ flex: 5, flexDirection: "column" }}>
            <Text style={{ fontSize: 20 }}>{this.props.nameDish}</Text>
            <Text>{this.props.describeDish}</Text>
            <View style={{}}>{this.displayPrice()}</View>
          </View>
          <View
            style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
          >
            <TouchableOpacity activeOpacity={0.5} style={{}}>
              <Image
                source={require("../../icon/heart.png")}
                style={{
                  height: 35,
                  width: 35,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}
