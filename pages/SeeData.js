import React, { useState } from 'react'
import { Text, View, TouchableOpacity, FlatList, StyleSheet} from 'react-native'
import components from '../styles/components'
import { firebase } from '../firebaseConfig';
import colors from '../styles/colors';

export default function SeeDataScreen({ navigation, route }) {
    const [data, setData] = useState({})
    const [names, setNames] = useState([])
    const [values, setValues] = useState([])

    const ref = firebase.firestore().collection('stats')
    ref.doc(route.params.id).get()
    .then((snapshot) => {
        if (snapshot.exists) {
            let object = snapshot.data()
            setData(object)

            let allNames = []
            let allValues = []
            for (const name in object) {
                allNames.push({key: name})
                allValues.push(object[name])
            }
            setNames(allNames)
            setValues(allValues)
        }
        else {
            alert("Vous n'avez rien ajouté pour le moment...")
        }
    })
    .catch((error) => {
        console.log(error)
    });

    const seeProgression = (key) => {
        navigation.navigate("SeeProgression", {perfs: "aaa"})
    }

    return (
        <View style={components.container}>
            <Text style={styles.subtitle}>Clique sur un exercice pour voir ta progression</Text>
            <FlatList
                data={names}
                renderItem={({item}) => {
                    return <Text style={styles.link} onPress={() => seeProgression(item.key)}>{item.key}</Text>
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    subtitle: {
        color: colors.mainColor,
        fontSize: 16,
        marginTop: 30,
        marginBottom: 30,
    },
    link: {
        color: colors.mainColor,
        textAlign: "center",
        marginBottom: 30,
        fontWeight: "bold",
        fontSize: 18,
        textDecorationLine: 'underline',
    }
})