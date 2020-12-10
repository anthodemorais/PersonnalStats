import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import components from '../styles/components'

export default function HomeScreen({ navigation }) {

    const onAddDataPress = () => {
        navigation.navigate("AddData")
    }

    const onSeeDataPress = () => {
        navigation.navigate("SeeData")
    }

    const onHistoryPress = () => {
        navigation.navigate("History")
    }

    return (
        <View style={components.container}>
            <TouchableOpacity
                style={components.button}
                onPress={() => onSeeDataPress()}>
                <Text style={components.buttonTitle}>Voir ma progression</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={components.button}
                onPress={() => onAddDataPress()}>
                <Text style={components.buttonTitle}>Ajouter des données</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={components.button}
                onPress={() => onHistoryPress()}>
                <Text style={components.buttonTitle}>Historique des ajouts</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
})