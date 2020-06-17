keytool -exportcert -alias androiddebugkey -keystore "D:\projects\mlem\android\app\debug.keystore" | "C:\OpenSSL-Win64\bin\openssl" sha1 -binary | "C:\OpenSSL-Win64\bin\openssl" base64



