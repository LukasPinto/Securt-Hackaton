import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput,Alert} from 'react-native';
import React, {useRef, useState} from 'react';
import Otp from './src';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Contactos from './src/contactos';

export default function App() {
  const auth = getAuth();
  const [uid , setUid] = useState('');
  onAuthStateChanged(auth, (user) => {
    if (user && uid==='') {
      
      setUid(user.uid);
      console.log(uid);
      // ...
    } else {
      console.log('not login')
    }
  });
  
  return (
    <View style={styles.container}>
    
    
   {!(uid === '') ? ( <> 
    <Contactos></Contactos>
    </>) : (<>
      <Otp/>
    </>)
    
  }
  </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
