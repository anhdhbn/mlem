import React, { Component, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import styles from './style'
function signIn() {
    return (
        <LinearGradient colors={['#C9463D', '#26071A']} style={styles.linear}>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    ĐĂNG NHẬP
                </Text>
            </View>
            <View style={{ alignItems: 'center', marginTop: 15 }}>
                <Text style={styles.mlem} >Mlem Mlem</Text>
            </View>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <TouchableOpacity style={styles.fbWay} >
                    <Image source={require('../../icon/fb.png')} style={styles.imgFBGG} />
                    <Text style={{ paddingRight: 30, color: 'white' }}>tiếp tục với Facebook</Text>
                </TouchableOpacity>

            </View>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <TouchableOpacity style={styles.ggWay} >
                    <Image source={require('../../icon/gg.png')} style={styles.imgFBGG} />
                    <Text style={{ paddingRight: 30, color: 'black' }}>tiếp tục với Google</Text>
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>

                    <View style={styles.line}>

                    </View>
                    <Text style={{ color: 'white', fontSize: 11 }}>
                        hoặc
                    </Text>
                    <View style={styles.line}>

                    </View>
                </View>
            </View>
            <KeyboardAvoidingView behavior="padding">
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.viewInput}>
                        <Image
                            source={require('../../icon/email.png')}
                            style={styles.image} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Email / số điện thoại"
                            placeholderTextColor="#c2bbba"
                        />
                    </View>

                    <View style={styles.viewInput}>
                        <Image
                            source={require('../../icon/key.png')}
                            style={styles.image} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Mật khẩu"
                            placeholderTextColor="#c2bbba"
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={{ marginLeft: 120, marginTop: 3 }}>
                        <TouchableOpacity>
                            <Text style={{ color: 'white', fontSize: 11 }}>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
            <View style={{ marginTop: 10, alignItems: 'center' }}>
                <TouchableOpacity style={styles.submitBtn} >

                    <Text style={styles.textBtnSubmit}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={{ color: 'white', fontSize: 12 }}>Bạn chưa có tài khoản? </Text>
                <TouchableOpacity>
                    <Text style={styles.textDecoration}> Đăng ký ngay!</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )

}

export default signIn;