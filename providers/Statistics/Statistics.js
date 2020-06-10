import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import Moment from 'moment';
import { createStackNavigator } from "@react-navigation/stack";

import statisticServices from '../../providerServices/statisticServices';
import viewMoreIcon from "../../assets/icon/view_more.png";
import dropDownIcon from "../../assets/icon/drop_down.png";
import Spinner from "../../components/Spinner/Spinner";
import DatePicker from '../../components/dateTimePicker/datePicker';
import { NavigationContainer } from "@react-navigation/native";
import menuServices from '../../providerServices/menuServices'
const StatisticStack = createStackNavigator();
/*StatisticStackScreen  */
export default ({ navigation }) => (
  <StatisticStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#D20000",
      },
      headerTitleAlign: "center",
      headerTintColor: "#fff",
    }}
  >
    <StatisticStack.Screen
      name="Statistic"
      component={Statistic}
      options={{
        title: "Thống kê",
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
  </StatisticStack.Navigator>
);
const Statistic = (props) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await statisticServices.list({account:{email: "vietlinh15@coldmail.com",}});
    console.log(res)
    
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
          <Text>Theo tháng </Text>
          <Image
            source={dropDownIcon}
            style={{ height: 15, width: 15, top: 3 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{
        backgroundColor: "white",
        elevation: 3,
      }}>
        <View style={styles.selectTimeView}>
          {console.log(data)
          }
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{
            alignItems: 'flex-end',
            right: 20,
            fontWeight: "bold",
            fontSize: 20
          }}>Tổng số1:</Text>
        </View>
      </View>
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
  },
  selectTimeView: {
    flexDirection: "row",
    justifyContent: 'space-between'
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
