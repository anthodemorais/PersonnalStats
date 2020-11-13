import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../styles/colors'
import components from '../styles/components'

export default function HomeScreen(props) {

    const onAddDataPress = () => {

    }

    // user = props.extraData

    return (
        <View style={components.container}>
            <TouchableOpacity
                style={components.button}
                onPress={() => onAddDataPress()}>
                <Text style={components.buttonTitle}>Ajouter des données</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
})