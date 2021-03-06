import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import buffet from "../../assets/images/food/buffet.png";
import seafood from "../../assets/images/food/seafood.png";
import vegetable from "../../assets/images/food/food.png";
import meat from "../../assets/images/food/meat.png";
import wine from "../../assets/images/food/wine-bottle.png";
import all from "../../assets/images/food/supermarket.png";
export default function (props) {
  const kindFoods = [
    {
      id: 0,
      name: "Tất Cả",
      icon: all,
      onPress: props.onPressAll,
    },
    {
      id: 1,
      name: "Lẩu-buffet",
      icon: buffet,
      onPress: props.onPressLau,
    },
    {
      id: 2,
      name: "Hải Sản",
      icon: seafood,
      onPress: props.onPressHaisan,
    },
    {
      id: 3,
      name: "Rau Củ",
      icon: vegetable,
      onPress: props.onPressRaucu,
    },
    {
      id: 4,
      name: "Thịt",
      icon: meat,
      onPress: props.onPressThit,
    },
    {
      id: 5,
      name: "Đồ Uống",
      icon: wine,
      onPress: props.onPressDouong,
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={kindFoods}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.element} onPress={item.onPress}>
              <Image source={item.icon} style={styles.icon} />
              <Text
                style={
                  item.id === props.codeRender ? { color: "#DF0000" } : null
                }
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // top:155,
    marginTop: 4,
    backgroundColor: "white",
  },
  element: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
});
