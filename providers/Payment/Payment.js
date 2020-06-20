import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";


import Icon from "react-native-vector-icons/Ionicons";
import viewMoreIcon from "../../assets/icon/view_more.png";
import dropDownIcon from "../../assets/icon/drop_down.png";

import orderServices from "../../providerServices/orderServices";
import PaymentDetail from "./PaymentDetail";
import Spinner from "../../components/Spinner/Spinner";
import Filter from './Filter';
import Toaster from '../Components/Toaster'
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
            name="ios-arrow-back"
            size={25}
            backgroundColor="#D20000"
            onPress={() => {
              navigation.navigate("Payment")
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
  const [toasterPayVisible, setToasterPayVisible] = useState(false);
  const [toasterDelVisible, setToasterDelVisible] = useState(false);
  useEffect(() => {
    getData();
  }, [toasterPayVisible,toasterDelVisible]);

  const getData = async () => {
    setIsLoading(true);
    let params = {};
    let response = await orderServices.listOrdered(params);
    setData(response);
    setIsLoading(false);
  };
  /* filter  */
  const handleFilter = (props) => {
    orderServices.listOrdered(props).then(res => {
      setData(res)
    });
  }
  const onselect = (code) => {
    // console.log("On select");
    let orderedData = data.find((item) => item.code === code);
    props.navigation.navigate("PaymentDetail", {
      data: orderedData,
      toasterVisible: {
        toasterPayVisible,
        setToasterPayVisible,
        toasterDelVisible,
        setToasterDelVisible
      }
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
      <Toaster
        data={{
          notification: 'Thanh toán đơn hàng thành công',
          visible: toasterPayVisible,
          setVisible: setToasterPayVisible
        }}
      />
      <Toaster
        data={{
          notification: 'Xoá đơn hàng thành công',
          visible: toasterDelVisible,
          setVisible: setToasterDelVisible
        }}
      />
      <Filter handleFilter={handleFilter} />
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
                  {item?.status?.name}
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
    backgroundColor: "#F5F6F7",

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
