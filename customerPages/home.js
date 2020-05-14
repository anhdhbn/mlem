import React, { useState, useEffect } from "react";
import { View, StyleSheet, YellowBox, Text } from "react-native";
import { Button, Overlay } from "react-native-elements";

import homeServices from "../customerServices/homeServices";

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

  const [isLoadingAllDish, setIsLoadingAllDish] = useState(true);
  const [isLoadingFavourite, setIsLoadingFavourite] = useState(true);
  const [isLoadingRecently, setIsLoadingRecently] = useState(true);
  const [isLoadingTop, setIsLoadingTop] = useState(true);
  const [isLoadingLau, setIsLoadingLau] = useState(true);
  const [isLoadingHaisan, setIsLoadingHaisan] = useState(true);
  const [isLoadingRaucu, setIsLoadingRaucu] = useState(true);
  const [isLoadingThit, setIsLoadingThit] = useState(true);
  const [isLoadingDouong, setIsLoadingDouong] = useState(true);

  const [listAllDish, setListAllDish] = useState(null);
  const [listFavorite, setListFavourite] = useState(null);
  const [listRecently, setListRecently] = useState(null);
  const [listTop, setListTop] = useState(null);
  const [listLau, setListLau] = useState(null);
  const [listHaisan, setListHaisan] = useState(null);
  const [listRaucu, setListRaucu] = useState(null);
  const [listThit, setListThit] = useState(null);
  const [listDouong, setListDouong] = useState(null);

  const [visible, setVisible] = useState(false);
  const [checkProfile, setCheckProfile] = useState(false);

  useEffect(() => {
    if (!checkProfile) {
      setCheckProfile(true);
      if (props.route.params.response.dob === null) {
        _showModal();
      }
    }

    if (isLoadingFavourite === true) {
      getListFoods(-3).then((data) => {
        setListFavourite(data);
        setIsLoadingFavourite(false);
      });
      // setIsLoadingFavourite(false);
    } else if (isLoadingRecently === true) {
      getListFoods(-2).then((data) => {
        setListRecently(data);
        setIsLoadingRecently(false);
      });
      // setIsLoadingRecently(false);
    } else if (isLoadingTop === true) {
      getListFoods(-1).then((data) => {
        setListTop(data);
        setIsLoadingTop(false);
      });
      // setIsLoadingTop(false);
    } else if (isLoadingLau === true) {
      getListFoods(1).then((data) => {
        setListLau(data);
        setIsLoadingLau(false);
      });
      //  setIsLoadingLau(false);
    } else if (isLoadingHaisan === true) {
      getListFoods(2).then((data) => {
        setListHaisan(data);
        setIsLoadingHaisan(false);
      });
      // setIsLoadingHaisan(false);
    } else if (isLoadingRaucu === true) {
      getListFoods(3).then((data) => {
        setListRaucu(data);
        setIsLoadingRaucu(false);
      });
      // setIsLoadingRaucu(false);
    } else if (isLoadingThit === true) {
      getListFoods(4).then((data) => {
        setListThit(data);
        setIsLoadingThit(false);
      });
      // setIsLoadingThit(false);
    } else if (isLoadingDouong === true) {
      getListFoods(5).then((data) => {
        setListDouong(data);
        setIsLoadingDouong(false);
      });
      // setIsLoadingDouong(false);
    } else if (isLoadingAllDish === true) {
      getAllFoods().then((data) => {
        setListAllDish(data);
        setIsLoadingAllDish(false);
      });
    }

    // console.log("[INFO] Loading dish", listDouong);

    // // Test
    // if (isLoadingDouong === true) {
    //   getAllFoods().then((data) => {
    //     setListDouong(data);
    //     setListFavourite(data);
    //     setListHaisan(data);
    //     setListLau(data);
    //     setListRaucu(data);
    //     setListRecently(data);
    //     setListThit(data);
    //     setListTop(data);
    //     setIsLoadingDouong(false);
    //   });
    // }
  });

  const getAllFoods = async () => {
    let params = {};
    let response = await homeServices.list(params);
    // console.log("[INFO] Response in getAllFoods: ", response);
    return response;
  };

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
    cardData
      ? props.navigation.navigate("Detail", { listDishs: cardData })
      : null;
  };

  // For modal
  const _showModal = () => {
    setVisible(true);
  };
  const _hideModal = () => {
    setVisible(false);
  };
  const _onsubmitModal = () => {
    _hideModal();
    props.navigation.navigate("Profile", { showModal: true });
  };

  return (
    <>
      {/* Check is the first login then update profile */}

      <Overlay
        isVisible={visible}
        // onBackdropPress={_hideModal}
        overlayStyle={{ marginHorizontal: 10, paddingBottom: 10 }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20, padding: 10 }}>
          Xin chào
        </Text>
        <Text style={{ fontSize: 20, padding: 10 }}>
          Chào mừng bạn đến với ứng dụng Mlem Mlem, vui lòng cập nhật thông tin
          cá nhân để chúng tôi có thể phục vụ bạn tốt hơn.
        </Text>
        <Button title="Cập nhật thông tin ngay" onPress={_onsubmitModal} />
      </Overlay>

      {/* {console.log("Start Rendering")} */}
      <ScrollView style={styles.home}>
        <HeaderImage />
        <NavBar
          onPressAll={() => onPressDetail(listAllDish)}
          onPressLau={() => onPressDetail(listFavorite)}
          onPressHaisan={() => onPressDetail(listHaisan)}
          onPressRaucu={() => onPressDetail(listRaucu)}
          onPressThit={() => onPressDetail(listThit)}
          onPressDouong={() => onPressDetail(listDouong)}
        />
        <CardList
          cardData={listFavorite}
          onPressDetail={() => onPressDetail(listFavorite)}
          title={"Yêu thích"}
          isLoading={isLoadingFavourite}
        />
        <CardList
          cardData={listRecently}
          onPressDetail={() => onPressDetail(listRecently)}
          title={"Đặt gần đây"}
          isLoading={isLoadingRecently}
        />
        <CardList
          cardData={listTop}
          onPressDetail={() => onPressDetail(listTop)}
          title={"Đặt nhiều nhất"}
          isLoading={isLoadingTop}
        />
        <CardList
          cardData={listLau}
          onPressDetail={() => onPressDetail(listLau)}
          title={"Lẩu - Buffet"}
          isLoading={isLoadingLau}
        />
        <CardList
          cardData={listHaisan}
          onPressDetail={() => onPressDetail(listHaisan)}
          title={"Hải sản"}
          isLoading={isLoadingHaisan}
        />
        <CardList
          cardData={listRaucu}
          onPressDetail={() => onPressDetail(listRaucu)}
          title={"Rau củ"}
          isLoading={isLoadingRaucu}
        />
        <CardList
          cardData={listThit}
          onPressDetail={() => onPressDetail(listThit)}
          title={"Thịt"}
          isLoading={isLoadingThit}
        />
        <CardList
          cardData={listDouong}
          onPressDetail={() => onPressDetail(listDouong)}
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
