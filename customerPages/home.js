import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text,TouchableOpacity } from "react-native";
import { Button as ButtonE, Overlay } from "react-native-elements";
import { FAB } from "react-native-paper";
import * as signalR from "@aspnet/signalr";
const BASE_URL = "http://112.213.88.49:20000";

import homeServices from "../customerServices/homeServices";

import HeaderImage from "../components/cardList/headerCardList";
import CardList from "../components/cardList/cardList";
import NavBar from "../components/cardList/NavBar";
import { ScrollView,  } from "react-native-gesture-handler";
import Spinner from "../components/Spinner/Spinner";

import { Fab, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

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
  const [notification, setNotification] = useState('');
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
  const [visibleLoading, setVisibleLoading] = useState(true);
  const [checkProfile, setCheckProfile] = useState(false);

  const [activeFab, setActiveFab] = useState(true);

  const [listLikedDish, setListLikedDish] = useState(
    props.route.params.response.account_AccountFoodFavorites
  );

  const [visibleSignalContent, setVisibleSignalContent] = useState(false);
  const [delaySearch, setDelayDearch] = useState(0);

  useEffect(() => {
    if (!checkProfile) {
      setCheckProfile(true);
      if (props.route.params.response.dob === null) {
        _showModal();
      }
    }

    if (isLoadingFavourite === true) {
      fetchFavourite();
      // setIsLoadingFavourite(false);
    }
    if (isLoadingRecently === true) {
      fetchRecently();
      // setIsLoadingRecently(false);
    }
    if (isLoadingTop === true) {
      fetchTop();
      // setIsLoadingTop(false);
    }
    if (isLoadingLau === true) {
      fetchLau();
      //  setIsLoadingLau(false);
    }
    if (isLoadingHaisan === true) {
      fetchHaisan();
      // setIsLoadingHaisan(false);
    }
    if (isLoadingRaucu === true) {
      fetchRaucu();
      // setIsLoadingRaucu(false);
    }
    if (isLoadingThit === true) {
      fetchThit();
      // setIsLoadingThit(false);
    }
    if (isLoadingDouong === true) {
      fetchDouong();
      // setIsLoadingDouong(false);
    }
    if (isLoadingAllDish === true) {
      fetchAllDish();
    }
  }, []);

  const createLikedDish = (data) => {
    if (data) {
      let lengthData = data.length;
      let newLikedDish = [];
      for (let index = 0; index < lengthData; index++) {
        newLikedDish.push({ foodId: data[index].id });
      }
      setListLikedDish(newLikedDish);
    }
  };

  const fetchFavourite = () => {
    getListFoods(-3).then((data) => {
      setListFavourite(data);
      createLikedDish(data);
      setIsLoadingFavourite(false);
    });
  };

  const fetchRecently = () => {
    getListFoods(-2).then((data) => {
      setListRecently(data);
      setIsLoadingRecently(false);
    });
  };

  const fetchTop = () => {
    getListFoods(-1).then((data) => {
      setListTop(data);
      setIsLoadingTop(false);
    });
  };

  const fetchLau = () => {
    getListFoods(1).then((data) => {
      setListLau(data);
      setIsLoadingLau(false);
    });
  };

  const fetchHaisan = () => {
    getListFoods(2).then((data) => {
      setListHaisan(data);
      setIsLoadingHaisan(false);
    });
  };

  const fetchRaucu = () => {
    getListFoods(3).then((data) => {
      setListRaucu(data);
      setIsLoadingRaucu(false);
    });
  };

  const fetchThit = () => {
    getListFoods(4).then((data) => {
      setListThit(data);
      setIsLoadingThit(false);
    });
  };

  const fetchDouong = () => {
    getListFoods(5).then((data) => {
      setListDouong(data);
      setIsLoadingDouong(false);
    });
  };

  const fetchAllDish = () => {
    getAllFoods().then((data) => {
      setListAllDish(data);
      setIsLoadingAllDish(false);
    });
  };

  const getAllFoods = async () => {
    let params = {};
    let response = await homeServices.list(params);
    // //console.log("[INFO] Response in getAllFoods: ", response);
    return response;
  };

  const searchDish = async (name) => {
    let params = {
      name: {
        contain: name,
      },
    };

    var currentSec = new Date().getSeconds();
    if (currentSec != delaySearch) {
      // //console.log("[INFO] params to search dish: ", params);
      setDelayDearch(currentSec);
      let response = await homeServices.list(params);

      return response;
    }
    return null;
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
    // //console.log("[INFO] Response in home after getListFoods: ", response);
    return response;
  };

  const getListFavouriteFoods = async () => {
    let response = await homeServices.listFavorite({});
    /*console.log(
      "[INFO] Response in home after getListFavouriteFoods: ",
      response
    );*/
    return response;
  };

  const getListRecentlyFoods = async () => {
    let params = {
      // id: {
      //   equal: 2,
      // },
    };
    let response = await homeServices.listRecently(params);
    // //console.log(
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
    // //console.log("[INFO] Response in home after listTopOrder: ", response);
    return response;
  };

  const onPressDetail = (cardData, titleHeader, id) => {
    cardData
      ? props.navigation.navigate("Detail", {
          listDishs: cardData,
          listFavourite: listLikedDish,
          fetchFavourite: fetchFavourite,
          setListLikedDish: setListLikedDish,
          titleHeader: titleHeader,
          id: id,
        })
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

  const testSignalIR = () => {
     try {
       let connection = new signalR.HubConnectionBuilder()
         .withUrl(BASE_URL + "/signalr")
         .build();
 
       connection.on("sendToProvider", (user, data) => {
         //console.log("[INFO] call back data in sigaanalR: ", user, data);
       });
 
       connection
         .start()
         .catch((error) => {
           //console.log(error);
           return Promise.reject();
         })
         .then(() => homeServices.createNotification({ content: notification}));
     } catch (error) {
       //console.log("[INFO] Error in signalR: ", error);
     }
  };

  const navigateSearchPage = () => {
    props.navigation.navigate("Search", {
      setListLikedDish: setListLikedDish,
      fetchFavourite: fetchFavourite,
      navigateHomePage: navigateHomePage,
      searchDish: searchDish,
      listFavourite: listLikedDish,
    });
  };

  const navigateHomePage = () => {
    props.navigation.navigate("Home");
  };

  const showSignalContent = () => {
    setVisibleSignalContent(true);
  };

  const hiddenSignalContent = () => {
    setVisibleSignalContent(false);
  };

  return (
    <>
      {/* <FAB
        style={{
          position: "absolute",
          zIndex: 1,
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        big
        icon="bell-o"
        onPress={() => {
          //console.log("[INFO] Pressed button SIGNALR");
          testSignalIR();
        }}
      /> */}

      {/* Cái này sẽ là Fabs nhưng khi ấn vào hơi lag và sẽ bị bóng mờ ô vuông */}
      <Fab
        // active={activeFab}
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor: "#D20000", zIndex: 1 }}
        position="bottomRight"
        onPress={() => {
          showSignalContent();
        }}
      >
        <Icon name="bell-o" size={25} />
      </Fab>
      {/* Loading */}
      <Overlay
        fullScreen={true}
        visible={
          !listAllDish &&
          !listDouong &&
          !listFavorite &&
          !listHaisan &&
          !listLau &&
          !listRaucu &&
          !listRecently &&
          !listThit &&
          !listTop
        }
      >
        <Spinner />
      </Overlay>
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
        <ButtonE title="Cập nhật thông tin ngay" onPress={_onsubmitModal} />
      </Overlay>

      {/* {//console.log("Start Rendering")} */}
      <ScrollView style={styles.home}>
        <HeaderImage navigateSearchPage={navigateSearchPage} />
        <NavBar
          onPressAll={() => onPressDetail(listAllDish, "Tất cả")}
          onPressLau={() => onPressDetail(listLau, "Lẩu - Buffet")}
          onPressHaisan={() => onPressDetail(listHaisan, "Hải sản")}
          onPressRaucu={() => onPressDetail(listRaucu, "Rau củ")}
          onPressThit={() => onPressDetail(listThit, "Thịt")}
          onPressDouong={() => onPressDetail(listDouong, "Đồ uống")}
        />

        {listFavorite === null ? (
          <CardList
            cardData={listFavorite}
            onPressDetail={() =>
              onPressDetail(listFavorite, "Món yêu thích", 0)
            }
            title={"Yêu thích"}
            isLoading={!listFavorite}
          />
        ) : listFavorite.length != 0 ? (
          <CardList
            cardData={listFavorite}
            onPressDetail={() =>
              onPressDetail(listFavorite, "Món yêu thích", 0)
            }
            title={"Yêu thích"}
            isLoading={!listFavorite}
          />
        ) : null}

        {listRecently === null ? (
          <CardList
            cardData={listRecently}
            onPressDetail={() => onPressDetail(listRecently, "Đặt gần đây", 7)}
            title={"Đặt gần đây"}
            isLoading={isLoadingRecently}
          />
        ) : listRecently.length != 0 ? (
          <CardList
            cardData={listRecently}
            onPressDetail={() => onPressDetail(listRecently, "Đặt gần đây", 7)}
            title={"Đặt gần đây"}
            isLoading={isLoadingRecently}
          />
        ) : null}

        {listTop === null ? (
          <CardList
            cardData={listTop}
            onPressDetail={() => onPressDetail(listTop, "Đặt nhiều nhất", 6)}
            title={"Đặt nhiều nhất"}
            isLoading={isLoadingTop}
          />
        ) : listTop.length != 0 ? (
          <CardList
            cardData={listTop}
            onPressDetail={() => onPressDetail(listTop, "Đặt nhiều nhất", 6)}
            title={"Đặt nhiều nhất"}
            isLoading={isLoadingTop}
          />
        ) : null}

        {listLau === null ? (
          <CardList
            cardData={listLau}
            onPressDetail={() => onPressDetail(listLau, "Lẩu - Buffet", 1)}
            title={"Lẩu - Buffet"}
            isLoading={isLoadingLau}
          />
        ) : listLau.length != 0 ? (
          <CardList
            cardData={listLau}
            onPressDetail={() => onPressDetail(listLau, "Lẩu - Buffet", 1)}
            title={"Lẩu - Buffet"}
            isLoading={isLoadingLau}
          />
        ) : null}

        {listHaisan === null ? (
          <CardList
            cardData={listHaisan}
            onPressDetail={() => onPressDetail(listHaisan, "Hải sản", 2)}
            title={"Hải sản"}
            isLoading={isLoadingHaisan}
          />
        ) : listHaisan.length != 0 ? (
          <CardList
            cardData={listHaisan}
            onPressDetail={() => onPressDetail(listHaisan, "Hải sản", 2)}
            title={"Hải sản"}
            isLoading={isLoadingHaisan}
          />
        ) : null}

        {listRaucu === null ? (
          <CardList
            cardData={listRaucu}
            onPressDetail={() => onPressDetail(listRaucu, "Rau củ", 3)}
            title={"Rau củ"}
            isLoading={isLoadingRaucu}
          />
        ) : listRaucu.length != 0 ? (
          <CardList
            cardData={listRaucu}
            onPressDetail={() => onPressDetail(listRaucu, "Rau củ", 3)}
            title={"Rau củ"}
            isLoading={isLoadingRaucu}
          />
        ) : null}

        {listThit === null ? (
          <CardList
            cardData={listThit}
            onPressDetail={() => onPressDetail(listThit, "Thịt", 4)}
            title={"Thịt"}
            isLoading={isLoadingThit}
          />
        ) : listThit.length != 0 ? (
          <CardList
            cardData={listThit}
            onPressDetail={() => onPressDetail(listThit, "Thịt", 4)}
            title={"Thịt"}
            isLoading={isLoadingThit}
          />
        ) : null}

        {listDouong === null ? (
          <CardList
            cardData={listDouong}
            onPressDetail={() => onPressDetail(listDouong, "Đồ uống", 5)}
            title={"Đồ uống"}
            isLoading={isLoadingDouong}
          />
        ) : listDouong.length != 0 ? (
          <CardList
            cardData={listDouong}
            onPressDetail={() => onPressDetail(listDouong, "Đồ uống", 5)}
            title={"Đồ uống"}
            isLoading={isLoadingDouong}
          />
        ) : null}
      </ScrollView>
      <Overlay
        visible={visibleSignalContent}
        onBackdropPress={hiddenSignalContent}
      >
        <View
          style={{
            height: 150,
            width: "100%",
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{}}>Nội dung thông báo</Text>
          </View>
          <TextInput
            style={{
              marginTop: 20,
              width: 300,
              height: 50,
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 8,
              fontSize: 14,
              marginBottom: 20,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
            }}
            onChange={(e) => { setNotification(e.nativeEvent.text) }}
          />
        
          <TouchableOpacity
            style={{
              width: 80,
              height: 40,
              borderRadius: 8,
              backgroundColor: "#D20000",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={()=>{
              testSignalIR();
              hiddenSignalContent();
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700", color: "white" }}>
              Gửi
            </Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </>
  );
}
const styles = StyleSheet.create({
  home: {
    backgroundColor: "#dee1e3",
    flex: 1,
  },
});
