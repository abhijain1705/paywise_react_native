import { Text, View } from 'react-native'
import { styles } from '../../common/styles/styles';
import React, { useState } from 'react';
import { createAccount } from '../../firebase/auth/firebase_methods';
import { EmailInput, PasswordInput, FullName, CheckBoxComponent, AlreadyHaveAccount } from '../../common/components/textInput';
import { validateEmail, validatePassword } from '../../common/logic/validation';
import DefaultButton from '../../common/components/defaultButton';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import SnackbarComponent from '../../common/components/snackbar';
import messaging from '@react-native-firebase/messaging';
import DatePicker from '../../common/components/datePicker';
import { checkPermission } from '../../common/logic/validation';

interface SignUpScreenProps {
    navigation: NavigationProp<ParamListBase>
};

const SignUp = ({ navigation }: SignUpScreenProps) => {
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [validePassword, setValidPassword] = useState("");
    const [name, setname] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setloading] = useState(false);
    const [overAllError, setoverAllError] = useState("");
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

    const changeNameText = (text: string) => {
        setname(text);
    }

    const navigateToLoginScreen = () => {
        navigation.navigate("Login");
    }

    const [birthday, setBirthday] = useState(new Date());

    const [showDatePicker, setShowDatePicker] = useState(false);


    const signUp = async () => {
        console.log(validePassword);
        if (validEmail && name.length > 0 && !validePassword) {
            try {
                const hasPermission = await checkPermission();
                if (hasPermission) {
                    const fcmToken = await messaging().getToken();
                    createAccount({
                        email, password,
                        name,
                        fcmToken,
                        birthday,
                        timeCallback: (value: boolean) => {
                            setloading(value);
                        },
                        remember: rememberMe,
                        callingSnackBar: (type: "error" | "success", message: string) => {
                            setsnackBarVisible(true);
                            setsnackBarMessage(message);
                            setsnackBarMessageType(type);
                        }
                    });
                    setoverAllError("");
                } else {
                    setsnackBarVisible(true);
                    setsnackBarMessage("you have not allowed for permission.");
                    setsnackBarMessageType("error");
                }
            } catch (error) {
                console.log('Error sending push notification:', error);
            }
        } else {
            setoverAllError("please fill details first");
            setTimeout(() => {
                setoverAllError("");
            }, 2000);
        }
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.body}>
                <Text style={styles.head}>Sign Up</Text>
                <Text style={styles.subHeading}>create your account by signing up with email and password</Text>
                <EmailInput email={email} validEmail={validEmail} changeEmailText={changeEmailText} />
                <PasswordInput password={password} changePasswordText={changePasswordText} validePassword={validePassword} />
                <FullName name={name} changeNameText={changeNameText} />
                <DatePicker label='Write BirthDay Date' setDate={setBirthday} setShowDatePicker={setShowDatePicker} date={birthday} showDatePicker={showDatePicker} />
                <CheckBoxComponent rememberMe={rememberMe} changeRememberMeValue={changeRememberMeValue} />
                <Text style={{ color: 'red' }}>{overAllError ? overAllError : ""}</Text>
                <DefaultButton title='Continue' loading={loading} onPress={signUp} />
                <AlreadyHaveAccount navigateToLoginScreen={navigateToLoginScreen} />
            </View>
            <SnackbarComponent message={snackBarMessage} type={snackBarMessageType} close={() => { setsnackBarVisible(false) }} visible={snackBarVisible} />
        </View>
    )
}

export default SignUp;