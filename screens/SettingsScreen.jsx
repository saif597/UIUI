import { StyleSheet, Text, View ,TouchableOpacity,ScrollView} from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionic from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../assets/theme/index.js';
import { useNavigation } from '@react-navigation/native'; 
import ThemeModal from '../components/ThemeModal.jsx'; // Import ThemeModal
const SettingsScreen = () => {
    const navigation = useNavigation();
    const [isThemeModalVisible, setThemeModalVisible] = useState(false);
  
    const toggleThemeModal = () => {
      setThemeModalVisible(!isThemeModalVisible);
    };
  return (
   <SafeAreaView style={styles.headContainer}>
    <View style={styles.header}>
        <TouchableOpacity style={styles.arrowBackIcon}  onPress={()=> navigation.navigate('Home')}>
            <Ionic size={22} color={COLORS.primary} name ='chevron-back-outline'/>
        </TouchableOpacity>
        <Text style={styles.settingsText}>Settings</Text>
    </View>
    <ScrollView style={{marginHorizontal:15,marginTop:20,marginBottom:20}}>
       <View style={styles.settingsSection}>
       <View style={{marginBottom:10}}>
            <Text style={styles.accountText}>Account</Text>
        </View>
        <TouchableOpacity style={styles.optionContainer} onPress={()=> navigation.navigate('Profile')}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='person-outline'/>
            <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer}  onPress={toggleThemeModal}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='shield-half-outline'/>
            <Text style={styles.optionText}>Theme</Text>
        </TouchableOpacity>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='notifications-outline'/>
            <Text style={styles.optionText}>Notifications</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='lock-closed-outline'/>
            <Text style={styles.optionText}>Privacy</Text>
        </View>
        </View>
        <View style={styles.settingsSection}>
        <View style={{marginBottom:10}}>
            <Text style={styles.accountText}>Customize</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={23} color={COLORS.primary} name ='card-outline'/>
            <Text style={styles.optionText}>Currency</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='print'/>
            <Text style={styles.optionText}>Printer Settings</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='business-outline'/>
            <Text style={styles.optionText}>Business Settings</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='newspaper-outline'/>
            <Text style={styles.optionText}>Printed Bill</Text>
        </View>
        </View>

        <View style={styles.settingsSection}>
        <View style={{marginBottom:10}}>
            <Text style={styles.accountText}>Support</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={23} color={COLORS.primary} name ='send-outline'/>
            <Text style={styles.optionText}>Send Feedback</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='star-half-outline'/>
            <Text style={styles.optionText}>Rate the App</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='share-social-outline'/>
            <Text style={styles.optionText}>Share</Text>
        </View>
        </View>
        
        <View style={styles.settingsSection}>
        <View style={{marginBottom:10}}>
            <Text style={styles.accountText}>About</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={23} color={COLORS.primary} name ='information-circle-outline'/>
            <Text style={styles.optionText}>FAQs</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='bag-handle-sharp'/>
            <Text style={styles.optionText}>Help & Support</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='receipt-outline'/>
            <Text style={styles.optionText}>Terms and Policies</Text>
        </View>
        </View>
        <View style={styles.settingsSection}>
        <View style={{marginBottom:10}}>
            <Text style={styles.accountText}>Actions</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='flag-outline'/>
            <Text style={styles.optionText}>Report a problem</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='person-add-outline'/>
            <Text style={styles.optionText}>Add Account</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='mail-open-sharp'/>
            <Text style={styles.optionText}>Suggestions</Text>
        </View>
        <View style={styles.optionContainer}>
            <Ionic style={styles.optionIcon}  size={22} color={COLORS.primary} name ='log-out-outline'/>
            <Text style={styles.optionText} >Logout</Text>
        </View>
        </View>
    </ScrollView>
    <ThemeModal visible={isThemeModalVisible} onClose={toggleThemeModal} />
   </SafeAreaView>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
    headContainer:{ 
        flex:1,
        backgroundColor:'white',
    },
    header:{
        marginTop:25,
       marginBottom:5,
        flex:0,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    settingsText:{
        fontSize:21,
        color:COLORS.primary,
        fontFamily:'Poppins-Medium',
        top:1,
    },
    arrowBackIcon:{
        position:'absolute',
        left:8,
    },
    accountText:{
        fontSize:16.5,
        color:COLORS.primary,
        fontFamily:'Poppins-Medium',
    },
    accountText2:{
        // fontSize:20,
        fontSize:20,
        fontWeight:'600',
        color:COLORS.primary,
        fontFamily:'Roboto-Medium',
    },
    settingsContainer:{
        marginBottom:20
    },
    settingsSection:{
        marginBottom:13,
    },
    optionContainer:{
        paddingHorizontal:12,
        flex:0,
        flexDirection:'row',
        paddingVertical:8,
        backgroundColor:'rgba(180, 180, 180,0.124)',
    },
    optionText:{
        fontSize:16,
        fontWeight:'500',
        color:COLORS.primary,
        marginLeft:50,
        fontFamily:'Poppins-Medium',
    },
 

  
})