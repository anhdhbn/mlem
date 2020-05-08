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
export default class order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      listDish: [
        {
          linkImageDish:
            "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
          nameDish: "Món 3",
          describeDish: "Món này không được giảm giá",
          price: 100000,
          promoPrice: null,
          isActive: false,
        },
        {
          linkImageDish:
            "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
          nameDish: "Món 1",
          describeDish: "Miêu tả món ăn",
          price: 100000,
          promoPrice: 50000,
          isActive: false,
        },
        {
          linkImageDish:
            "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
          nameDish: "Món 2",
          describeDish: "Miêu tả món ăn",
          price: 100000,
          promoPrice: 50000,
          isActive: false,
        },
        {
          linkImageDish:
            "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
          nameDish: "Món 3",
          describeDish: "Món này không được giảm giá",
          price: 100000,
          promoPrice: null,
          isActive: false,
        },
      ],
      totalPrice: 0,
      totalPromoPrice: 0,
      modal: {
        linkImageDish: null,
        nameDish: null,
        describeDish: null,
        price: 0,
        promoPrice: 0,
        isActive: false,

        quantity: 0,
        smallSize: false,
        normalSize: false,
        bigSize: false,
      },
    };
  }

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
      modal: dish,
    });
    // console.log("[INFO] Modal dish: ", this.state.modal);
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  subNumOfDish = (nameDish) => {
    console.log("[INFO] Press sub num of dish.", nameDish);
    this.setState({
      modal: {
        ...this.state.modal,
        quantity:
          this.state.modal.quantity === 0
            ? this.state.modal.quantity
            : this.state.modal.quantity - 1,
      },
    });
  };

  addNumOfDish = (nameDish) => {
    console.log("[INFO] Press add num of dish.", nameDish);
    this.setState({
      modal: {
        ...this.state.modal,
        quantity: this.state.modal.quantity + 1,
      },
    });
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
            {this.state.listDish.map((dish) => (
              <SmartDishCard
                linkImageDish={dish.linkImageDish}
                nameDish={dish.nameDish}
                describeDish={dish.describeDish}
                price={dish.price}
                promoPrice={dish.promoPrice}
                // For icon
                linkIconActive={require("../assets/icon/+.png")}
                linkIconInactive={require("../assets/icon/+.png")}
                handClickIcon={this.handClickIcon}
                isActive={true}
              />
            ))}
          </View>

          <View>
            <ModalSelectDish
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
        <View
          style={{
            bottom: 0,
            backgroundColor: "#fff",
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              position: "relative",
              height: 40,
              padding: 10,
              marginBottom: 30,
              marginTop: 10,
            }}
          >
            <View style={{ paddingLeft: 10 }}>
              <Text style={{ fontSize: 19, fontWeight: "bold" }}>
                {" "}
                {this.state.totalPromoPrice}đ
              </Text>
              <Text
                style={{ textDecorationLine: "line-through", color: "grey" }}
              >
                {this.state.totalPrice}đ
              </Text>
            </View>
            <View style={{ position: "absolute", right: 20 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#DC0000",
                  borderRadius: 8,
                  width: 90,
                  height: 40,
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    padding: 8,
                    paddingLeft: 10,
                    color: "#fff",
                  }}
                >
                  Thêm vào
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

console.disableYellowBox = true;
