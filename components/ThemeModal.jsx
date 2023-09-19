import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { COLORS } from '../assets/theme/index.js';

const ThemeModal = ({ visible, onClose }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);

    // You can implement theme switching logic here
    // For example, set your app's theme using a state management library like Redux or Context API
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Theme</Text>
          <View style={styles.themeOption}>
            <Text style={styles.themeText}>
              {isDarkMode ? 'Dark Theme' : 'Light Theme'}
            </Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              thumbColor={COLORS.primary}
              trackColor={{ false: 'lightgray', true: COLORS.primary }}
            />
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 17,
    top:1,
    marginBottom: 20,
    color: COLORS.primary,
    fontFamily:'Poppins-SemiBold'
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  themeText: {
    fontSize: 16,
    top:1,
    color: COLORS.primary,
    fontFamily:'Poppins-Regular'
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily:'Poppins-Regular',
    top:1,
  },
});

export default ThemeModal;
