import React, { useState } from "react";
import {
  View,
  Button,
  Platform,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Fontisto";
import moment from "moment";

const datePicker = (props) => {
  const [date, setDate] = useState(new Date(props.date));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const timeVisible = props.timeVisible
  const [dateShow, setDateShow] = useState(props.date.format("DD/MM/YYYY"));
  const [timeShow, setTimeShow] = useState(props.date.format("HH:mm"));

  const onChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if (mode === "date") {
      setDateShow(moment(currentDate).format("DD/MM/YYYY"));
      props.setDate(moment(currentDate));
    }
    if (mode === "time") {
      setTimeShow(moment(currentDate).format("HH:mm"));
      props.setTime(moment(currentDate).format("HH:mm"));
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View>
      <View
        style={{
          height: 50,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 15,
          paddingRight: 76,

          borderRadius: 6,
          backgroundColor: "#fff",
          shadowOffset: { width: 1, height: 1 },
          shadowColor: "#333",
          shadowOpacity: 0.3,
          shadowRadius: 2,
        }}
      >
        <TouchableOpacity
          onPress={showDatepicker}
          style={{ flexDirection: "row", marginTop: 5 }}
        >
          <Icon
            name="date"
            size={20}
            color="#bf2315"
            style={{ margin:6 }}
          />
          <Text style={{ fontSize: 16, marginTop: 6, marginLeft: 4 }}>
            {dateShow}
          </Text>
        </TouchableOpacity>
        {!timeVisible&&<TouchableOpacity
          onPress={showTimepicker}
          style={{ flexDirection: "row", marginTop: 5 }}
        >
          <Icon
            name="stopwatch"
            size={20}
            color="#bf2315"
            style={{ margin:6 }}
          />
          <Text style={{ fontSize: 16, marginTop: 6, marginLeft: 4 }}>
            {timeShow}
          </Text>
        </TouchableOpacity>}
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default datePicker;
