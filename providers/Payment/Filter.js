import React, { Component } from "react";
import {
  View,
} from "react-native";

import { Picker } from "native-base";

import moment from "moment";
import DatePicker from "../Components/DatePicker";

export default class FilterBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueFilterTime: "0",
      valueFilterStatus: "0",
      date: moment(),
    };
    this.handleGetData = this.handleGetData.bind(this);
  }
  async handleGetData() {
    let params = {};
    if (this.state.valueFilterTime == "0") {
      params = {
        statusId: { 
          equal: this.state.valueFilterStatus != 0 ? this.state.valueFilterStatus : null,
          in: this.state.valueFilterStatus == 0 ? [3,4,5] :null
        },
      };
      await this.props.handleFilter(params)
      return (res);
    } else if (this.state.valueFilterTime == '1') {
      let dateEnd = moment().add(1, "days"); //"2020-05-18T03:14:35.294Z"
      let dateStart = moment().add(-7, "days"); //"2020-05-11T03:14:35.294Z"
      params = {
        createdAt: {
          greater: dateStart,
          less: dateEnd,
        },
        statusId: {statusId: { 
          equal: this.state.valueFilterStatus != 0 ? this.state.valueFilterStatus : null,
          in: this.state.valueFilterStatus == 0 ? [3,4,5]:null
        }},
      };
      await this.props.handleFilter(params)
    } else if (this.state.valueFilterTime == '2') {
      let dateEnd = moment().add(1, "days"); //"2020-05-18T03:14:35.294Z"
      let dateStart = moment().add(-30, "days"); //"2020-05-11T03:14:35.294Z"
      params = {
        createdAt: {
          greater: dateStart,
          less: dateEnd,
        },
        statusId: {statusId: { 
          equal: this.state.valueFilterStatus != 0 ? this.state.valueFilterStatus : null,
          in: this.state.valueFilterStatus == 0 ? [3,4,5]:null
        }},
      };
      await this.props.handleFilter(params)
    } else if (this.state.valueFilterTime == '3') {

      params = {
        createdAt: {
          equal: this.state.date
        },
        statusId: {statusId: { 
          equal: this.state.valueFilterStatus != 0 ? this.state.valueFilterStatus : null,
          in: this.state.valueFilterStatus == 0 ? [3,4,5]:null
        } },
      };
      await this.props.handleFilter(params)
    }
  }
  onValueFilterStatusChange = async (value) => {
    await this.setState({
      valueFilterStatus: value,
    });
    this.handleGetData();
  };

  onValueFilterTimeChange = async(value) => {
    await this.setState({
      valueFilterTime: value,
    });
    this.handleGetData();
  };

  setDate = async(pickedDate) => {
    // //console.log("[INFO] Picked date: ", pickedDate);
   await this.setState({
     date:pickedDate
   });
   this.handleGetData();
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
            style={{ width: 120 }}
            selectedValue={this.state.valueFilterTime}
            onValueChange={this.onValueFilterTimeChange}
          >
            <Picker.Item label="Tất cả" value="0" />
            <Picker.Item label="7 ngày gần đây" value="1" />
            <Picker.Item label="30 ngày gần đây" value="2" />
            <Picker.Item label="Chọn ngày" value="3" />
          </Picker>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {this.state.valueFilterTime === "3" ? (
            <DatePicker setDate={this.setDate} date={this.state.date} />
          ) : null}
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
              <Picker.Item label="Đã xác nhận" value="3" />
              <Picker.Item label="Đã từ chối" value="4" />
              <Picker.Item label="Đã thanh toán" value="5" />
            </Picker>
          </View>
        </View>
      </View>
    );
  }
}
