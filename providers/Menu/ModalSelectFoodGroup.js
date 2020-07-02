import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Overlay, Button } from "react-native-elements";

import search from "../../assets/icon/search.png";
import dropDownIcon from "../../assets/icon/drop_down.png";
import TickIcon from "../../assets/icon/tick.png";
import CircleIcon from "../../assets/icon/circle.png";

export default function (props) {
  //   Id	Name
  // 1	Lẩu - Buffet
  // 2	Hải sản
  // 3	Rau củ
  // 4	Thịt
  // 5	Đồ uống
  const [data, setData] = useState([
    { id: "1", kindOfFood: "Lẩu - Buffet", isCliked: false },
    { id: "2", kindOfFood: "Hải sản", isCliked: false },
    { id: "3", kindOfFood: "Rau củ", isCliked: false },
    { id: "4", kindOfFood: "Thịt", isCliked: false },
    { id: "5", kindOfFood: "Đồ uống", isCliked: false },
  ]);

  useEffect(() => {
    // //console.log("Props data in ModalSelectFoodGroups: ", props.data);
    if (props.data) {
      // //console.log("Bắt đầu xử lý props");
      let indexGroups = props.data.length;

      let foodGroups = props.data;

      // //console.log("[INFO] Data in props: ", props.data);

      let newData = data;

      for (let index = 0; index < indexGroups; index++) {
        // //console.log("[INFO] Element in data ", foodGroups[index]);
        valueGroup = foodGroups[index];
        let tempData = [];
        for (let index2 = 0; index2 < newData.length; index2++) {
          // //console.log(
          //   "[INFO] Compare id: ",
          //   newData[index2].id.toString(),
          //   "vs",
          //   valueGroup.id.toString(),
          //   "=> ",
          //   newData[index2].id.toString() === valueGroup.id.toString()
          // );
          if (newData[index2].id.toString() === valueGroup.id.toString()) {
            tempData.push({ ...valueGroup, isCliked: true });
          } else {
            tempData.push(newData[index2]);
          }
        }
        newData = tempData;
      }

      setData(newData);
      // //console.log("[INFO] New data in ModalSelectFoodGroups", newData);
      // //console.log("[INFO] Done convert props.data: ", newData);
    }
  }, [props.data]);

  const onselect = (code) => {
    // //console.log("[INFO] Code in modal select food: ", code);
    let lengthData = data.length;
    let newData = [];
    for (let index = 0; index < lengthData; index++) {
      if (data[index].id === code) {
        newData.push({
          id: code,
          kindOfFood: data[index].kindOfFood,
          isCliked: !data[index].isCliked,
        });
      } else {
        newData.push(data[index]);
      }
    }
    // //console.log("[INFO] New data: ", data);
    setData(newData);
    // //console.log("[INFO] New data in ModalSelectFoodGroups", newData);
  };

  const onSubmit = () => {
    let newData = [];
    let lengthData = data.length;
    for (let index = 0; index < lengthData; index++) {
      if (data[index].isCliked) {
        newData.push({
          id: data[index].id,
          kindOfFood: data[index].kindOfFood,
        });
      }
    }
    props.setFoodGroupMapping(newData);
  };

  return (
    <View style={{ backgroundColor: "#c3c3c3" }}>
      {/* {//console.log("[TEST] Data for render modal select food: ", data)} */}
      <Overlay
        isVisible={props.visible}
        onBackdropPress={() => props.setVisible(false)}
        overlayStyle={{
          width: "100%",
          height: 340,
          position: "absolute",
          bottom: 0,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      >
        <View style={styles.container}>
          <View style={styles.titleView}>
            <Text
              style={{
                fontFamily: "Regular",
                fontSize: 20,
                color: "#232A2F",
                paddingBottom: 10,
              }}
            >
              Chọn nhóm
            </Text>
          </View>
          <ScrollView>
            <View style={{ top: 2 }}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        backgroundColor: "#ffffff",
                        height: 45,
                        borderBottomWidth: 0.3,
                        justifyContent: "center",
                      }}
                    >
                      <TouchableOpacity
                        style={{ flexDirection: "row" }}
                        onPress={() => {
                          onselect(item.id);
                        }}
                      >
                        {!item.isCliked ? (
                          <Image source={CircleIcon} style={styles.iconstyle} />
                        ) : (
                          <Image source={TickIcon} style={styles.iconstyle} />
                        )}
                        <Text style={{ color: "#8A8F9C", fontSize: 16 }}>
                          {item.kindOfFood}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          </ScrollView>
        </View>
        <View style={styles.btnView}>
          <Button
            buttonStyle={{
              width: 146,
              height: 48,
              backgroundColor: "#C7c7c7",
              alignItems: "center",
            }}
            title="Huỷ"
            onPress={() => {
              props.setVisible(false);
            }}
          />

          <Button
            buttonStyle={{
              width: 146,
              height: 48,
              backgroundColor: "#DC0000",
              alignItems: "center",
            }}
            onPress={() => {
              onSubmit();
              props.setVisible(false);
            }}
            title="Thêm"
          />
        </View>
      </Overlay>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowRadius: 50,
    backgroundColor: "#707070",
  },
  titleView: {
    padding: 5,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  toolView: {
    top: 3,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  viewInput: {
    width: 230,
    borderRadius: 20,
    height: 39,
    marginLeft: 10,
    backgroundColor: "#c4c1c0",
    flexDirection: "row",
    overflow: "hidden",
    shadowOpacity: 0.5,
  },
  cardView: {
    flexDirection: "row",
    justifyContent: "space-between",

    padding: 10,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  iconstyle: {
    width: 18,
    height: 18,
    marginRight: 10,
    marginLeft: 10,
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderRadius: 14,
  },
});
