import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, TouchableOpacity } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';
import { getAuth,onAuthStateChanged } from 'firebase/auth';
import firebase from "firebase/compat/app";
export default function Contactos() {
  let [error, setError] = useState(undefined);
  let [contacts, setContacts] = useState(undefined);
  const [contactsGroup,setContactGroup] = useState([]);
  const auth = getAuth();
  const [uid , setUid] = useState('');
  onAuthStateChanged(auth, (user) => {
    if (user && uid==='') {
      
      setUid(user.uid);
      // ...
    } else {
      console.log('not login')
    }
  });
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [ Contacts.Fields.Birthday, Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.PhoneNumbers]
        });

        if (data.length > 0) {
          setContacts(data);
        } else {
          setError("No contacts found");
        }
      } else {
        setError("Permission to access contacts denied.");
      }
    })();
  }, []);

  
  let getContactData = (data, property) => {
    if (data) {
      return data.map((data, index) => {
        return (
          <View key={index}>
            <Text style=
            {{
              color:"#ffff"
            }}  > {data[property]}</Text>
          </View>
        )
      });
    }
  }
  const exampleHandler = (phone)=>{
    
    if (phone) {  
      let findNumber = contactsGroup.filter(n=> n === phone[0].number)
      if (!findNumber.length){
        console.log(phone[0].number)
        const number = phone[0].number;
        
        console.log(number,'numero')
        setContactGroup([...contactsGroup, number]);        
      } 

 
    }
    console.log(contactsGroup, 'lista')
    
    /*data.map((contact,index)=>{
      const nums = extractData(contact.phoneNumbers,'number')
      if(!nums) return null
      return(nums[0])
    })*/

  }
  const extractData = (data,property) => {
    if (data) {
      return data.map((data, index) => {
        return (
          data.number
        )
      });
    }
  }
  let getContactRows = () => {
    if (contacts !== undefined) {
      
      return contacts.map((contact, index) => {
        return (
          <View key={index} style={styles.contact}>
            <TouchableOpacity style=
            {{
              backgroundColor: '#075E54', 
                padding: 10, 
                borderRadius: 30
            }} onPress={()=> exampleHandler(contact.phoneNumbers)} >
            <Text style=
            {{
              color:"#ffff"
            }} >nombre contacto: {contact.firstName} {contact.lastName}</Text>
            {getContactData(contact.phoneNumbers, "number")}
            
            </TouchableOpacity>
          </View>
        );
      });
    } else {
      return <Text>Esperando contactos...</Text>
    }
  }
const handlePress = () =>{
  
  
  firebase.firestore().collection('Grupos').doc().set(
      {
          Miembros:contactsGroup,
          Titulo:"Vecindario",
          Usuario:firebase.firestore().doc('Usuarios/'+uid)
      }
  ).catch(error =>{
      console.log('error al crear el usuario')
  }
  );
}

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{marginTop:40}}>Contactos Seleccionados</Text>
      {contactsGroup.map((contact,index) =>{
        return <Text>{contact}</Text>

      })}
      <Button title='Crear Grupo' onPress={handlePress}>
      </Button>

      <ScrollView style={{marginTop:30}}>
      
        {getContactRows()}
      </ScrollView>
      <Text>{error}</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6ae497',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contact: {
    marginVertical: 8
  }
});

/*import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, TouchableOpacity } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';
import * as React from 'react';

export default function App() {
  let [error, setError] = useState(undefined);
  let [contacts, setContacts] = useState(undefined);
  const 

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [ Contacts.Fields.Birthday, Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.PhoneNumbers]
        });

        if (data.length > 0) {
          setContacts(data);
        } else {
          setError("No contacts found");
        }
      } else {
        setError("Permission to access contacts denied.");
      }
    })();
  }, []);

  let getContactData = (data, property) => {
    if (data) {
      return data.map((data, index) => {
        return (
          <View key={index}>
            <Text style=
            {{
              color:"#ffff"
            }}  > {data[property]}</Text>
          </View>
        )
      });
    }
  }

  const selectionHandler=()=>{
    alert("seleccionado")
  }

  let getContactRows = () => {
    if (contacts !== undefined) {
      return contacts.map((contact, index) => {
        return (
          <View key={index} style={styles.contact}>
            <TouchableOpacity
            onPress={()=> selectionHandler()}
            style=
            {{
              backgroundColor: '#075E54', 
                padding: 10, 
                borderRadius: 30
            }} >
            <Text style=
            {{
              color:"#ffff"
            }} >nombre contacto: {contact.firstName} {contact.lastName}</Text>
            {getContactData(contact.phoneNumbers, "number")}
            <Text style={{ color: "white", fontSize: 18 }}>{"selected"}</Text>
            </TouchableOpacity>
          </View>
        );
      });
    } else {
      return <Text>Esperando contactos...</Text>
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {getContactRows()}
      </ScrollView>
      <Text>{error}</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6ae497',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contact: {
    marginVertical: 8
  }
});*/