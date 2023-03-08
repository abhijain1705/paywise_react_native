import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserInterface } from '../../../common/interfaces/interface';

import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    EditProfile: undefined;
    ReachedLimit: undefined;
    Setting: undefined;
    Payment: { type: string };
    Home: undefined;

    // add other screens in the stack here
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditProfile'>;


interface UserNotchProp {
    user: UserInterface | null;
    navigation: ProfileScreenNavigationProp;
}

const UserNotch = ({ user, navigation }: UserNotchProp) => {
    return (
        <View style={styles.profileParent}>
            <Text style={styles.name}>Welcome, {(user?.name ?? "").length > 20 ? user?.name.substring(0, 20) + "..." : user?.name}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
                    <Icon name='pencil' size={20} color='white' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
                    <Icon name='cog' size={20} color='white' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UserNotch

const styles = StyleSheet.create({
    profileParent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 12
    },
    name: {
        fontSize: 20
    },
    picture: {
        width: 40,
        height: 40,
        borderRadius: 8
    }
});