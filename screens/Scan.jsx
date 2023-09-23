import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Vibration,
} from 'react-native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import Ionicons from 'react-native-vector-icons/Ionicons';

const App = () => {
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const [frameProcessor, barcodes] = useScanBarcodes(
    [BarcodeFormat.ALL_FORMATS],
    {
      checkInverted: true,
    },
  );

  const [isFlashOn, setIsFlashOn] = React.useState(false);
  const [isFrontCamera, setIsFrontCamera] = React.useState(false);
  const [scannedItems, setScannedItems] = React.useState([]);
  const [showClearButton, setShowClearButton] = React.useState(false);
  const [canScan, setCanScan] = React.useState(true);

  const [isManualEntry, setIsManualEntry] = React.useState(false);
  const [manualBarcodeType, setManualBarcodeType] = React.useState('');
  const [manualBarcode, setManualBarcode] = React.useState('');

  const toggleManualEntry = () => {
    setIsManualEntry(!isManualEntry);
    setManualBarcodeType('');
    setManualBarcode('');
  };

  const enterBarcodeManually = () => {
    if (manualBarcodeType && manualBarcode) {
      const newItem = {barcode: manualBarcode, type: manualBarcodeType};
      setScannedItems([...scannedItems, newItem]);
      setShowClearButton(true);
      setManualBarcodeType('');
      setManualBarcode('');
      Vibration.vibrate(200); // Vibrate when manually entering
    }
    setIsManualEntry(false);
  };

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  React.useEffect(() => {
    const scanTimeout = setTimeout(() => {
      setCanScan(true);
    }, 1000); // 1-second delay
    return () => clearTimeout(scanTimeout);
  }, [scannedItems]);

  const barcodeReceived = e => {
    if (!canScan) {
      return;
    }
    Vibration.vibrate(200); // Vibrate when a barcode is scanned
    const newItem = {barcode: e.data, type: e.type};
    setScannedItems([...scannedItems, newItem]);
    setShowClearButton(true);
    setCanScan(false); // Disable scanning for 1 second
  };

  const clearItems = () => {
    setScannedItems([]);
    setShowClearButton(false);
  };

  return (
    <View style={styles.container}>
      {hasPermission && (
        <>
          <Camera
            style={styles.cameraView}
            device={devices[isFrontCamera ? 'front' : 'back']}
            isActive={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
            torch={isFlashOn ? 'on' : 'off'}
          />
          {barcodes.map((barcode, idx) => (
            <Text key={idx} style={styles.barcodeText}>
              {barcode.displayValue}
            </Text>
          ))}
        </>
      )}

      <View style={styles.topIconsContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setIsFlashOn(!isFlashOn)}>
          <Ionicons
            name={isFlashOn ? 'flash' : 'flash-off'}
            size={30}
            color={isFlashOn ? 'yellow' : 'white'}
          />
          <Text style={styles.buttonText}>Flash</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setIsFrontCamera(!isFrontCamera)}>
          <Ionicons name="camera-reverse" size={30} color="white" />
          <Text style={styles.buttonText}>Toggle Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={toggleManualEntry}>
          <Ionicons name="create-outline" size={30} color="white" />
          <Text style={styles.buttonText}>Enter Barcode</Text>
        </TouchableOpacity>
      </View>

      {scannedItems.length > 0 && (
        <TouchableOpacity style={styles.billButton} onPress={showItemsAlert}>
          <Ionicons name="receipt" size={30} color="white" />
          <Text style={styles.buttonText}>Bill</Text>
        </TouchableOpacity>
      )}

      {scannedItems.length > 0 && (
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{scannedItems.length}</Text>
        </View>
      )}

      <Modal
        transparent={true}
        animationType="slide"
        visible={isManualEntry}
        onRequestClose={() => setIsManualEntry(false)}>
        <View style={styles.overlay}>
          <View style={styles.manualEntryContainer}>
            <TextInput
              style={styles.manualInput}
              placeholder="Barcode Type"
              placeholderTextColor="white"
              value={manualBarcodeType}
              onChangeText={text => setManualBarcodeType(text)}
            />
            <TextInput
              style={styles.manualInput}
              placeholder="Barcode"
              placeholderTextColor="white"
              value={manualBarcode}
              onChangeText={text => setManualBarcode(text)}
            />
            <TouchableOpacity
              onPress={enterBarcodeManually}
              style={styles.enterButton}>
              <Text style={styles.enterButtonText}>Enter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleManualEntry}
              style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
  },
  barcodeText: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  topIconsContainer: {
    position: 'absolute',
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  iconButton: {
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginTop: 5,
  },
  billButton: {
    position: 'absolute',
    top: 100,
    right: 35,
    padding: 10,
    borderRadius: 50,
    flexDirection: 'column',
    alignItems: 'center',
  },
  countBadge: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  countText: {
    color: 'white',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  manualEntryContainer: {
    width: '80%',
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 20,
  },
  manualInput: {
    width: '100%',
    height: 40,
    backgroundColor: 'black',
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
    borderRadius: 5,
    paddingLeft: 10,
  },
  enterButton: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  enterButtonText: {
    color: 'black',
    fontSize: 16,
  },
  cancelButton: {
    width: '100%',
    height: 40,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
});

export default App;
