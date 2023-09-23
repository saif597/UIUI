// import * as React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Modal,
//   TextInput,
//   Alert,
//   Vibration,
// } from 'react-native';
// import {Camera} from 'react-native-vision-camera';
// import {useCameraDevices, useFrameProcessor} from 'react-native-vision-camera';
// import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';

// export default function App() {
//   const [isTorchOn, setIsTorchOn] = React.useState(false);
//   const [barcodeArray, setBarcodeArray] = React.useState([]);
//   const [isModalVisible, setIsModalVisible] = React.useState(false);
//   const [barcodeInput, setBarcodeInput] = React.useState('');

//   const devices = useCameraDevices();
//   const device = devices.back;

//   const [frameProcessor, barcodes] = useScanBarcodes(
//     [BarcodeFormat.ALL_FORMATS],
//     {
//       checkInverted: true,
//     },
//   );

//   const toggleTorch = () => {
//     setIsTorchOn(!isTorchOn);
//   };

//   const frameProcessorCallback = frame => {
//     // Process frame here
//   };

//   useFrameProcessor(frameProcessorCallback);

//   const handleBarcodeScan = () => {
//     if (barcodes.length > 0) {
//       const barcode = barcodes[0].data;
//       vibrate();
//       setBarcodeArray([...barcodeArray, barcode]);
//       setTimeout(() => {
//         // Resume scanning
//       }, 1500);
//     }
//   };

//   const toggleModal = () => {
//     setIsModalVisible(!isModalVisible);
//   };

//   const handleEnterBarcode = () => {
//     if (barcodeInput.trim() !== '') {
//       setBarcodeArray([...barcodeArray, barcodeInput]);
//       toggleModal();
//       setBarcodeInput('');
//     }
//   };

//   const discardItems = () => {
//     setBarcodeArray([]);
//   };

//   const showBill = () => {
//     if (barcodeArray.length > 0) {
//       Alert.alert('Scanned Barcodes', barcodeArray.join('\n'), [{text: 'OK'}]);
//       setBarcodeArray([]);
//     }
//   };

//   const vibrate = () => {
//     Vibration.vibrate(200);
//   };

//   return (
//     <View style={{flex: 1}}>
//       <Camera
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//         torch={isTorchOn ? 'on' : 'off'}
//         frameProcessor={frameProcessor}
//         frameProcessorFps={5}
//         onFrameProcessed={handleBarcodeScan}
//       />
//       {barcodeArray.length > 0 && (
//         <View style={styles.countBadge}>
//           <Text style={styles.badgeText}>{barcodeArray.length}</Text>
//         </View>
//       )}

//       <TouchableOpacity style={styles.iconButton} onPress={toggleTorch}>
//         <Text>Flash</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.iconButton} onPress={toggleModal}>
//         <Text>Enter Barcode</Text>
//       </TouchableOpacity>

//       {barcodeArray.length > 0 && (
//         <>
//           <TouchableOpacity style={styles.iconButton} onPress={discardItems}>
//             <Text>Discard</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.iconButton} onPress={showBill}>
//             <Text>Bill</Text>
//           </TouchableOpacity>
//         </>
//       )}

//       <Modal visible={isModalVisible} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Text>Enter Barcode:</Text>
//           <TextInput
//             value={barcodeInput}
//             onChangeText={text => setBarcodeInput(text)}
//             placeholder="Enter Barcode"
//           />
//           <TouchableOpacity onPress={handleEnterBarcode}>
//             <Text>Enter</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={toggleModal}>
//             <Text>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   iconButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//   },
//   countBadge: {
//     position: 'absolute',
//     bottom: 20,
//     right: 50,
//     backgroundColor: 'red',
//     borderRadius: 15,
//     padding: 5,
//   },
//   badgeText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
import * as React from 'react';

import {StyleSheet, Text} from 'react-native';
import {useCameraDevices} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes(
    [BarcodeFormat.ALL_FORMATS],
    {
      checkInverted: true,
    },
  );

  // Alternatively you can use the underlying function:
  //
  // const frameProcessor = useFrameProcessor((frame) => {
  //   'worklet';
  //   const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
  //   runOnJS(setBarcodes)(detectedBarcodes);
  // }, []);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  return (
    device != null &&
    hasPermission && (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
        {barcodes.map((barcode, idx) => (
          <Text key={idx} style={styles.barcodeTextURL}>
            {barcode.displayValue}
          </Text>
        ))}
      </>
    )
  );
}

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'red',
  },
});
