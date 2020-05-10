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
      id: "1",
      name: "Tất Cả",
      icon: all,
      onPress: props.onPressAll,
    },
    {
      id: "2",
      name: "Lẩu-buffet",
      icon: buffet,
      onPress: props.onPressLau,
    },
    {
      id: "3",
      name: "Hải Sản",
      icon: seafood,
      onPress: props.onPressHaisan,
    },
    {
      id: "4",
      name: "Rau Củ",
      icon: vegetable,
      onPress: props.onPressRaucu,
    },
    {
      id: "5",
      name: "Thịt",
      icon: meat,
      onPress: props.onPressThit,
    },
    {
      id: "6",
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
              <Text>{item.name}</Text>
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
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
