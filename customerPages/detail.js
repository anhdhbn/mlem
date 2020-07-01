import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

import ScrollableTabView, {
  DefaultTabBar,
} from "react-native-scrollable-tab-view";
import { Avatar, Button, Overlay } from "react-native-elements";
import Header from "../components/header/header";
import TabBar from "../components/tabBar/tabBar";
import SmartDishCard from "../components/smartDishCard/smartDishCard";
import styles from "../styles/favouriteDishStyle";

import Snackbar from "../components/common/snackbarUpdating";

import homeServices from "../customerServices/homeServices";

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.handClickIcon = this.handClickIcon.bind(this);

    this.state = {
      listFavourite: this.props.route.params.listFavourite,
      listDishs: [],
      isUpdating: false,
      isLoadingSkip: false,
      isOutOfFood: false,
      skip: 10,
      codeRender: 0,

      visibleAlert: false,
      textAlert: null,
    };
  }

  setIsLoadingSkip = (value) => {
    console.log("IsLoading: ", value);
    this.setState({ isLoadingSkip: value });
  };

  setIsOutOfFood = (value) => {
    this.setState({ isOutOfFood: value });
  };

  setSkip = (value) => {
    this.setState({ skip: value });
  };

  setCodeRender = (newCode) => {
    this.setState({ codeRender: newCode });
  };

  componentDidMount = () => {
    // console.log("[INFO] List Favourite: ", this.props.route.params.listDishs);
    // console.log(
    //   "[INFO] length data in detail.js: ",
    //   this.props.route.params.listDishs.length
    // );
    // console.log("[INFO] Code render: ", this.props.route.params.id);
    this.setIsOutOfFood(false);
    this.setCodeRender(this.props.route.params.id);
    if (this.props.route.params.listDishs.length < 10) {
      this.setIsOutOfFood(true);
    }
    this.setSkip(10);
    this.concatListFood(this.props.route.params.listDishs);
  };

  concatListFood = async (addList) => {
    let newList = this.state.listDishs.concat(addList);
    await this.setState({ listDishs: newList });
  };

  handClickIcon = async (newDish) => {
    // console.log("[INFO] CLick icon in favouriteDish.js");
    // let newListFavouriteDishs = this.state.listFavouriteDishs.map((dish) =>
    //   dish.nameDish === newDish ? { ...dish, isLike: !dish.isLike } : dish
    // );
    // this.setState({ listFavouriteDishs: newListFavouriteDishs });
    console.log("[INFO] Clicked dish: ", newDish);
    let newListFavourite = [];
    let isAdded = false;
    if (this.state.listFavourite) {
      for (let index = 0; index < this.state.listFavourite.length; index++) {
        if (this.state.listFavourite[index].foodId === newDish.id) {
          isAdded = true;
          continue;
        } else {
          newListFavourite.push(this.state.listFavourite[index]);
        }
      }
    }
    if (isAdded === false) {
      newListFavourite.push({ foodId: newDish.id });
    }

    this.setState({ listFavourite: newListFavourite }, () => {
      // console.log("[INFO] list Favourite dish: ", this.state.listFavourite);
    });

    this.setIsUpdating(true);
    let params = { account_AccountFoodFavorites: newListFavourite };
    // console.log("Params to update new food: ", JSON.stringify(params));
    let response = await homeServices.updateLikedFood(params);
    this.setIsUpdating(false);
    this.props.route.params.setListLikedDish(
      response.account_AccountFoodFavorites
    );

    this.props.route.params.fetchFavourite();

    // console.log(
    //   "[INFO] Response in detail.js, called updateLikedFood. New list: ",
    //   response.account_AccountFoodFavorites
    // );
  };

  setIsUpdating = (value) => {
    this.setState({ isUpdating: value });
  };

  checkLikedFood = (id2Check) => {
    if (this.state.listFavourite) {
      for (let index = 0; index < this.state.listFavourite.length; index++) {
        if (this.state.listFavourite[index].foodId === id2Check) {
          return true;
        }
      }
    }
    return false;
  };

  fetchListRender = async () => {
    console.log("Fetch list render", this.state.codeRender);
    if (this.state.codeRender == 0) {
      await this.getListFavourite();
    } else if (this.state.codeRender == 6) {
      await this.getListTopOrder();
    } else if (this.state.codeRender == 7) {
      await this.getListRecently();
    } else {
      await this.getListFood(this.state.codeRender);
    }
  };

  createParams = (code = 0) => {
    if (code === 0) {
      let params = {
        skip: this.state.skip,
        take: 10,
      };
      return params;
    } else if (code === 6) {
      let params = {
        skip: this.state.skip,
        take: 10,
      };
      return params;
    } else if (code === 7) {
      let params = {
        skip: this.state.skip,
        take: 10,
      };
      return params;
    } else {
      // Neu code === 0 là get tất cả nên equal: null
      let params = {
        foodGroupingId: {
          equal: code,
        },
        skip: this.state.skip,
        take: 10,
      };
      // console.log(params);
      return params;
    }
  };

  countSkips = () => {
    this.setState({
      skip: this.state.skip + 10,
    });
  };

  getListFood = async (code) => {
    if (this.state.isOutOfFood) {
      this.createAlert("Đã tải xong danh sách");
      console.log("Đã tải hết danh sach");
    } else {
      let params = this.createParams(code);

      // console.log("[INFO] Params to get list: ", params);

      let response = await homeServices
        .list(params)
        .then((res) => {
          this.countSkips();
          // console.log("Respone in ", JSON.stringify(res));
          // console.log("Length response: ", res.length);
          if (res.length < 10) {
            this.setIsOutOfFood(true);
          }

          return res;
        })
        .catch((err) => {
          console.log("Error in get list lau", err.data);
          this.createAlert(err.data);
          return [];
        });

      await this.concatListFood(response);

      return response;
    }
  };

  getListFavourite = async () => {
    if (this.state.isOutOfFood) {
      this.createAlert("Đã tải xong danh sách");
      console.log("Đã tải hết danh sach");
    } else {
      let params = this.createParams(0);

      console.log("[INFO] Params to get list: ", params);

      let response = await homeServices
        .listFavorite(params)
        .then((res) => {
          this.countSkips();
          // console.log("Respone in ", JSON.stringify(res));
          console.log("Length response favourite: ", res.length);
          if (res.length < 10) {
            this.setIsOutOfFood(true);
          }

          return res;
        })
        .catch((err) => {
          console.log("Error in get list lau", err.data);
          this.createAlert(err.data);
          return [];
        });

      await this.concatListFood(response);

      return response;
    }
  };

  getListTopOrder = async () => {
    if (this.state.isOutOfFood) {
      this.createAlert("Đã tải xong danh sách");
      console.log("Đã tải hết danh sach");
    } else {
      let params = this.createParams(6);

      console.log("[INFO] Params to get list: ", params);

      let response = await homeServices
        .listTopOrder(params)
        .then((res) => {
          this.countSkips();
          // console.log("Respone in ", JSON.stringify(res));
          console.log("Length response top order: ", res.length);
          if (res.length < 10) {
            this.setIsOutOfFood(true);
          }

          return res;
        })
        .catch((err) => {
          console.log("Error in get list lau", err.data);
          this.createAlert(err.data);
          return [];
        });

      await this.concatListFood(response);

      return response;
    }
  };

  getListRecently = async () => {
    if (this.state.isOutOfFood) {
      this.createAlert("Đã tải xong danh sách");
      console.log("Đã tải hết danh sach");
    } else {
      let params = this.createParams(7);

      console.log("[INFO] Params to get list: ", params);

      let response = await homeServices
        .listRecently(params)
        .then((res) => {
          this.countSkips();
          // console.log("Respone in ", JSON.stringify(res));
          console.log("Length response recenlty: ", res.length);
          if (res.length < 10) {
            this.setIsOutOfFood(true);
          }

          return res;
        })
        .catch((err) => {
          console.log("Error in get list lau", err.data);
          this.createAlert(err.data);
          return [];
        });

      await this.concatListFood(response);

      return response;
    }
  };

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    // const path =
    //   listDishRender.length == 0
    //     ? 200
    //     : contentSize.height / listDishRender.length;

    // const expectation = path * 7;

    const threshhold = 320;
    // console.log(
    //   layoutMeasurement.height + contentOffset.y,
    //   contentSize.height - threshhold
    // );
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - threshhold
    );
  };

  // Cho modal thông báo
  createAlert = (textAlert) => {
    console.log("Create alert");
    this.setState({ textAlert: textAlert }, () => {
      this.setAlert(true);
    });
  };

  setAlert = (visible) => {
    this.setState({ visibleAlert: visible });
  };

  _onDismissSnackBar = () => {
    this.setAlert(false);
  };

  render() {
    return (
      <>
        {/* {console.log(this.props.route.params.listDishs)} */}
        <Overlay
          isVisible={true}
          fullScreen={true}
          overlayStyle={{ padding: 0 }}
        >
          <Snackbar
            visible={this.state.visibleAlert}
            _onDismissSnackBar={this._onDismissSnackBar}
            actionText="Hide"
            duration={3000}
            text={this.state.textAlert}
          />
          <View tabLabel="Trang chủ" style={styles.tabView}>
            <Header
              // onPressBack={navigation.navigate("MainBody")}
              title={this.props.route.params.titleHeader}
            ></Header>
            <ScrollView
              showsVerticalScrollIndicator={false}
              onScroll={async ({ nativeEvent }) => {
                const {
                  layoutMeasurement,
                  contentOffset,
                  contentSize,
                } = nativeEvent;

                if (this.isCloseToBottom(nativeEvent)) {
                  //do something
                  console.log("Close to bottom");
                  console.log(
                    "IsLoadingSkip: ",
                    this.state.isLoadingSkip,
                    this.state.isOutOfFood
                  );
                  if (!this.state.isLoadingSkip) {
                    if (!this.state.isOutOfFood) {
                      this.setIsLoadingSkip(true);
                      await this.fetchListRender();
                      this.setIsLoadingSkip(false);
                    }
                  }
                }
              }}
            >
              {this.state.listDishs.map((dish) => (
                //   {
                //     "descreption": "Món này được giảm giá",
                //     "discountRate": 10,
                //     "errors": null,
                //     "foodFoodGroupingMappings": null,
                //     "foodFoodTypeMappings": null,
                //     "id": 11,
                //     "image": null,
                //     "imageId": null,
                //     "name": "Hải sản 3",
                //     "priceEach": 10000,
                //     "statusId": 0
                // }
                <TouchableOpacity
                  onPress={() => {
                    // console.log("[INFO] Click item in cardList.js: ", item);
                    this.props.navigation.navigate("Review", { data: dish });
                  }}
                >
                  <SmartDishCard
                    key={dish.id}
                    id={dish.id}
                    linkImageDish={dish.image}
                    nameDish={dish.name}
                    describeDish={dish.descreption}
                    price={dish.priceEach}
                    // promoPrice={dish.discountRate * dish.priceEach}
                    promoPrice={
                      dish.discountRate
                        ? (dish.priceEach * (100 - dish.discountRate)) / 100
                        : dish.discountRate
                    }
                    // For icon
                    linkIconActive={require("../assets/icon/heart.png")}
                    linkIconInactive={require("../assets/icon/heart-unlike.png")}
                    handClickIcon={this.handClickIcon}
                    isActive={this.checkLikedFood(dish.id)}
                  ></SmartDishCard>
                </TouchableOpacity>
              ))}
              {this.state.isLoadingSkip ? (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    type="clear"
                    loading={true}
                    loadingStyle={{ height: 50 }}
                  />
                </View>
              ) : null}
            </ScrollView>
          </View>
        </Overlay>
      </>
    );
  }
}
