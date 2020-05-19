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
  const [dateShow, setDateShow] = useState(props.date.format("DD/MM/YYYY"));

  const onChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if (mode === "date") {
      setDateShow(moment(currentDate).format("DD/MM/YYYY"));
      props.setDate(moment(currentDate));
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
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
        style={
          {
            // backgroundColor: "white",
            // height: 40,
            // flexDirection: "row",
            // justifyContent: "space-around",
            // borderRadius: 6,
            // elevation: 3,
            // backgroundColor: "#fff",
            // shadowOffset: { width: 1, height: 1 },
            // shadowColor: "#333",
            // shadowOpacity: 0.3,
            // shadowRadius: 2,
          }
        }
      >
        <TouchableOpacity
          onPress={showDatepicker}
          style={{ flexDirection: "row" }}
        >
          <Icon
            name="date"
            size={20}
            color="#bf2315"
            style={{ marginTop: 4 }}
          />
          <Text style={{ fontSize: 17, marginLeft: 4, marginTop: 3 }}>
            {dateShow}
          </Text>
        </TouchableOpacity>
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
