import { StyleSheet, Text, View, TouchableOpacity, TextInput,Alert} from 'react-native';
import React, {useRef, useState} from 'react';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "firebase/compat/app";
import { firebaseConfig } from '../config';
const Otp = () => {
    const [phoneNumber , setPhoneNumber] = useState('');
    const [code , setCode ] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        console.log(phoneNumber)
        phoneProvider.verifyPhoneNumber(`+56${phoneNumber}`, recaptchaVerifier.current)
        .then(setVerificationId);
        setPhoneNumber('');
    };
    const confirmCode = () =>{
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );
        firebase.auth().signInWithCredential(credential)
        .then(()=>{
            setCode('');
        })
        .catch((error) =>{
            alert(error);
        })
        Alert.alert(
            'Login Successful :)'
        )
    }
    return (
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig}/>
            <Text style={styles.otpText}>
                Login OTP
            </Text>
            <TextInput
            placeholder='Numero de telefono: +569 12345678'
            onChangeText={setPhoneNumber}
            keyboardType='phone-pad'
            autoComplete='tel'
            style={styles.textInput}
            />
            <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
                <Text style={styles.buttonText}>
                    send verification
                </Text>
                
            </TouchableOpacity>
            <TextInput
            placeholder='Confirm Code'
            onChangeText={setCode}
            keyboardType='number-pad'
            style={styles.textInput}
            />
         <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
                <Text style={styles.buttonText}>
                    Comfirm Verification
                </Text>
                
            </TouchableOpacity>
        </View>
    )
}
export default Otp

const styles = StyleSheet.create({
    container :{
        flex:1,
        backgroundColor : '#000',
        alignItems:'center',
        justifyContent:'center'
    },
    textInput: {
        paddingTop:40,
        paddingBottom:20,
        paddingHorizontal:20,
        fontSize:24,
        borderBottomColor: '#fff',
        borderBottomWidth:2,
        marginBottom:20,
        textAlign:'center',
        color:'#fff'
    },
    sendVerification:{
        padding:20,
        backgroundColor:'#3498db',
        borderRadius:10,
    },
    sendCode:{
        padding:20,
        backgroundColor:'#9b59b6',
        borderRadius:10
    },
    buttonText:{
        textAlign:'center',
        color:'#fff',
        fontWeight:'bold'
    },
    otpText:{
         fontSize:24,
         fontWeight:'bold',
         color:'#fff',
         margin:20
    }
});