import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import React, { useState } from 'react';
import { textInputStyles } from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { EmailProps, PasswordProps, FullNameProps, RememberMeProps, forgotPasswordProps, AuthScreenNavigateProps } from '../interfaces/interface';


const EmailInput = (props: EmailProps) => {

    const { email, validEmail, changeEmailText } = props;

    return (
        <View>
            <TextInput
                style={textInputStyles.input}
                onChangeText={changeEmailText}
                value={email}
                placeholder={"Enter Email"}
                placeholderTextColor={'black'}
            />
            {!validEmail && email !== '' && <Text style={textInputStyles.error}>Please enter a valid email</Text>}
        </View>
    )
}


const PasswordInput = (props: PasswordProps) => {
    const { password, validePassword, changePasswordText } = props;

    const [hidePassword, setHidePassword] = useState(true);

    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    return (
        <View>
            <View style={textInputStyles.passwordContainer}>
                <TextInput
                    style={{ ...textInputStyles.input, ...textInputStyles.passwordInput }}
                    onChangeText={changePasswordText}
                    value={password}
                    secureTextEntry={hidePassword}
                    placeholder={"Enter password"}
                    placeholderTextColor={'black'}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={textInputStyles.eyeIcon}>
                    <Icon name={hidePassword ? 'eye-slash' : 'eye'} size={25} color="black" />
                </TouchableOpacity>
            </View>
            {validePassword && password !== '' && <Text style={textInputStyles.error}>{validePassword}</Text>}
        </View>
    )
}

const FullName = (props: FullNameProps) => {
    const { name, changeNameText, title } = props;
    return (
        <View style={{ width: '100%' }}>
            <TextInput
                style={{ ...textInputStyles.input }}
                onChangeText={changeNameText}
                value={name}
                maxLength={25}
                placeholder={title !== undefined ? title : "Enter Full Name"}
                placeholderTextColor={'black'}
            />
        </View>
    )
}

const CheckBoxComponent = (props: RememberMeProps) => {
    const { rememberMe, changeRememberMeValue } = props;

    return (
        <View style={textInputStyles.container}>
            <CheckBox
                checkedColor='black'
                uncheckedColor='gray'
                checked={rememberMe}
                checkedIcon={<Icon name="check-square-o" size={30} color="black" />}
                uncheckedIcon={<Icon name="square-o" size={30} color="black" />}
                onPress={changeRememberMeValue}
                containerStyle={textInputStyles.checkbox}
            />
            <Text style={textInputStyles.label}>Remember Me</Text>
        </View>
    )
}

const AlreadyHaveAccount = (props: AuthScreenNavigateProps) => {
    const { navigateToLoginScreen } = props;
    return (
        <View style={{ ...textInputStyles.container, justifyContent: 'center' }}>
            <Text style={textInputStyles.label}>Already have an account </Text>
            <TouchableOpacity onPress={navigateToLoginScreen}>
                <Text style={{ ...textInputStyles.label, textDecorationLine: "underline", marginLeft: 10 }}>Login!</Text>
            </TouchableOpacity>
        </View>
    )
}


const ForgotPassword = (props: forgotPasswordProps) => {
    return (
        <View style={{ ...textInputStyles.container, justifyContent: 'flex-start' }}>
            <TouchableOpacity onPress={props.navigateToForgotScreen}>
                <Text style={{ ...textInputStyles.label, textDecorationLine: "underline", marginLeft: 10 }}>forgot password?</Text>
            </TouchableOpacity>
        </View>
    )
}

const DidNotHaveAccount = (props: AuthScreenNavigateProps) => {
    const { navigateToLoginScreen } = props;
    return (
        <View style={{ ...textInputStyles.container, justifyContent: 'center' }}>
            <Text style={textInputStyles.label}>Didn't have an account </Text>
            <TouchableOpacity onPress={navigateToLoginScreen}>
                <Text style={{ ...textInputStyles.label, textDecorationLine: "underline", marginLeft: 10 }}>Sign up!</Text>
            </TouchableOpacity>
        </View>
    )
}


export { PasswordInput, CheckBoxComponent, ForgotPassword, DidNotHaveAccount, EmailInput, FullName, AlreadyHaveAccount };