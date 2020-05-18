import React from "react";
import { Text, View, StyleSheet, Image, TextInput } from "react-native";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";

import search from "../assets/icon/search.png";
import viewMoreIcon from "../assets/icon/view-more.png";
import dropDownIcon from "../assets/icon/drop_down.png";

export default function (props) {
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
          placeholder={"press to search...."}
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
            <TouchableOpacity style={styles.card}>
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
    </View>
  );
}
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
    backgroundColor: "#F5F6F7",
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
  },
});
