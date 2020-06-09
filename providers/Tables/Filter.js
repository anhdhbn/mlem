import React, { Component } from "react";
import {
  View,
} from "react-native";

import { Picker } from "native-base";

export default class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueFilterStatus: "0",
    };
  }

  onValueFilterStatusChange = async(value) => {
   await this.setState({
      valueFilterStatus: value,
    });
    let status= null;
    this.state.valueFilterStatus !== "0" ? status = this.state.valueFilterStatus : null;
    const params ={  
      statusId:{
        equal:status
      }
    }
    this.props.handleFilter(params)
  };

  render() {
    return (
      <View>
        <Picker
              note
              mode="dropdown"
              style={{ width:140 }}
              selectedValue={this.state.valueFilterStatus}
              onValueChange={this.onValueFilterStatusChange}
            >
              <Picker.Item label="Trạng thái" value="0" />
              <Picker.Item label="Đang bán" value="1" />
              <Picker.Item label="Dừng bán" value="2" />
            </Picker>
      </View>
    );
  }
}
