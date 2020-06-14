import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity, FlatList, ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import Moment from 'moment';
import { createStackNavigator } from "@react-navigation/stack";

import statisticServices from '../../providerServices/statisticServices';
import viewMoreIcon from "../../assets/icon/view_more.png";
import dropDownIcon from "../../assets/icon/drop_down.png";
import ProfileService from '../../customerServices/profileService';
import Spinner from "../../components/Spinner/Spinner";
import Filter from './Filter';
import profileService from "../../customerServices/profileService";
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
    handleFilter({ TypeId: { Equal: 1 } });
  }, []);

  const handleFilter = async (props) => {
    const res = await statisticServices.list(props);
    console.log(res);
    setData(res)
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View>
          <Spinner />
        </View>
      ) : null}
      <Filter handleFilter={handleFilter} />
      {data !== null && <View style={{
        backgroundColor: "white",
        elevation: 3,
      }}>
        <View style={styles.selectTimeView}>
          <Text>
            Từ {Moment(data.start).format("DD/MM/YYYY")}
          </Text>
          <Text>
            Đến {Moment(data.end).format("DD/MM/YYYY")}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{
            alignItems: 'flex-end',
            right: 20,
            fontWeight: "bold",
            fontSize: 20
          }}>Tổng số: {data.count}</Text>
        </View>
        {/* <FlatList
          showsHorizontalScrollIndicator={false}
          data={data.orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.card}
              >
                {getUserInfor(11)}
                <View>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Reguler",
                      color: "#8A8F9C",
                      fontSize: 14,
                    }}
                  >
                
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Reguler",
                      color: "#8A8F9C",
                      fontSize: 14,
                    }}
                  >
             
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
        /> */}
      </View>}
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
    justifyContent: 'space-around'
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
