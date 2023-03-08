import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useState, useContext } from 'react';
import { UserContext } from '../../../context';


const TransactionHistory = () => {

    const screenWidth = Dimensions.get('window').width;

    const { user } = useContext(UserContext);

    function convertCost(amount: number) {
        let totalAmount = amount.toString();
        let totalAmountSplit = totalAmount.split('.');
        if (totalAmount[1] === undefined) {
            return totalAmountSplit[0];
        } else {
            return <>{totalAmountSplit[0]} <Text style={styles.paise}>{totalAmountSplit[1]}</Text></>
        }
    }

    return (
        <View style={{ width: screenWidth * 0.8, ...styles.transacParent }}>
            <ValuationTray type={'credit'} amount={user?.totalCreditValuation??0} convertCost={convertCost}   />
            <ValuationTray type={'debit'} amount={user?.totalDebitValuation??0} convertCost={convertCost}   />
        </View>
    )
}

interface ValuationTrayProp {
    type: string, amount: number, convertCost: (amount: number) => string | JSX.Element;
}

const ValuationTray = ({type, amount, convertCost}: ValuationTrayProp) => {
    return (
        <View style={styles.amountTray}>
            <Text style={styles.amount}>₹ {convertCost(amount ?? 0)}</Text>
            <Text>{`total ${type} valuation`}</Text>
        </View>
    )
}

export default TransactionHistory;

const styles = StyleSheet.create({
    amountTray: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    transacParent: {
        backgroundColor: '#2b2b2b',
        height: '100%',
        padding: 20,
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        flexDirection: 'column',
        borderRadius: 12,
    },
    paise: {
        fontSize: 12,
        color: 'grey'
    },
    amount: {
        fontWeight: 'bold',
        fontSize: 20
    }
});