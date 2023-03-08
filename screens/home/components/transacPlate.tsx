import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';

interface TransactionPlateProp {
    type: "pay" | "collect";
    amount: string;
    partyName: string;
    date: string;
    due: string;
}

const TransactionPlate = ({ type, amount, partyName, date, due }: TransactionPlateProp) => {
    return (
        <TouchableOpacity style={styles.plateParent}>
            <View style={styles.lightLabelDiv}>
                <Text style={styles.lightLabel}>{date}</Text>
                <Text style={styles.lightLabel}>{"Due On "} <Text style={{ fontWeight: 'bold' }}>{due}</Text></Text>
            </View>
            <View style={styles.plateSubParent}>
                <Icon name={'spinner'} size={30} color={'black'} />
                <View>
                    <Text style={styles.label}>{type === "collect" ? "Collect" : "Make"} Payment</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                        <Text style={styles.lightLabel}>{type === "collect" ? "from " : "to "} {partyName}</Text>
                        <Icon name={type === "collect" ? 'angle-double-right' : 'angle-double-left'} size={20} color='black' />
                    </View>
                </View>
                <Text style={{ color: type === "collect" ? 'green' : 'red', fontWeight: 'bold', fontSize: 20 }}>{amount}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default TransactionPlate

const styles = StyleSheet.create({
    plateParent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        width: '100%',
        height: 130,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    plateSubParent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    lightLabel: {
        color: '#1a1a1a',
        fontSize: 14
    },
    lightLabelDiv: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    label: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15
    }
});