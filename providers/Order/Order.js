import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Ionicons";
import viewMoreIcon from "../../assets/icon/view_more.png";
import dropDownIcon from "../../assets/icon/drop_down.png";

import { Avatar, Button, Overlay } from "react-native-elements";

import orderServices from "../../providerServices/orderServices";
import DetailOrder from "./DetailOrder";
import Spinner from "../../components/Spinner/Spinner";
import Filter from "./Filter";
import Toaster from "../Components/Toaster";
import Snackbar from "../../components/common/snackbarUpdating";
import formatPrice from "../../components/formatPrice";
const OrderStack = createStackNavigator();
/*OrderStackScreen  */
export default ({ navigation }) => (
  <OrderStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#D20000",
      },
      headerTitleAlign: "center",
      headerTintColor: "#fff",
    }}
  >
    <OrderStack.Screen
      name="HomeOrder"
      component={Order}
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
    <OrderStack.Screen
      name="DetailOrder"
      component={DetailOrder}
      options={{
        title: "Chi tiết đơn hàng",
        headerLeft: () => (
          <Icon.Button
            name="ios-arrow-back"
            size={25}
            backgroundColor="#D20000"
            onPress={() => {
              navigation.navigate("HomeOrder");
            }}
          ></Icon.Button>
        ),
      }}
    />
  </OrderStack.Navigator>
);

function reducer(data, action) {
  switch (action.type) {
    case "concat":
      // console.log("Length data:", data.length);
      // console.log("length new data", action.newData.length);
      let newData = data.concat(action.newData);
      return newData;

    case "reset":
      return [];

    case "set":
      return action.newData;

    default:
      return data;
  }
}

function reducerSkip(data, action) {
  switch (action.type) {
    case "reset":
      return 0;

    case "count":
      return data + action.newData;

    default:
      return data;
  }
}

const Order = (props) => {
  const [data, dispatch] = React.useReducer(reducer, []);
  const [isLoading, setIsLoading] = useState(true);

  const [filter, setFilter] = useState({});

  const [skip, dispatchSkip] = React.useReducer(reducerSkip, 0);
  const [isLoadingSkip, setIsLoadingSkip] = useState(false);
  const [isOutOfFood, setIsOutOfFood] = useState(false);

  // Alert
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const onDismissError = () => {
    setIsError(false);
  };

  const createAlert = async (textAlert) => {
    // //console.log("Create alert");
    await setError(textAlert);
    setIsError(true);
  };
  useEffect(() => {
    getData();
  }, [filter]);

  const createParams = () => {
    console.log("Filter to get params: ", filter);
    let params = filter;
    filter.skip = skip;
    filter.take = 10;
    // console.log("Params to get order: ", params);
    return params;
  };

  const getData = async () => {
    setIsLoadingSkip(true);
    let params = createParams();
    let response = await orderServices
      .listOrdered(params)
      .then((res) => {
        dispatchSkip({ type: "count", newData: res.length });
        if (res.length < 10) {
          setIsOutOfFood(true);
        }

        dispatch({
          type: "concat",
          newData: res,
        });
        // console.log("Length response: ", res.length);
        return res;
      })
      .catch((err) => {
        // console.log("Error fetch order list: ", err.data);
        return [];
      });

    setIsLoadingSkip(false);
    setIsLoading(false);
  };
  /* filter  */
  const handleFilter = async (newFilter) => {
    // console.log("Filter before: ", filter);
    // console.log("Props filter: ", newFilter);
    // filter.createdAt = newFilter.createdAt;
    // filter.statusId = newFilter.statusId;
    // filter.skip = 0;
    // setSkip(0);
    // setData([]);
    // getData();

    setIsLoading(true);
    newFilter.skip = filter.skip;
    newFilter.take = filter.take;
    setFilter(newFilter);
    dispatch({ type: "reset" });
    dispatchSkip({ type: "reset" });
    setIsOutOfFood(false);
  };

  const onselect = (code) => {
    // //console.log("On select");
    let orderedData = data.find((item) => item.code === code);
    props.navigation.navigate("DetailOrder", {
      data: orderedData,
      toasterVisible: {
        isError,
        onDismissError,
        createAlert,
      },
    });
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    // const path =
    //   listDishRender.length == 0
    //     ? 200
    //     : contentSize.height / listDishRender.length;

    // const expectation = path * 7;

    const threshhold = 320;
    // console.log(
    //   layoutMeasurement.height + contentOffset.y,
    //   contentSize.height - threshhold
    // );
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - threshhold
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? <View>{/* <Spinner /> */}</View> : null}
      {/* {//console.log(props)} */}
      <Snackbar
        visible={isError}
        _onDismissSnackBar={onDismissError}
        actionText={"HIDE"}
        text={error}
      />
      {/* <Toaster
        data={{
          notification: 'Từ chối đơn hàng thành công',
          visible: toasterRejectVis,
          setVisible: setToasterRejectVis
        }}
      /> */}
      <Filter handleFilter={handleFilter} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={async ({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;

          if (isCloseToBottom(nativeEvent)) {
            //do something
            // console.log("Close to bottom");
            // console.log("IsLoadingSkip: ", isLoadingSkip, isOutOfFood);
            if (!isLoadingSkip) {
              if (!isOutOfFood) {
                setIsLoadingSkip(true);
                await getData();
                setIsLoadingSkip(false);
              }
            }
          }
        }}
      >
        {data.map((item) => {
          return (
            <TouchableOpacity
              style={styles.card}
              // onpress={() => {
              //   //console.log("OnPress in Flatlist");
              //   props.navigation.navigate("OrderedDetail");
              // }}
              onPress={() => {
                onselect(item.code);
              }}
            >
              {/* {//console.log("Navigation in Flatlist: ", props.navigation)} */}
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
                  {formatPrice(item.total)}
                </Text>
                <Image
                  source={viewMoreIcon}
                  style={{ height: 15, width: 15, top: 7 }}
                />
              </View>
            </TouchableOpacity>
          );
        })}
        {isLoadingSkip ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button type="clear" loading={true} loadingStyle={{ height: 50 }} />
          </View>
        ) : null}
      </ScrollView>
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
