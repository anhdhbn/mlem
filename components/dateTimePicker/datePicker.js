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
      {/* <View>
        <Button onPress={showDatepicker} title="Show date time picker!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View> */}

      <View
        style={{
          height: 50,
          flexDirection: "row",
          justifyContent: "space-around",
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
            size={23}
            color="#bf2315"
            style={{ margin:8 }}
          />
          <Text style={{ fontSize: 20, marginTop: 8, marginLeft: 4 }}>
            {dateShow}
          </Text>
        </TouchableOpacity>
        {!timeVisible&&<TouchableOpacity
          onPress={showTimepicker}
          style={{ flexDirection: "row", marginTop: 5 }}
        >
          <Icon
            name="stopwatch"
            size={23}
            color="#bf2315"
            style={{ margin:8 }}
          />
          <Text style={{ fontSize: 20, marginTop: 8, marginLeft: 4 }}>
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
