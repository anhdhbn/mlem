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

import Header from "../components/header/header";
import FilterBar from "../components/history/filterBar";
import ItemHistoryCard from "../components/history/itemHistoryCard";

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [
        {
          orderTime: "15h15",
          dmy: "20-11-2020",
          id: "5072308A",
          price: "100,000 đ",
          status: "Đang giao hàng",
        },
        {
          orderTime: "15h15",
          dmy: "20-11-2020",
          id: "5072308B",
          price: "100,000 đ",
          status: "Đã thanh toán",
        },
        {
          orderTime: "15h15",
          dmy: "20-11-2020",
          id: "5072308C",
          price: "100,000 đ",
          status: "Đã thanh toán",
        },
        {
          orderTime: "15h15",
          dmy: "20-11-2020",
          id: "5072308D",
          price: "100,000 đ",
          status: "Đã hủy",
        },
        {
          orderTime: "15h15",
          dmy: "20-11-2020",
          id: "5072308E",
          price: "100,000 đ",
          status: "Đã thanh toán",
        },
      ],
    };
  }

  render() {
    return (
      <View>
        <Header title="Lịch sử" />
        <FilterBar />
        {this.state.history.map((item) => {
          return (
            <ItemHistoryCard
              key={item.id}
              id={item.id}
              orderTime={item.orderTime}
              dmy={item.dmy}
              price={item.price}
              status={item.status}
            />
          );
        })}
      </View>
    );
  }
}
