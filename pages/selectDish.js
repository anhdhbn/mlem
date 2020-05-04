import React, { Component } from "react";
import {

    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
} from "react-native";

import { Overlay, CheckBox } from 'react-native-elements';


import NavBar from "../components/cardList/NavBar";
import Header from "../components/header/header";
import Icon from "react-native-vector-icons/FontAwesome"
import SmartDishCard from "../components/smartDishCard/smartDishCard";
export default class order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            listDish: [

                {

                    linkImageDish:
                        "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
                    nameDish: "Món 3",
                    describeDish: "Món này không được giảm giá",
                    price: 100000,
                    promoPrice: null,
                    isActive: false

                },
                {

                    linkImageDish:
                        "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
                    nameDish: "Món 1",
                    describeDish: "Miêu tả món ăn",
                    price: 100000,
                    promoPrice: 50000,
                    isActive: false
                },
                {

                    linkImageDish:
                        "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
                    nameDish: "Món 2",
                    describeDish: "Miêu tả món ăn",
                    price: 100000,
                    promoPrice: 50000,
                    isActive: false
                },
                {

                    linkImageDish:
                        "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
                    nameDish: "Món 3",
                    describeDish: "Món này không được giảm giá",
                    price: 100000,
                    promoPrice: null,
                    isActive: false
                },

            ],
            totalPrice: 0,
            totalPromoPrice: 0,
            modal: {

                linkImageDish:
                    "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
                nameDish: "Món 3",
                describeDish: "Món này không được giảm giá",
                price: 100000,
                quantity: 20,
                promoPrice: 50000,
                isActive: false

            },
            smallSize: false,
            normalSize: false,
            bigSize: false,
        };

    }

    handClickIcon(nameDish) {
        // console.log("[INFO] CLick icon in favouriteDish.js");
        let newListFavouriteDishs = this.state.listDish.map((dish) =>
            dish.nameDish === nameDish ? { ...dish, isLike: !dish.isLike } : dish
        );
        this.setState({ listDish: newListFavouriteDishs });
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });

    };

    hideModal = () => {
        this.setState({ showModal: false });

    };

    render() {

        return (
            <SafeAreaView style={{ backgroundColor: '#F5F6F7', flex: 1 }}>
                <ScrollView >
                    <Header title="Chọn món"  ></Header>


                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 8, }}>Danh mục</Text>
                    </View>

                    <NavBar />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 45, padding: 10 }}>
                        <TouchableOpacity style={{}}>
                            <Text style={{ fontSize: 16 }}> Top bán chạy </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}}>
                            <Text style={{ fontSize: 16 }}> Đặt gần đây </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}}>
                            <Text style={{ fontSize: 16 }}> Giá thấp đến cao </Text>
                        </TouchableOpacity>
                    </View>

                    {/* <SafeAreaView style={{ height: 350 }}> */}

                    <View>
                        {this.state.listDish.map((dish) => (
                            <SmartDishCard
                                linkImageDish={dish.linkImageDish}
                                nameDish={dish.nameDish}
                                describeDish={dish.describeDish}
                                price={dish.price}
                                promoPrice={dish.promoPrice}
                                // For icon
                                linkIconActive={require("../assets/icon/+.png")}
                                linkIconInactive={require("../assets/icon/+.png")}
                                handClickIcon={this.handClickIcon}
                                isActive={true}
                            ></SmartDishCard>
                        ))}
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.toggleModal()}>
                            <Text>toggleModal</Text>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <Overlay visible={this.state.showModal} onBackdropPress={this.hideModal} overlayStyle={{
                            width: '100%',
                            backgroundColor: '#FFFFFF',
                            height: 410,

                            position: 'absolute',
                            bottom: 0
                        }} >


                            <View style={{ alignItems: 'center', }}>
                                <Text style={{ fontSize: 27, marginTop: 4, fontFamily: 'regular' }}>Tuỳ chỉnh món</Text>
                            </View>
                            <View style={{ width: '100%', borderWidth: 0.8, borderColor: '#adaaaa', marginTop: 4, marginBottom: 4, }}></View>
                            <View style={{
                                // Card
                                borderRadius: 6,
                                elevation: 3,
                                backgroundColor: "#fff",
                                shadowOffset: { width: 1, height: 1 },
                                shadowColor: "#333",
                                shadowOpacity: 0.3,
                                shadowRadius: 2,
                                marginVertical: 6,
                                // Another
                                flexDirection: "row",
                            }}>
                                <Image
                                    source={{
                                        uri: this.state.modal.linkImageDish,
                                    }}
                                    style={{ width: 100, height: 100, marginHorizontal: 10, flex: 3 }}
                                ></Image>
                                <View style={{ flex: 5, flexDirection: "column", marginLeft: 10 }}>
                                    <Text style={{ fontSize: 20 }}>{this.state.modal.nameDish}</Text>
                                    <Text style={{ fontSize: 10 }}>{this.state.modal.describeDish}</Text>
                                    <View >
                                        <Text style={{ textDecorationLine: "line-through", color: "grey" }}>
                                            {this.state.modal.price} đ
                                                    </Text>
                                        <Text>{this.state.modal.promoPrice} đ</Text>
                                    </View>
                                </View>
                                <View style={{ right: 20, marginTop: 50 }} >
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => this.subNumOfDish(this.state.modal.nameDish)}>
                                            <Image source={require("../assets/icon/-.png")}
                                                style={{ width: 25, height: 25, }} />
                                        </TouchableOpacity>
                                        <Text style={{ marginLeft: 8, marginRight: 8, fontSize: 16 }} >
                                            {
                                                this.state.modal.quantity
                                            }
                                        </Text>
                                        <TouchableOpacity onPress={() => this.addNumOfDish(this.state.modal.nameDish)}>
                                            <Image source={require("../assets/icon/+.png")}
                                                style={{ width: 25, height: 25 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={{ height: 30, backgroundColor: '#d6d5d2', width: '100%', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16, paddingLeft: 10 }}>Size</Text>
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', position: 'relative', padding: 2 }}>
                                    <View>
                                        <Text>Size nhỏ</Text>
                                        <Text>{this.state.modal.promoPrice * 0.5}</Text>
                                    </View>
                                    <View style={{ right: -30, position: 'absolute' }}>
                                        <CheckBox
                                            checked={this.state.smallSize}
                                            checkedColor='red'
                                            onPress={() => { this.setState({ smallSize: true, normalSize: false, bigSize: false }) }}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', position: 'relative', padding: 2, }}>
                                    <View>
                                        <Text>Size Vừa</Text>
                                        <Text>{this.state.modal.promoPrice * 0.8}</Text>
                                    </View>
                                    <View style={{ right: -30, position: 'absolute' }}>
                                        <CheckBox
                                            checked={this.state.normalSize}
                                            checkedColor='red'
                                            onPress={() => { this.setState({ smallSize: false, normalSize: true, bigSize: false }) }}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', position: 'relative', padding: 2, }}>
                                    <View>
                                        <Text>Size Lớn</Text>
                                        <Text>{this.state.modal.promoPrice}</Text>
                                    </View>
                                    <View style={{ right: -30, position: 'absolute' }}>
                                        <CheckBox
                                            checked={this.state.bigSize}
                                            checkedColor='red'
                                            onPress={() => { this.setState({ smallSize: false, normalSize: false, bigSize: true }) }}
                                        />
                                    </View>
                                </View>
                                <View style={{
                                    bottom: 0,
                                    backgroundColor: '#fff',
                                    borderRadius: 10
                                }}>
                                    <View style={{ flexDirection: 'row', position: 'relative', height: 40, padding: 10, marginBottom: 30, marginTop: 10 }}>
                                        <View style={{ paddingLeft: 10 }}>

                                            <Text style={{ fontSize: 19, fontWeight: 'bold', }}> {this.state.totalPromoPrice}đ</Text>
                                            <Text style={{ textDecorationLine: "line-through", color: "grey" }}>
                                                {this.state.totalPrice}đ</Text>
                                        </View>
                                        <View style={{ position: 'absolute', right: 20, }}>
                                            <TouchableOpacity style={{ backgroundColor: '#DC0000', borderRadius: 8, width: 90, height: 40, marginTop: 10 }}>
                                                <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 8, paddingLeft: 10, color: '#fff', }}>Thêm vào </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Overlay>
                    </View>
                </ScrollView>
                <View style={{
                    bottom: 0,
                    backgroundColor: '#fff',
                    borderRadius: 10
                }}>
                    <View style={{ flexDirection: 'row', position: 'relative', height: 40, padding: 10, marginBottom: 30, marginTop: 10 }}>
                        <View style={{ paddingLeft: 10 }}>

                            <Text style={{ fontSize: 19, fontWeight: 'bold', }}> {this.state.totalPromoPrice}đ</Text>
                            <Text style={{ textDecorationLine: "line-through", color: "grey" }}>
                                {this.state.totalPrice}đ</Text>
                        </View>
                        <View style={{ position: 'absolute', right: 20, }}>
                            <TouchableOpacity style={{ backgroundColor: '#DC0000', borderRadius: 8, width: 90, height: 40, marginTop: 10 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 8, paddingLeft: 10, color: '#fff', }}>Thêm vào </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );


    }

}

console.disableYellowBox = true