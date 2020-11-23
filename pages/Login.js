import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { firebase } from '../firebaseConfig';
import components from '../styles/components'
import colors from '../styles/colors';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }

    const onLoginPress = () => {
        setLoading(true)
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            const usersRef = firebase.firestore().collection('users')
            usersRef.doc(uid).get()
            .then(firestoreDocument => {
                if (!firestoreDocument.exists) {
                    setLoading(false)
                    alert("Mauvais mot de passe ou email")
                    return;
                }
                setLoading(false)
                const user = firestoreDocument.data()
                navigation.navigate('Home', {user})
            })
            .catch(error => {
                setLoading(false)
                alert(error)
            });
        })
        .catch(error => {
            setLoading(false)
            alert(error)
        })
    }

    return (
        <View style={components.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                {/* <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                /> */}
                <TextInput
                    style={styles.topInput}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={components.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Mot de passe'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    disabled={loading}
                    style={components.button}
                    onPress={() => onLoginPress()}>
                    <Text style={components.buttonTitle}>Connexion</Text>
                </TouchableOpacity>
                <View style={components.footerView}>
                    <Text style={components.text}>Pas encore de compte ? <Text onPress={onFooterLinkPress} style={components.link}>S'inscrire</Text></Text>
                </View>
                <ActivityIndicator animating={loading}></ActivityIndicator>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    topInput: {
        width: '80%',
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: '30%',
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        alignSelf: 'center',
        borderRadius: 50,
        backgroundColor: colors.secondaryColor,
    },
});