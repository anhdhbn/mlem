import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import homeServices from "../services/homeServices";

import HeaderImage from "../components/cardList/headerCardList";
import CardList from "../components/cardList/cardList";
import NavBar from "../components/cardList/NavBar";
import { ScrollView } from "react-native-gesture-handler";

export default function (props) {
  //   Id	Name
  // 1	Lẩu - Buffet
  // 2	Hải sản
  // 3	Rau củ
  // 4	Thịt
  // 5	Đồ uống

  // Id	Name
  // 1	Size nhỏ
  // 2	Size vừa
  // 3	Size lớn
  const [foodGroupType, _] = useState({
    lau: 1,
    haisan: 2,
    raucu: 3,
    thit: 4,
    douong: 5,
  });

  const [isLoading, setIsLoading] = useState(true);

  const [cardData, changeCardData] = useState([]);

  // const cardData = [
  //   {
  //     id: 1,
  //     image: "https://reactnative.dev/img/tiny_logo.png",
  //     name: "Lau chua",
  //     price: "12000/nguoi",
  //   },
  //   {
  //     id: 2,
  //     image: "https://reactnative.dev/img/tiny_logo.png",
  //     name: "Lau chua",
  //     price: "12000/nguoi",
  //   },
  //   {
  //     id: 3,
  //     image: "https://reactnative.dev/img/tiny_logo.png",
  //     name: "Lau chua",
  //     price: "12000/nguoi",
  //   },
  //   {
  //     id: 4,
  //     image:
  //       "https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-1029171697.jpg",
  //     name: "Lau chua",
  //     price: "12000/nguoi",
  //   },
  // ];

  const onPressDetail = (cardData) => {
    getListFoods();
    props.navigation.navigate("Detail", { data: cardData });
  };

  const getListFoods = async () => {
    let params = {
      // id: {
      //   equal: 2,
      // },
    };
    let response = await homeServices.list(params);
    console.log("[INFO] Response in home after getListFoods: ", response);
    changeCardData(response);
  };

  const getListFavouriteFoods = async () => {
    let response = await homeServices.listFavorite();
    console.log(
      "[INFO] Response in home after getListFavouriteFoods: ",
      response
    );
  };

  const getListRecentlyFoods = async () => {
    let params = {
      // id: {
      //   equal: 2,
      // },
    };
    let response = await homeServices.listRecently(params);
    console.log(
      "[INFO] Response in home after getListRecentlyFoods: ",
      response
    );
  };

  const getListTopOrderFoods = async () => {
    let params = {
      // id: {
      //   equal: 2,
      // },
    };
    let response = await homeServices.listTopOrder(params);
    console.log("[INFO] Response in home after listTopOrder: ", response);
  };

  return (
    <>
      <ScrollView style={styles.home}>
        <HeaderImage />
        <NavBar />
        <CardList
          cardData={cardData}
          onPressDetail={onPressDetail}
          title={"Yêu thích"}
          isLoading={isLoading}
        />
        <CardList
          cardData={cardData}
          onPressDetail={onPressDetail}
          title={"Đặt gần đây"}
          isLoading={isLoading}
        />
        <CardList
          cardData={cardData}
          onPressDetail={onPressDetail}
          title={"Đặt nhiều nhất"}
          isLoading={isLoading}
        />
        <CardList
          cardData={cardData}
          onPressDetail={onPressDetail}
          title={"Lẩu - Buffet"}
          isLoading={isLoading}
        />
        <CardList
          cardData={cardData}
          onPressDetail={onPressDetail}
          title={"Hải sản"}
          isLoading={isLoading}
        />
        <CardList
          cardData={cardData}
          onPressDetail={onPressDetail}
          title={"Rau củ"}
          isLoading={isLoading}
        />
        <CardList
          cardData={cardData}
          onPressDetail={onPressDetail}
          title={"Thịt"}
          isLoading={isLoading}
        />
        <CardList
          cardData={cardData}
          onPressDetail={onPressDetail}
          title={"Đồ uống"}
          isLoading={isLoading}
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
