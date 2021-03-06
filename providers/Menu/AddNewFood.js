import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import { FlatList, State } from "react-native-gesture-handler";
import { Input, Overlay, Avatar } from "react-native-elements";
import RNFetchBlob from "rn-fetch-blob";
import { Spinner } from "native-base";

import BackICon from "../../assets/icon/provider/back.png";
import TickIcon from "../../assets/icon/tick.png";
import CircleIcon from "../../assets/icon/circle.png";
import ViewMore from "../../assets/icon/view_more.png";
import addIcon from "../../assets/icon/add.png";
import subIcon from "../../assets/icon/sub.png";

import ModalSelectFoodGroup from "./ModalSelectFoodGroup";
import Modal from "../Components/Modal";

// import ImagePicker from "react-native-image-picker";
import menuServices from "../../providerServices/menuServices";

//Test
import homeServices from "../../customerServices/homeServices";
import * as baseRequest from "../../customerServices/requests";
import { TextInput } from "react-native-paper";

import ImagePicker from "react-native-image-crop-picker";

export default function (props) {
  const [data, setData] = useState({
    name: null,
    statusId: null,
    descreption: null,
    foodFoodTypeMappings: null,
    foodFoodGroupingMappings: null,
  });

  const [imageId, setImageId] = useState(null);
  const [image, setImage] = useState(null);

  const [priceEach, setPriceEach] = useState(0);
  const [discountRate, setDiscountRate] = useState(0);
  const [stateAvatar, setStateAvatar] = useState(false);
  const [size1, setSize1] = useState(false);
  const [size2, setSize2] = useState(false);
  const [size3, setSize3] = useState(false);
  const [foodGroupMapping, setFoodGroupMapping] = useState(null);

  const [visibleFoodGroup, setvisibleFoodGroup] = useState(false);
  const [visibleChangeName, setVisibleChangeName] = useState(false);
  const [approveVisible, setApproveVisible] = useState(false);

  const [modalName, setModalName] = useState(null);

  const [invalidPriceInput, setInvalidPriceInput] = useState(false);
  const [invalidDiscountInput, setInvalidDiscountInput] = useState(false);
  const [visibleAvaModal, setVisibleAvaModal] = useState(false);

  const increasePrice = () => {
    setPriceEach(priceEach + 1000);
  };

  const decreasePrice = () => {
    if (priceEach - 1000 >= 0) {
      setPriceEach(priceEach - 1000);
    }
  };

  const increaseDiscount = () => {
    if (discountRate + 1 <= 100) {
      setDiscountRate(discountRate + 1);
    }
  };

  const decreaseDiscount = () => {
    if (discountRate - 1 >= 0) {
      setDiscountRate(discountRate - 1);
    }
  };

  const setStatusId = (code) => {
    setData({ ...data, statusId: code });
  };

  const handleChoosePhoto = async (func) => {
    setVisibleAvaModal(true);
    func({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setVisibleAvaModal(false);
      const names = image.path.split("/");
      const name = names[names.length - 1];
      postImageWithUrl(image.path, name);
    });
  };

  const postImageWithUrl = (url, filename) => {
    setStateAvatar(true);
    const host = baseRequest.BASE_API_URL;
    RNFetchBlob.fetch(
      "POST",
      `${host}/api/image/upload`,
      {
        // dropbox upload headers

        "Content-Type": "multipart/form-data",
        // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
        // Or simply wrap the file path with RNFetchBlob.wrap().
      },
      [
        // element with property `filename` will be transformed into `file` in form data

        {
          name: "file",
          filename: filename,
          data: RNFetchBlob.wrap(url),
        },
        // custom content type
      ]
    )
      .then((res) => {
        let data = JSON.parse(res.data);
        // //console.log(data.url);
        // //console.log(
        //   "[INFO] Uri image: ",
        //   "http://112.213.88.49:20000" + data.url
        // );
        setImageId(data.id);
        setImage(`${host}${data.url}`);

        setStateAvatar(false);
      })
      .catch((err) => {
        // error handling ..
        Alert.log("Upload error");
        //console.log(err);
        setStateAvatar(false);
      });
  };

  const createParams = () => {
    let foodFoodTypeMappings = [];
    if (size1) {
      foodFoodTypeMappings.push({ foodTypeId: 1 });
    }

    if (size2) {
      foodFoodTypeMappings.push({ foodTypeId: 2 });
    }

    if (size3) {
      foodFoodTypeMappings.push({ foodTypeId: 3 });
    }

    let foodFoodGroupingMappings = [];

    // //console.log(foodGroupMapping);

    if (foodGroupMapping) {
      for (let index = 0; index < foodGroupMapping.length; index++) {
        foodFoodGroupingMappings.push({
          foodGroupingId: foodGroupMapping[index].id,
        });
      }
    }

    let params = {
      name: data.name,
      priceEach: priceEach,
      discountRate: discountRate,
      imageId: imageId,
      statusId: data.statusId,
      descreption: data.descreption,
      foodFoodTypeMappings: foodFoodTypeMappings,
      foodFoodGroupingMappings: foodFoodGroupingMappings,
    };

    return params;
  };

  const cancel = () => {
    props.navigation.navigate("MenuProvider");
  };

  const handleApprove = () => {
    createFood();
    setApproveVisible(false);
  };

  const createFood = async () => {
    let params = createParams();

    // //console.log("{INFO] Params: ", params);
    let response = await menuServices.createDish(params).catch(
      ((response) => {
        //console.log("[INFO] Response after create food: ", response);
      })((error) => {
        //console.log("[INFO] Error after create food: ", error);
      })
    );
    props.navigation.navigate("MenuProvider");
    //console.log("[INFO] Response in create Food: ", response);
  };

  return (
    <>
      <Modal
        data={{
          visible: approveVisible,
          setVisible: setApproveVisible,
          handleSubmit: handleApprove,
        }}
        button={{
          title: "Bạn có muốn lưu chỉnh sửa",
          titleSubmit: "Xác nhận",
          titleCancel: "Quay lại",
        }}
      />

      <Overlay
        isVisible={visibleChangeName}
        onBackdropPress={() => setVisibleChangeName(false)}
        overlayStyle={{ width: 300, alignItems: "center" }}
      >
        <Input
          placeholder="Tên món ăn"
          defaultValue={data.name}
          onChangeText={(text) => {
            setModalName(text);
          }}
        />
        <TouchableOpacity
          style={{
            width: 130,
            height: 45,
            backgroundColor: "#DC0000",
            alignItems: "center",
          }}
          onPress={() => {
            setData({ ...data, name: modalName });
            setVisibleChangeName(false);
          }}
        >
          <Text
            style={{
              top: 10,
              fontSize: 16,
              fontWeight: "700",
              color: "#ffffff",
            }}
          >
            Xong
          </Text>
        </TouchableOpacity>
      </Overlay>

      <ModalSelectFoodGroup
        data={foodGroupMapping}
        visible={visibleFoodGroup}
        setVisible={setvisibleFoodGroup}
        setFoodGroupMapping={setFoodGroupMapping}
      />
      {/* <TouchableOpacity onPress={() => testSignalIR()}>
        <Text>signalR</Text>
      </TouchableOpacity> */}
      <ScrollView style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {stateAvatar ? (
            <View>
              <Spinner />
            </View>
          ) : (
            <Avatar
              size={150}
              activeOpacity={0.7}
              source={
                image
                  ? {
                      uri: image,
                    }
                  : null
              }
              icon={{
                name: "camera",
                size: 50,
                color: "#d4d3cf",
                type: "font-awesome",
              }}
              // style={{ paddingVertical: 20 }}
              imageProps={(resizeMode = "center")}
              onPress={() => {
                setVisibleAvaModal(true);
              }}
              containerStyle={{ marginVertical: 20 }}
            />
          )}

          <TouchableOpacity
            onPress={() => {
              setVisibleChangeName(true);
            }}
          >
            <Text style={styles.titleImage}>
              {data.name ? data.name : "Tên món ăn"}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.title}>Các tuỳ chọn</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 13,
              paddingRight: 20,
              paddingTop: 14,
              paddingBottom: 14,
              // padding: 14,
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() => setSize1(!size1)}
                style={{ flexDirection: "row" }}
              >
                {!size1 ? (
                  <Image source={CircleIcon} style={styles.iconstyle} />
                ) : (
                  <Image source={TickIcon} style={styles.iconstyle} />
                )}
                <Text>Size nhỏ</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => setSize2(!size2)}
                style={{ flexDirection: "row" }}
              >
                {!size2 ? (
                  <Image source={CircleIcon} style={styles.iconstyle} />
                ) : (
                  <Image source={TickIcon} style={styles.iconstyle} />
                )}
                <Text>Size vừa</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => setSize3(!size3)}
                style={{ flexDirection: "row" }}
              >
                {!size3 ? (
                  <Image source={CircleIcon} style={styles.iconstyle} />
                ) : (
                  <Image source={TickIcon} style={styles.iconstyle} />
                )}
                <Text>Size lớn</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.title}>Nhóm món ăn</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 14,
              position: "relative",
              flex: 10,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 7,
                paddingLeft: 7,
              }}
              onPress={() => setvisibleFoodGroup(true)}
            >
              {/* {//console.log(foodGroupMapping)} */}
              {foodGroupMapping ? (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={foodGroupMapping}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.cardView}>
                        {
                          <View
                            style={{
                              // Card
                              borderRadius: 6,
                              elevation: 3,
                              backgroundColor: "#fff",
                              shadowOffset: { width: 1, height: 1 },
                              shadowColor: "#333",
                              shadowOpacity: 0.3,
                              shadowRadius: 2,
                              marginVertical: 2,
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text
                              style={{
                                color: "#000000",
                                fontSize: 16,
                                margin: 5,
                              }}
                            >
                              {item.kindOfFood}
                            </Text>
                            <TouchableOpacity
                            // onPress={() =>
                            //   handleDeleteGrouping(item.id)
                            // }
                            >
                              <Image
                                source={require("../../assets/icon/cross.png")}
                                style={{
                                  width: 10,
                                  height: 10,
                                  marginTop: 13,
                                  marginRight: 10,
                                }}
                              />
                            </TouchableOpacity>
                          </View>
                        }
                      </View>
                    );
                  }}
                />
              ) : (
                <Text>Bấm chọn</Text>
              )}
            </TouchableOpacity>
            {foodGroupMapping === null && (
              <TouchableOpacity
                style={{
                  right: 15,
                  position: "absolute",
                  flex: 3,
                  marginTop: 13,
                }}
              >
                <Image
                  source={ViewMore}
                  style={{ height: 13, width: 13 }}
                  onPress={() => setvisibleFoodGroup(true)}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 20,
              paddingRight: 35,
              height: 25,
              paddingTop: 2,
              color: "#8A8F9C",
              backgroundColor: "#DEDEDE",
            }}
          >
            <Text style={{ color: "#8A8F9C" }}>Đơn Giá (size nhỏ)</Text>
            <Text style={{ color: "#8A8F9C" }}> Khuyến mãi</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              padding: 14,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  decreasePrice();
                }}
              >
                <Image source={subIcon} style={styles.iconStyle} />
              </TouchableOpacity>
              <TouchableOpacity>
                {/* <TextInput value={data.priceEach.toString()} 
                  onChangeText={e=>{setData({...data,priceEach:parseInt(e)})}}
                /> */}

                <TextInput
                  style={{ height: 25, backgroundColor: "" }}
                  value={priceEach.toString()}
                  onChangeText={(e) => {
                    if (e.replace(/[^0-9]/g, "").length === e.length) {
                      if (Number(e) < 0) {
                        setPriceEach(0);
                      } else {
                        setPriceEach(Number(e));
                      }

                      setInvalidPriceInput(false);
                    } else {
                      setInvalidPriceInput(true);
                    }
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  increasePrice();
                }}
              >
                <Image source={addIcon} style={styles.iconStyle} />
              </TouchableOpacity>
              <Text>đồng</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  decreaseDiscount();
                }}
              >
                <Image source={subIcon} style={styles.iconStyle} />
              </TouchableOpacity>
              {/* <TextInput
                value={data.discountRate.toString()}
                onChangeText={(e) => {
                  setData({ ...data, discountRate: parseInt(e) });
                }}
              /> */}

              <TextInput
                style={{ height: 25, backgroundColor: "" }}
                value={discountRate.toString()}
                onChangeText={(e) => {
                  if (e.replace(/[^0-9]/g, "").length === e.length) {
                    if (Number(e) > 100) {
                      setDiscountRate(100);
                    } else if (Number(e) < 0) {
                      setDiscountRate(0);
                    } else {
                      setDiscountRate(Number(e));
                    }

                    setInvalidDiscountInput(false);
                  } else {
                    setInvalidDiscountInput(true);
                  }
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  increaseDiscount();
                }}
              >
                <Image source={addIcon} style={styles.iconStyle} />
              </TouchableOpacity>
              <Text>%</Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.title}>Trạng thái</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 13,
              paddingRight: 20,
              paddingTop: 14,
              paddingBottom: 14,
            }}
          >
            <View>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => {
                  setStatusId(1);
                }}
              >
                {data.statusId === 1 ? (
                  <Image source={TickIcon} style={styles.iconStyle} />
                ) : (
                  <Image source={CircleIcon} style={styles.iconStyle} />
                )}
                <Text>Bán</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => {
                  setStatusId(2);
                }}
              >
                {data.statusId != 1 ? (
                  <Image source={TickIcon} style={styles.iconStyle} />
                ) : (
                  <Image source={CircleIcon} style={styles.iconStyle} />
                )}
                <Text>Dừng bán</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <Input
            placeholder="Mô tả"
            defaultValue={data.descreption}
            onChangeText={(text) => {
              setData({ ...data, descreption: text });
            }}
          ></Input>
        </View>

        <View style={styles.btnView}>
          <TouchableOpacity
            style={{
              backgroundColor: "#c7c5bf",
              borderRadius: 8,
              width: 100,
              height: 40,
            }}
            onPress={() => cancel()}
          >
            <Text
              style={{
                fontSize: 16,
                padding: 8,
                paddingLeft: 36,
                color: "#000",
              }}
            >
              Hủy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#DC0000",
              borderRadius: 8,
              width: 110,
              height: 40,
            }}
            onPress={() => setApproveVisible(true)}
          >
            <Text
              style={{
                fontSize: 16,
                padding: 8,
                paddingLeft: 20,
                color: "#fff",
              }}
            >
              Thêm mới
            </Text>
          </TouchableOpacity>
        </View>

        <Overlay
          visible={visibleAvaModal}
          onBackdropPress={() => {
            setVisibleAvaModal(false);
          }}
        >
          <View style={{ height: 100, width: 300, justifyContent: "center" }}>
            <View style={{ height: 40, flexDirection: "row" }}>
              <TouchableOpacity
                style={{ flexDirection: "row", padding: 8 }}
                onPress={() => handleChoosePhoto(ImagePicker.openCamera)}
              >
                <Image
                  source={require("../../assets/icon/camera.png")}
                  style={{ width: 20, height: 20, padding: 10, marginRight: 5 }}
                />
                <Text style={{ fontSize: 16 }}> Chụp ảnh </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity
                style={{ flexDirection: "row", padding: 8 }}
                onPress={() => handleChoosePhoto(ImagePicker.openPicker)}
              >
                <Image
                  source={require("../../assets/icon/lib.png")}
                  style={{ width: 20, height: 20, padding: 10, marginRight: 5 }}
                />
                <Text style={{ fontSize: 16 }}> Chọn ảnh từ album </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Overlay>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6F7",
  },
  title: {
    height: 25,
    paddingLeft: 10,
    color: "#8A8F9C",
    backgroundColor: "#DEDEDE",
  },
  image: {
    height: 199,
    width: 216,
    alignSelf: "center",
  },
  titleImage: {
    alignSelf: "center",
    fontFamily: "Reguler",
    fontSize: 20,
    marginVertical: 10,
  },
  iconstyle: {
    width: 18,
    height: 18,
    marginRight: 10,
    marginLeft: 10,
  },
  iconStyle: {
    width: 21,
    height: 21,
    marginRight: 10,
    marginLeft: 10,
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "space-around",
    top: 10,
    marginBottom: 20,
  },
});
