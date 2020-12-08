import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, FlatList, StyleSheet} from 'react-native'
import { getFromAsyncStorage } from '../helpers'
import components from '../styles/components'
import { firebase } from '../firebaseConfig';
import colors from '../styles/colors';

export default function SeeDataScreen({ navigation }) {
    const [names, setNames] = useState([])
    const [values, setValues] = useState([])

    useEffect(() => {
        getFromAsyncStorage('@id')
        .then((userId) => {
            const ref = firebase.firestore().collection('stats')
            ref.doc(userId).get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    let object = snapshot.data()
        
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
        })
    }, [])

    const seeProgression = (index, name) => {
        navigation.navigate("SeeProgression", { name: name, perfs: values[index] })
    }
    
    return (
        <View style={components.container}>
            <Text style={styles.subtitle}>Clique sur un exercice pour voir ta progression</Text>
            <FlatList
                data={names}
                renderItem={({item, index}) => {
                    return <Text style={styles.link} onPress={() => seeProgression(index, item.key)}>{item.key}</Text>
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