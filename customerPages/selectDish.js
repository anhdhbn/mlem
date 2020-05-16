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

import NavBar from "../components/cardList/NavBar";
import Header from "../components/header/header";
import Icon from "react-native-vector-icons/FontAwesome";
import SmartDishCard from "../components/smartDishCard/smartDishCard";
import ModalSelectDish from "../components/order/modalSelectDish";
import CaculatePrice from "../components/order/calculatePrice";

import orderSevices from "../customerServices/orderServices";

import Order from "./order";

export default class order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,

      listDishRender: [],
      listAllDish: [],
      listLau: [],
      listHaisan: [],
      listRaucu: [],
      listThit: [],
      listDouong: [],
      listDishTopOrder: [],
      listDishRecently: [],
      listDishSortL2H: [],

      totalPrice: 0,
      totalPromoPrice: 0,

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
    };
  }

  // B52
  componentDidMount = () => {
    this.getListFood().then((data) => {
      let listFood = data;
      this.setState({ listDishRender: listFood });
      this.setState({ listAllDish: listFood });
    });
    this.getListLau();
    this.getListHaisan();
    this.getListRaucu();
    this.getListThit();
    this.getListDouong();
    this.getListTopOrder();
    this.getListRecently();
  };

  getListLau = async () => {
    let params = {
      foodGroupingId: {
        equal: 1,
      },
    };
    let response = await orderSevices.listFood(params);
    this.setState({ listLau: response });
    // console.log("[TEST] Get list food in selectDIsh: ", response);
  };

  getListHaisan = async () => {
    let params = {
      foodGroupingId: {
        equal: 2,
      },
    };
    let response = await orderSevices.listFood(params);
    this.setState({ listHaisan: response });
    // console.log("[TEST] Get list food in selectDIsh: ", response);
  };

  getListRaucu = async () => {
    let params = {
      foodGroupingId: {
        equal: 3,
      },
    };
    let response = await orderSevices.listFood(params);
    this.setState({ listRaucu: response });
    // console.log("[TEST] Get list food in selectDIsh: ", response);
  };

  getListThit = async () => {
    let params = {
      foodGroupingId: {
        equal: 4,
      },
    };
    let response = await orderSevices.listFood(params);
    this.setState({ listThit: response });
    // console.log("[TEST] Get list food in selectDIsh: ", response);
  };

  getListDouong = async () => {
    let params = {
      foodGroupingId: {
        equal: 5,
      },
    };
    let response = await orderSevices.listFood(params);
    this.setState({ listDouong: response });
    // console.log("[TEST] Get list food in selectDIsh: ", response);
  };

  getListTopOrder = async () => {
    let params = {};
    let response = await orderSevices.listFoodTopOrder(params);
    this.setState({ listDishTopOrder: response });
    // console.log("[TEST] Get list food in selectDIsh: ", response);
  };

  getListRecently = async () => {
    let params = {};
    let response = await orderSevices.listFoodRecently(params);
    this.setState({ listDishRecently: response });
    // console.log("[TEST] Get list food in selectDIsh: ", response);
  };

  getListL2H = async () => {
    let params = {};
    // let response = await orderSevices.TenAPI(params);
    // this.setState({ listDishRecently: response });
    console.log("Chưa có api in getListL2H in selectDish");
    // console.log("[TEST] Get list food in selectDIsh: ", response);
  };

  getListFood = async () => {
    let params = {};
    let response = await orderSevices.listFood(params);
    // console.log("[TEST] Get list food in selectDIsh: ", response);
    return response;
  };

  handClickIcon = (dish) => {
    this.toggleModal(dish);
    // this.props.route.params.addOrderDish(nameDish);
  };

  toggleModal = (dish) => {
    // console.log("[INFO] dish input: ", dish);
    this.setState({
      showModal: !this.state.showModal,
      modal: { ...dish, smallSize: false, normalSize: true, bigSize: false },
    });
    // console.log("[INFO] Modal dish: ", this.state.modal);
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  subNumOfDish = () => {
    // console.log("[INFO] Press sub num of dish.", nameDish);
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
    // console.log("[INFO] Press add num of dish.", nameDish);
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
    // console.log("[INFO] Select size: ", selectSize);
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
    // console.log("Add dish to order: ", this.state.modal);
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

  setListDishRender = (code) => {
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
    // console.log("[INFO] New List Dish: ", this.state.listDishRender);
  };

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: "#F5F6F7", flex: 1 }}>
        <Header title="Chọn món"></Header>
        <ScrollView>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold", padding: 8 }}>
              Danh mục
            </Text>
          </View>

          <NavBar
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
                this.setListDishRender(0);
              }}
            >
              <Text style={{ fontSize: 16 }}> Tất cả </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                this.setListDishRender(6);
              }}
            >
              <Text style={{ fontSize: 16 }}> Top bán chạy </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                this.setListDishRender(7);
              }}
            >
              <Text style={{ fontSize: 16 }}> Đặt gần đây </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                this.setListDishRender(8);
              }}
            >
              <Text style={{ fontSize: 16 }}> Giá thấp đến cao </Text>
            </TouchableOpacity>
          </View>

          {/* <SafeAreaView style={{ height: 350 }}> */}

          <View>
            {this.state.listDishRender ? (
              this.state.listDishRender.map((dish) => (
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
                  linkIconActive={require("../assets/icon/+.png")}
                  linkIconInactive={require("../assets/icon/+.png")}
                  handClickIcon={this.handClickIcon}
                  isActive={true}
                />
              ))
            ) : (
              <Text>Loading</Text>
            )}
          </View>

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
    );
  }
}

console.disableYellowBox = true;
