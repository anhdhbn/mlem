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
import NavBar from "../components/cardList/NavBar";
import Header from "../components/header/header";
import ScrollableTabView, {
    DefaultTabBar,
} from "react-native-scrollable-tab-view";
import { FlatList } from "react-native-gesture-handler";

// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// const Stack = createStackNavigator();
export default class order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            listDish: [

                {
                    id: 1,
                    linkImageDish:
                        "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
                    nameDish: "Món 3",
                    describeDish: "Món này không được giảm giá",
                    price: 100000,
                    promoPrice: null,
                    isSelect: false,
                },
                {
                    id: 2,
                    linkImageDish:
                        "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
                    nameDish: "Món 1",
                    describeDish: "Miêu tả món ăn",
                    price: 100000,
                    promoPrice: 50000,
                    isSelect: false,
                },
                {
                    id: 3,
                    linkImageDish:
                        "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
                    nameDish: "Món 2",
                    describeDish: "Miêu tả món ăn",
                    price: 100000,
                    promoPrice: 50000,
                    isSelect: false,
                },
                {
                    id: 4,
                    linkImageDish:
                        "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
                    nameDish: "Món 3",
                    describeDish: "Món này không được giảm giá",
                    price: 100000,
                    promoPrice: null,
                    isSelect: false,
                },
                {
                    id: 5,
                    linkImageDish:
                        "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
                    nameDish: "Món 1",
                    describeDish: "Miêu tả món ăn",
                    price: 100000,
                    promoPrice: 50000,
                    isSelect: false,
                },
                {
                    id: 6,
                    linkImageDish:
                        "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
                    nameDish: "Món 2",
                    describeDish: "Miêu tả món ăn",
                    price: 100000,
                    promoPrice: 50000,
                    isSelect: false,
                },
                {
                    id: 7,
                    linkImageDish:
                        "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
                    nameDish: "Món 3",
                    describeDish: "Món này không được giảm giá",
                    price: 100000,
                    promoPrice: null,
                    isSelect: false,
                },
                {
                    id: 8,
                    linkImageDish:
                        "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
                    nameDish: "Món 1",
                    describeDish: "Miêu tả món ăn",
                    price: 100000,
                    promoPrice: 50000,
                    isSelect: false,
                },
                {
                    id: 9,
                    linkImageDish:
                        "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
                    nameDish: "Món 2",
                    describeDish: "Miêu tả món ăn",
                    price: 100000,
                    promoPrice: 50000,
                    isSelect: false,
                },
                {
                    id: 10,
                    linkImageDish:
                        "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
                    nameDish: "Món 3",
                    describeDish: "Món này không được giảm giá",
                    price: 100000,
                    promoPrice: null,
                    isSelect: false,
                },
                {
                    id: 11,
                    linkImageDish:
                        "https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png",
                    nameDish: "Món 1",
                    describeDish: "Miêu tả món ăn",
                    price: 100000,
                    promoPrice: 50000,
                    isSelect: true,
                },





            ],
            totalPrice: 0,
            totalPromoPrice: 0,
            clickOn: 1,
        };

    }

    
    pressIcon = (id) => {
       
        let newListDish =  this.state.listDish.map((dish) =>
            dish.id === id ? { ...dish, isSelect: !dish.isSelect,
             } : dish
           
        ); 
        
         this.setState({ listDish: newListDish});
        
    }
    render() {

        return (
            <ScrollView style={{ backgroundColor: '#F5F6F7', flex: 1 }}>
                <Header title="Chọn món"  ></Header>


                <View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 8, }}>Danh mục</Text>
                </View>

                <NavBar />
                {/*  */}
                <ScrollableTabView
                    initialPage={0}
                    // style={{ height:700 }}
                    style={{ height: 350 }}

                >
                    <View tabLabel="Top bán chạy" >
                        <SafeAreaView >
                            <FlatList
                                data={this.state.listDish}
                                keyExtractor={(dish) => dish.id}
                                
                                renderItem={({ item }) => {
                                    return (
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
                                                marginVertical: 6,
                                                // Another
                                                flexDirection: "row",
                                            }}
                                        >
                                            <Image
                                                source={{
                                                    uri: item.linkImageDish
                                                }}
                                                style={{ width: 100, height: 100, marginHorizontal: 10, flex: 3 }}
                                            ></Image>
                                            <View style={{ flex: 5, flexDirection: "column" }}>
                                                <Text style={{ fontSize: 20 }}>{item.nameDish}</Text>
                                                <Text>{item.describeDish}</Text>

                                                {item.promoPrice === null ? (
                                                    <Text style={{}}>{item.price} đ</Text>
                                                ) : (

                                                        <View>
                                                            <Text style={{ textDecorationLine: "line-through", color: "grey" }}>
                                                                {item.price} đ
                                                            </Text>
                                                            <Text>{item.promoPrice} đ</Text>
                                                        </View>

                                                    )}

                                            </View>
                                            <View
                                                style={{
                                                    flex: 2,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <TouchableOpacity
                                                    activeOpacity={0.5}
                                                    onPress={()=>this.pressIcon(item.id)}
                                                >
                                                    {item.isSelect === false ? (
                                                        <Image
                                                            source={require('../assets/icon/+.png')}
                                                            style={{
                                                                height: 30,
                                                                width: 30,
                                                            }}
                                                        />
                                                    ) : (
                                                            <Image
                                                                source={require('../assets/icon/-.png')}
                                                                style={{
                                                                    height: 30,
                                                                    width: 30,
                                                                }}
                                                            />
                                                        )}
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                }}
                                
                            >

                            </FlatList>
                        </SafeAreaView>
                    </View>

                    <View tabLabel="Đặt gần đây" >
                        <SafeAreaView >
                            <FlatList
                                data={this.state.listDish}
                                keyExtractor={(dish) => dish.id}
                                renderItem={({ item }) => {
                                    return (
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
                                                marginVertical: 6,
                                                // Another
                                                flexDirection: "row",
                                            }}
                                        >
                                            <Image
                                                source={{
                                                    uri: item.linkImageDish
                                                }}
                                                style={{ width: 100, height: 100, marginHorizontal: 10, flex: 3 }}
                                            ></Image>
                                            <View style={{ flex: 5, flexDirection: "column" }}>
                                                <Text style={{ fontSize: 20 }}>{item.nameDish}</Text>
                                                <Text>{item.describeDish}</Text>

                                                {item.promoPrice === null ? (
                                                    <Text style={{}}>{item.price} đ</Text>
                                                ) : (

                                                        <View>
                                                            <Text style={{ textDecorationLine: "line-through", color: "grey" }}>
                                                                {item.price} đ
                                                            </Text>
                                                            <Text>{item.promoPrice} đ</Text>
                                                        </View>

                                                    )}

                                            </View>
                                            <View
                                                style={{
                                                    flex: 2,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <TouchableOpacity
                                                    activeOpacity={0.5}
                                                    onPress={()=>this.pressIcon(item.id)}
                                                >
                                                    {item.isSelect === false ? (
                                                        <Image
                                                            source={require('../assets/icon/+.png')}
                                                            style={{
                                                                height: 30,
                                                                width: 30,
                                                            }}
                                                        />
                                                    ) : (
                                                            <Image
                                                                source={require('../assets/icon/-.png')}
                                                                style={{
                                                                    height: 30,
                                                                    width: 30,
                                                                }}
                                                            />
                                                        )}
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                }}
                            >

                            </FlatList>
                        </SafeAreaView>


                    </View>
                    <View tabLabel="Giá thấp đến cao" >
                        <SafeAreaView >
                            <FlatList
                                data={this.state.listDish}
                                keyExtractor={(dish) => dish.id}
                                renderItem={({ item }) => {
                                    return (
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
                                                marginVertical: 6,
                                                // Another
                                                flexDirection: "row",
                                            }}
                                        >
                                            <Image
                                                source={{
                                                    uri: item.linkImageDish
                                                }}
                                                style={{ width: 100, height: 100, marginHorizontal: 10, flex: 3 }}
                                            ></Image>
                                            <View style={{ flex: 5, flexDirection: "column" }}>
                                                <Text style={{ fontSize: 20 }}>{item.nameDish}</Text>
                                                <Text>{item.describeDish}</Text>

                                                {item.promoPrice === null ? (
                                                    <Text style={{}}>{item.price} đ</Text>
                                                ) : (

                                                        <View>
                                                            <Text style={{ textDecorationLine: "line-through", color: "grey" }}>
                                                                {item.price} đ
                                                            </Text>
                                                            <Text>{item.promoPrice} đ</Text>
                                                        </View>

                                                    )}

                                            </View>
                                            <View
                                                style={{
                                                    flex: 2,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <TouchableOpacity
                                                    activeOpacity={0.5}
                                                    onPress={()=>this.pressIcon(item.id)}
                                                >
                                                    {item.isSelect === false ? (
                                                        <Image
                                                            source={require('../assets/icon/+.png')}
                                                            style={{
                                                                height: 30,
                                                                width: 30,
                                                            }}
                                                        />
                                                    ) : (
                                                            <Image
                                                                source={require('../assets/icon/-.png')}
                                                                style={{
                                                                    height: 30,
                                                                    width: 30,
                                                                }}
                                                            />
                                                        )}
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                }}
                            >

                            </FlatList>
                        </SafeAreaView>
                    </View>
                </ScrollableTabView>
                {/* </SafeAreaView> */}


                {/* list of dish
                 */}



                <View style={{}}>
                    <View style={{ flexDirection: 'row', position: 'relative', backgroundColor: '#fff', height: 80, padding: 10, marginBottom: 30, marginTop: 10 }}>
                        <View style={{ marginTop: 8, paddingLeft: 10 }}>

                            <Text style={{ fontSize: 19, fontWeight: 'bold', }}> {this.state.totalPromoPrice}đ</Text>
                            <Text style={{ textDecorationLine: "line-through", color: "grey" }}>
                                {this.state.totalPrice}đ</Text>
                        </View>
                        <View style={{ position: 'absolute', right: 20, }}>
                            <TouchableOpacity style={{ backgroundColor: '#DC0000', borderRadius: 8, width: 70, height: 40, marginTop: 20 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 8, paddingLeft: 20, color: '#fff', }}>Đặt</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );


    }
}

console.disableYellowBox = true