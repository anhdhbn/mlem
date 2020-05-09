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

import orderSevices from "../services/orderServices";

export default class order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      listDish: [
        {
          descreption: null,
          discountRate: null,
          errors: null,
          id: 1,
          image: null,
          imageId: null,
          name: "Ba chỉ rang cháy cạnh",
          priceEach: 50000,
          statusId: 1,
        },
        {
          descreption: null,
          discountRate: null,
          errors: null,
          id: 2,
          image: null,
          imageId: null,
          name: "Gimbap chiên",
          priceEach: 20000,
          statusId: 1,
        },
      ],

      totalPrice: 0,
      totalPromoPrice: 0,
      // B52
      totalPrice: this.props.route.params.totalPrice,
      totalPromoPrice: this.props.route.params.totalPromoPrice,

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
      this.setState({ listDish: listFood });
    });
  };

  getListFood = async () => {
    let params = {};
    let response = await orderSevices.listFood(params);
    console.log("[TEST] Get list food in selectDIsh: ", response);
    return response;
  };

  handClickIcon = (dish) => {
    // console.log("[INFO] CLick icon in favouriteDish.js");
    // let newListFavouriteDishs = this.state.listDish.map((dish) =>
    //   dish.nameDish === nameDish ? { ...dish, isLike: !dish.isLike } : dish
    // );
    // this.setState({ listDish: newListFavouriteDishs });
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

  subNumOfDish = (nameDish) => {
    // console.log("[INFO] Press sub num of dish.", nameDish);
    this.setState({
      modal: {
        ...this.state.modal,
        quantity:
          this.state.modal.quantity === 0
            ? this.state.modal.quantity
            : this.state.modal.quantity - 1,
      },
    });
    // this.addDish2Order();
  };

  addNumOfDish = (nameDish) => {
    // console.log("[INFO] Press add num of dish.", nameDish);
    this.setState({
      modal: {
        ...this.state.modal,
        quantity: this.state.modal.quantity + 1,
      },
    });
    // this.addDish2Order();
  };

  selectOrderSize = (selectSize) => {
    // console.log("[INFO] Select size: ", selectSize);
    this.setState({
      modal: {
        ...this.state.modal,
        smallSize: selectSize.smallSize,
        normalSize: selectSize.normalSize,
        bigSize: selectSize.bigSize,
      },
    });
    // this.addDish2Order();
  };

  addDish2Order = () => {
    // B52
    // console.log("Add dish to order: ", this.state.modal);
    this.props.route.params.addDish2Order(this.state.modal);
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

          <NavBar />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: 45,
              padding: 10,
            }}
          >
            <TouchableOpacity style={{}}>
              <Text style={{ fontSize: 16 }}> Tất cả </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{}}>
              <Text style={{ fontSize: 16 }}> Top bán chạy </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{}}>
              <Text style={{ fontSize: 16 }}> Đặt gần đây </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{}}>
              <Text style={{ fontSize: 16 }}> Giá thấp đến cao </Text>
            </TouchableOpacity>
          </View>

          {/* <SafeAreaView style={{ height: 350 }}> */}

          <View>
            {this.state.listDish ? (
              this.state.listDish.map((dish) => (
                <SmartDishCard
                  id={dish.id}
                  linkImageDish={dish.image}
                  nameDish={dish.name}
                  describeDish={dish.describe}
                  price={dish.priceEach}
                  promoPrice={
                    dish.discountRate
                      ? dish.priceEach * dish.discountRate
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
          // addOrderDish={this.props.route.params.addOrderDish(this.state.modal)}
        />
      </SafeAreaView>
    );
  }
}

console.disableYellowBox = true;
