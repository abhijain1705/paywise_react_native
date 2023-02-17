import { StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import React from 'react';

interface buttonProps {
    onPress: () => void;
    loading: boolean;
    title: string;
}

const DefaultButton = (props: buttonProps) => {
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            {props.loading ? <ActivityIndicator size="large" color="#fff" /> : <Text style={styles.text}>{props.title}</Text>}
        </TouchableOpacity>
    )
}

export default DefaultButton

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 12,
        marginTop: 20,
    },
    text: {
        fontSize: 20,
    },
})