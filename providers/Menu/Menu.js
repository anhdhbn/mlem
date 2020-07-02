import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, TextInput, Alert } from "react-native";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Toaster from "../../components/Modal/Toaster";
import Snackbar from "../../components/common/snackbarUpdating";

import search from "../../assets/icon/search.png";
import viewMoreIcon from "../../assets/icon/view_more.png";
import dropDownIcon from "../../assets/icon/drop_down.png";

import ModalEditMenu from "./ModalEditMenu";
import CreateFood from "./AddNewFood";
import EditFood from "./EditFood";
import menuServices from "../../providerServices/menuServices";
import FilterBar from "./Filter";
const base_url = "http://112.213.88.49:20000";
const MenuStack = createStackNavigator();
/* MenuStackScreen */
export default ({ navigation }) => (
  <MenuStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#D20000",
      },
      headerTitleAlign: "center",
      headerTintColor: "#fff",
    }}
  >
    <MenuStack.Screen
      name="MenuProvider"
      component={Menu}
      options={{
        title: "Thực Đơn",
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
        headerRight: () => (
          <AntDesign.Button
            name="plus"
            size={25}
            backgroundColor="#D20000"
            onPress={() => {
              navigation.navigate("CreateFood");
            }}
          ></AntDesign.Button>
        ),
      }}
    />
    <MenuStack.Screen
      name="CreateFood"
      component={CreateFood}
      options={{
        title: "Thêm mới món ăn",
        headerLeft: () => (
          <Icon.Button
            name="ios-arrow-back"
            size={25}
            backgroundColor="#D20000"
            onPress={() => {
              navigation.navigate("MenuProvider");
            }}
          ></Icon.Button>
        ),
      }}
    />
    <MenuStack.Screen
      name="EditFood"
      component={EditFood}
      options={({ route }) => ({
        title: "Tùy chỉnh món ăn",
        headerLeft: () => (
          <Icon.Button
            name="ios-arrow-back"
            size={25}
            backgroundColor="#D20000"
            onPress={() => {
              navigation.navigate("MenuProvider");
            }}
          ></Icon.Button>
        ),
      })}
    />
  </MenuStack.Navigator>
);

const Menu = (props) => {
  const [editMenuVisible, setEditMenuVisible] = useState(false);
  const [selectedDish, setselectedDish] = useState();

  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [filterText, setFilterText] = useState(null);
  const [filterParams, setFilterParams] = useState(null);

  const toggleEditMenu = (props) => {
    return () => {
      !editMenuVisible && setselectedDish(props);
      setEditMenuVisible(!editMenuVisible);
    };
  };
  /* xoá món ăn đang được chọn */
  const handleDelete = async () => {
    setIsUploading(true);
    setEditMenuVisible(false);
    // //console.log("[TEST] Delete: ", selectedDish);
    await menuServices
      .deleteDish(selectedDish)
      .then((res) => {
        setIsUploading(false);
        // //console.log("[INFO] Response after delete food: ", res);
        setIsUploaded(true);
      })
      .catch((error) => {
        setIsUploading(false);
        setIsUploaded(true);
        createAlert(error.data);
      });
    getData();
  };

  // Tùy chỉnh món ăn đang được chọn
  const handleChangeDish = async (dish) => {
    // //console.log("[INFO] Params to change dish: ", dish);
    setIsUploading(true);
    await menuServices
      .updateDish(dish)
      .then((res) => {
        setIsUploading(false);
        // //console.log("[INFO] Response after change dish: ", res);
        setIsUploaded(true);
      })
      .catch((error) => {
        setIsUploading(false);
        setIsUploaded(true);

        createAlert(error.data);
      });
    getData();
  };

  /* lấy data */
  const [data, setData] = useState([]);
  const getData = async () => {
    setIsLoading(true);
    await menuServices
      .list({})
      .then((res) => {
        setData(res);
        // //console.log("[INFO] Response after get Data: ", res);
        setIsLoading(false);
      })
      .catch((error) => {
        createAlert(error.data);
        setIsLoading(false);
      });
  };
  /* xử lý filter */
  const handleFilter = async (props) => {
    setIsUploading(true);

    // Thêm filter text
    // tự động thêm bằng biến filterText được sửa mỗi khi bấm vào thanh tìm kiếm.
    let params = addFilterText(props);
    setFilterParams(params);
    // //console.log("[INFO] Filter params in Menu Provider: ", params);
    await menuServices
      .list(params)
      .then((res) => {
        /* //console.log('data: ',res) */
        setData(res);
        // //console.log("[INFO] Resonse after use filter: ", res);
        setIsUploading(false);
        setIsUploaded(true);
      })
      .catch((error) => {
        createAlert(error.data);
        setIsUploading(false);
        setIsUploaded(true);
      });
  };

  const addFilterText = (paramsIn, text = null) => {
    // //console.log("[INFO] Filter text before add: ", filterText);
    if (paramsIn) {
      text
        ? (paramsIn.name = { contain: text })
        : (paramsIn.name = { contain: filterText });
    } else {
      let paramsIn = {
        name: {
          contain: text,
        },
      };
      return paramsIn;
    }

    return paramsIn;
  };

  const handleFilterText = async (props) => {
    props === "" ? setFilterText(null) : setFilterText(props);

    setIsUploading(true);
    let params = {};
    props === ""
      ? (params = addFilterText(filterParams, null))
      : (params = addFilterText(filterParams, props));

    // //console.log("[INFO] Filter params in Menu Provider: ", params);
    await menuServices
      .list(params)
      .then((rs) => {
        setData(rs);
        // //console.log("Response after search: ", rs);
        setIsUploading(false);
        setIsUploaded(true);
      })
      .catch((error) => {
        createAlert(error.data);
        setIsUploading(false);
        setIsUploaded(true);
      });
  };

  const pressChangeDish = (data = null) => {
    // props.navigation.navigate("EditFood", {
    //   data: selectedDish,
    //   handleChangeDish: handleChangeDish,
    // });
    setEditMenuVisible(false);
    if (data) {
      props.navigation.navigate("EditFood", {
        data: data,
        handleChangeDish: handleChangeDish,
        handleDeleteDish: handleDelete,
      });
    } else {
      props.navigation.navigate("EditFood", {
        data: selectedDish,
        handleChangeDish: handleChangeDish,
        handleDeleteDish: handleDelete,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onDismissUploading = () => {
    setIsUploading(false);
  };

  const onDismissUploaded = () => {
    setIsUploaded(false);
  };

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

  return (
    <View style={styles.container}>
      {/* {//console.log("Uploading: ", isUploading)}
      {//console.log("Uploaded: ", isUploaded)} */}
      {/* <Toaster
        notification={"Đang cập nhật"}
        visible={isUploading}
        setVisible={setIsUploading}
      /> */}

      <Snackbar
        visible={isError}
        _onDismissSnackBar={onDismissError}
        actionText={"HIDE"}
        text={error}
      />

      <Snackbar
        visible={isUploading}
        _onDismissSnackBar={onDismissUploading}
        actionText={"HIDE"}
        text={"Đang cập nhật"}
      />

      {/* <Toaster
        notification={"Cập nhật thành công"}
        visible={isUploaded}
        setVisible={setIsUploaded}
      /> */}

      <Snackbar
        visible={isUploaded}
        _onDismissSnackBar={onDismissUploaded}
        actionText={"HIDE"}
        text={"Cập nhật thành công"}
      />

      <View style={styles.viewInput}>
        <Image
          source={search}
          style={{ width: 13, height: 13, marginLeft: 10, top: 15 }}
        />
        <TextInput
          style={{ flex: 1 }}
          placeholder={"MlemMlem...."}
          placeholderTextColor="#B21"
          onChangeText={(e) => {
            handleFilterText(e);
          }}
        ></TextInput>
      </View>
      <FilterBar handleFilter={handleFilter} />
      {data !== [] && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.card}
                onLongPress={toggleEditMenu(item)}
                onPress={() => {
                  setselectedDish(item);
                  pressChangeDish(item);
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  {item.image !== null && (
                    <Image
                      source={{ uri: `${base_url}${item.image.url}` }}
                      style={{ width: 77, height: 71 }}
                    />
                  )}
                  <View style={{ padding: 5 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Reguler",
                        color: "#8A8F9C",
                        fontSize: 12,
                      }}
                    >
                      {item.descreption}
                    </Text>
                    {item.statusId == 1 ? (
                      <Text
                        style={{
                          fontFamily: "Reguler",
                          color: "#00B80C",
                          fontSize: 12,
                        }}
                      >
                        {item.status.name}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontFamily: "Reguler",
                          color: "#D00000",
                          fontSize: 12,
                        }}
                      >
                        {item.status.name}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={{ flexDirection: "row", top: 10 }}>
                  <Text
                    style={{
                      fontFamily: "Reguler",
                      color: "#D20000",
                      fontSize: 20,
                    }}
                  >
                    {item.priceEach}
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
      )}
      <ModalEditMenu
        visible={{ editMenuVisible, toggleEditMenu }}
        deleteDish={handleDelete}
        changeDish={pressChangeDish}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewInput: {
    width: "100%",
    borderRadius: 10,
    height: 42,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    overflow: "hidden",
    shadowOpacity: 0.5,
  },
  filterBar: {
    flexDirection: "row",
    backgroundColor: "#F6F7F8",
    height: 33,
    padding: 6,
    top: 3,
    width: "100%",
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
  card: {
    width: "100%",
    top: 5,
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
  textFilter: {
    color: "#8A8F9C",
  },
});
