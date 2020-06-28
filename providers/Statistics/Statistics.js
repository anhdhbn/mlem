import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity, FlatList, ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import Moment from 'moment';
import { createStackNavigator } from "@react-navigation/stack";
import statisticServices from '../../providerServices/statisticServices';
import viewMoreIcon from "../../assets/icon/view_more.png";
import Spinner from "../../components/Spinner/Spinner";
import Filter from './Filter';
import StatisticDetail from './StatisticDetail';
import formatPrice from '../../components/formatPrice';
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
      name="StatisticPage"
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
    <StatisticStack.Screen
      name="StatisticDetail"
      component={StatisticDetail}
      options={{
        title: "Chi tiết đơn hàng",
        headerLeft: () => (
          <Icon.Button
            name="ios-arrow-back"
            size={25}
            backgroundColor="#D20000"
            onPress={() => {
              navigation.navigate("StatisticPage");
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
  const onselect = (code) => {
    // console.log("On select");
    let orderedData = data.orders.find((item) => item.code === code);
    props.navigation.navigate("StatisticDetail", {
      data: orderedData,
    });
  };
  const handleFilter = async (props) => {
    const res = await statisticServices.list(props);
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
      }}>
        <View style={{
          backgroundColor: 'white',
          elevation: 5,
        }}>
          <View style={styles.selectTimeView}>
            <Text style={{
              fontFamily: "Reguler",
              color: "#8A8F9C",
              fontSize: 14,
            }}>
              Từ {Moment(data.start).format("DD/MM/YYYY")}
            </Text>
            <Text style={{
              fontFamily: "Reguler",
              color: "#8A8F9C",
              fontSize: 14,
            }}>
              Đến {Moment(data.end).format("DD/MM/YYYY")}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{
              alignItems: 'flex-end',
              right: 50,
              fontWeight: "bold",
              fontSize: 16
            }}>Tổng số: {data.count}</Text>
          </View>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={data.orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  onselect(item.code)
                }}
              >
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
                    {Moment(item.account.orderDate).format('hh:mm')}-{Moment(item.account.orderDate).format('DD/MM/YYYY')}
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
          }}
        />
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
    justifyContent: 'space-around',
    marginVertical: 3
  },
  filterBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 10,
    top: 5,
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
