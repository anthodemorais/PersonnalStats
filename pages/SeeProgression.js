import React, { useState } from 'react'
import { Text, View, TouchableOpacity, FlatList, StyleSheet} from 'react-native'
import components from '../styles/components'
import colors from '../styles/colors';

export default function SeeDataScreen({ navigation, route }) {

    return (
        <View style={components.container}>
            <Text>{route.params.perfs}</Text>
        </View>
    )
}