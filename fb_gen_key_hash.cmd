keytool -exportcert -alias my-release-key.keystore -keystore my-release-key.keystore | openssl sha1 -binary | openssl base64