import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import colors from '../styles/colors'

export default function HomeScreen(props) {
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.bgColor,
    },
})