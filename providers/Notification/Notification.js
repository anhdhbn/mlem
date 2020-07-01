import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TextInput } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import Delete from "react-native-vector-icons/AntDesign"
import * as signalR from "@aspnet/signalr";
const BASE_URL = "http://112.213.88.49:20000";
import moment from "moment";
import TickIcon from "../../assets/icon/tick.png";
import NotifyServices from "../../providerServices/notifyServices";
import notifyServices from "../../providerServices/notifyServices";
import { set } from "react-native-reanimated";
const defaultImage = 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'
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
      name="NotificationPage"
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
        headerRight: () => (
          <Delete.Button
            name="delete"
            size={25}
            backgroundColor="#D20000"
            onPress={() => {
             // notifyServices.deleteNotify({})
              handleDeleteNotify()
            }}
          />
        )
      }}
    />
  </NotificationStack.Navigator>
);
const Notification = (props) => {
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0)
  useEffect(() => {
    getNotify()
  }, []);
  const getNotify = () => {
    NotifyServices.list({
      take: 10,
      skip: 0,
    }).then(res => {
      if (res.length > 0) {
        setData(res)
      }
    });
  }
  const getMoreNotify = async (props) => {
    NotifyServices.list({
      take: 10,
      skip: props
    }).then(res => {
      if (res.length > 0) {
        let mang = data.concat(res);
        setData(mang);
        setSkip(skip + 10);
      }
    });

  };
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
            getNotify()
            console.log("[INFO] call back data in signalR: ", user, data);
          });
        });
    } catch (error) {
      console.log("[INFO] Error in signalR: ", error);
    }
  };
  const handleChecked = (index) => {
    let mang = data.concat();
    mang[index].unread = true;
    setData(mang)
    notifyServices.update(mang[index]);
  }
  return (
    <View style={styles.container}>
      {console.log(data[0])
      }
      <FlatList
        data={data}
        keyExtractor={(item) => {
          item.id;
        }}
        /* onEndReached ={()=>{
          getMoreNotify(skip+10);
          console.log('aaaaaaaa');
          
        }} */
        onEndReached={
          () => {
            getMoreNotify(skip + 10);
          }
        }
        onEndReachedThreshold={0.1}
        renderItem={({ index, item }) => {
          return (
            <TouchableOpacity style={{
              ...styles.cardView,
              backgroundColor: item.unread == true ? "#FFE2E2" : "#FFFFFF"
            }}
              onPress={() => {
                handleChecked(index)
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image source={{ uri: item.account.image !== null ? `http://112.213.88.49:20000/${item.account.image.url}` : defaultImage }} style={styles.avatar} />
                <View>
                  <Text style={{ fontFamily: "Regular", fontSize: 18 }}>
                    {item.account.displayName}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Regular",
                      fontSize: 12,
                      color: "#8A8F9C",
                    }}
                  >
                    {item.content}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Regular",
                      fontSize: 12,
                      color: "#8A8F9C",
                    }}
                  >
                    {moment(item.time).startOf('hour').fromNow()}
                  </Text>
                </View>
              </View>
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
