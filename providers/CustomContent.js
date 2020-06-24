import React from "react";
import { View, Text } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome";
import { Avatar } from "react-native-elements";

export default function CustomContent(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            height: 200,
            top: -6,
            alignContent: "center",
            backgroundColor: "red",
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          <View style={{ marginLeft: 30, marginTop: 80 }}>
            <View>
              <Avatar
                rounded
                size={70}
                source={require("../assets/icon/mm.png")}
              />
            </View>
            <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "600" }}>
              Administrator
            </Text>
          </View>
        </View>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          )}
          label="Đơn đặt hàng"
          onPress={() => {
            props.navigation.navigate("Home");
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="th-list" color={color} size={size} />
          )}
          label="Thực đơn"
          onPress={() => {
            props.navigation.navigate("Menu");
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="credit-card" color={color} size={size} />
          )}
          label="Thanh toán"
          onPress={() => {
            props.navigation.navigate("Payment");
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="bell-o" color={color} size={size} />
          )}
          label="Thông báo"
          onPress={() => {
            props.navigation.navigate("Notification");
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="bar-chart-o" color={color} size={size} />
          )}
          label="Thống kê"
          onPress={() => {
            props.navigation.navigate("Statistic");
          }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="sign-out" color={color} size={size} />
          )}
          label="Đăng xuất"
          onPress={() => {
            //handleLogout;
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
}
