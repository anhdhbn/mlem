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
  // const data = {
  //   customerName: "Dinh Tien Dat",
  //   customerPhone: "0000000",
  //   createTime: "12:00-13/04/2000",
  //   orderTime: "12:00-1/1/2000",
  //   tables: ["5", "6", "7"],
  //   menu: [
  //     { id: "1", name: "món 1", size: "nhỏ", qty: "1", price: "5000vnd" },
  //     { id: "2", name: "món 1", size: "nhỏ", qty: "1", price: "5000vnd" },
  //     { id: "3", name: "món 1", size: "nhỏ", qty: "1", price: "5000vnd" },
  //     { id: "4", name: "món 1", size: "nhỏ", qty: "1", price: "5000vnd" },
  //     { id: "5", name: "món 1", size: "nhỏ", qty: "1", price: "5000vnd" },
  //     { id: "6", name: "món 1", size: "nhỏ", qty: "1", price: "5000vnd" },
  //     { id: "7", name: "món 1", size: "nhỏ", qty: "1", price: "5000vnd" },
  //     { id: "8", name: "món 1", size: "nhỏ", qty: "1", price: "5000vnd" },
  //     { id: "9", name: "món 1", size: "nhỏ", qty: "1", price: "5000vnd" },
  //   ],
  // };

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
    <SafeAreaView style={styles.container }>
      <ScrollView >
        <View style={styles.customerInfoView}>
          <View >
            <Text style={{ fontSize:16,fontWeight:'bold' }}>{data.account.displayName}</Text>
            <Text style={{ fontSize:16,fontWeight:'bold' }}>+{data.account.phone}</Text>
            <Text style={{ fontSize:16 }}>
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
          <View style={{ marginLeft: 5 }}>
            <Text>Chọn bàn: {"\n\n"}</Text>
          </View>

        </View>
        <View
            style={{
              flexDirection: "row",
              flex: 10,
              marginTop:5
            }}
          >
            <View style={{ flex: 3,alignItems:'center'}}><Text style={{ fontWeight:'bold' }}>Tên</Text></View>
            <View style={{ flex: 2,alignItems:'center'}}><Text style={{ fontWeight:'bold' }}>Size</Text></View>
            <View style={{ flex: 2,alignItems:'center'}}><Text style={{ fontWeight:'bold' }}>Số lượng</Text></View>
            <View style={{ flex: 3,alignItems:'center'}}><Text style={{ fontWeight:'bold' }}>Thành tiền</Text></View>
          </View>

        <View style={{ height: "50%", flex:10}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data.orderContents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <View style={styles.cardView}>
                  <View style={{ flex: 3,alignItems:'center'}}><Text>{item.foodFoodTypeMapping.food.name}</Text></View>
                  <View style={{ flex: 2,alignItems:'center'}}><Text>{item.foodFoodTypeMapping.foodType.name}</Text></View>
                  <View style={{ flex: 2,alignItems:'center'}}><Text>{item.quantity}</Text></View>
                  <View style={{ flex: 3,alignItems:'center'}}><Text>
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
          <View style={{ flex:5 ,alignItems:"center"}}>
            <Text style={{ fontSize:16,fontWeight:'bold' }}>Tổng cộng({totalQuantity} món):</Text>
          </View>
          <View style={{ flex:5 ,alignItems:"center"}}>
            <Text style={{ fontSize:16,fontWeight:'bold' }}>{data.total} vnđ</Text>
          </View>
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity
          style={{
            backgroundColor: "#c7c5bf",
            borderRadius: 8,
            width: 120,
            height: 40,
            alignItems:'center'
          }}
          onPress={() => {}}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              padding: 8,
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
            width: 120,
            height: 40,
            alignItems:'center'
          }}
          onPress={() => {}}
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
    paddingLeft:15,
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
    paddingTop:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginBottom:5
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom:8
  },

});
