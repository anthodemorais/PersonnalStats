import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Keyboard, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import components from '../styles/components'
import { firebase } from '../firebaseConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import colors from '../styles/colors'

export default function AddDataScreen({ navigation, route }) {
    const [name, setName] = useState('')
    const [x, setX] = useState('')
    const [y, setY] = useState('')
    const [date, setDate] = useState(new Date())

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate)
    }

    const addData = () => {
        const ref = firebase.firestore().collection('stats')
        ref.doc(route.params.id).get()
        .then((snapshot) => {
            if (snapshot.exists) {
                let object = snapshot.data()
                object[name].push({ x, y, date })
                ref.doc(route.params.id).set(object)
                .then(_doc => {
                    alert("Vos données ont été ajoutées")
                    Keyboard.dismiss()
                    navigation.navigate("Home")
                })
                .catch((error) => {
                    console.log(error)
                });
            }
            else {
                let object = {}
                object[name] = [{ x, y, date }]
                ref.doc(route.params.id).set(object)
                .then(_doc => {
                    alert("Vos données ont été ajoutées")
                    Keyboard.dismiss()
                    navigation.navigate("Home")
                })
                .catch((error) => {
                    console.log(error)
                });
            }
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
                    onChangeText={(text) => setY(text)}
                    value={y}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={components.input}
                    placeholder='Poids'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setX(text)}
                    value={x}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <DateTimePicker value={date} mode="date" onChange={onDateChange} />
                <TouchableOpacity
                    style={components.button}
                    onPress={() => addData()}>
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