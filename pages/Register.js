import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { storeInAsyncStorage } from '../helpers'
import { firebase } from '../firebaseConfig';
import { StyleSheet } from 'react-native';
import components from '../styles/components';
import colors from '../styles/colors';

export default function RegistrationScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }

        setLoading(true)
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            const data = {
                id: uid,
                email,
                fullName,
            };
            const usersRef = firebase.firestore().collection('users')
            usersRef.doc(uid).set(data)
            .then(() => {
                setLoading(false)
                storeInAsyncStorage('@id', data.id).then(() => {
                    navigation.navigate('Home')
                })
                .catch((error) => {
                    setLoading(false)
                    alert(error)
                })
            })
            .catch((error) => {
                setLoading(false)
                alert(error)
            });
        })
        .catch((error) => {
            setLoading(false)
            alert(error)
        });
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
                    placeholder='Nom complet'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={components.input}
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
                <TextInput
                    style={components.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirmer le mot de passe'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    disabled={loading}
                    style={components.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={components.buttonTitle}>Inscription</Text>
                </TouchableOpacity>
                <View style={components.footerView}>
                    <Text style={components.text}>Déjà inscrit ? <Text onPress={onFooterLinkPress} style={components.link}>Connexion</Text></Text>
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
        marginTop: '20%',
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        alignSelf: 'center',
        borderRadius: 50,
        backgroundColor: colors.secondaryColor,
    },
})