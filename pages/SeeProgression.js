import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native'
import { LineChart, BarChart } from "react-native-chart-kit";
import RNPickerSelect from 'react-native-picker-select';
import colors from '../styles/colors';
import { timestampToDate } from '../helpers';

export default function SeeDataScreen({ navigation, route }) {
    const [dataset, setDataset] = useState({})
    const [weights, setWeights] = useState([])
    const [selectedWeight, setSelectedWeight] = useState('')
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [chartType, setChartType] = useState(1)

    const updateChart = (ds, weight) => {
        setLoading(true)
        setSelectedWeight(weight)

        const d = {
            "labels": ds[weight]["labels"],
            "datasets": [
                {
                    "data": ds[weight]["data"],
                }
            ],
        }

        setData(d)
        setLoading(false)
    }

    useEffect(() => {
        let ds = {}
        let w = []
        route.params.perfs.forEach(perf => {
            if (perf["x"] in ds) {
                ds[perf["x"]]["data"].push(perf["y"])
                ds[perf["x"]]["labels"].push(timestampToDate(perf["date"]["seconds"]))
            }
            else {
                ds[perf["x"]] = {
                    "data": [perf["y"]],
                    "labels": [timestampToDate(perf["date"]["seconds"])]
                }
            }
            if (w.indexOf(perf["x"]) === -1) {
                w.push(parseFloat(perf["x"]))
            }
        });

        let toRemove = []
        for (const key in ds) {
            if (ds.hasOwnProperty(key)) {
                if (ds[key]["data"].length <= 1) {
                    toRemove.push(key)
                }
            }
        }

        w.sort()
        w = [...new Set(w)];

        toRemove.forEach(key => {
            delete ds[key]
            const index = w.indexOf(parseInt(key));
            if (index > -1) {
                w.splice(index, 1);
            }
        });

        if (w.length === 0) {
            alert('Pas assez de données pour créer un graphique')
            navigation.pop()
        }
        else {
            setDataset(ds)
            setWeights(w)
            updateChart(ds, w[0])
        }
    }, [])

    const chartConfig = {
        backgroundGradientFrom: colors.secondaryColor,
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: colors.secondaryColor,
        backgroundGradientToOpacity: 1,
        color: () => 'rgba(0, 0, 0, 1)',
        barPercentage: 1,
        useShadowColorFromDataset: false // optional
    };
    // const chartConfig = {
    //     color: '#E0E5EC',
    //     strokeWidth: 2, // optional, default 3
    //     barPercentage: 0.5,
    //     useShadowColorFromDataset: false // optional
    // };

    return (
        <View style={styles.container}>
            {loading
            ? <ActivityIndicator/>
            : <View>
                <View style={{ display: "flex", justifyContent: "center", alignSelf: 'center' }}>
                    <RNPickerSelect
                        onValueChange={(value) => updateChart(dataset, value)}
                        items={weights.map(w => { return {'label': w.toString() + "Kg", 'value': w} })}
                        value={selectedWeight}
                        style={pickerStyle}
                    />
                    <RNPickerSelect
                        onValueChange={(value) => setChartType(value)}
                        items={[
                            {'label': "Courbe", 'value': 1},
                            {'label': "Histogramme", 'value': 2},
                        ]}
                        value={chartType}
                        style={pickerStyle}
                    />
                </View>
                {chartType === 1
                ? <LineChart
                    data={data}
                    width={Dimensions.get('window').width}
                    height={300}
                    verticalLabelRotation={30}
                    chartConfig={chartConfig}
                    bezier
                />
                : <BarChart
                    // style={graphStyle}
                    data={data}
                    width={Dimensions.get('window').width}
                    height={300}
                    yAxisLabel=""
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                />}
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
})

const pickerStyle = {
    inputIOS: {
        color: colors.mainColor,
        fontSize: 25,
        alignSelf: "center",
        marginBottom: 20,
        marginTop: 20,
        textDecorationLine: 'underline',
        fontWeight: "bold"
    },
    inputAndroid: {
        color: colors.mainColor,
        fontSize: 25,
        alignSelf: "center",
        marginBottom: 20,
        marginTop: 20,
        textDecorationLine: 'underline',
        fontWeight: "bold"
    }
}