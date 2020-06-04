import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import Moment from 'moment';
import { createStackNavigator } from "@react-navigation/stack";

import viewMoreIcon from "../../assets/icon/view_more.png";
import dropDownIcon from "../../assets/icon/drop_down.png";
import Spinner from "../../components/Spinner/Spinner";
import DatePicker from '../../components/dateTimePicker/datePicker';
import { NavigationContainer } from "@react-navigation/native";

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
  const [firstDate, setFirstDate] = useState(Moment());
  const [lastDate, setLastDate] = useState(Moment());
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
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
          <DatePicker
            setDate={setFirstDate}
            date={firstDate}
            timeVisible={true}
          />
          <DatePicker
            setDate={setLastDate}
            date={lastDate}
            timeVisible={true}
          />
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{
            alignItems: 'flex-end',
            right: 20,
            fontWeight: "bold",
            fontSize: 20
          }}>Tổng số:</Text>
        </View>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.card}
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
