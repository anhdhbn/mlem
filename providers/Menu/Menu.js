import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TextInput } from "react-native";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

import search from "../../assets/icon/search.png";
import viewMoreIcon from "../../assets/icon/view_more.png";
import dropDownIcon from "../../assets/icon/drop_down.png";
import ModalEditMenu from "./ModalEditMenu";

import CreateFood from "./AddNewFood";
import EditFood from "./EditFood";

const MenuStack = createStackNavigator();
/* MenuStackScreen */
export default ({ navigation }) => (
  <MenuStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#D20000",
      },
      headerTitleAlign: "center",
      headerTintColor: "#fff",
    }}
  >
    <MenuStack.Screen
      name="Menu"
      component={Menu}
      options={{
        title: "Thực Đơn",
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
          <AntDesign.Button
            name="plus"
            size={25}
            backgroundColor="#D20000"
            onPress={() => {
              navigation.navigate("CreateFood");
            }}
          ></AntDesign.Button>
        ),
      }}
    />
    <MenuStack.Screen
      name="CreateFood"
      component={CreateFood}
      options={{
        title: "Thêm mới món ăn",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#D20000"
            onPress={() => {
              navigation.goBack();
            }}
          ></Icon.Button>
        ),
      }}
    />
    <MenuStack.Screen
      name="EditFood"
      component={EditFood}
      options={{
        title: "Tùy chỉnh món ăn",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#D20000"
            onPress={() => {
              navigation.goBack();
            }}
          ></Icon.Button>
        ),
      }}
    />
  </MenuStack.Navigator>
);

const Menu = (props) => {
  const [editMenuVisible, setEditMenuVisible] = useState(false);
  const toggleEditMenu = () => {
    setEditMenuVisible(!editMenuVisible);
  };
  const data = [
    {
      id: "1",
      foodName: "Tên Món Ăn",
      status: "Đang Bán",
      description: "Mô tả món ăn",
      price: "500000vnd",
      image: "https://reactnative.dev/img/tiny_logo.png",
    },
    {
      id: "2",
      foodName: "Tên Món Ăn",
      status: "Đang Bán",
      description: "Mô tả món ăn",
      price: "500000vnd",
      image: "https://reactnative.dev/img/tiny_logo.png",
    },
    {
      id: "3",
      foodName: "Tên Món Ăn",
      status: "Đang Bán",
      description: "Mô tả món ăn",
      price: "500000vnd",
      image: "https://reactnative.dev/img/tiny_logo.png",
    },
    {
      id: "4",
      foodName: "Tên Món Ăn",
      status: "Đang Bán",
      description: "Mô tả món ăn",
      price: "500000vnd",
      image: "https://reactnative.dev/img/tiny_logo.png",
    },
    {
      id: "5",
      foodName: "Tên Món Ăn",
      status: "Đang Bán",
      description: "Mô tả món ăn",
      price: "500000vnd",
      image: "https://reactnative.dev/img/tiny_logo.png",
    },
    {
      id: "6",
      foodName: "Tên Món Ăn",
      status: "Đang Bán",
      description: "Mô tả món ăn",
      price: "500000vnd",
      image: "https://reactnative.dev/img/tiny_logo.png",
    },
    {
      id: "7",
      foodName: "Tên Món Ăn",
      status: "Đang Bán",
      description: "Mô tả món ăn",
      price: "500000vnd",
      image: "https://reactnative.dev/img/tiny_logo.png",
    },
    {
      id: "8",
      foodName: "Tên Món Ăn",
      status: "Đang Bán",
      description: "Mô tả món ăn",
      price: "500000vnd",
      image: "https://reactnative.dev/img/tiny_logo.png",
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.viewInput}>
        <Image
          source={search}
          style={{ width: 13, height: 13, marginLeft: 10, top: 15 }}
        />
        <TextInput
          style={styles.input}
          placeholder={"MlemMlem...."}
          placeholderTextColor='#B21'
        ></TextInput>
      </View>

      <View style={styles.filterBar}>
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <Text>Phân loại </Text>
          <Image
            source={dropDownIcon}
            style={{ height: 15, width: 15, top: 3 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <Text>Ngày tạo </Text>
          <Image
            source={dropDownIcon}
            style={{ height: 15, width: 15, top: 3 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <Text>Trạng thái </Text>
          <Image
            source={dropDownIcon}
            style={{ height: 15, width: 15, top: 3 }}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.card} onLongPress={toggleEditMenu}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 77, height: 71 }}
                />
                <View style={{ padding: 5 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    {item.foodName}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Reguler",
                      color: "#8A8F9C",
                      fontSize: 12,
                    }}
                  >
                    {item.description}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Reguler",
                      color: "#00B80C",
                      fontSize: 12,
                    }}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", top: 10 }}>
                <Text
                  style={{
                    fontFamily: "Reguler",
                    color: "#D20000",
                    fontSize: 20,
                  }}
                >
                  {item.price}
                </Text>
                <Image
                  source={viewMoreIcon}
                  style={{ height: 15, width: 15, top: 7 }}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <ModalEditMenu visible={{ editMenuVisible, toggleEditMenu }} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewInput: {
    width: "100%",
    borderRadius: 10,
    height: 42,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    overflow: "hidden",
    shadowOpacity: 0.5,
  },
  filterBar: {
    flexDirection: "row",
    backgroundColor: "#F6F7F8",
    height:50,
    padding: 10,
    top: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  card: {
    width: "100%",
    top: 10,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
