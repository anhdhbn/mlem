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
import moment from "moment";

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
      isLoading: true,
    };
  }

  setHistory = (newHistory) => {
    this.setState({ history: newHistory });
  };

  setIsLoading = (value) => {
    this.setState({ isLoading: value });
  };

  componentDidMount = async () => {
    await this.getListOrder();
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

  renderOrdered = (codeTime, codeStatus, pickedDate = null) => {
    switch (codeTime) {
      case "0":
        this.renderAllOrdered(codeStatus);
        break;
      case "1":
        this.renderOrderedInWeek(codeStatus);
        break;
      case "2":
        this.renderOrderedInMonth(codeStatus);
        break;
      case "3":
        this.renderOrderedInDay(codeStatus, pickedDate);
        break;
    }
    console.log(codeTime, codeStatus, pickedDate);
  };

  renderAllOrdered = async (codeStatus) => {
    console.log("[INFO] List all rendered: ", codeStatus);
    // let newlistRender = await historyServices.list({})
  };

  renderOrderedInWeek = async (codeStatus) => {
    this.setIsLoading(true);
    let dateEnd = moment().add(1, "days"); //"2020-05-18T03:14:35.294Z"
    let dateStart = moment().add(-7, "days"); //"2020-05-11T03:14:35.294Z"
    console.log("[INFO] Range render ordered Date: ", dateStart, dateEnd);
    let params = {
      createdAt: {
        greater: dateStart,
        less: dateEnd,
      },
      statusId: { equal: codeStatus },
    };

    let newListRender = await historyServices.list(params);
    console.log("[INFO] List rendered in week: ", params);
    this.setHistory(newListRender);
    this.setIsLoading(false);
  };

  renderOrderedInMonth = (codeStatus) => {
    console.log("[INFO] List rendered in month: ", codeStatus);
  };

  renderOrderedInDay = (codeStatus, pickedDate) => {
    console.log("[INFO] List rendered in day: ", codeStatus, pickedDate);
  };

  render() {
    return (
      <View>
        <Header title="Lịch sử" />
        <FilterBar renderOrdered={this.renderOrdered} />

        {this.state.isLoading ? (
          <View>
            <Text>Đang cập nhật ...</Text>
          </View>
        ) : (
          <ScrollView style={{ marginBottom: 120 }}>
            {this.state.history.map((item) => {
              return (
                <ItemHistoryCard
                  key={item.code}
                  id={item.code}
                  orderTime={item.createdAt}
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
