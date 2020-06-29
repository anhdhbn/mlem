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
import Snackbar from "../components/common/snackbarUpdating";

import historyServices from "../customerServices/historyServices";
import moment from "moment";

import Spinner from "../components/Spinner/Spinner";

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
      visibleAlert: false,
      textAlert: null,

      isLoading: true,
    };
  }

  setHistory = (newHistory) => {
    let length = newHistory.length;
    let history = [];
    for (let index = length - 1; index >= 0; index--) {
      history.push(newHistory[index]);
      // console.log("PUSH: ", newHistory[index].createdAt);
    }
    this.setState({ history: history });
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
    await historyServices
      .list(params)
      .then((res) => {
        this.setHistory(res);
        return res;
      })
      .catch((err) => {
        this.createAlert(err);
        return null;
      });
    //let length = response.length;
    // for (let index = 0; index < length; index++) {
    //   console.log("[INFO] Response in history: ", response[index].total);
    // }

    this.setIsLoading(false);
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
    this.setIsLoading(true);

    let params = {
      statusId: { equal: codeStatus != 0 ? codeStatus : null },
    };

    await historyServices
      .list(params)
      .then((res) => {
        this.setHistory(res);
        return res;
      })
      .catch((err) => {
        this.createAlert(err);
        return null;
      });

    this.setIsLoading(false);
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
      statusId: { equal: codeStatus != 0 ? codeStatus : null },
    };

    await historyServices
      .list(params)
      .then((res) => {
        this.setHistory(res);
        return res;
      })
      .catch((err) => {
        this.createAlert(err);
        return null;
      });

    this.setIsLoading(false);
  };

  renderOrderedInMonth = async (codeStatus) => {
    this.setIsLoading(true);
    let dateEnd = moment().add(1, "days"); //"2020-05-18T03:14:35.294Z"
    let dateStart = moment().add(-30, "days"); //"2020-05-11T03:14:35.294Z"
    console.log("[INFO] Range render ordered Date: ", dateStart, dateEnd);
    let params = {
      createdAt: {
        greater: dateStart,
        less: dateEnd,
      },
      statusId: { equal: codeStatus != 0 ? codeStatus : null },
    };

    await historyServices
      .list(params)
      .then((res) => {
        this.setHistory(res);
        return res;
      })
      .catch((err) => {
        this.createAlert(err);
        return null;
      });

    // this.setHistory(newListRender);
    this.setIsLoading(false);
  };

  renderOrderedInDay = async (codeStatus, pickedDate) => {
    console.log("[INFO] List rendered in day: ", codeStatus, pickedDate);
    this.setIsLoading(true);

    let params = {
      createdAt: {
        equal: pickedDate,
      },
      statusId: { equal: codeStatus != 0 ? codeStatus : null },
    };

    await historyServices
      .list(params)
      .then((res) => {
        this.setHistory(res);
        return res;
      })
      .catch((err) => {
        this.createAlert(err);
        return null;
      });

    this.setIsLoading(false);
  };

  createAlert = (textAlert) => {
    console.log("Create alert");
    this.setState({ textAlert: textAlert }, () => {
      this.setAlert(true);
    });
  };

  setAlert = (visible) => {
    this.setState({ visibleAlert: visible });
  };

  _onDismissSnackBar = () => {
    this.setAlert(false);
  };

  render() {
    return (
      <View>
        <Snackbar
          visible={this.state.visibleAlert}
          _onDismissSnackBar={this._onDismissSnackBar}
          duration={5000}
          text={this.state.textAlert}
        />
        <Header title="Lịch sử" />
        <FilterBar renderOrdered={this.renderOrdered} />

        {this.state.isLoading ? (
          <View>
            <Spinner />
          </View>
        ) : (
          <ScrollView style={{ marginBottom: 140 }}>
            {this.state.history.map((item) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("CustomerHistoryDetail", {
                      data: item,
                    });
                  }}
                >
                  <ItemHistoryCard
                    key={item.code}
                    id={item.code}
                    orderTime={item.createdAt}
                    dmy={item.createdAt}
                    price={item.total}
                    // // Gia goc
                    // subPrice={item.subTotal}
                    status={item.statusId}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>
    );
  }
}
