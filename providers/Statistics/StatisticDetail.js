import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";

import moment from "moment";
import { FlatList } from "react-native-gesture-handler";

import PhoneIcon from "../../assets/icon/provider/phone.png";
import Spinner from "../../components/Spinner/Spinner";

import OrderServices from "../../providerServices/orderServices";
import Modal from "../Components/Modal";
import formatPrice from "../../components/formatPrice";
import Call from "react-native-phone-call";
export default function DetailOrder(props) {
  const [data, setData] = useState(null);
  useEffect(() => {
    // //console.log(props.route.params.data);
    setData(props.route.params.data);
    props.route.params.data.orderContents.map((item) => {
      return item.quantity;
    });
  }, []);
  const handleCall = () => {
    const args = {
      number: "111", // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
    };

    Call(args).catch(console.error);
  };
  /*  */

  return data ? (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.customerInfoView}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {data.account.displayName}
            </Text>
            <Text style={{ fontSize: 14, color: "#8A8F9C" }}>
              +{data.account.phone}
            </Text>
            <Text style={{ fontSize: 14, color: "#8A8F9C" }}>
              {data?.status?.name}{" "}
              {moment(data.updatedAt).format("HH:mm") + " - "}
              {moment(data.updatedAt).format("DD/MM/YYYY")}
            </Text>
          </View>
          <TouchableOpacity onPress={handleCall}>
            <Image
              source={PhoneIcon}
              style={{ width: 34, height: 34, top: 10, right: 5 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.orderInfoView}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 5,
            }}
          >
            <Text>
              Thời gian: {moment(data.orderDate).format("HH:mm") + " - "}
              {moment(data.orderDate).format("DD/MM/YYYY")}
            </Text>
            <Text>
              Số Lượng {data.numOfTable} bàn - {data.numOfPerson} người
            </Text>
          </View>
          <View
            style={{
              marginLeft: 5,
              flexDirection: "row",
              paddingBottom: 7,
            }}
          >
            <Text>Bàn:</Text>
            <View style={{ maxWidth: 150, overflow: "hidden" }}>
              {data.reservations.length <= 3 ? (
                <View style={{ flexDirection: "row" }}>
                  {data.reservations.map((item, index) =>
                    index < data.reservations.length - 1 ? (
                      <Text>{item.table.code}, </Text>
                    ) : (
                      <Text>{item.table.code}</Text>
                    )
                  )}
                </View>
              ) : (
                <Text>
                  {data.reservations[0].table.code},{" "}
                  {data.reservations[1].table.code},{" "}
                  {data.reservations[2].table.code},...
                </Text>
              )}
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 10,
            marginTop: 5,
          }}
        >
          <View style={{ flex: 3, alignItems: "center" }}>
            <Text style={{ fontWeight: "bold" }}>Tên</Text>
          </View>
          <View style={{ flex: 2, alignItems: "center" }}>
            <Text style={{ fontWeight: "bold" }}>Size</Text>
          </View>
          <View style={{ flex: 2, alignItems: "center" }}>
            <Text style={{ fontWeight: "bold" }}>Số lượng</Text>
          </View>
          <View style={{ flex: 3, alignItems: "center" }}>
            <Text style={{ fontWeight: "bold" }}>Thành tiền</Text>
          </View>
        </View>

        <View style={{ height: "50%", flex: 10 }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data.orderContents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <View style={styles.cardView}>
                  <View style={{ flex: 3, alignItems: "center" }}>
                    <Text>{item.foodFoodTypeMapping.food.name}</Text>
                  </View>
                  <View style={{ flex: 2, alignItems: "center" }}>
                    <Text>{item.foodFoodTypeMapping.foodType.name}</Text>
                  </View>
                  <View style={{ flex: 2, alignItems: "center" }}>
                    <Text>{item.quantity}</Text>
                  </View>
                  <View style={{ flex: 3, alignItems: "center" }}>
                    <Text>
                      {item.foodFoodTypeMapping.foodType.id === 1
                        ? formatPrice(
                            (item.quantity *
                              item.foodFoodTypeMapping.food.priceEach *
                              (100 -
                                item.foodFoodTypeMapping.food.discountRate)) /
                              100
                          )
                        : item.foodFoodTypeMapping.foodType.id === 2
                        ? formatPrice(
                            (item.quantity *
                              1.2 *
                              item.foodFoodTypeMapping.food.priceEach *
                              (100 -
                                item.foodFoodTypeMapping.food.discountRate)) /
                              100
                          )
                        : formatPrice(
                            (item.quantity *
                              1.5 *
                              item.foodFoodTypeMapping.food.priceEach *
                              (100 -
                                item.foodFoodTypeMapping.food.discountRate)) /
                              100
                          )}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 10,
          height: 50,
          bottom: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.51,
          shadowRadius: 13.16,
          elevation: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 10,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Tổng cộng ({data?.orderContents?.length} món):
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {formatPrice(data.total)}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  ) : (
    <Spinner />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F7",
  },
  customerInfoView: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 0.5,
    shadowRadius: 10,
  },
  orderInfoView: {
    backgroundColor: "#FFFFFF",
    top: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardView: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    height: 40,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom: 5,
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 8,
  },
});
