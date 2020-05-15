import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import orderServices from "../customerServices/orderServices";

import Header from "../components/header/header";
import DatePicker from "../components/dateTimePicker/datePicker";
import OrderItem from "../components/order/orderItem";
import SelectTable from "../components/order/selectTable";
import TableOff from "../components/order/tableOff";
export default class order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableAvailable: 2,
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
    };
  }
  UNSAFE_componentWillMount = () => {
    this.calculatePrice();
  };

  addTable = () => {
    var newData = this.state.numOfTable;
    newData++;
    this.setState({ numOfTable: newData });
  };
  subTable = () => {
    var newData = this.state.numOfTable;
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
    newData++;
    this.setState({ numOfPeople: newData });
  };

  addNumOfDish = (nameDish) => {
    // let newListDish = this.state.listDish.map((dish) =>
    //   dish.nameDish === nameDish
    //     ? { ...dish, quantity: dish.quantity + 1 }
    //     : dish
    // );
    // this.setState({
    //   listDish: newListDish,
    // });
    this.calculatePrice();
  };

  subNumOfDish = (nameDish) => {
    // let newListDish = this.state.listDish.map((dish) =>
    //   dish.nameDish === nameDish
    //     ? { ...dish, quantity: dish.quantity - 1 }
    //     : dish
    // );
    // this.setState({
    //   listDish: newListDish,
    // });
    this.calculatePrice();
  };

  calculatePrice = () => {
    var tp = 0;
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
      console.log(tp, tpp);
      this.setState({
        totalPrice: tp,
        totalPromoPrice: tpp,
      });
    }
  };

  removeDish2Order = (dish) => {
    console.log("Called remove dish");
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
        continue;
      } else {
        newListDish.push(dishOrdered);
      }
    }

    this.setState({ listDish: newListDish });
    this.calculatePrice();
  };

  addDish2Order = (dish) => {
    // console.log("-----------------------------------------------------");
    // console.log("=====");
    let newListDish = [];
    // console.log(
    //   "[INFO] Add Order Dish is called. lishDish before added",
    //   this.state.listDish
    // );
    // console.log("[INFO] Add Order Dish is called. Add dish: ", dish);

    // console.log("[TEST] Finding dish in lishDish");

    //so sanh bang key, size
    // let newListDish = this.state.listDish.map((dishOrdered) => {
    //   dish.id === dishOrdered.id &&
    //   dish.bigSize === dishOrdered.bigSize &&
    //   dish.normalSize === dishOrdered.normalSize &&
    //   dish.smallSize === dishOrdered.smallSize
    //     ? dish
    //     : dishOrdered;
    // });

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

    this.setState({ listDish: newListDish });

    this.calculatePrice();
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
    console.log("[INFO] Reponse in getNumTableAvailble: ", response);
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

    let params = {
      orderDate: this.state.date,
      numOfTable: this.state.numOfTable,
      numOfPerson: this.state.numOfPeople,
      descreption: this.state.descreption,
      orderContents: orderContents,
      total: this.state.totalPrice,
      subTotal: this.state.totalPromoPrice,
    };

    console.log("[INFO] Params: ", params);

    let response = await orderServices.createOrder(params);
    console.log("[INFO] Reponse in createOrder: ", response);
  };

  setDate = (date) => {
    console.log("[INFO] Date: ", date);
    this.getNumTableAvailable(date, this.state.time);
    this.setState({ date: date });
  };

  setTime = (time) => {
    this.setState({ time: time });
    this.getNumTableAvailable(this.state.date, time);
    console.log("[INFO] Time: ", time);
  };

  render() {
    return (
      <>
        <Header title="Đặt Bàn" hideButtonBack={true} />
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
                padding: 8,
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
          <Text style={{ fontSize: 18, fontWeight: "bold", padding: 8 }}>
            Thời gian
          </Text>
        </View>

        <DatePicker setDate={this.setDate} setTime={this.setTime} />

        {this.state.tableAvailable > 0 ? (
          <ScrollView style={{ backgroundColor: "#F5F6F7" }}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold", padding: 8 }}>
                Số bàn và số lượng người đặt
              </Text>
            </View>
            <SelectTable
              subTable={this.subTable}
              addTable={this.addTable}
              subPeople={this.subPeople}
              addPeople={this.addPeople}
              numOfTable={this.state.numOfTable}
              numOfPeople={this.state.numOfPeople}
            />
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold", padding: 8 }}>
                Chọn món
              </Text>
            </View>

            {/* list of dish */}
            {console.log(
              "[INFO] list dish before render OderItem",
              this.state.listDish
            )}
            {this.state.listDish.length > 0 ? (
              this.state.listDish.map((dish) => (
                <OrderItem
                  dish={dish}
                  addNumOfDish={this.addNumOfDish}
                  subNumOfDish={this.subNumOfDish}
                />
              ))
            ) : (
              <Text>Đã đặt gì đâu mà có để hiển thị -.-</Text>
            )}

            <View
              style={{
                backgroundColor: "#e67777",
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
                    totalPrice: this.state.totalPrice,
                    totalPromoPrice: this.state.totalPromoPrice,
                  });
                }}
              >
                <Text
                  style={{ fontSize: 17, color: "#fff", fontWeight: "bold" }}
                >
                  + Thêm món
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 40,
                flexDirection: "row",
                backgroundColor: "#fff",
                marginTop: 8,
              }}
            >
              <Image
                source={require("../assets/icon/note.png")}
                style={{ width: 30, height: 30, marginTop: 6, marginLeft: 8 }}
              />
              <TextInput
                style={{ width: 400, fontSize: 16 }}
                placeholder="ghi chú ..."
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                position: "relative",
                backgroundColor: "#fff",
                height: 80,
                padding: 10,
                marginBottom: 30,
                marginTop: 10,
              }}
            >
              <View style={{ marginTop: 8, paddingLeft: 10 }}>
                {this.state.totalPromoPrice !== this.state.totalPrice ? (
                  <>
                    <Text style={{ fontSize: 19, fontWeight: "bold" }}>
                      {this.state.totalPromoPrice}đ
                    </Text>
                    <Text
                      style={{
                        textDecorationLine: "line-through",
                        color: "grey",
                      }}
                    >
                      {this.state.totalPrice}đ
                    </Text>
                  </>
                ) : (
                  <Text style={{}}>{this.state.totalPrice}đ</Text>
                )}
              </View>
              <View style={{ position: "absolute", right: 20 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#DC0000",
                    borderRadius: 8,
                    width: 70,
                    height: 40,
                    marginTop: 20,
                  }}
                  onPress={() => {
                    this.createOrder();
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
          </ScrollView>
        ) : (
          <TableOff />
        )}
      </>
    );
  }
}
