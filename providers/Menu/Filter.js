import React, { Component } from "react";
import { View } from "react-native";

import { Picker } from "native-base";

export default class FilterBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueFilterFood: "0",
      valueFilterStatus: "0",
      valueFilterSort: "0",
    };
  }

  onValueFilterStatusChange = async (value) => {
    await this.setState({
      valueFilterStatus: value,
    });
    let food = null;
    let status = null;
    let initTime = this.state.valueFilterSort;
    this.state.valueFilterFood !== "0"
      ? (food = this.state.valueFilterFood)
      : null;
    this.state.valueFilterStatus !== "0"
      ? (status = this.state.valueFilterStatus)
      : null;
    let params = {
      foodGroupingId: {
        equal: food,
      },
      statusId: {
        equal: status,
      },
      orderBy: initTime,
    };
    params = this.getParamsSort(params);
    this.props.handleFilter(params);
  };

  onValueFilterFoodChange = async (value) => {
    await this.setState({
      valueFilterFood: value,
    });
    let food = null;
    let status = null;
    let initTime = this.state.valueFilterSort;
    this.state.valueFilterFood !== "0"
      ? (food = this.state.valueFilterFood)
      : null;
    this.state.valueFilterStatus !== "0"
      ? (status = this.state.valueFilterStatus)
      : null;
    let params = {
      foodGroupingId: {
        equal: food,
      },
      statusId: {
        equal: status,
      },
      orderBy: initTime,
    };
    params = this.getParamsSort(params);
    this.props.handleFilter(params);
  };
  onValueFilterSort = async (value) => {
    await this.setState({
      valueFilterSort: value,
    });
    let food = null;
    let status = null;
    let initTime = this.state.valueFilterSort;
    this.state.valueFilterFood !== "0"
      ? (food = this.state.valueFilterFood)
      : null;
    this.state.valueFilterStatus !== "0"
      ? (status = this.state.valueFilterStatus)
      : null;
    let params = {
      foodGroupingId: {
        equal: food,
      },
      statusId: {
        equal: status,
      },
    };

    params = this.getParamsSort(params);
    this.props.handleFilter(params);
  };

  getParamsSort = (paramsIn) => {
    paramsOut = paramsIn;
    if (this.state.valueFilterSort === "0") {
    } else if (this.state.valueFilterSort === "1") {
      paramsOut.orderBy = "2";
      paramsOut.orderType = "0";
    } else {
      paramsOut.orderBy = "2";
      paramsOut.orderType = "1";
    }
    return paramsOut;
  };

  render() {
    return (
      <View
        style={{
          borderRadius: 6,
          elevation: 3,
          backgroundColor: "#fff",
          shadowOffset: { width: 1, height: 1 },
          shadowColor: "#333",
          shadowOpacity: 0.3,
          shadowRadius: 2,
          marginVertical: 6,
          //
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <Picker
            note
            mode="dropdown"
            style={{ width: 150 }}
            selectedValue={this.state.valueFilterFood}
            onValueChange={this.onValueFilterFoodChange}
          >
            <Picker.Item label="Phân loại" value="0" />
            <Picker.Item label="Lẩu buffet" value="1" />
            <Picker.Item label="Hải sản" value="2" />
            <Picker.Item label="Rau củ" value="3" />
            <Picker.Item label="Thịt" value="4" />
            <Picker.Item label="Đồ uống" value="5" />
          </Picker>
        </View>
        <View
          style={{ flex: 1, justifyContent: "flex-end", flexDirection: "row" }}
        >
          <View
          // style={{
          //   alignItems: "center",
          //   flexDirection: "row",
          //   justifyContent: "flex-end",
          // }}
          >
            <Picker
              note
              mode="dropdown"
              style={{ width: 140 }}
              selectedValue={this.state.valueFilterSort}
              onValueChange={this.onValueFilterSort}
            >
              <Picker.Item label="Sắp xếp" value="0" />
              <Picker.Item label="Giá tăng dần" value="1" />
              <Picker.Item label="Giá giảm dần" value="2" />
            </Picker>
          </View>
        </View>
        <View
          style={{ flex: 1, justifyContent: "flex-end", flexDirection: "row" }}
        >
          <View
          // style={{
          //   alignItems: "center",
          //   flexDirection: "row",
          //   justifyContent: "flex-end",
          // }}
          >
            <Picker
              note
              mode="dropdown"
              style={{ width: 140 }}
              selectedValue={this.state.valueFilterStatus}
              onValueChange={this.onValueFilterStatusChange}
            >
              <Picker.Item label="Trạng thái" value="0" />
              <Picker.Item label="Đang bán" value="1" />
              <Picker.Item label="Dừng bán" value="2" />
            </Picker>
          </View>
        </View>
      </View>
    );
  }
}
