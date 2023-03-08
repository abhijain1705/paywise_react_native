import { Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { EmailInput, PasswordInput, CheckBoxComponent, DidNotHaveAccount, ForgotPassword } from '../../common/components/textInput';
import { validateEmail, validatePassword } from '../../common/logic/validation';
import { styles } from '../../common/styles/styles';
import DefaultButton from '../../common/components/defaultButton';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { loginToAccount } from '../../firebase/auth/firebase_methods';
import SnackbarComponent from '../../common/components/snackbar';
import { UserContext } from '../../context';

interface LoginScreenProps {
    navigation: NavigationProp<ParamListBase>
};

const Login = ({ navigation }: LoginScreenProps) => {
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [validePassword, setValidPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [overAllError, setoverAllError] = useState("");
    const [loading, setloading] = useState(false);
    const [snackBarVisible, setsnackBarVisible] = useState(false);
    const [snackBarMessage, setsnackBarMessage] = useState("");
    const [snackBarMessageType, setsnackBarMessageType] = useState<"error" | "success">("error");


    const changePasswordText = (text: string) => {
        setPassword(text);
        setValidPassword(validatePassword(text));
    }

    const changeRememberMeValue = () => {
        setRememberMe(!rememberMe);
    }

    const changeEmailText = (text: string) => {
        setEmail(text);
        setValidEmail(validateEmail(text));
    };

    const navigateToSignupScreen = () => {
        navigation.navigate("SignUp");
    }

    const login = () => {
        if (validEmail && !validePassword) {
            loginToAccount(
                {
                    email, password,
                    timeCallback: (value: boolean) => {
                        setloading(value);
                    },
                    remember: rememberMe,
                    callingSnackBar: (type: "error"| "success", message: string) => {
                        setsnackBarVisible(true);
                        setsnackBarMessage(message);
                        setsnackBarMessageType(type);
                    }
                }
            )

        } else {
            setoverAllError("please fill details first");
            setTimeout(() => {
                setoverAllError("");
            }, 2000);
        }
    }

    const navigateToForgotScreen = () => {
        navigation.navigate("ForgotPassword");
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.body}>
                <Text style={styles.head}>Log In</Text>
                <Text style={styles.subHeading}>continue your account by logging up with email and password</Text>
                <EmailInput email={email} validEmail={validEmail} changeEmailText={changeEmailText} />
                <PasswordInput password={password} changePasswordText={changePasswordText} validePassword={validePassword} />
                <ForgotPassword navigateToForgotScreen={navigateToForgotScreen} />
                <CheckBoxComponent rememberMe={rememberMe} changeRememberMeValue={changeRememberMeValue} />
                <Text style={{ color: 'red' }}>{overAllError ? overAllError : ""}</Text>
                <DefaultButton title='Continue' loading={loading} onPress={login} />
                <DidNotHaveAccount navigateToLoginScreen={navigateToSignupScreen} />
            </View>
            <SnackbarComponent message={snackBarMessage} type={snackBarMessageType} close={() => { setsnackBarVisible(false) }} visible={snackBarVisible} />
        </View>
    )
}

export default Login;