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

import historyServices from "../customerServices/historyServices";

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
      isLoading: true,
      // history: [
      //   {
      //     orderTime: "15h15",
      //     dmy: "20-11-2020",
      //     id: "5072308A",
      //     price: "100,000 đ",
      //     status: "Đang giao hàng",
      //   },
      //   {
      //     orderTime: "15h15",
      //     dmy: "20-11-2020",
      //     id: "5072308B",
      //     price: "100,000 đ",
      //     status: "Đã thanh toán",
      //   },
      //   {
      //     orderTime: "15h15",
      //     dmy: "20-11-2020",
      //     id: "5072308C",
      //     price: "100,000 đ",
      //     status: "Đã thanh toán",
      //   },
      //   {
      //     orderTime: "15h15",
      //     dmy: "20-11-2020",
      //     id: "5072308D",
      //     price: "100,000 đ",
      //     status: "Đã hủy",
      //   },
      //   {
      //     orderTime: "15h15",
      //     dmy: "20-11-2020",
      //     id: "5072308E",
      //     price: "100,000 đ",
      //     status: "Đã thanh toán",
      //   },
      // ],
    };
  }

  setIsLoading = (value) => {
    this.setState({ isLoading: value });
  };

  componentDidMount = () => {
    this.getListOrder();
    this.setIsLoading(false);
  };

  getListOrder = async () => {
    let params = {};
    this.setIsLoading(true);
    // console.log("[INFO] Params in getListOrder(): ", params);
    let response = await historyServices.list(params);
    let length = response.length;
    for (let index = 0; index < length; index++) {
      console.log("[INFO] Response in history: ", response[index].total);
    }

    this.setIsLoading(false);
    this.setState({ history: response });
  };

  render() {
    return (
      <View>
        <Header title="Lịch sử" />
        <FilterBar />
        <TouchableOpacity onPress={this.getListOrder}>
          <Text>Get getListOrder</Text>
        </TouchableOpacity>
        {this.state.isLoading ? (
          <View>
            <Text>Đang cập nhật ...</Text>
          </View>
        ) : (
          <ScrollView style={{ marginBottom: 150 }}>
            {this.state.history.map((item) => {
              return (
                <ItemHistoryCard
                  key={item.code}
                  id={item.code}
                  orderTime={item.orderDate}
                  dmy={item.orderDate}
                  price={item.total}
                  // // Gia goc
                  // subPrice={item.subTotal}
                  status={item.statusId}
                />
              );
            })}
          </ScrollView>
        )}
      </View>
    );
  }
}
