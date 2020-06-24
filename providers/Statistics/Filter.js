import React, { Component } from "react";
import {
  View,
} from "react-native";

import { Picker } from "native-base";

export default class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueFilterStatus: "1",
    };
  }

  onValueFilterStatusChange = async(value) => {
   await this.setState({
      valueFilterStatus: value,
    });
    let status= this.state.valueFilterStatus;
    const params ={  
      TypeId: {Equal:status }
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
              <Picker.Item label="Theo tháng" value="2" />
              <Picker.Item label="Theo năm" value="1" />
            </Picker>
      </View>
    );
  }
}
