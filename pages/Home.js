import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import components from '../styles/components'

export default function HomeScreen({ navigation, route }) {

    const onAddDataPress = () => {
        navigation.navigate("AddData", {id: route.params.user.id})
    }

    const onSeeDataPress = () => {
    }

    // user = props.extraData

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
        </View>
    )
}

const styles = StyleSheet.create({
})