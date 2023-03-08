import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

interface HeaderProp {
    navigation: StackNavigationProp<ParamListBase, string, undefined>;
    title: string;
}

const HeaderComponent = ({ navigation, title }: HeaderProp) => {
    return (
        <View style={{ ...styles.header }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name='arrow-left' size={30} color='white' />
            </TouchableOpacity>
            <Text style={{ ...styles.label }}>{title}</Text>
        </View>
    )
}

export default HeaderComponent

const styles = StyleSheet.create({
    header: {
        display: 'flex', flexDirection: 'row', gap: 10, padding: 20, height: 80, backgroundColor: 'black'
    },
    label: {
        color: 'white', fontWeight: 'bold', fontSize: 20
    }
})