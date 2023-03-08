import { Text, View } from 'react-native';
import { styles } from './styles/styles';
import React, { useState } from 'react';
import DefaultButton from '../../common/components/defaultButton';
import { FullName } from '../../common/components/textInput';
import DatePicker from '../../common/components/datePicker';
import SnackbarComponent from '../../common/components/snackbar';
import { updateUser } from '../../firebase/auth/firebase_methods';
import { checkIfToday } from '../../common/logic/validation';
import SabkaBaad from '../../common/components/sabkaBaap';

const EditProfile = () => {

    const [name, setname] = useState("");


    let now = new Date();
    const [birthday, setBirthday] = useState(now);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [snackBarVisible, setsnackBarVisible] = useState(false);
    const [snackBarMessage, setsnackBarMessage] = useState("");
    const [loading, setloading] = useState(false);
    const [snackBarMessageType, setsnackBarMessageType] = useState<"error" | "success">("error");

    async function editProfile() {
        let isDateChange = checkIfToday(birthday);

        await updateUser({
            name: name, birthday: isDateChange ? birthday : undefined,
            timeCallback: (value: boolean) => {
                setloading(value);
            },
            callingSnackBar: (type: "error" | "success", message: string) => {
                setsnackBarVisible(true);
                setsnackBarMessage(message);
                setsnackBarMessageType(type);
            }
        });
        setname("");
        setBirthday(new Date());
    }

    return (
        <SabkaBaad>
            <View style={styles.editParent}>
                <View style={styles.nameParent}>
                    <Text style={styles.label}>Name</Text>
                    <FullName name={name} changeNameText={(text) => setname(text)} />
                </View>
                <DatePicker label='Write BirthDay Date' setDate={setBirthday} setShowDatePicker={setShowDatePicker} date={birthday} showDatePicker={showDatePicker} />
                <View style={{ position: 'absolute', bottom: 30, marginHorizontal: 20, width: '100%' }}>
                    <DefaultButton onPress={() => editProfile()} title='Continue' loading={loading} />
                </View>
            </View>
            <SnackbarComponent message={snackBarMessage} type={snackBarMessageType} close={() => { setsnackBarVisible(false) }} visible={snackBarVisible} />
        </SabkaBaad>
    )
}

export default EditProfile;