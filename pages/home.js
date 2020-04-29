import React, { useState, useEffect } from "react";
import { View, StyleSheet, YellowBox } from "react-native";

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

  const [isLoadingFavourite, setIsLoadingFavourite] = useState(true);
  const [isLoadingRecently, setIsLoadingRecently] = useState(true);
  const [isLoadingTop, setIsLoadingTop] = useState(true);
  const [isLoadingLau, setIsLoadingLau] = useState(true);
  const [isLoadingHaisan, setIsLoadingHaisan] = useState(true);
  const [isLoadingRaucu, setIsLoadingRaucu] = useState(true);
  const [isLoadingThit, setIsLoadingThit] = useState(true);
  const [isLoadingDouong, setIsLoadingDouong] = useState(true);

  const [listFavorite, setListFavourite] = useState(undefined);
  const [listRecently, setListRecently] = useState(undefined);
  const [listTop, setListTop] = useState(undefined);
  const [listLau, setListLau] = useState(undefined);
  const [listHaisan, setListHaisan] = useState(undefined);
  const [listRaucu, setListRaucu] = useState(undefined);
  const [listThit, setListThit] = useState(undefined);
  const [listDouong, setListDouong] = useState(undefined);

  useEffect(() => {
    if (isLoadingFavourite === true) {
      getListFoods(-3).then((data) => {
        setListFavourite(data);
        setIsLoadingFavourite(false);
      });
      setIsLoadingFavourite(false);
    } else if (isLoadingRecently === true) {
      getListFoods(-2).then((data) => {
        setListRecently(data);
        setIsLoadingRecently(false);
      });
      setIsLoadingRecently(false);
    } else if (isLoadingTop === true) {
      getListFoods(-1).then((data) => {
        setListTop(data);
        setIsLoadingTop(false);
      });
      setIsLoadingTop(false);
    } else if (isLoadingLau === true) {
      getListFoods(1).then((data) => {
        setListLau(data);
        setIsLoadingLau(false);
      });
      setIsLoadingLau(false);
    } else if (isLoadingHaisan === true) {
      getListFoods(2).then((data) => {
        setListHaisan(data);
        setIsLoadingHaisan(false);
      });
      setIsLoadingHaisan(false);
    } else if (isLoadingRaucu === true) {
      getListFoods(3).then((data) => {
        setListRaucu(data);
        setIsLoadingRaucu(false);
      });
      setIsLoadingRaucu(false);
    } else if (isLoadingThit === true) {
      getListFoods(4).then((data) => {
        setListThit(data);
        setIsLoadingThit(false);
      });
      setIsLoadingThit(false);
    } else if (isLoadingDouong === true) {
      getListFoods(5).then((data) => {
        setListDouong(data);
        setIsLoadingDouong(false);
      });
      setIsLoadingDouong(false);
    }
  });

  const getListFoods = async (code) => {
    if (code == -3) {
      return getListFavouriteFoods();
    } else if (code == -2) {
      return getListRecentlyFoods();
    } else if (code == -1) {
      return getListTopOrderFoods();
    }

    let params = {
      foodGroupingId: {
        equal: code,
      },
    };
    let response = await homeServices.list(params);
    // console.log("[INFO] Response in home after getListFoods: ", response);
    return response;
  };

  const getListFavouriteFoods = async () => {
    let response = await homeServices.listFavorite();
    // console.log(
    //   "[INFO] Response in home after getListFavouriteFoods: ",
    //   response
    // );
    return response;
  };

  const getListRecentlyFoods = async () => {
    let params = {
      // id: {
      //   equal: 2,
      // },
    };
    let response = await homeServices.listRecently(params);
    // console.log(
    //   "[INFO] Response in home after getListRecentlyFoods: ",
    //   response
    // );
    return response;
  };

  const getListTopOrderFoods = async () => {
    let params = {
      // id: {
      //   equal: 2,
      // },
    };
    let response = await homeServices.listTopOrder(params);
    // console.log("[INFO] Response in home after listTopOrder: ", response);
    return response;
  };

  const onPressDetail = (cardData) => {
    props.navigation.navigate("Detail", { data: cardData });
  };
  return (
    <>
      {/* {console.log("Start Rendering")} */}
      <ScrollView style={styles.home}>
        <HeaderImage />
        <NavBar />
        <CardList
          cardData={listFavorite}
          onPressDetail={() => onPressDetail()}
          title={"Yêu thích"}
          isLoading={isLoadingFavourite}
        />
        <CardList
          cardData={listRecently}
          onPressDetail={() => onPressDetail()}
          title={"Đặt gần đây"}
          isLoading={isLoadingRecently}
        />
        <CardList
          cardData={listTop}
          onPressDetail={() => onPressDetail()}
          title={"Đặt nhiều nhất"}
          isLoading={isLoadingTop}
        />
        <CardList
          cardData={listLau}
          onPressDetail={() => onPressDetail()}
          title={"Lẩu - Buffet"}
          isLoading={isLoadingLau}
        />
        <CardList
          cardData={listHaisan}
          onPressDetail={() => onPressDetail()}
          title={"Hải sản"}
          isLoading={isLoadingHaisan}
        />
        <CardList
          cardData={listRaucu}
          onPressDetail={() => onPressDetail()}
          title={"Rau củ"}
          isLoading={isLoadingRaucu}
        />
        <CardList
          cardData={listThit}
          onPressDetail={() => onPressDetail()}
          title={"Thịt"}
          isLoading={isLoadingThit}
        />
        <CardList
          cardData={listDouong}
          onPressDetail={() => onPressDetail()}
          title={"Đồ uống"}
          isLoading={isLoadingDouong}
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
