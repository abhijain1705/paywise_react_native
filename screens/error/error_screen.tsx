import { Text, View, TouchableOpacity } from 'react-native';
import { errorStyles } from './styles/style';
import React from 'react';

const ErrorScreen = () => {
    return (
        <View style={errorStyles.wrapper}>
            <Text style={errorStyles.title}>Sign up Error</Text>
            <View>
                <Text style={errorStyles.label}>Oops...</Text>
                <Text style={errorStyles.label}>There was a problem signing you in.</Text>
                <Text style={errorStyles.label}>Please, try again.</Text>
            </View>
            <TouchableOpacity style={errorStyles.button}>
                <Text style={errorStyles.buttonLabel}>Try Again</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ErrorScreen
