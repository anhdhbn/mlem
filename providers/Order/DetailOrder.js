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
// import { createStackNavigator } from "@react-navigation/stack";

import moment from "moment";

import BackICon from "../../assets/icon/provider/back.png";
import PhoneIcon from "../../assets/icon/provider/phone.png";
import { FlatList } from "react-native-gesture-handler";
import Spinner from "../../components/Spinner/Spinner";
import ProviderService from '../../providerServices/tableServices';
import ModalSelectTable from "./ModalSelectTable";
// const Stack = createStackNavigator();

// export default function StackScreen(props) {
//   return (
//     <Stack.Navigator screenOptions={{
//       headerStyle: {
//         backgroundColor: '#D20000',
//       },
//       headerTitleAlign: 'center',
//       headerTintColor: '#fff'

//     }}>
//       <Stack.Screen
//         name="Home"
//         component={DetailOrder}
//         options={{
//           title: 'Chi tiết đơn hàng',
//           headerLeft: () => (
//             <TouchableOpacity onPress={()=>{
//               props.navigation.navigate('SideBar')
//             }}>
//               <Image source={BackICon} style={{height:15,width:15,left:10}} />
//             </TouchableOpacity>
//           )
//         }}
//       />
//     </Stack.Navigator>
//   )
// }
export default function DetailOrder(props) {
  const [data, setData] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [selectedTable, setSelectedTable] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    // console.log(props.route.params.data);
    setData(props.route.params.data);
    let newArrayQuantity = props.route.params.data.orderContents.map((item) => {
      return item.quantity;
    });
  }, []);
  const handleSelectTable = async (props) => {
    let tmp = [];
    await props.map((item) => {
      if (item.isCliked === true) {
        tmp.push(item);
      }
    })
    setSelectedTable(tmp)
  }
  return data ? (
    <SafeAreaView style={styles.container}>
      <ModalSelectTable visible={visible} setVisible={setVisible}
        handleSelectTable={handleSelectTable}
      />
      <ScrollView >
        <View style={styles.customerInfoView}>
          <View >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{data.account.displayName}</Text>
            <Text style={{ fontSize: 14, color: "#8A8F9C" }}>+{data.account.phone}</Text>
            <Text style={{ fontSize: 14, color: "#8A8F9C" }}>
              {data?.status?.name} {moment(data.createdAt).format("HH:mm") + " - "}
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
          <TouchableOpacity style={{
            marginLeft: 5,
            flexDirection: 'row'
          }}
            onPress={() => { setVisible(true) }}
          >
            <Text>Chọn bàn: {"\n\n"}</Text>
            <View style={{ maxWidth: 150, overflow: 'hidden' }}>
              {selectedTable.length <= 3
                ?
                <View style={{ flexDirection: 'row' }}>
                  {selectedTable.map((item, index) => index < selectedTable.length - 1
                    ? <Text>{item.code}, </Text>
                    : <Text>{item.code}</Text>
                  )}
                </View>
                : <Text>
                  {selectedTable[0].code}, {selectedTable[1].code}, {selectedTable[2].code},...
                </Text>}
            </View>
          </TouchableOpacity>

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
            <Text style={{ fontSize: 16 }}>Tổng cộng ({data?.orderContents?.length} món):</Text>
          </View>
          <View style={{ flex: 5, alignItems: "center" }}>
            <Text style={{ fontSize: 16 }}>{data.total}</Text>
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
            onPress={() => { }}
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
            onPress={() => { }}
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
