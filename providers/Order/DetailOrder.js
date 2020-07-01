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
import ModalSelectTable from "./ModalSelectTable";
import Modal from "../Components/Modal";
import formatPrice from "../../components/formatPrice";
import Call from "react-native-phone-call";
import Toaster from "../../components/Modal/Toaster";
export default function DetailOrder(props) {
  const [isUploaded, setIsUploaded] = useState(true);
  const [data, setData] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [selectedTable, setSelectedTable] = useState([]);
  const [visible, setVisible] = useState(false);
  const [approveVisible, setApproveVisible] = useState(false);
  const [rejectVisible, setRejectVisible] = useState(false);
  const {
    createAlert,
    onDismissError,
    isError,
  } = props.route.params.toasterVisible;
  useEffect(() => {
    // console.log(props.route.params.data);
    setData(props.route.params.data);
    props.route.params.data.orderContents.map((item) => {
      return item.quantity;
    });
  }, []);

  const handleSelectTable = async (props) => {
    let tmp = [];
    await props.map((item) => {
      if (item.isCliked === true) {
        tmp.push({
          ...item,
          orderId: data.id,
        });
      }
    });
    setSelectedTable(tmp);
  };
  /*  */
  const handleCall = (props) => {
    const args = data.account.phone == "PHONE_EMPTY" ?
      {
        number: '', // String value with the number to call
        prompt: false
      } :
      {
        number: data.account.phone, // String value with the number to call
        prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
      };
      Call(args).catch(console.error);
  };
  const handleApprove = async () => {
    const submitData = {
      ...data,
      reservations: [...selectedTable],
    };
    /* const res = submitData */
    setApproveVisible(false);
    props.navigation.navigate("HomeOrder");
    OrderServices.approveOrdered(submitData)
      .then((res) => {
        createAlert("Xác nhận đơn hàng thành công");
      })
      .catch((err) => {
        createAlert(err.data.errors.reservations);
      });
    /* console.log(JSON.stringify(res)) */
    /* res.errors !== null
      ?
      setToasterApproveVis({ status: true, title: res.errors.statusId })
      :
      setToasterApproveVis({ status: true, title: null }) */
  };
  /*  */
  const handleReject = async () => {
    const submitData = {
      ...data,
      reservations: [...selectedTable],
    };
    setRejectVisible(false);
    props.navigation.navigate("HomeOrder");
    await OrderServices.rejectOrdered(submitData)
      .then((res) => {
        createAlert("Từ chối đơn hàng thành công");
      })
      .catch((err) => {
        createAlert(err.data.errors.statusId);
      });
    /* ;
    res.errors !== null
      ?
      setToasterRejectVis({ status: true, title: res.errors.statusId })
      :
      setToasterRejectVis({ status: true, title: null }) */
  };
  return data ? (
    <SafeAreaView style={styles.container}>
      {/* Modal sellect table */}
      <ModalSelectTable
        visible={visible}
        setVisible={setVisible}
        handleSelectTable={handleSelectTable}
        orderDate={moment(data.orderDate)}
        numOrderTable={data.numOfTable}
      />
      {/* modal approve a order */}
      <Modal
        data={{
          visible: approveVisible,
          setVisible: setApproveVisible,
          handleSubmit: handleApprove,
        }}
        button={{
          title: "Xác nhận đơn hàng",
          titleBody: "Bạn có chắc chắn xác nhận đơn hàng này không?",
          titleSubmit: "Xác nhận",
          titleCancel: "Quay lại",
        }}
      />

      {/* modal reject a order */}
      <Modal
        data={{
          visible: rejectVisible,
          setVisible: setRejectVisible,
          handleSubmit: handleReject,
        }}
        button={{
          title: "Từ chối đơn hàng",
          titleBody: "Bạn có chắc chắn từ chối đơn hàng này không?",
          titleSubmit: "Từ chối",
          titleCancel: "Quay lại",
        }}
      />

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
          <TouchableOpacity onPress={() => { handleCall(data.account.phone) }}>
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
              padding: 10,
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
          <TouchableOpacity
            style={{
              paddingLeft: 10,
              flexDirection: "row",
              backgroundColor: "#F5F6F7",
              elevation: 2,
              position: "relative",
            }}
            onPress={() => {
              data.status.id == "2" && setVisible(true);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                height: 35,
                paddingTop: 7,
              }}
            >
              <Text>Bàn: </Text>
              <View style={{ maxWidth: 150, overflow: "hidden" }}>
                {selectedTable.length <= 3 ? (
                  <View style={{ flexDirection: "row" }}>
                    {selectedTable.map((item, index) =>
                      index < selectedTable.length - 1 ? (
                        <Text>{item.table.code}, </Text>
                      ) : (
                          <Text>{item.table.code}</Text>
                        )
                    )}
                  </View>
                ) : (
                    <Text>
                      {selectedTable[0].table.code}, {selectedTable[1].table.code}
                    , {selectedTable[2].table.code},...
                    </Text>
                  )}
              </View>
            </View>
            <View
              style={{
                position: "absolute",
                right: 10,
                flexDirection: "row",
                paddingTop: 7,
              }}
            >
              <Text>Bấm chọn</Text>
              <Image
                style={{ width: 20, height: 20, marginTop: 2 }}
                source={require("../../assets/icon/view-more.png")}
              />
            </View>
          </TouchableOpacity>
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
      {data.status.id == "2" ? (
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
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Tổng cộng ({data?.orderContents?.length} món):
              </Text>
            </View>
            <View style={{ flex: 5, alignItems: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {formatPrice(data.total)}
              </Text>
            </View>
          </View>
          <View style={styles.btnView}>
            <TouchableOpacity
              style={{
                backgroundColor: "#c7c5bf",
                borderRadius: 8,
                width: 100,
                height: 40,
              }}
              onPress={() => {
                setRejectVisible(true);
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  padding: 8,
                  paddingLeft: 20,
                  color: "#000",
                }}
              >
                Từ chối
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#DC0000",
                borderRadius: 8,
                width: 110,
                height: 40,
              }}
              onPress={() =>
                // setApproveVisible(true);
                setApproveVisible(true)
              }
            >
              <Text
                style={{
                  fontSize: 16,
                  padding: 8,
                  paddingLeft: 20,
                  color: "#fff",
                }}
              >
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
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
        )}
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
