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

import Spinner from "../../components/Spinner/Spinner";

export default function (props) {
  const [data, setData] = useState({
    errors: null,
    id: 10068,
    code: "#24",
    orderDate: "2020-06-23T15:18:28.61",
    payDate: null,
    accountId: 11,
    numOfTable: 1,
    numOfPerson: 1,
    descreption: null,
    statusId: 5,
    createdAt: "2020-06-22T22:21:36.947",
    subTotal: 36000,
    total: 32400,
    account: {
      errors: null,
      id: 11,
      displayName: "Nguyen Viet Linh",
      email: "vietlinh15@coldmail.com",
      phone: "0123456716",
      password: null,
      salt: null,
      passwordRecoveryCode: null,
      expiredTimeCode: null,
      address: "Thanh Son",
      dob: "1999-02-18T00:00:00",
      imageId: null,
      sexId: null,
      statusId: 0,
      roleId: 0,
      image: null,
    },
    status: {
      errors: null,
      id: 5,
      code: "Done",
      name: "Đã thanh toán",
    },
    orderContents: [
      {
        errors: null,
        id: 10092,
        code: "#240",
        orderId: 10068,
        foodFoodTypeMappingId: 209,
        quantity: 3,
        statusId: 0,
        amount: 32400,
        foodFoodTypeMapping: {
          errors: null,
          id: 209,
          foodId: 4,
          foodTypeId: 2,
          food: {
            errors: null,
            id: 4,
            name: "Lẩu - Buffet 1",
            priceEach: 10000,
            discountRate: 10,
            imageId: 8,
            statusId: 1,
            descreption: null,
            image: null,
            status: {
              errors: null,
              id: 1,
              code: "Active",
              name: "Đang bán",
            },
          },
          foodType: {
            errors: null,
            id: 2,
            name: "Size vừa",
            statusId: 1,
          },
        },
        order: null,
      },
    ],
    reservations: [
      {
        errors: null,
        id: 164,
        tableId: 11,
        date: "2020-06-23T00:00:00",
        orderId: 10068,
        statusId: 2,
        table: {
          errors: null,
          id: 11,
          code: "0011",
          statusId: 1,
        },
        status: {
          errors: null,
          id: 2,
          code: "Empty",
          name: "Trống",
        },
      },
    ],
  });

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
              {moment(data.createdAt).format("HH:mm") + " - "}
              {moment(data.createdAt).format("DD/MM/YYYY")}
            </Text>
          </View>
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
                        ? (item.quantity *
                            item.foodFoodTypeMapping.food.priceEach *
                            (100 -
                              item.foodFoodTypeMapping.food.discountRate)) /
                          100
                        : item.foodFoodTypeMapping.foodType.id === 2
                        ? (item.quantity *
                            1.2 *
                            item.foodFoodTypeMapping.food.priceEach *
                            (100 -
                              item.foodFoodTypeMapping.food.discountRate)) /
                          100
                        : (item.quantity *
                            1.5 *
                            item.foodFoodTypeMapping.food.priceEach *
                            (100 -
                              item.foodFoodTypeMapping.food.discountRate)) /
                          100}
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
          height: 80,
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
          }}
        >
          <View style={{ flex: 5, alignItems: "center" }}>
            <Text style={{ fontSize: 16 }}>
              Tổng cộng ({data?.orderContents?.length} món):
            </Text>
          </View>
          <View style={{ flex: 5, alignItems: "center" }}>
            <Text style={{ fontSize: 16 }}>{data.total}</Text>
          </View>
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
