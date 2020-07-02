export default class CheckData {
  checkEmail(email) {
    if (email === null) {
      //console.log("Email null");
      return false;
    }
    if (email.length < 8) {
      //console.log("Email length");
      return false;
    }

    return true;
  }
  checkPassword(pass) {
    if (pass === null) {
      return false;
    }
    if (pass.length < 8) {
      return false;
    }

    return true;
  }
  comparePassword(pass, confirmPass) {
    if (pass === confirmPass) {
      return true;
    }
    return false;
  }
  checkPhoneNumber(phone) {
    if (phone === null) {
      return false;
    }
    if (phone.replace(/[^0-9]/g, "").length != phone.length) {
      return false;
    }
    if (phone.length != 10) {
      return false;
    }
    return true;
  }
}
