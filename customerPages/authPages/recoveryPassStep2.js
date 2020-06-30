import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "../../styles/authScreen/recoveryPassStep2Style";
import authServices from "../../customerServices/authServices";
import CheckData from "./checkData";
import SnackBar from "../../components/common/snackbarUpdating";
import { Button } from "react-native-elements";
export default class recoveryPassStep2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navigation: this.props,

      passwordError: null,
      confirmPasswordError: null,

      visibleAlert: false,
      notification:null,
      loading: false,
      password: null,
      confirmPassword: null,
    };

    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getData = this.getData.bind(this);
  }

  handlePassword(text) {
    this.setState({ password: text });
  }

  handleConfirmPassword(text) {
    this.setState({ confirmPassword: text });
  }

  setLoading(state) {
    this.setState({ loading: state });
  }

  getData() {
    return {
      id: 23,//this.props.route.params.id,
      password: this.state.password.toString(),
      confirmPassword: this.state.password.toString(),
    };
  }

  async onSubmit() {
    let checkData = new CheckData();
    if (!checkData.checkPassword(this.state.password)) {
      this.setPasswordError();

    } else {
      if (!checkData.checkPassword(this.state.confirmPassword)) {
        this.setConfirmPasswordError();
      }
      else {
        if (!checkData.comparePassword(this.state.password, this.state.confirmPassword)) {
          this.setComparePasswordError();
        }
        else {
          this.setLoading(true);
          let data = this.getData();

          authServices.recoveryPass(data)
            .then(async res => {
              await this.setState({notification:"Khôi phục mật khẩu thành công"})
              this.setAlert(true);
              setTimeout(() => {
                this.props.navigation.navigate("SignIn");
                
              }, 2000);
            })
            .catch(async(err) => {
              //console.log('error: ', err);
              await this.setState({notification:err.data})
              this.setAlert(true);
            });
          this.setLoading(false);
        }
      }
    }


    /* if (checkData.checkPassword(this.state.password)) {
      this.cleanPasswordError();
      console.log('aaaa');
      
      if (checkData.checkPassword(this.state.confirmPassword)) {
        this.cleanConfirmPasswordError();
        if (
          checkData.comparePassword(
            this.state.password,
            this.state.confirmPassword
          )
        ) {
          this.cleanComparePasswoedError();
          this.setLoading(true);
          let data = this.getData();
          console.log(data);

          let response = await authServices
            .recoveryPass(data)
            .catch((reason) => {
              // console.log("==========================================");
              const message = reason.response.data;
              // console.log("[INFO] message in signUp: ", message);
              this.setAlert(true);
            });
          this.setLoading(false);
          this.props.navigation.navigate("SignIn");
        } else {
          // Mat khau xac nhan khong khop
          this.setComparePasswordError();
        }
      } else {
        // Mat khau xac nhan khoon hop le
        this.setConfirmPasswordError();
      }
    } else {
      // Mat khau khong hop le
      console.log('aaaaaaaâ');
      
      this.setPasswordError();
    } */
  }

  setPasswordError = () => {
    this.setState({ passwordError: "Mật khẩu không hợp lệ" });
  };

  cleanPasswordError = () => {
    this.setState({ passwordError: null });
  };

  setConfirmPasswordError = () => {
    this.setState({ passwordError: "Mật khẩu xác nhận không hợp lệ" });
  };

  cleanConfirmPasswordError = () => {
    this.setState({ passwordError: null });
  };

  setComparePasswordError = () => {
    this.setState({
      passwordError: "Mật khẩu xác nhận không trùng khớp",
    });
  };

  cleanComparePasswoedError = () => {
    this.setState({ passwordError: null });
  };

  setAlert = (visible) => {
    this.setState({ visibleAlert: visible });
  };

  _onDismissSnackBar = () => {
    this.setState({ visibleAlert: false });
  };

  render() {
    return (
      <>
        <LinearGradient colors={["#C9463D", "#26071A"]} style={styles.linear}>
          <SnackBar
            visible={this.state.visibleAlert}
            _onDismissSnackBar={this._onDismissSnackBar}
            actionText="Hide"
            duration={5000}
            text={this.state.notification}
          />
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              style={{ flex: 2 }}
              onPress={() => this.props.navigation.navigate("SignIn")}
            >
              <Image
                source={require("../../assets/icon/back.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            <View
              style={{
                position: "absolute",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  flex: 6,
                  fontSize: 16,
                }}
              >
                Thay đổi mật khẩu
              </Text>
            </View>
          </View>
          <View style={{ alignItems: "center", marginTop: 80 }}>
            <Text style={styles.mlem}>Mlem Mlem</Text>
          </View>

          <KeyboardAvoidingView behavior="padding">
            <View style={{ alignItems: "center" }}>
              {this.state.passwordError ? (
                <View>
                  <Text>{this.state.passwordError}</Text>
                </View>
              ) : null}
              <View style={styles.viewInput}>
                <Image
                  source={require("../../assets/icon/key.png")}
                  style={styles.image}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Mật khẩu"
                  placeholderTextColor="#c2bbba"
                  secureTextEntry={true}
                  onChangeText={this.handlePassword}
                />
              </View>
              <View style={styles.viewInput}>
                <Image
                  source={require("../../assets/icon/key.png")}
                  style={styles.image}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Xác nhận mật khẩu"
                  placeholderTextColor="#c2bbba"
                  secureTextEntry={true}
                  onChangeText={this.handleConfirmPassword}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
          {this.state.loading ? (
            <View style={{ marginTop: 20, alignItems: "center" }}>
              <TouchableOpacity style={styles.submitBtn}>
                <Button type="clear" loading={true} />
              </TouchableOpacity>
            </View>
          ) : (
              <View style={{ marginTop: 10, alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={() => this.onSubmit()}
                >
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                  >
                    Xác nhận
                </Text>
                </TouchableOpacity>
              </View>
            )}
          <View
            style={{
              marginTop: 10,
              flex: 1,
              justifyContent: "flex-end",
              marginBottom: 50,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SignIn")}
            >
              <Text style={{ color: "white", fontSize: 14 }}>
                Quay lại đăng nhập!
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </>
    );
  }
}
