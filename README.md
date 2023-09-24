npm install
inside node_modules/react-native-scan-barcode/android/buil.gradle
  1-change compile to implementation 
  2-compileSdkVersion 30 
  3-targetSdkVersion 30
cd android ./gradlew clean
cd.. npx react-native run-android
