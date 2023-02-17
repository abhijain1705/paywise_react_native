import { Text, View } from 'react-native'
import React, { useState } from 'react';
import { styles } from '../../common/styles/styles';
import { validateEmail } from '../../common/logic/validation';
import { EmailInput } from '../../common/components/textInput';
import DefaultButton from '../../common/components/defaultButton';
import SnackbarComponent from '../../common/components/snackbar';
import { resetPasswordLinkSentToEmail } from '../../firebase/auth/firebase_methods';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [loading, setloading] = useState(false);
    const [snackBarVisible, setsnackBarVisible] = useState(false);
    const [snackBarMessage, setsnackBarMessage] = useState("");
    const [snackBarMessageType, setsnackBarMessageType] = useState("error");

    const changeEmailText = (text: string) => {
        setEmail(text);
        setValidEmail(validateEmail(text));
    };

    const resetPassword = () => {
        if (validEmail) {
            resetPasswordLinkSentToEmail({
                email,
                timeCallback: (value: boolean) => {
                    setloading(value);
                },
                changeSnackbarMessage: (value: string) => {
                    setsnackBarMessage(value);
                },
                changeSnackbarVisibility: () => {
                    setsnackBarVisible(true);
                },
                changeSnackbarType: (value: string) => {
                    setsnackBarMessageType(value);
                }
            });
        }
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.body}>
                <Text style={styles.head}>Forgot Password</Text>
                <Text style={styles.subHeading}>write your email to reset password and to continue to your app</Text>
                <EmailInput email={email} validEmail={validEmail} changeEmailText={changeEmailText} />
                <DefaultButton loading={loading} onPress={resetPassword} />
            </View>
            <SnackbarComponent message={snackBarMessage} type={snackBarMessageType} close={() => { setsnackBarVisible(false) }} visible={snackBarVisible} />
        </View>
    )
}

export default ForgotPasswordScreen
