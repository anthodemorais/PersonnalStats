import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Keyboard, Platform, ActivityIndicator } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import components from '../styles/components'
import { firebase } from '../firebaseConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getFromAsyncStorage } from '../helpers'
import colors from '../styles/colors'

export default function UpdateDataScreen({ navigation, route }) {
    const [name, setName] = useState(route.params.exo)
    const [x, setX] = useState(route.params.x)
    const [y, setY] = useState(route.params.y)
    const [date, setDate] = useState(route.params.date)
    const [loading, setLoading] = useState(false)

    const onDateChange = (_, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate)
    }

    const updateData = () => {
        setLoading(true)
        getFromAsyncStorage('@id')
        .then((userId) => {
            const ref = firebase.firestore().collection('stats')
            ref.doc(userId).get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    let object = snapshot.data()

                    if (name in object) {
                        object[name][route.params.index] = { x, y, date }
                    }
                    else {
                        alert('Cet exercice n\'existe pas')
                        Keyboard.dismiss()
                        navigation.navigate('Home')
                        setLoading(false)
                    }

                    ref.doc(userId).set(object)
                    .then(_doc => {
                        alert("Vos données ont été mises à jour")
                        Keyboard.dismiss()
                        navigation.navigate('Home')
                    })
                    .catch((error) => {
                        console.log(error)
                        alert('Impossible de mettre à jour vos données. Rééssayez plus tard...')
                        Keyboard.dismiss()
                        navigation.navigate('Home')
                        setLoading(false)
                    });
                }
                else {
                    alert('Cet exercice n\'existe pas')
                    Keyboard.dismiss()
                    navigation.navigate('Home')
                    setLoading(false)
                }
            });
        })
        .catch((error) => {
            console.log(error)
            alert('Impossible de mettre à jour vos données. Rééssayez plus tard...')
            Keyboard.dismiss()
            navigation.pop()
            setLoading(false)
        });
    }

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
                    editable={false}
                    selectTextOnFocus={false}
                />
                <TextInput
                    keyboardType="number-pad"
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
                    keyboardType="number-pad"
                    placeholder='Poids en kg'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setX(text)}
                    value={x}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <DateTimePicker value={date} mode="date" onChange={onDateChange} />
                <TouchableOpacity
                    disabled={loading}
                    style={components.button}
                    onPress={() => updateData()}>
                    <Text style={components.buttonTitle}>Modifier</Text>
                </TouchableOpacity>
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
    }
})