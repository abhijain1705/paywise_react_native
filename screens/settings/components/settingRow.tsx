import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { logOut } from '../../../firebase/auth/firebase_methods';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface SettingRowProp {
    prefix: string;
    label: string;
    suffix: string;
}

const SettingRow = ({ prefix, suffix, label }: SettingRowProp) => {
    return (
        <View style={{ ...styles.rowParent, borderBottomColor: 'black', borderBottomWidth: 1 }}>
            <View style={{ ...styles.rowParent, gap: 10 }}>
                <Icon name={prefix} color={'black'} size={20} />
                <Text style={styles.label}>{label}</Text>
            </View>
            <TouchableOpacity onPress={() => label === "logout" ? logOut() : null}>
                <Icon name={suffix} color={'black'} size={20} />
            </TouchableOpacity>
        </View>
    );
};

export default SettingRow;

const styles = StyleSheet.create({
    rowParent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12
    },
    label: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
    },
});
