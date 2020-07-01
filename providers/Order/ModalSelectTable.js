import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Overlay } from "react-native-elements";

import TickIcon from "../../assets/icon/tick.png";
import CircleIcon from "../../assets/icon/circle.png";
import OrderSerives from "../../providerServices/orderServices";
export default function (props) {
  //   Id	Name
  // 1	Lẩu - Buffet
  // 2	Hải sản
  // 3	Rau củ
  // 4	Thịt
  // 5	Đồ uống
  const orderDate = props.orderDate;
  const [emptyTable, setEmptyTable] = useState([]);
  const {numOrderTable} = props
  const getEmptyTable = async () => {
    const result = await OrderSerives.listReservation({
      date: {
        equal: orderDate,
      },
    });
    let data = [];
    await result.map((item) => {
      if (item.status.id == 2) {
        const tmp = {
          ...item,
          isCliked: false,
        };
        data.push(tmp);
      }
    });
    setEmptyTable(data);
  };
  useEffect(() => {
    getEmptyTable();
  }, []);
  const onselect = async (id) => {
    /* console.log("[INFO] Code in modal select food: ", id); */
    let lengthData = emptyTable.length;
    let newData = [];
    let numClicked = 0;
    for (let index = 0; index < lengthData; index++) {
        if(emptyTable[index].isCliked==true){
          numClicked ++
        }
    }
    console.log(numOrderTable);
    
    for (let index = 0; index < lengthData; index++) {
      if (emptyTable[index].id === id) {
        if(emptyTable[index].isCliked==true){
          newData.push({
            ...emptyTable[index],
            isCliked: !emptyTable[index].isCliked,
          });
        }else{
          if (numClicked<numOrderTable) {
            newData.push({
              ...emptyTable[index],
              isCliked: !emptyTable[index].isCliked,
            });
          }else{
            newData.push(emptyTable[index]);
          }
        }
        
      } else {
        newData.push(emptyTable[index]);
      }
    }
    setEmptyTable(newData);
  };

  return (
    <View style={{ backgroundColor: "#c3c3c3" }}>
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
              Chọn bàn
            </Text>
          </View>
          {emptyTable.length === 0 ? (
            <View
              style={{
                ...styles.cardView,
                padding: 50,
                justifyContent: "center",
                alignContent: "center",
                paddingVertical: 100,
              }}
            >
              <Text> Không còn bàn còn trống </Text>
            </View>
          ) : (
            <ScrollView>
              <View style={{ top: 2 }}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={emptyTable}
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
                            <Image
                              source={CircleIcon}
                              style={styles.iconstyle}
                            />
                          ) : (
                            <Image source={TickIcon} style={styles.iconstyle} />
                          )}
                          <Text style={{ color: "black", fontSize: 16 }}>
                            Bàn số {item.table.code}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              </View>
            </ScrollView>
          )}
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={{
              width: 146,
              height: 48,
              backgroundColor: "grey",
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={() => {
              props.handleSelectTable(emptyTable);
              props.setVisible(false);
            }}
          >
            <Text
              style={{
                fontSize: 18,
                paddingTop: 10,
                fontWeight: "700",
                color: "white",
              }}
            >
              Hủy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 146,
              height: 48,
              backgroundColor: "#D20000",
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={() => {
              props.handleSelectTable(emptyTable);
              props.setVisible(false);
            }}
          >
            <Text
              style={{
                fontSize: 18,
                paddingTop: 10,
                fontWeight: "700",
                color: "white",
              }}
            >
              Chọn
            </Text>
          </TouchableOpacity>
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
    elevation: 2,
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
    marginTop: 3,
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    borderRadius: 14,
  },
});
