import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import BackICon from "../../assets/icon/provider/back.png";
import TickIcon from "../../assets/icon/tick.png";
import ViewMore from "../../assets/icon/view more.png";
import addIcon from "../../assets/icon/+.png";
import subIcon from "../../assets/icon/-.png";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

export default function StackScreen(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#D20000",
          },
          headerTitleAlign: "center",
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="SelectFood"
          component={SelectFood}
          options={{
            title: "Thêm món ăn mới",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("SideBar");
                }}
              >
                <Image
                  source={BackICon}
                  style={{ height: 15, width: 15, left: 10 }}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function SelectFood(props) {
  const data = {
    image: "https://reactnative.dev/img/tiny_logo.png",
    name: "tên món ăn",
    price: "100000",
    saleOff: "30%",
  };
  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={{ uri: data.image }} style={styles.image} />
        <Text style={styles.titleImage}>{data.name}</Text>
      </View>

      <View>
        <Text style={styles.title}>các tuỳ chọn</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 14,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity>
              <Image source={TickIcon} style={styles.iconstyle} />
            </TouchableOpacity>
            <Text>Size lớn</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity>
              <Image source={TickIcon} style={styles.iconstyle} />
            </TouchableOpacity>
            <Text>Size vừa</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity>
              <Image source={TickIcon} style={styles.iconstyle} />
            </TouchableOpacity>
            <Text>Size nhỏ</Text>
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.title}>Nhóm món ăn</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 14,
          }}
        >
          <Text>Bấm chọn</Text>
          <TouchableOpacity>
            <Image source={ViewMore} style={{ height: 13, width: 13 }} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 10,
            paddingRight: 10,
            color: "#8A8F9C",
            backgroundColor: "#DEDEDE",
          }}
        >
          <Text>Đơn Giá (size nhỏ)</Text>
          <Text> Khuyến mãi</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 14,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity>
              <Image source={subIcon} style={styles.iconstyle} />
            </TouchableOpacity>
            <Text>{data.price}</Text>
            <TouchableOpacity>
              <Image source={addIcon} style={styles.iconstyle} />
            </TouchableOpacity>
            <Text>đồng</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity>
              <Image source={subIcon} style={styles.iconstyle} />
            </TouchableOpacity>
            <Text>{data.saleOff}</Text>
            <TouchableOpacity>
              <Image source={addIcon} style={styles.iconstyle} />
            </TouchableOpacity>
            <Text>%</Text>
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.title}>Trạng thái</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <View style={{ flexDirection: "row", padding: 14 }}>
            <TouchableOpacity>
              <Image source={TickIcon} style={styles.iconstyle} />
            </TouchableOpacity>
            <Text>Bán</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity>
              <Image source={TickIcon} style={styles.iconstyle} />
            </TouchableOpacity>
            <Text>Dừng bán</Text>
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.title}>Mô tả</Text>
        <Text style={{ left: 10 }}>Mô tả ...</Text>
      </View>

      <View style={styles.btnView}>
        <TouchableOpacity
          style={{
            width: 146,
            height: 48,
            backgroundColor: "#C7c7c7",
            alignItems: "center",
          }}
        >
          <Text style={{ top: 10 }}>Huỷ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 146,
            height: 48,
            backgroundColor: "#DC0000",
            alignItems: "center",
          }}
        >
          <Text style={{ top: 10, color: "#ffffff" }}>Thêm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F7",
  },
  title: {
    paddingLeft: 10,
    color: "#8A8F9C",
    backgroundColor: "#DEDEDE",
  },
  image: {
    height: 199,
    width: 216,
    alignSelf: "center",
  },
  titleImage: {
    alignSelf: "center",
    fontFamily: "Reguler",
    fontSize: 20,
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
    top: 10,
  },
});
