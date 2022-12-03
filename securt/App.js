import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput,Alert} from 'react-native';
import React, {useRef, useState} from 'react';
import Otp from './src';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function App() {
  const auth = getAuth();
  const [uid , setUid] = useState('');
  onAuthStateChanged(auth, (user) => {
    console.log(user)
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
    <Text>logeado asdfadsfdfadad dsfasdfd  </Text>
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
