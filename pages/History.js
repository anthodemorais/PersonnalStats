import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, SectionList} from 'react-native'
import AlertInput from 'react-native-alert-input';
import { getFromAsyncStorage, timestampToDate } from '../helpers'
import Pencil from '../styles/svg/pencil-alt-solid.svg';
import { firebase } from '../firebaseConfig';
import colors from '../styles/colors';

export default function HistoryScreen({ navigation }) {
    const [data, setData] = useState([])
    const [rawData, setRawData] = useState([])

    const loadData = (userId) => {
        const ref = firebase.firestore().collection('stats')
        ref.doc(userId).get()
        .then((snapshot) => {
            if (snapshot.exists) {
                let object = snapshot.data()
                setRawData(object)
                
                let list = []
                for (const name in object) {
                    if (object.hasOwnProperty(name)) {
                        list.push({
                            title: name,
                            data: object[name].map(perf => `${perf.y} répétitions à ${perf.x} kg, le ${timestampToDate(perf.date.seconds)}`)
                        })
                    }
                }

                setData(list)
            }
            else {
                alert("Vous n'avez rien ajouté pour le moment...")
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        getFromAsyncStorage('@id')
        .then((id) => {
            loadData(id)
        });
    }, [])

    const updateRow = (item, index, title) => {
        navigation.navigate('UpdateData', {
            exo: title,
            x: rawData[title][index].x,
            y: rawData[title][index].y,
            date: new Date(rawData[title][index].date.seconds * 1000),
            index
        })
    }
    
    return (
        <View style={{flex: 1}}>
            <SectionList
                sections={data}
                renderItem={({item, index, section}) => {
                    return (
                        <View style={{justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                            <Text style={styles.text}>{item}</Text>
                            <Pencil width={20} height={20} color={colors.mainColor}
                                onPress={() => updateRow(item, index, section.title)}
                            />
                        </View>
                    )
                }}
                renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
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
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: colors.secondaryColor,
        color: '#000000',
    },
    text: {
        fontSize: 18,
        color: colors.mainColor,
        padding: 15,
    },
})