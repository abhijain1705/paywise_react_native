import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    EditProfile: undefined;
    Setting: undefined;
    Payment: { type: string };
    ReachedLimit: undefined;
    Home: undefined;
    // add other screens in the stack here
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditProfile'>;


interface UserNotchProp {
    navigation: ProfileScreenNavigationProp;
}

const ButtonParent = ({ navigation }: UserNotchProp) => {
    return (
        <View style={styles.buttonParent}>
            <Button navigation={navigation} iconName={'bank-transfer-out'} label='pay' />
            <Button navigation={navigation} iconName={'bank-transfer-in'} label='collect' />
        </View>
    )
}

export default ButtonParent;

interface ButtonProp {
    iconName: string;
    label: string;
    navigation: ProfileScreenNavigationProp;
}

const Button = ({ iconName, label, navigation }: ButtonProp) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Payment', { type: label })} style={styles.button}>
            <Icon name={iconName} size={35} color={'white'} />
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonParent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    button: {
        borderRadius: 12,
        marginHorizontal: 'auto',
        backgroundColor: '#2b2b2b',
        paddingVertical: 12,
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    label: {
        color: 'white'
    }
});