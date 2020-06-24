import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  SafeAreaView,
} from "react-native";
import moment from "moment";

import BackICon from "../../assets/icon/provider/back.png";
import PhoneIcon from "../../assets/icon/provider/phone.png";
import { FlatList } from "react-native-gesture-handler";
import Spinner from "../../components/Spinner/Spinner";
import orderServices from "../../providerServices/orderServices";
import ModalAccept from '../Components/Modal';

export default function DetailOrder(props) {
  const [data, setData] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [modalPayVisible, setModalPayVisible] = useState(false);
  const [modalDelVisible, setModalDelVisible] = useState(false);
  const {
    toasterPayVisible,
    setToasterPayVisible,
    toasterDelVisible,
    setToasterDelVisible
  } = props.route.params.toasterVisible
  const handlePay = async () => {

    props.navigation.navigate("PaymentScreen");
    setModalPayVisible(false);
    const res = await orderServices.payment(data);
    res.errors !== null
      ?
      setToasterPayVisible({ status: true, title: res.errors.statusId })
      :
      setToasterPayVisible({ status: true, title: null })
  }
  const handleDelete = async () => {
    //console.log('delete');
    props.navigation.navigate("PaymentScreen")
    setModalDelVisible(false);
    const res = await orderServices.deleteOrder(data);
    res.errors !== null
      ?
      setToasterDelVisible({ status: true, title: res.errors.id })
      :
      setToasterDelVisible({ status: true, title: null })

  }
  useEffect(() => {
    // console.log(props.route.params.data);
    setData(props.route.params.data);
    let newArrayQuantity = props.route.params.data.orderContents.map((item) => {
      return item.quantity;
    });
    setTotalQuantity(newArrayQuantity.reduce((a, b) => a + b, 0));
    // console.log(newArrayQuantity.reduce((a, b) => a + b, 0));
  }, []);
  return data ? (
    <SafeAreaView style={styles.container}>
      {/* modal thanh toán */}
      <ModalAccept data={{
        visible: modalPayVisible,
        setVisible: setModalPayVisible,
        handleSubmit: handlePay,
      }}
        button={{
          title: 'Xác nhận thanh toán',
          titleSubmit: 'Xác nhận',
          titleCancel: 'Quay lại'
        }}
      />

      {/* Modal xoá */}
      <ModalAccept data={{
        visible: modalDelVisible,
        setVisible: setModalDelVisible,
        handleSubmit: handleDelete
      }}
        button={{
          title: '      Xác nhận xoá        ',
          titleSubmit: 'Xác nhận',
          titleCancel: 'Quay lại'
        }}
      />
      <ScrollView >
        <View style={styles.customerInfoView}>
          <View >
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{data.account.displayName}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>+{data.account.phone}</Text>
            <Text style={{ fontSize: 16 }}>
              Mới Tạo lúc {moment(data.createdAt).format("HH:mm") + " - "}
              {moment(data.createdAt).format("DD/MM/YYYY")}
            </Text>
          </View>
          <TouchableOpacity>
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
          <View style={{
            marginLeft: 5,
            flexDirection: 'row'
          }}>
            <Text>Chọn bàn: {"\n\n"}</Text>
            <View style={{ maxWidth: 150, overflow: 'hidden' }}>
              {data.reservations.length <= 3
                ?
                <View style={{ flexDirection: 'row' }}>
                  {data.reservations.map((item, index) => index < data.reservations.length - 1
                    ? <Text>{item.table.code}, </Text>
                    : <Text>{item.table.code}</Text>
                  )}
                </View>
                : <Text>
                  {data.reservations[0].table.code}, {data.reservations[1].table.code}, {data.reservations[2].table.code},...
                </Text>}
            </View>
          </View>

        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 10,
            marginTop: 5
          }}
        >
          <View style={{ flex: 3, alignItems: 'center' }}><Text style={{ fontWeight: 'bold' }}>Tên</Text></View>
          <View style={{ flex: 2, alignItems: 'center' }}><Text style={{ fontWeight: 'bold' }}>Size</Text></View>
          <View style={{ flex: 2, alignItems: 'center' }}><Text style={{ fontWeight: 'bold' }}>Số lượng</Text></View>
          <View style={{ flex: 3, alignItems: 'center' }}><Text style={{ fontWeight: 'bold' }}>Thành tiền</Text></View>
        </View>

        <View style={{ height: "50%", flex: 10 }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data.orderContents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <View style={styles.cardView}>
                  <View style={{ flex: 3, alignItems: 'center' }}><Text>{item.foodFoodTypeMapping.food.name}</Text></View>
                  <View style={{ flex: 2, alignItems: 'center' }}><Text>{item.foodFoodTypeMapping.foodType.name}</Text></View>
                  <View style={{ flex: 2, alignItems: 'center' }}><Text>{item.quantity}</Text></View>
                  <View style={{ flex: 3, alignItems: 'center' }}><Text>
                    {item.foodFoodTypeMapping.foodType.id === 1
                      ? (item.quantity *
                        item.foodFoodTypeMapping.food.priceEach *
                        (100 - item.foodFoodTypeMapping.food.discountRate)) /
                      100
                      : item.foodFoodTypeMapping.foodType.id === 2
                        ? (item.quantity *
                          1.2 *
                          item.foodFoodTypeMapping.food.priceEach *
                          (100 - item.foodFoodTypeMapping.food.discountRate)) /
                        100
                        : (item.quantity *
                          1.5 *
                          item.foodFoodTypeMapping.food.priceEach *
                          (100 - item.foodFoodTypeMapping.food.discountRate)) /
                        100}
                  </Text></View>

                </View>
              );
            }}
          />
        </View>
      </ScrollView>
      <View style={{
        backgroundColor: '#ffffff',
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
            flex: 10
          }}
        >
          <View style={{ flex: 5, alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Tổng cộng({totalQuantity} món):</Text>
          </View>
          <View style={{ flex: 5, alignItems: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{data.total} vnđ</Text>
          </View>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={{
              backgroundColor: "#c7c5bf",
              borderRadius: 8,
              width: 120,
              height: 40,
              alignItems: 'center'
            }}
            onPress={() => { setModalDelVisible(true) }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                padding: 8,
                color: "#000",
              }}
            >
              Xoá
          </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#DC0000",
              borderRadius: 8,
              width: 120,
              height: 40,
              alignItems: 'center'
            }}
            onPress={() => setModalPayVisible(true)}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                padding: 8,
                color: "#fff",
              }}

            >
              Thanh toán
          </Text>
          </TouchableOpacity>
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
    marginBottom: 5
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 8
  },

});
