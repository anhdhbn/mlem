import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

import Header from "../components/header/header";
import DatePicker from "../components/dateTimePicker/datePicker";
export default class order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availeble: 2,
      listDish: [
        {
          nameDish: "Món 1",
          price: "100000",
          promoPrice: "50000",
          quantity: 24,
        },
        {
          nameDish: "Món 2",
          price: "100000",
          promoPrice: "50000",
          quantity: 25,
        },
        {
          nameDish: "Món 3",
          price: "100000",
          promoPrice: "50000",
          quantity: 24,
        },
        {
          nameDish: "Món 4",
          price: "100000",
          promoPrice: "50000",
          quantity: 25,
        },
        {
          nameDish: "Món 5",
          price: "100000",
          promoPrice: "50000",
          quantity: 24,
        },
        {
          nameDish: "Món 6",
          price: "100000",
          promoPrice: "50000",
          quantity: 26,
        },
      ],
      numOfTable: 0,
      numOfPeople: 0,
      totalPrice: 0,
      totalPromoPrice: 0,
    };
  }
  UNSAFE_componentWillMount = () => {
    var tp = 0;
    var tpp = 0;
    this.state.listDish.map((dish) => {
      tp += dish.quantity * dish.price;
      tpp += dish.quantity * dish.promoPrice;
    });
    this.setState({
      totalPrice: tp,
      totalPromoPrice: tpp,
    });
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
    let newListDish = this.state.listDish.map((dish) =>
      dish.nameDish === nameDish
        ? { ...dish, quantity: dish.quantity + 1 }
        : dish
    );
    var tp = 0;
    var tpp = 0;
    newListDish.map((dish) => {
      tp += dish.quantity * dish.price;
      tpp += dish.quantity * dish.promoPrice;
    });
    console.log(tp, tpp);
    this.setState({
      listDish: newListDish,
      totalPrice: tp,
      totalPromoPrice: tpp,
    });
  };
  subNumOfDish = (nameDish) => {
    let newListDish = this.state.listDish.map((dish) =>
      dish.nameDish === nameDish
        ? { ...dish, quantity: dish.quantity - 1 }
        : dish
    );
    var tp = 0;
    var tpp = 0;
    newListDish.map((dish) => {
      tp += dish.quantity * dish.price;
      tpp += dish.quantity * dish.promoPrice;
    });
    console.log(tp, tpp);
    this.setState({
      listDish: newListDish,
      totalPrice: tp,
      totalPromoPrice: tpp,
    });
  };
  render() {
    if (this.state.availeble > 0) {
      return (
        <ScrollView style={{ backgroundColor: "#F5F6F7" }}>
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
                Số bàn còn trống: {this.state.availeble}
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
              Số bàn và số lượng người đặt
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#fff",
              height: 40,
              flexDirection: "row",
              position: "relative",
              paddingLeft: 8,
            }}
          >
            <View style={{ flexDirection: "row", paddingTop: 8 }}>
              <TouchableOpacity onPress={() => this.subTable()}>
                <Image
                  source={require("../assets/icon/-.png")}
                  style={{ width: 25, height: 25 }}
                />
              </TouchableOpacity>
              <Text style={{ marginLeft: 8, marginRight: 8, fontSize: 16 }}>
                {this.state.numOfTable}
              </Text>
              <TouchableOpacity onPress={() => this.addTable()}>
                <Image
                  source={require("../assets/icon/+.png")}
                  style={{ width: 25, height: 25 }}
                />
              </TouchableOpacity>
              <Text style={{ marginLeft: 8, marginRight: 8, fontSize: 16 }}>
                Bàn
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                right: 10,
                position: "absolute",
                paddingTop: 8,
              }}
            >
              <TouchableOpacity onPress={() => this.subPeople()}>
                <Image
                  source={require("../assets/icon/-.png")}
                  style={{ width: 25, height: 25 }}
                />
              </TouchableOpacity>
              <Text style={{ marginLeft: 8, marginRight: 8, fontSize: 16 }}>
                {" "}
                {this.state.numOfPeople}{" "}
              </Text>
              <TouchableOpacity onPress={() => this.addPeople()}>
                <Image
                  source={require("../assets/icon/+.png")}
                  style={{ width: 25, height: 25 }}
                />
              </TouchableOpacity>
              <Text style={{ marginLeft: 8, marginRight: 8, fontSize: 16 }}>
                Người{" "}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold", padding: 8 }}>
              Thời gian
            </Text>
          </View>

          <DatePicker />

          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold", padding: 8 }}>
              Chọn món
            </Text>
          </View>

          {/* list of dish */}
          {this.state.listDish.map((dish) => (
            <View
              style={{
                // Card
                height: 70,
                borderRadius: 6,
                elevation: 3,
                backgroundColor: "#fff",
                shadowOffset: { width: 1, height: 1 },
                shadowColor: "#333",
                shadowOpacity: 0.3,
                shadowRadius: 2,
                marginVertical: 6,
                // Another
                flexDirection: "row",
              }}
            >
              <View
                style={{ flex: 5, flexDirection: "column", marginLeft: 10 }}
              >
                <Text style={{ fontSize: 20 }}>{dish.nameDish}</Text>
                <View>
                  <Text
                    style={{
                      textDecorationLine: "line-through",
                      color: "grey",
                    }}
                  >
                    {dish.price} đ
                  </Text>
                  <Text>{dish.promoPrice} đ</Text>
                </View>
              </View>
              <View style={{ right: 20, marginTop: 20 }}>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => this.subNumOfDish(dish.nameDish)}
                  >
                    <Image
                      source={require("../assets/icon/-.png")}
                      style={{ width: 25, height: 25 }}
                    />
                  </TouchableOpacity>
                  <Text style={{ marginLeft: 8, marginRight: 8, fontSize: 16 }}>
                    {dish.quantity}
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.addNumOfDish(dish.nameDish)}
                  >
                    <Image
                      source={require("../assets/icon/+.png")}
                      style={{ width: 25, height: 25 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          <View
            style={{
              backgroundColor: "#e67777",
              height: 45,
              padding: 12,
              borderRadius: 10,
            }}
          >
            <TouchableOpacity>
              <Text style={{ fontSize: 17, color: "#fff", fontWeight: "bold" }}>
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
                  width: 70,
                  height: 40,
                  marginTop: 20,
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
      );
    } else {
      return (
        <ScrollView style={{ backgroundColor: "#F5F6F7" }}>
          <Header title="Đặt Bàn" hideButtonBack={true}></Header>
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
                  color: "red",
                }}
              >
                Số bàn còn trống: 0
              </Text>
            </View>
            <View style={{ right: 20, position: "absolute", marginTop: 12 }}>
              <Image
                source={require("../assets/icon/offline.png")}
                style={{ width: 12, height: 12 }}
              />
            </View>
          </View>
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <Text
              style={{
                color: "red",
                fontSize: 23,
                fontWeight: "bold",
                marginTop: 6,
              }}
            >
              Nhà hàng tạm thời hết bàn!
            </Text>
            <Text
              style={{
                color: "red",
                fontSize: 23,
                fontWeight: "bold",
                marginTop: 6,
              }}
            >
              Mong quý khách quay lại sau!
            </Text>
            <Image
              source={require("../assets/icon/vector-cute-sorry-smiley-illustration.jpg")}
              style={{ width: 350, height: 250, marginTop: 20 }}
            />
          </View>
        </ScrollView>
      );
    }
  }
}
