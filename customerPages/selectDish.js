import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";

import { Button, Overlay } from "react-native-elements";

import NavBar from "../components/cardList/NavBar";
import Header from "../components/header/header";
import Icon from "react-native-vector-icons/FontAwesome";
import SmartDishCard from "../components/smartDishCard/smartDishCard";
import ModalSelectDish from "../components/order/modalSelectDish";
import CaculatePrice from "../components/order/calculatePrice";

import orderSevices from "../customerServices/orderServices";
import formatPrice from "../components/formatPrice";
import Spinner from "../components/Spinner/Spinner";
import Snackbar from "../components/common/snackbarUpdating";
import Order from "./order";

export default class order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,

      listDishRender: [],
      pathListDish: 1000,

      isLoadingSkip: false,

      listAllDish: [],
      listLau: [],
      listHaisan: [],
      listRaucu: [],
      listThit: [],
      listDouong: [],
      listDishTopOrder: [],
      listDishRecently: [],
      listDishSortL2H: [],

      isLoadingList: [
        { isLoading: false },
        { isLoading: false },
        { isLoading: false },
        { isLoading: false },
        { isLoading: false },
        { isLoading: false },
        { isLoading: false },
        { isLoading: false },
        { isLoading: false },
      ],

      totalPrice: 0,
      totalPromoPrice: 0,

      skipFoods: [
        // Tất cả
        { skip: 0, isOutOfFood: false },
        // Lẩu
        { skip: 0, isOutOfFood: false },
        //
        { skip: 0, isOutOfFood: false },
        { skip: 0, isOutOfFood: false },
        { skip: 0, isOutOfFood: false },
        { skip: 0, isOutOfFood: false },
        { skip: 0, isOutOfFood: false },
        { skip: 0, isOutOfFood: false },
        { skip: 0, isOutOfFood: false },
      ],
      codeRender: 0,

      modal: {
        id: null,
        linkImageDish: null,
        nameDish: null,
        describeDish: null,
        price: 0,
        promoPrice: 0,
        isActive: false,

        quantity: 0,
        smallSize: false,
        normalSize: true,
        bigSize: false,
      },

      isLoading: false,

      visibleAlert: false,
      textAlert: null,
    };
  }

  // Cập nhật giá trị loading của các mảng riêng biệt

  setIsLoadingList = (id, value) => {
    if (id >= 9) {
      //console.log("Out of range loading list");
    } else {
      let newIsLoadingList = [];
      for (let index = 0; index < 9; index++) {
        if (index == id) {
          newIsLoadingList.push({ isLoading: value });
        } else {
          newIsLoadingList.push(this.state.isLoadingList[index]);
        }
      }

      this.setState({ isLoadingList: newIsLoadingList });
      //console.log("INFO: newIsLoadingList: ", newIsLoadingList);
    }
  };

  setIsLoading = (value) => {
    this.setState({ isLoading: value });
  };

  // B52
  componentDidMount = async () => {
    this.setIsLoading(true);
    await this.getListFood().then((data) => {
      let listFood = data;
      this.setState({ listDishRender: listFood });
    });
    this.setIsLoading(false);
    this.getListLau();
    this.getListHaisan();
    this.getListRaucu();
    this.getListThit();
    this.getListDouong();
    this.getListTopOrder();
    this.getListRecently();
    this.getListL2H();
  };

  setIsLoadingSkip = (value) => {
    //console.log("IsLoading: ", value);
    this.setState({ isLoadingSkip: value });
  };

  createParams = (code = 0) => {
    if (code >= this.state.skipFoods.length) {
      //console.log("Không tìm thấy code của món để tăng skip. Code = ", code);
      return {};
    } else if (code === 0) {
      let params = {
        skip: this.state.skipFoods[code].skip,
        take: 10,
        orderBy: 1,
      };
      return params;
    } else if (code === 6) {
      let params = {
        skip: this.state.skipFoods[code].skip,
        take: 10,
      };
      return params;
    } else if (code === 7) {
      let params = {
        skip: this.state.skipFoods[code].skip,
        take: 10,
      };
      return params;
    } else if (code === 8) {
      let params = {
        skip: this.state.skipFoods[code].skip,
        take: 10,
        orderBy: 2,
      };
      return params;
    } else {
      // Neu code === 0 là get tất cả nên equal: null
      let params = {
        foodGroupingId: {
          equal: code === 0 ? null : code,
        },
        skip: this.state.skipFoods[code].skip,
        take: 10,
      };
      // //console.log(params);
      return params;
    }
  };

  countSkips = (code = 0) => {
    let length = this.state.skipFoods.length;
    let newSkipFoods = [];
    for (let index = 0; index < length; index++) {
      if (index === code) {
        newSkipFoods.push({
          skip: this.state.skipFoods[index].skip + 10,
          isOutOfFood: this.state.skipFoods[index].isOutOfFood,
        });
      } else {
        newSkipFoods.push(this.state.skipFoods[index]);
      }
    }
    // //console.log("[INFO] New skipFoods: ", newSkipFoods);
    this.setState({ skipFoods: newSkipFoods });
  };

  setOutOfDish = (code) => {
    let length = this.state.skipFoods.length;
    let newSkipFoods = [];
    for (let index = 0; index < length; index++) {
      if (index === code) {
        newSkipFoods.push({
          skip: this.state.skipFoods[index].skip,
          isOutOfFood: true,
        });
      } else {
        newSkipFoods.push(this.state.skipFoods[index]);
      }
    }
    // //console.log("[INFO] New skipFoods: ", newSkipFoods);
    this.setState({ skipFoods: newSkipFoods });
  };

  concatListFood = async (code, addList) => {
    if (code == 0) {
      let newList = this.state.listAllDish.concat(addList);
      await this.setState({ listAllDish: newList });
    } else if (code == 1) {
      // //console.log("Before concat: ", this.state.listLau.length);
      // //console.log("Add concat: ", addList.length);
      let newList = this.state.listLau.concat(addList);
      // //console.log("After concat: ", newList.length);
      await this.setState({ listLau: newList });
    } else if (code == 2) {
      let newList = this.state.listHaisan.concat(addList);
      await this.setState({ listHaisan: newList });
    } else if (code == 3) {
      let newList = this.state.listRaucu.concat(addList);
      await this.setState({ listRaucu: newList });
    } else if (code == 4) {
      let newList = this.state.listThit.concat(addList);
      await this.setState({ listThit: newList });
    } else if (code == 5) {
      let newList = this.state.listDouong.concat(addList);
      await this.setState({ listDouong: newList });
    } else if (code == 6) {
      let newList = this.state.listDishTopOrder.concat(addList);
      await this.setState({ listDishTopOrder: newList });
    } else if (code == 7) {
      let newList = this.state.listDishRecently.concat(addList);
      await this.setState({ listDishRecently: newList });
    } else if (code == 8) {
      let newList = this.state.listDishSortL2H.concat(addList);
      await this.setState({ listDishSortL2H: newList });
    }

    this.setListDishRender(this.state.codeRender);
  };

  getListLau = async () => {
    if (this.state.skipFoods[1].isOutOfFood) {
      this.createAlert("Đã tải xong danh sách");
    } else {
      let params = this.createParams(1);
      // //console.log("[INFO] Params to get list lau: ", params);
      this.setIsLoadingList(1, true);

      let response = await orderSevices
        .listFood(params)
        .then((res) => {
          this.countSkips(1);
          // //console.log("Respone in ", JSON.stringify(res));
          // //console.log("Length response: ", res.length);
          if (res.length < 10) {
            this.setOutOfDish(1);
          }

          return res;
        })
        .catch((err) => {
          //console.log("Error in get list lau", err.data);
          this.createAlert(err.data);
          return [];
        });

      await this.concatListFood(1, response);
      this.setIsLoadingList(1, false);
    }
  };

  getListHaisan = async () => {
    if (this.state.skipFoods[2].isOutOfFood) {
      this.createAlert("Đã tải xong danh sách");
    } else {
      let params = this.createParams(2);
      // //console.log("[INFO] Params to get list lau: ", params);
      this.setIsLoadingList(2, true);

      let response = await orderSevices
        .listFood(params)
        .then((res) => {
          this.countSkips(2);
          // //console.log("Respone in ", JSON.stringify(res));
          // //console.log("Length response: ", res.length);
          if (res.length < 10) {
            this.setOutOfDish(2);
          }

          return res;
        })
        .catch((err) => {
          //console.log("Error in get list lau", err.data);
          this.createAlert(err.data);
          return [];
        });

      await this.concatListFood(2, response);
      this.setIsLoadingList(2, false);
    }
  };

  getListRaucu = async () => {
    if (this.state.skipFoods[3].isOutOfFood) {
      this.createAlert("Đã tải xong danh sách");
    } else {
      let params = this.createParams(3);
      // //console.log("[INFO] Params to get list lau: ", params);
      this.setIsLoadingList(3, true);

      let response = await orderSevices
        .listFood(params)
        .then((res) => {
          this.countSkips(3);
          // //console.log("Respone in ", JSON.stringify(res));
          // //console.log("Length response: ", res.length);
          if (res.length < 10) {
            this.setOutOfDish(3);
          }

          return res;
        })
        .catch((err) => {
          //console.log("Error in get list lau", err.data);
          this.createAlert(err.data);
          return [];
        });

      await this.concatListFood(3, response);
      this.setIsLoadingList(3, false);
    }
  };

  getListThit = async () => {
    if (this.state.skipFoods[4].isOutOfFood) {
      this.createAlert("Đã tải xong danh sách");
    } else {
      let params = this.createParams(4);
      // //console.log("[INFO] Params to get list lau: ", params);
      this.setIsLoadingList(4, true);

      let response = await orderSevices
        .listFood(params)
        .then((res) => {
          this.countSkips(4);
          // //console.log("Respone in ", JSON.stringify(res));
          // //console.log("Length response: ", res.length);
          if (res.length < 10) {
            this.setOutOfDish(4);
          }

          return res;
        })
        .catch((err) => {
          //console.log("Error in get list lau", err.data);
          this.createAlert(err.data);
          return [];
        });

      await this.concatListFood(4, response);
      this.setIsLoadingList(4, false);
    }
  };

  getListDouong = async () => {
    if (this.state.skipFoods[5].isOutOfFood) {
      this.createAlert("Đã tải xong danh sách");
    } else {
      let params = this.createParams(5);
      // //console.log("[INFO] Params to get list lau: ", params);
      this.setIsLoadingList(5, true);

      let response = await orderSevices
        .listFood(params)
        .then((res) => {
          this.countSkips(5);
          // //console.log("Respone in ", JSON.stringify(res));
          // //console.log("Length response: ", res.length);
          if (res.length < 10) {
            this.setOutOfDish(5);
          }

          return res;
        })
        .catch((err) => {
          //console.log("Error in get list lau", err.data);
          this.createAlert(err.data);
          return [];
        });

      await this.concatListFood(5, response);
      this.setIsLoadingList(5, false);
    }
  };

  getListTopOrder = async () => {
    if (this.state.skipFoods[6].isOutOfFood) {
      this.createAlert("Đã tải xong danh sách");
    } else {
      let params = this.createParams(6);
      // //console.log("[INFO] Params to get list lau: ", params);
      this.setIsLoadingList(6, true);

      let response = await orderSevices
        .listFoodTopOrder(params)
        .then((res) => {
          this.countSkips(6);
          // //console.log("Respone in ", JSON.stringify(res));
          // //console.log("Length response: ", res.length);
          if (res.length < 10) {
            this.setOutOfDish(6);
          }

          return res;
        })
        .catch((err) => {
          //console.log("Error in get list lau", err.data);
          this.createAlert(err.data);
          return [];
        });

      await this.concatListFood(6, response);
      this.setIsLoadingList(6, false);
    }
  };

  getListRecently = async () => {
    if (this.state.skipFoods[7].isOutOfFood) {
      this.createAlert("Đã tải xong danh sách");
    } else {
      let params = this.createParams(7);
      // //console.log("[INFO] Params to get list lau: ", params);
      this.setIsLoadingList(7, true);

      let response = await orderSevices
        .listFoodRecently(params)
        .then((res) => {
          this.countSkips(7);
          // //console.log("Respone in ", JSON.stringify(res));
          // //console.log("Length response: ", res.length);
          if (res.length < 10) {
            this.setOutOfDish(7);
          }

          return res;
        })
        .catch((err) => {
          //console.log("Error in get list lau", err.data);
          this.createAlert(err.data);
          return [];
        });

      await this.concatListFood(7, response);
      this.setIsLoadingList(7, false);
    }
  };

  getListL2H = async () => {
    if (this.state.skipFoods[8].isOutOfFood) {
      this.createAlert("Đã tải xong danh sách");
    } else {
      let params = this.createParams(8);
      // //console.log("[INFO] Params to get list lau: ", params);
      this.setIsLoadingList(8, true);

      let response = await orderSevices
        .listFood(params)
        .then((res) => {
          this.countSkips(8);
          // //console.log("Respone in ", JSON.stringify(res));
          // //console.log("Length response: ", res.length);
          if (res.length < 10) {
            this.setOutOfDish(8);
          }

          return res;
        })
        .catch((err) => {
          //console.log("Error in get list lau", err.data);
          this.createAlert(err.data);
          return [];
        });

      await this.concatListFood(8, response);
      this.setIsLoadingList(8, false);
    }
  };

  getListFood = async () => {
    if (this.state.skipFoods[0].isOutOfFood) {
      this.createAlert("Đã tải xong danh sách");
    } else {
      let params = this.createParams(0);
      // //console.log("[INFO] Params to get list lau: ", params);
      this.setIsLoadingList(0, true);

      let response = await orderSevices
        .listFood(params)
        .then((res) => {
          this.countSkips(0);
          // //console.log("Respone in ", JSON.stringify(res));
          // //console.log("Length response: ", res.length);
          if (res.length < 10) {
            this.setOutOfDish(0);
          }

          return res;
        })
        .catch((err) => {
          //console.log("Error in get list lau", err.data);
          this.createAlert(err.data);
          return [];
        });

      await this.concatListFood(0, response);
      this.setIsLoadingList(0, false);
      return response;
    }
  };

  handClickIcon = (dish) => {
    //console.log("DISH click: ", dish);
    this.toggleModal(dish);
    // this.props.route.params.addOrderDish(nameDish);
  };

  toggleModal = (dish) => {
    // //console.log("[INFO] dish input: ", dish);
    this.setState({
      showModal: !this.state.showModal,
      modal: { ...dish, smallSize: false, normalSize: true, bigSize: false },
    });
    // //console.log("[INFO] Modal dish: ", this.state.modal);
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  subNumOfDish = () => {
    // //console.log("[INFO] Press sub num of dish.", nameDish);
    this.setState(
      {
        modal: {
          ...this.state.modal,
          quantity:
            this.state.modal.quantity === 0
              ? this.state.modal.quantity
              : this.state.modal.quantity - 1,
        },
      },
      async () => {
        await this.addDish2Order();
        let totalPrice = this.props.route.params.getTotalPrice();
        let totalPromoPrice = this.props.route.params.getTotalPromoPrice();
        this.setPrice(totalPrice, totalPromoPrice);
      }
    );
    // this.addDish2Order();
  };

  addNumOfDish = () => {
    // //console.log("[INFO] Press add num of dish.", nameDish);
    this.setState(
      {
        modal: {
          ...this.state.modal,
          quantity: this.state.modal.quantity + 1,
        },
      },
      async () => {
        await this.addDish2Order();
        let totalPrice = this.props.route.params.getTotalPrice();
        let totalPromoPrice = this.props.route.params.getTotalPromoPrice();
        this.setPrice(totalPrice, totalPromoPrice);
      }
    );
    // this.addDish2Order();
  };

  setPrice = (totalPrice, totalPromoPrice) => {
    this.setState({ totalPrice: totalPrice, totalPromoPrice: totalPromoPrice });
  };

  selectOrderSize = (selectSize) => {
    // //console.log("[INFO] Select size: ", selectSize);
    this.removeDish2Order();
    this.setState(
      {
        modal: {
          ...this.state.modal,
          smallSize: selectSize.smallSize,
          normalSize: selectSize.normalSize,
          bigSize: selectSize.bigSize,
        },
      },
      async () => {
        await this.addDish2Order();
        let totalPrice = this.props.route.params.getTotalPrice();
        let totalPromoPrice = this.props.route.params.getTotalPromoPrice();
        this.setPrice(totalPrice, totalPromoPrice);
      }
    );
    // this.addDish2Order();
  };

  addDish2Order = () => {
    // B52
    // //console.log("Add dish to order: ", this.state.modal);
    this.props.route.params.addDish2Order(this.state.modal);
  };

  removeDish2Order = async () => {
    await this.props.route.params.removeDish2Order(this.state.modal);
    let totalPrice = this.props.route.params.getTotalPrice();
    let totalPromoPrice = this.props.route.params.getTotalPromoPrice();
    this.setPrice(totalPrice, totalPromoPrice);
  };

  onPressAll = () => {
    this.setListDishRender(0);
  };

  onPressLau = () => {
    this.setListDishRender(1);
  };

  onPressHaisan = () => {
    this.setListDishRender(2);
  };

  onPressRaucu = () => {
    this.setListDishRender(3);
  };

  onPressThit = () => {
    this.setListDishRender(4);
  };

  onPressDouong = () => {
    this.setListDishRender(5);
  };

  setCodeRender = (code) => {
    this.setState({ codeRender: code });
  };

  fetchListRender = async (code) => {
    if (code == 0) {
      await this.getListFood();
    } else if (code == 1) {
      await this.getListLau();
    } else if (code == 2) {
      await this.getListHaisan();
    } else if (code == 3) {
      await this.getListRaucu();
    } else if (code == 4) {
      await this.getListThit();
    } else if (code == 5) {
      await this.getListDouong();
    } else if (code == 6) {
      await this.getListTopOrder();
    } else if (code == 7) {
      await this.getListRecently();
    } else if (code == 8) {
      await this.getListL2H();
    }
  };

  setListDishRender = (code) => {
    this.setCodeRender(code);
    if (code == 0) {
      this.setState({ listDishRender: this.state.listAllDish });
    } else if (code == 1) {
      this.setState({ listDishRender: this.state.listLau });
    } else if (code == 2) {
      this.setState({ listDishRender: this.state.listHaisan });
    } else if (code == 3) {
      this.setState({ listDishRender: this.state.listRaucu });
    } else if (code == 4) {
      this.setState({ listDishRender: this.state.listThit });
    } else if (code == 5) {
      this.setState({ listDishRender: this.state.listDouong });
    } else if (code == 6) {
      this.setState({ listDishRender: this.state.listDishTopOrder });
    } else if (code == 7) {
      this.setState({ listDishRender: this.state.listDishRecently });
    } else if (code == 8) {
      this.setState({ listDishRender: this.state.listDishSortL2H });
    }
    // //console.log("[INFO] New List Dish: ", this.state.listDishRender);
  };

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    // const path =
    //   listDishRender.length == 0
    //     ? 200
    //     : contentSize.height / listDishRender.length;

    // const expectation = path * 7;

    const threshhold = 320;
    // //console.log(
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
    //console.log("Create alert");
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
      <Overlay isVisible={true} fullScreen={true} overlayStyle={{ padding: 0 }}>
        <SafeAreaView style={{ backgroundColor: "#F5F6F7", flex: 1 }}>
          <Header
            title="Chọn món"
            onPressBack={() => {
              this.props.navigation.navigate("Order");
            }}
          ></Header>
          <Snackbar
            visible={this.state.visibleAlert}
            _onDismissSnackBar={this._onDismissSnackBar}
            actionText="Hide"
            duration={3000}
            text={this.state.textAlert}
          />
          <ScrollView
            onScroll={async ({ nativeEvent }) => {
              const {
                layoutMeasurement,
                contentOffset,
                contentSize,
              } = nativeEvent;

              if (this.isCloseToBottom(nativeEvent)) {
                //do something
                //console.log("Close to bottom");
                if (!this.state.isLoadingSkip) {
                  if (
                    !this.state.skipFoods[this.state.codeRender].isOutOfFood
                  ) {
                    this.setIsLoadingSkip(true);
                    await this.fetchListRender(this.state.codeRender);
                    this.setIsLoadingSkip(false);
                  }
                }
              }
            }}
          >
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold", padding: 8 }}>
                Danh mục
              </Text>
            </View>

            <NavBar
              codeRender={this.state.codeRender}
              onPressAll={this.onPressAll}
              onPressLau={this.onPressLau}
              onPressHaisan={this.onPressHaisan}
              onPressRaucu={this.onPressRaucu}
              onPressThit={this.onPressThit}
              onPressDouong={this.onPressDouong}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                height: 45,
                padding: 10,
              }}
            >
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  this.setListDishRender(6);
                }}
              >
                <Text
                  style={
                    this.state.codeRender === 6
                      ? { fontSize: 14, color: "#DF0000" }
                      : { fontSize: 14, color: "#8A8F9C" }
                  }
                >
                  {" "}
                  Top bán chạy{" "}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  this.setListDishRender(7);
                }}
              >
                <Text
                  style={
                    this.state.codeRender === 7
                      ? { fontSize: 14, color: "#DF0000" }
                      : { fontSize: 14, color: "#8A8F9C" }
                  }
                >
                  {" "}
                  Đặt gần đây{" "}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  this.setListDishRender(8);
                }}
              >
                <Text
                  style={
                    this.state.codeRender === 8
                      ? { fontSize: 14, color: "#DF0000" }
                      : { fontSize: 14, color: "#8A8F9C" }
                  }
                >
                  {" "}
                  Giá thấp đến cao{" "}
                </Text>
              </TouchableOpacity>
            </View>

            {/* <SafeAreaView style={{ height: 350 }}> */}
            {/* {//console.log(
            "[LIST dish to render] ",
            JSON.stringify(this.state.listDishRender)
          )} */}
            {this.state.isLoading ? (
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
            ) : (
              <View>
                {this.state.listDishRender ? (
                  this.state.listDishRender.map((dish) => {
                    return (
                      <SmartDishCard
                        id={dish.id}
                        linkImageDish={dish.image}
                        nameDish={dish.name}
                        describeDish={dish.describe}
                        price={dish.priceEach}
                        promoPrice={
                          dish.discountRate
                            ? (dish.priceEach * (100 - dish.discountRate)) / 100
                            : null
                        }
                        // For icon
                        linkIconActive={require("../assets/icon/add.png")}
                        linkIconInactive={require("../assets/icon/add.png")}
                        handClickIcon={this.handClickIcon}
                        isActive={true}
                      />
                    );
                  })
                ) : (
                  <View>
                    <Spinner />
                  </View>
                )}
                {this.state.isLoadingList[this.state.codeRender].isLoading ? (
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
              </View>
            )}
            <View>
              <ModalSelectDish
                addDish2Order={this.addDish2Order}
                removeDish2Order={this.removeDish2Order}
                visible={this.state.showModal}
                hideModal={this.hideModal}
                modal={this.state.modal}
                subNumOfDish={this.subNumOfDish}
                addNumOfDish={this.addNumOfDish}
                selectOrderSize={this.selectOrderSize}
                totalPromoPrice={this.state.totalPromoPrice}
                totalPrice={this.state.totalPrice}
              />
            </View>
          </ScrollView>

          <CaculatePrice
            totalPromoPrice={this.state.totalPromoPrice}
            totalPrice={this.state.totalPrice}
            navigation={this.props.navigation}
            // addOrderDish={this.props.route.params.addOrderDish(this.state.modal)}
          />
        </SafeAreaView>
      </Overlay>
    );
  }
}

console.disableYellowBox = true;
