import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import moment from "moment";

import { Button } from "react-native-elements";

import orderServices from "../customerServices/orderServices";

import Header from "../components/header/header";
import DatePicker from "../components/dateTimePicker/datePicker";
import OrderItem from "../components/order/orderItem";
import SelectTable from "../components/order/selectTable";
import TableOff from "../components/order/tableOff";

import Snackbar from "../components/common/snackbarUpdating";
import Spinner from "../components/Spinner/Spinner";
import Modal from "../components/Modal/Modal";

import formatPrice from "../components/formatPrice";
export default class order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleAlert: false,
      textAlert: null,

      tableAvailable: null,
      date: null,
      time: null,
      listDish: [],
      // listDish: [
      //   {
      //     id: 999,
      //     nameDish: "Món 1",
      //     price: "100000",
      //     promoPrice: "50000",
      //     quantity: 24,
      //   },
      //],
      numOfTable: 0,
      numOfPeople: 0,
      descreption: null,
      totalPrice: 0,
      totalPromoPrice: 0,

      modalConfirmVisible: false,
    };
  }

  resetOrder = () => {
    let date = moment();
    let time = moment().format("HH:mm");
    this.setDate(date);
    this.setTime(time);
    this.getNumTableAvailable(date);
    this.setState({
      numOfTable: 0,
      numOfPeople: 0,
      totalPrice: 0,
      totalPromoPrice: 0,
      descreption: null,
      listDish: [],
    });
  };

  componentDidMount = () => {
    let date = moment();
    let time = moment().format("HH:mm");
    this.setDate(date);
    this.setTime(time);
    this.getNumTableAvailable(date);
  };

  setTableAvailable = (value) => {
    this.setState({ tableAvailable: value });
  };

  getTotalPrice = () => {
    return this.state.totalPrice;
  };

  getTotalPromoPrice = () => {
    return this.state.totalPromoPrice;
  };

  UNSAFE_componentWillMount = () => {
    this.calculatePrice();
  };

  addTable = () => {
    var newData = this.state.numOfTable;
    if (newData === this.state.tableAvailable) {
      return;
    }
    newData++;
    this.setState({ numOfTable: newData });
  };
  subTable = () => {
    var newData = this.state.numOfTable;
    if (newData === 0) {
      return;
    }
    newData--;
    this.setState({ numOfTable: newData });
  };
  addPeople = () => {
    var newData = this.state.numOfPeople;
    newData++;
    this.setState({ numOfPeople: newData });
  };
  subPeople = () => {
    var newData = this.state.numOfPeople;
    if (newData === 0) {
      return;
    }
    newData++;
    this.setState({ numOfPeople: newData });
  };

  addNumOfDish = (dish) => {
    let newListDish = [];

    let lengthListDish = this.state.listDish.length;
    for (let index = 0; index < lengthListDish; index++) {
      let dishOrdered = this.state.listDish[index];
      if (
        dish.id === dishOrdered.id &&
        dish.bigSize === dishOrdered.bigSize &&
        dish.normalSize === dishOrdered.normalSize &&
        dish.smallSize === dishOrdered.smallSize
      ) {
        // console.log("Remove -----------------------------");
        dishOrdered.quantity = dishOrdered.quantity + 1;
        newListDish.push(dishOrdered);
      } else {
        newListDish.push(dishOrdered);
      }
    }

    this.setState({ listDish: newListDish }, () => {
      this.calculatePrice();
    });
    this.calculatePrice();
  };

  subNumOfDish = (dish) => {
    let newListDish = [];

    let lengthListDish = this.state.listDish.length;
    for (let index = 0; index < lengthListDish; index++) {
      let dishOrdered = this.state.listDish[index];
      if (
        dish.id === dishOrdered.id &&
        dish.bigSize === dishOrdered.bigSize &&
        dish.normalSize === dishOrdered.normalSize &&
        dish.smallSize === dishOrdered.smallSize
      ) {
        // console.log("Remove -----------------------------");
        if (dishOrdered.quantity === 1) {
          this.removeDish2Order(dish);
          return;
        }
        dishOrdered.quantity = dishOrdered.quantity - 1;
        newListDish.push(dishOrdered);
      } else {
        newListDish.push(dishOrdered);
      }
    }

    this.setState({ listDish: newListDish }, () => {
      this.calculatePrice();
    });
    this.calculatePrice();
    this.calculatePrice();
  };

  calculatePrice = () => {
    // Giá chưa sale
    var tp = 0;
    // Giá dẫ sale
    var tpp = 0;
    if (this.state.listDish) {
      this.state.listDish.map((dishOrdered) => {
        // console.log("[INFO] Dish price: ", dish.price);
        // console.log("[INFO] Dish quantity: ", dish.quantity);
        // console.log("[INFO] Dish promo price: ", dish.promoPrice);
        tp += dishOrdered.smallSize
          ? 1 * dishOrdered.quantity * dishOrdered.price
          : dishOrdered.normalSize
          ? 1.2 * dishOrdered.quantity * dishOrdered.price
          : 1.5 * dishOrdered.quantity * dishOrdered.price;
        tpp += dishOrdered.smallSize
          ? 1 * dishOrdered.quantity * dishOrdered.promoPrice
          : dishOrdered.normalSize
          ? 1.2 * dishOrdered.quantity * dishOrdered.promoPrice
          : 1.5 * dishOrdered.quantity * dishOrdered.promoPrice;
      });
      // console.log(tp, tpp);
      this.setState({
        totalPrice: tp,
        totalPromoPrice: tpp,
      });
    }
  };

  removeDish2Order = (dish) => {
    // console.log("Called remove dish: ", dish);
    let newListDish = [];

    let lengthListDish = this.state.listDish.length;
    for (let index = 0; index < lengthListDish; index++) {
      let dishOrdered = this.state.listDish[index];
      if (
        dish.id === dishOrdered.id &&
        dish.bigSize === dishOrdered.bigSize &&
        dish.normalSize === dishOrdered.normalSize &&
        dish.smallSize === dishOrdered.smallSize
      ) {
        // console.log("Remove -----------------------------");
        continue;
      } else {
        newListDish.push(dishOrdered);
      }
    }

    this.setState({ listDish: newListDish }, () => {
      this.calculatePrice();
    });
    // this.calculatePrice();
  };

  addDish2Order = (dish) => {
    // console.log("-----------------------------------------------------");
    // console.log("=====");
    let newListDish = [];
    // console.log(
    //   "[INFO] Add Order Dish is called. lishDish before added",
    let added = false;
    let lengthListDish = this.state.listDish.length;
    for (let index = 0; index < lengthListDish; index++) {
      let dishOrdered = this.state.listDish[index];
      if (
        dish.id === dishOrdered.id &&
        dish.bigSize === dishOrdered.bigSize &&
        dish.normalSize === dishOrdered.normalSize &&
        dish.smallSize === dishOrdered.smallSize
      ) {
        added = true;
        newListDish.push(dish);
      } else {
        newListDish.push(dishOrdered);
      }
    }
    // console.log("[INFO] newListDish: ", newListDish);
    // console.log("[TEST] Found dish in lishDish");
    // Check neu chuwa duocjw them

    if (!added) {
      newListDish.push(dish);
    }
    // console.log("[INFO] newListDish: ", newListDish);

    this.setState({ listDish: newListDish }, () => {
      this.calculatePrice();
    });

    // console.log("=====");
    // console.log("-----------------------------------------------------");
    // this.setState({
    //   listDish: { ...this.state.listDish, dish },
    // });
  };

  getNumTableAvailable = async (date, time) => {
    let params = {
      date: {
        equal: date,
      },
    };
    let response = await orderServices.getNumTableAvailable(params);
    // console.log("[INFO] Reponse in getNumTableAvailble: ", response);
    this.setTableAvailable(response);
  };

  createOrder = async () => {
    let orderContents = [];

    let lengthListDish = this.state.listDish.length;
    for (let index = 0; index < lengthListDish; index++) {
      let dishOrdered = this.state.listDish[index];
      orderContents.push({
        foodFoodTypeMapping: {
          foodId: dishOrdered.id,
          foodTypeId: dishOrdered.smallSize
            ? 1
            : dishOrdered.normalSize
            ? 2
            : 3,
        },
        quantity: dishOrdered.quantity,
        amount: dishOrdered.smallSize
          ? 1 * dishOrdered.quantity * dishOrdered.price
          : dishOrdered.normalSize
          ? 1.2 * dishOrdered.quantity * dishOrdered.price
          : 1.5 * dishOrdered.quantity * dishOrdered.price,
      });
    }

    // Check numOfTable
    if (this.state.numOfTable === 0) {
      this.createAlert("Vui lòng chọn số bàn cần đặt");
      return;
    }

    // Check numOfPerson
    if (this.state.numOfPeople === 0) {
      this.createAlert("Vui lòng chọn số người cần đặt");
      return;
    }

    // Check Ordered Dish
    lengthListDish = this.state.listDish.length;
    if (lengthListDish === 0) {
      this.createAlert("Vui lòng chọn món cần đặt");
      return;
    }

    let params = {
      orderDate: this.state.date,
      numOfTable: this.state.numOfTable,
      numOfPerson: this.state.numOfPeople,
      descreption: this.state.descreption,
      orderContents: orderContents,
      total: this.state.totalPrice,
      subTotal: this.state.totalPromoPrice,
    };
    console.log("[INFO] Params to create order: ", JSON.stringify(params));
    let response = await orderServices
      .createOrder(params)
      .then((res) => {
        console.log("Đặt bàn thành công");
        this.createAlert("Đặt bàn thành công");
        this.resetOrder();
        return res;
      })
      .catch((err) => {
        console.log("Đặt bàn thất bại", err);
        this.createAlert("Đặt bàn thất bại");
        return null;
      });
    console.log("[INFO] Reponse in createOrder: ", response);
  };

  setDate = (date) => {
    // console.log("[INFO] Date: ", date);
    this.getNumTableAvailable(this.state.date, this.state.time);
    this.setState({ date: date });
  };

  setTime = (time) => {
    this.setState({ time: time });
    this.getNumTableAvailable(this.state.date, time);
    // console.log("[INFO] Time: ", time);
  };

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

  handleCancel = () => {
    this.setState({ modalConfirmVisible: false });
  };
  submitOrder = () => {
    this.setState({ modalConfirmVisible: false });
    this.createOrder();
  };

  render() {
    return (
      <>
        {/* {console.log("[INFO] Visible Alert: ", this.state.visibleAlert)}
        {console.log("[INFO] Text Alert: ", this.state.textAlert)} */}
        <Snackbar
          visible={this.state.visibleAlert}
          _onDismissSnackBar={this._onDismissSnackBar}
          actionText="Hide"
          duration={5000}
          text={this.state.textAlert}
        />

        <Header title="Đặt Bàn" hideButtonBack={true} />
        {this.state.tableAvailable !== null ? (
          <>
            <View
              style={{
                backgroundColor: "#fff",
                height: 35,
                marginTop: 15,
                flexDirection: "row",
                position: "relative",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    padding: 5,
                    paddingLeft: 20,
                    color: "#76c963",
                  }}
                >
                  Số bàn còn trống: {this.state.tableAvailable}
                </Text>
              </View>
              <View style={{ right: 20, position: "absolute", marginTop: 12 }}>
                <Image
                  source={require("../assets/icon/online.png")}
                  style={{ width: 15, height: 15 }}
                />
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  padding: 4,
                  paddingLeft: 20,
                  color: "#8A8F9C",
                }}
              >
                Thời gian
              </Text>
            </View>

            <DatePicker
              setDate={this.setDate}
              setTime={this.setTime}
              date={this.state.date}
              time={this.state.time}
            />
          </>
        ) : (
          <View>
            <Spinner />
          </View>
        )}

        {this.state.tableAvailable != 0 ? (
          <>
            <ScrollView style={{ backgroundColor: "#F5F6F7" }}>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    padding: 8,
                    paddingLeft: 20,
                    color: "#8A8F9C",
                  }}
                >
                  Số bàn và số lượng người đặt
                </Text>
              </View>
              <SelectTable
                tableAvailable={this.state.tableAvailable}
                subTable={this.subTable}
                addTable={this.addTable}
                subPeople={this.subPeople}
                addPeople={this.addPeople}
                numOfTable={this.state.numOfTable}
                numOfPeople={this.state.numOfPeople}
              />
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    padding: 8,
                    paddingLeft: 20,
                    color: "#8A8F9C",
                  }}
                >
                  Chọn món
                </Text>
              </View>

              {this.state.listDish.length > 0
                ? this.state.listDish.map((dish) => (
                    <OrderItem
                      dish={dish}
                      addNumOfDish={this.addNumOfDish}
                      subNumOfDish={this.subNumOfDish}
                    />
                  ))
                : null}

              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  height: 45,
                  padding: 12,
                  borderRadius: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("SelectDish", {
                      addDish2Order: this.addDish2Order,
                      removeDish2Order: this.removeDish2Order,
                      getTotalPrice: this.getTotalPrice,
                      getTotalPromoPrice: this.getTotalPromoPrice,
                    });
                  }}
                >
                  <Text style={{ fontSize: 16, color: "#232A2F" }}>
                    + Thêm món
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 45,
                  flexDirection: "row",
                  backgroundColor: "#fff",
                  marginTop: 8,
                }}
              >
                <Image
                  source={require("../assets/icon/note.png")}
                  style={{
                    width: 15,
                    height: 15,
                    marginTop: 12,
                    marginLeft: 8,
                  }}
                />
                <TextInput
                  style={{ width: 400, fontSize: 16 }}
                  placeholder="Ghi chú"
                />
              </View>
            </ScrollView>
            {this.state.listDish.length != 0 ? (
              <View
                style={{
                  flexDirection: "row",
                  position: "relative",
                  backgroundColor: "#fff",
                  height: 60,
                  padding: 10,
                  marginBottom: 5,
                  marginTop: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.53,
                  shadowRadius: 13.97,

                  elevation: 21,
                }}
              >
                <Image
                  source={require("../assets/icon/mm.png")}
                  style={{ width: 42, height: 42, paddingLeft: 8 }}
                />
                <View style={{ paddingLeft: 10, justifyContent: "center" }}>
                  {this.state.totalPromoPrice !== this.state.totalPrice ? (
                    <>
                      <Text style={{ fontSize: 19, fontWeight: "bold" }}>
                        {formatPrice(this.state.totalPromoPrice)}
                      </Text>
                      <Text
                        style={{
                          textDecorationLine: "line-through",
                          color: "grey",
                        }}
                      >
                        {formatPrice(this.state.totalPrice)}
                      </Text>
                    </>
                  ) : (
                    <View>
                      <Text style={{}}>
                        {formatPrice(this.state.totalPrice)}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={{ position: "absolute", right: 20 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#DC0000",
                      borderRadius: 8,
                      width: 70,
                      height: 40,
                      marginTop: 9,
                    }}
                    onPress={() => {
                      this.setState({ modalConfirmVisible: true });
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        padding: 8,
                        paddingLeft: 20,
                        color: "#fff",
                      }}
                    >
                      Đặt
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </>
        ) : this.state.tableAvailable === 0 ? (
          <TableOff />
        ) : null}
        <Modal
          modalConfirmVisible={this.state.modalConfirmVisible}
          title="Bạn có muốn gửi đơn?"
          titleCancel="Huỷ"
          titleSubmit="Đặt"
          handleCancel={this.handleCancel}
          handleSubmit={this.submitOrder}
        />
      </>
    );
  }
}
