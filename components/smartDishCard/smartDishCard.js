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

import formatPrice from "../formatPrice";
export default class SmartDishCard extends Component {
  constructor(props) {
    super(props);
    this.displayPrice = this.displayPrice.bind(this);
    this.checkProps = this.checkProps.bind(this);
  }

  checkProps() {
    if (
      this.props.isActive != null &&
      this.props.linkIconActive &&
      this.props.linkIconInactive
    ) {
      return true;
    } else if (this.props.linkIcon) {
      return true;
    } else {
      console.log("[ERROR] SmartDishCard Icon just work with 2 type. ");
      return false;
    }
  }

  displayPrice() {
    if (this.props.promoPrice === null) {
      return <Text style={{}}>{formatPrice(this.props.price)}</Text>;
    } else {
      return (
        <>
          <Text style={{ textDecorationLine: "line-through", color: "grey" }}>
            {formatPrice(this.props.price)}
          </Text>
          <Text>{formatPrice(this.props.promoPrice)}</Text>
        </>
      );
    }
  }

  handPressIcon = () => {
    // console.log("[INFO] Hand press icon in smartDishCard.js");
    let dish = {
      id: this.props.id,
      linkImageDish: this.props.linkImageDish,
      nameDish: this.props.nameDish,
      describeDish: this.props.describeDish,
      price: this.props.price,
      promoPrice: this.props.promoPrice
        ? this.props.promoPrice
        : this.props.price,
      isActive: false,

      quantity: 0,
    };
    this.props.handClickIcon(dish);
  };

  render() {
    if (this.checkProps()) {
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
              source={
                this.props.linkImageDish
                  ? {
                      uri:
                        "http://112.213.88.49:20000" +
                        this.props.linkImageDish.url,
                    }
                  : null
              }
              style={{ width: 100, height: 100, marginHorizontal: 10, flex: 3 }}
            />

            <View style={{ flex: 5, flexDirection: "column" }}>
              <Text style={{ fontSize: 20 }}>{this.props.nameDish}</Text>
              <Text>{this.props.describeDish}</Text>
              <View style={{}}>{this.displayPrice()}</View>
            </View>
            <View
              style={{
                flex: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={this.handPressIcon}
              >
                {this.props.isActive ? (
                  <Image
                    // source={require("../../assets/icon/heart.png")}
                    source={this.props.linkIconActive}
                    style={{
                      height: 35,
                      width: 35,
                    }}
                  />
                ) : (
                  <Image
                    // source={require(this.props.linkIconInactive)}
                    source={this.props.linkIconInactive}
                    style={{
                      height: 35,
                      width: 35,
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </>
      );
    } else {
      return (
        <>
          <Text>Invalid props</Text>
        </>
      );
    }
  }
}
