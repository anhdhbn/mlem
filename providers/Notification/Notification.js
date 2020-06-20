import React, { useEffect } from "react";
import { Text, View, StyleSheet, Image, TextInput } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import * as signalR from "@aspnet/signalr";
const BASE_URL = "http://admin.wepick.vn:20000";

import TickIcon from "../../assets/icon/tick.png";
const NotificationStack = createStackNavigator();
/*  NotificationStackScreen*/
export default ({ navigation }) => (
  <NotificationStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#D20000",
      },
      headerTitleAlign: "center",
      headerTintColor: "#fff",
    }}
  >
    <NotificationStack.Screen
      name="Notification"
      component={Notification}
      options={{
        title: "Thông báo",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#D20000"
            onPress={() => {
              navigation.openDrawer();
            }}
          ></Icon.Button>
        ),
      }}
    />
  </NotificationStack.Navigator>
);
const Notification = (props) => {
  const data = [
    {
      image: "https://reactnative.dev/img/tiny_logo.png",
      tableNum: "001",
      buzzTime: "1 phút trước",
      id: "1",
    },
    {
      image: "https://reactnative.dev/img/tiny_logo.png",
      tableNum: "002",
      buzzTime: "1 phút trước",
      id: "2",
    },
    {
      image: "https://reactnative.dev/img/tiny_logo.png",
      tableNum: "003",
      buzzTime: "1 phút trước",
      id: "3",
    },
  ];

  useEffect(() => {
    testSignalIR();
  });

  const testSignalIR = () => {
    console.log("[INFO] Called SignalR");
    try {
      let connection = new signalR.HubConnectionBuilder()
        .withUrl(BASE_URL + "/signalr")
        .build();

      // connection.on("sendToProvider", (user, data) => {
      //   console.log("[INFO] call back data in signalR: ", user, data);
      // });

      connection
        .start()
        .catch((error) => {
          console.log(error);
          return Promise.reject();
        })
        .then(() => {
          connection.on("sendToProvider", (user, data) => {
            console.log("[INFO] call back data in signalR: ", user, data);
          });
        });
    } catch (error) {
      console.log("[INFO] Error in signalR: ", error);
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => {
          item.id;
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.cardView}>
              <View style={{ flexDirection: "row" }}>
                <Image source={{ uri: item.image }} style={styles.avatar} />
                <View>
                  <Text style={{ fontFamily: "Regular", fontSize: 18 }}>
                    {item.tableNum}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Regular",
                      fontSize: 12,
                      color: "#8A8F9C",
                    }}
                  >
                    Buzz!!!
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Regular",
                      fontSize: 12,
                      color: "#8A8F9C",
                    }}
                  >
                    {item.buzzTime}
                  </Text>
                </View>
              </View>
              <Image
                source={TickIcon}
                style={{ height: 18, width: 18, top: 25 }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F7",
  },
  cardView: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  avatar: {
    height: 67,
    width: 67,
    borderRadius: 50,
    right: 10,
    marginLeft: 10,
  },
});
