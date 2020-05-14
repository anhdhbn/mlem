import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";
// import { createStackNavigator } from "@react-navigation/stack";

import BackICon from "../assets/icon/provider app/back.png";
import PhoneIcon from "../assets/icon/provider app/phone.png";
import { FlatList } from "react-native-gesture-handler";

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
  const data = {
    customerName: "Dinh Tien Dat",
    customerPhone: "0000000",
    createTime: "12:00-13/04/2000",
    orderTime: "12:00-1/1/2000",
    tables: ["5", "6", "7"],
    menu: [
      { id: "1", name: "món 1", size: "nhỏ", qty: "1", price: "5000vnd" },
      { id: "2", name: "món 1", size: "nhỏ", qty: "1", price: "5000vnd" },
      { id: "3", name: "món 1", size: "nhỏ", qty: "1", price: "5000vnd" },
      { id: "4", name: "món 1", size: "nhỏ", qty: "1", price: "5000vnd" },
      { id: "5", name: "món 1", size: "nhỏ", qty: "1", price: "5000vnd" },
      { id: "6", name: "món 1", size: "nhỏ", qty: "1", price: "5000vnd" },
      { id: "7", name: "món 1", size: "nhỏ", qty: "1", price: "5000vnd" },
      { id: "8", name: "món 1", size: "nhỏ", qty: "1", price: "5000vnd" },
      { id: "9", name: "món 1", size: "nhỏ", qty: "1", price: "5000vnd" },
    ],
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.customerInfoView}>
        <View>
          <Text>{data.customerName}</Text>
          <Text>{data.customerPhone}</Text>
          <Text>Mới Tạo lúc {data.createTime}</Text>
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
          <Text>Thời gian: {data.orderTime}</Text>
          <Text>Số Lượng 2 bàn-16 người</Text>
        </View>
        <View>
          <Text>Chọn bàn: {"\n\n"}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Text>Tên</Text>
          <Text>Size</Text>
          <Text>Số lượng</Text>
          <Text>Thành tiền</Text>
        </View>
      </View>

      <View style={{ height: "50%" }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={data.menu}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View style={styles.cardView}>
                <Text>{item.name}</Text>
                <Text>{item.size}</Text>
                <Text>{item.qty}</Text>
                <Text>{item.price}</Text>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Text>Tổng cộng(3món):</Text>
        <Text>500,000vnđ</Text>
      </View>
      <View style={styles.btnView}>
        <Button
          title="Từ chối"
          style={{ width: 146, height: 48, color: "#C7C7C7" }}
        />
        <Button
          title="Đồng ý"
          style={{ width: 146, height: 48, color: "##DC0000" }}
        />
      </View>
    </ScrollView>
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
    backgroundColor: "#FFFFFF",
  },
  orderInfoView: {
    backgroundColor: "#FFFFFF",
    top: 10,
    marginBottom: 10,
  },
  cardView: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    height: 46,
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "space-around",
    top: 10,
  },
});
