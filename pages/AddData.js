import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import components from '../styles/components'
import firebase from '../firebaseConfig'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import colors from '../styles/colors'

export default function AddDataScreen(props) {
    const [name, setName] = useState('')
    const [x, setX] = useState('')
    const [y, setY] = useState('')

    const onAddDataPress = () => {
        console.log(props)
        const ref = firebase.firestore().collection('stats')
        ref.doc(props.extraData.uid).add({
            name, x, y,
        })
        .then(_doc => {
            setEntityText('')
            Keyboard.dismiss()
        })
        .catch((error) => {
            console.log(error)
        });
    }

    // user = props.extraData

    return (
        <View style={components.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always"
            >
                <TextInput
                    style={styles.topInput}
                    placeholder="Nom de l'exercice"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setName(text)}
                    value={name}
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    style={components.input}
                    placeholder='Répétitions'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setX(text)}
                    value={x}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={components.input}
                    placeholder='Poids'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setY(text)}
                    value={y}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={components.button}
                    onPress={() => onAddDataPress()}>
                    <Text style={components.buttonTitle}>Ajouter</Text>
                </TouchableOpacity>
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
    }
})