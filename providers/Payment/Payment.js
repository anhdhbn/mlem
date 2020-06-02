import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";

import { createStackNavigator } from "@react-navigation/stack";

import viewMoreIcon from "../../assets/icon/view_more.png";
import dropDownIcon from "../../assets/icon/drop_down.png";
import orderServices from "../../providerServices/orderServices";
import PaymentDetail from "./PaymentDetail";
import Spinner from "../../components/Spinner/Spinner";

const PaymentStack = createStackNavigator();
/*PaymentStackScreen  */
export default ({ navigation }) => (
  <PaymentStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#D20000",
      },
      headerTitleAlign: "center",
      headerTintColor: "#fff",
    }}
  >
    <PaymentStack.Screen
      name="Payment"
      component={Payment}
      options={{
        title: "Đơn Đặt Hàng",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#D20000"
            onPress={() => {
              navigation.openDrawer();
            }}
          ></Icon.Button>
        ),
      }}
    />
    <PaymentStack.Screen
      name="PaymentDetail"
      component={PaymentDetail}
      options={{
        title: "Chi tiết đơn hàng",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#D20000"
            onPress={() => {
              navigation.openDrawer();
            }}
          ></Icon.Button>
        ),
      }}
    />
  </PaymentStack.Navigator>
);
const Payment = (props) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    let params = {};
    let response = await orderServices.listOrdered(params);
    setData(response);
    setIsLoading(false);

    // let lengthDishOrdered = response.length;
    // for (let index = 0; index < lengthDishOrdered; index++) {
    //   let dishOrdered = response[index];
    //   // "errors": null,
    //   //   "id": 8,
    //   //   "code": "#1",
    //   //   "orderDate": "2020-08-19T23:15:30",
    //   //   "payDate": null,
    //   //   "accountId": 11,
    //   //   "numOfTable": 1,
    //   //   "numOfPerson": 1,
    //   //   "descreption": "null",
    //   //   "statusId": 0,
    //   //   "subTotal": null,
    //   //   "total": null,
    // //   "account": {
    // //     "errors": null,
    // //     "id": 16,
    // //     "displayName": null,
    // //     "email": "test@testinternet.com",
    // //     "phone": "1234444444",
    // //     "password": "Uz+TuSYZc+UibjZKsdF7vvPEObsSUJK7Chzo16xyPmA=",
    // //     "salt": "Q7dAZu05yOhTz8DyeTv+6g==",
    // //     "passwordRecoveryCode": null,
    // //     "expiredTimeCode": null,
    // //     "address": null,
    // //     "dob": null,
    // //     "avatar": null,
    // //     "sexId": null,
    // //     "statusId": 0,
    // //     "roleId": 2
    //   //   "orderContents": [
    //   //     {
    //   //         "errors": null,
    //   //         "id": 8,
    //   //         "code": "#10",
    //   //         "orderId": 8,
    //   //         "foodFoodTypeMappingId": 32,
    //   //         "quantity": 2,
    //   //         "statusId": 0,
    //   //         "amount": null,
    //   //         "foodFoodTypeMapping": {
    //   //             "errors": null,
    //   //             "id": 32,
    //   //             "foodId": 18,
    //   //             "foodTypeId": 2,
    //   //             "food": {
    //   //                 "errors": null,
    //   //                 "id": 18,
    //   //                 "name": "Đồ uống 1",
    //   //                 "priceEach": 10000.0000,
    //   //                 "discountRate": 10.0000,
    //   //                 "imageId": null,
    //   //                 "statusId": 1,
    //   //                 "descreption": "Món này được giảm giá",
    //   //                 "image": null
    //   //             },
    //   //             "foodType": {
    //   //                 "errors": null,
    //   //                 "id": 2,
    //   //                 "name": "Size vừa",
    //   //                 "statusId": 1
    //   //             }
    //   //         },
    //   //         "order": null
    //   //     }
    //   // ],
    //   // "reservations": []
    //   // console.log("[INFO] dish ordered: ", dishOrdered);
    // }
  };

  const onselect = (code) => {
    // console.log("On select");
    let orderedData = data.find((item) => item.code === code);
    props.navigation.navigate("PaymentDetail", {
      data: orderedData,
    });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View>
          <Spinner />
        </View>
      ) : null}
      {/* {console.log(props)} */}
      <View style={styles.filterBar}>
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <Text>Sắp Xếp </Text>
          <Image
            source={dropDownIcon}
            style={{ height: 15, width: 15, top: 3 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <Text>Hôm nay </Text>
          <Image
            source={dropDownIcon}
            style={{ height: 15, width: 15, top: 3 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <Text>Trạng thái </Text>
          <Image
            source={dropDownIcon}
            style={{ height: 15, width: 15, top: 3 }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.card}
              // onpress={() => {
              //   console.log("OnPress in Flatlist");
              //   props.navigation.navigate("OrderedDetail");
              // }}
              onPress={() => {
                onselect(item.code);
              }}
            >
              {/* {console.log("Navigation in Flatlist: ", props.navigation)} */}
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {item.account.displayName}
                </Text>
                <Text
                  style={{
                    fontFamily: "Reguler",
                    color: "#8A8F9C",
                    fontSize: 14,
                  }}
                >
                  {item.account.phone}
                </Text>
                <Text
                  style={{
                    fontFamily: "Reguler",
                    color: "#8A8F9C",
                    fontSize: 14,
                  }}
                >
                  {item.statusId}
                </Text>
              </View>
              <View style={{ flexDirection: "row", top: 10 }}>
                <Text
                  style={{
                    fontFamily: "Reguler",
                    color: "#D20000",
                    fontSize: 20,
                  }}
                >
                  {item.total}
                </Text>
                <Image
                  source={viewMoreIcon}
                  style={{ height: 15, width: 15, top: 7 }}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
  },
  filterBar: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 10,
    width: "100%",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  card: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
