import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './pages'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { firebase } from './firebaseConfig';
import {decode, encode} from 'base-64'
import colors from './styles/colors'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  const usersRef = firebase.firestore().collection('users');
  firebase.auth().onAuthStateChanged(u => {
    if (u) {
      usersRef.doc(u.uid).get()
      .then((document) => {
        const userData = document.data()
        setLoading(false)
        setUser(userData)
      })
      .catch((error) => {
        setLoading(false)
      });
    } else {
      setLoading(false)
    }
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    )	
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.bgColor,
            shadowOpacity: 0,
            elevation: 0
          },
          headerTintColor: colors.tertiaryColor,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        { user ? (
          <Stack.Screen name="Home" options={{ title: "" }}>
            {props => <HomeScreen name="Home" {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Connexion" }} />
            <Stack.Screen name="Registration" component={RegistrationScreen} options={{ title: "Inscription" }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bgColor,
    height: '100%'
  }
})
// main color = 224 118 45
// secondary = white
// bg = rgb(237, 163, 97)