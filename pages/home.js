import React from "react";
import { View, StyleSheet } from "react-native";

import HeaderImage from "../components/cardList/headerCardList";
import CardList from "../components/cardList/cardList";
import NavBar from "../components/cardList/NavBar";
import { ScrollView } from "react-native-gesture-handler";

export default function (props) {
  const cardData = [
    {
      id: 1,
      image: "https://reactnative.dev/img/tiny_logo.png",
      name: "Lau chua",
      price: "12000/nguoi",
    },
    {
      id: 2,
      image: "https://reactnative.dev/img/tiny_logo.png",
      name: "Lau chua",
      price: "12000/nguoi",
    },
    {
      id: 3,
      image: "https://reactnative.dev/img/tiny_logo.png",
      name: "Lau chua",
      price: "12000/nguoi",
    },
    {
      id: 4,
      image:
        "https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-1029171697.jpg",
      name: "Lau chua",
      price: "12000/nguoi",
    },
  ];

  const onPressDetail = () => {
    props.navigation.navigate("Detail");
  };

  return (
    <>
      <ScrollView style={styles.home}>
        <HeaderImage />
        <NavBar />
        <CardList
          cardData={cardData}
          onPressDetail={onPressDetail}
          title={"Buffet"}
        />
        <CardList
          cardData={cardData}
          onPressDetail={onPressDetail}
          title={"Nướng"}
        />
        <CardList
          cardData={cardData}
          onPressDetail={onPressDetail}
          title={"Lẩu"}
        />
        <CardList
          cardData={cardData}
          onPressDetail={onPressDetail}
          title={"Đồ Ngọt"}
        />
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  home: {
    backgroundColor: "#dee1e3",
    flex: 1,
  },
});
