import { View, TextInput } from 'react-native'
import React, { useContext, useState } from 'react';
import { UserContext } from '../../context';
import { nameStyles } from './styles/style';
import { updateName } from '../../firebase/auth/firebase_methods';
import DefaultButton from '../../common/components/defaultButton';
import SnackbarComponent from '../../common/components/snackbar';
import { styles } from '../../common/styles/styles';

const NameUpdate = () => {

    const { user } = useContext(UserContext);


    const [name, setname] = useState(user?.name ?? "");
    const [nameLoading, setnameLoading] = useState(false);
    const [snackBarVisible, setsnackBarVisible] = useState(false);
    const [snackBarMessage, setsnackBarMessage] = useState("");
    const [snackBarMessageType, setsnackBarMessageType] = useState("error");

    const updateNameInDatabase = async () => {
        if (name === user?.name) {

        } else {
            await updateName({
                name: name,
                timeToCallForNameChange: (value: boolean) => {
                    setnameLoading(value);
                },
                callingSnackBar: (type: string, message: string) => {
                    setsnackBarVisible(true);
                    setsnackBarMessage(message);
                    setsnackBarMessageType(type);
                },
            });
        }
    };

    return (
        <View style={styles.wrapper}>
            <View style={nameStyles.parent}>
                <View >
                    <TextInput
                        placeholder='new name'
                        value={name}
                        onChangeText={(value) => setname(value)}
                        placeholderTextColor={'black'}
                        style={nameStyles.input}
                    />
                    <DefaultButton onPress={updateNameInDatabase} loading={nameLoading} title={'update'} />
                </View>
            </View>
            <SnackbarComponent message={snackBarMessage} type={snackBarMessageType} close={() => { setsnackBarVisible(false) }} visible={snackBarVisible} />
        </View>
    )
}

export default NameUpdate