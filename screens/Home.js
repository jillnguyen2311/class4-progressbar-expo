import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';

export default function Home({ navigation }) {

    const [data, setData] = useState();

    const API_URL = `https://www.bcferriesapi.ca/api/TSA/`;

    useEffect(() => {
        fetch(API_URL)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setData(response);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const ProgressColor = (carFill) => {
        if (carFill > 0.9) {
            return color='red';
        } else if (carFill > 0.6) {
            return color='yellow';
        } else {
            return color='blue';
        }
    };

    return (
        <View style={styles.main}>
            <View style={styles.header}>
            <Text style={{fontSize: 30}}>Ferries Leaving Tswwassen</Text>
            <Text>To: Duke Point (Nanaimo)</Text>
            </View>
            {
                data && data.DUK.sailings.map((s, index) => {
                    return (
                        <View key={index} style={styles.barPosition}>
                            <View style={styles.main}>
                                <Text style={{paddingRight: 100}}>{s.isCancelled ? 'Not available' : 'Available'}</Text>
                            </View>
                            <View>
                                <Text>Vessel Name: {s.vesselName}</Text>
                                <Progress.Bar progress={s.carFill/100} width={200} unfilledColor='white' color='green' />
                            </View>
                        </View>
                    )
                })
            }
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        minHeight: 50,
        marginTop: 5
    },
    barPosition: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        minHeight: 50,
    },
    header: {
        position: 'absolute',
        left: 5,
        top: 1
    }
});
