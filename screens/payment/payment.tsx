import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles/styles';
import React, { useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { FullName } from '../../common/components/textInput';
import DatePicker from '../../common/components/datePicker';
import DefaultButton from '../../common/components/defaultButton';
import { addNewEntry } from '../../firebase/auth/firebase_methods';
import SnackbarComponent from '../../common/components/snackbar';
import { StackNavigationProp } from '@react-navigation/stack';
import { checkIfToday } from '../../common/logic/validation';
import SabkaBaad from '../../common/components/sabkaBaap';

type RootStackParamList = {
    Payment: { type: "collect" | "pay" };
    Home: undefined;
};

type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;
type PaymentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Payment'>;

type PaymentProps = {
    route: PaymentScreenRouteProp;
    navigation: PaymentScreenNavigationProp;
};

function Payment({ route, navigation }: PaymentProps) {
    const { type } = route.params;

    const [name, setname] = useState("");
    const [number, setnumber] = useState("");
    const [loading, setloading] = useState(false);
    const [snackBarVisible, setsnackBarVisible] = useState(false);
    const [snackBarMessage, setsnackBarMessage] = useState("");
    const [snackBarMessageType, setsnackBarMessageType] = useState<"error" | "success">("error");
    const [dueDate, setDueDate] = useState(new Date());
    const [amount, setamount] = useState("");
    const [message, setmessage] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleNumberChange = (input: string) => {
        // Check if the input value already includes "+91" to avoid duplicates
        if (input.startsWith('+91')) {
            setnumber(input);
        } else {
            setnumber('+91' + input);
        }
    };

    const handleAmountChange = (input: string) => {
        if (input.startsWith('₹')) {
            setamount(input);
        } else {
            setamount('₹' + input);
        }
    }

    const makeNewPost = async () => {
        let bothDateSame = checkIfToday(dueDate);
        if (name.length > 0 && amount.length > 1 && number.length >= 13 && message.length > 0 && bothDateSame === false) {
            await addNewEntry(
                (value: boolean) => {
                    setloading(value);
                },
                (type: "error" | "success", message: string) => {
                    setsnackBarVisible(true);
                    setsnackBarMessage(message);
                    setsnackBarMessageType(type);
                },
                name,
                number,
                dueDate,
                message,
                amount,
                type,
            );
            setTimeout(() => {
                navigation.navigate('Home');
            }, 1000);
        } else {
            setsnackBarVisible(true);
            setsnackBarMessage("please fill all details first");
            setsnackBarMessageType("error");
        }
    }

    return (
        <SabkaBaad>
            <View style={styles.paymentParent}>
                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Enter {type === "collect" ? "Payer" : "Reciever"} Name</Text>
                    <FullName name={name} changeNameText={(text) => setname(text)} />
                    <Text style={styles.label}>Enter Mobile Number</Text>
                    <TextInput
                        style={styles.input}
                        value={number}
                        maxLength={13}
                        keyboardType='number-pad'
                        onChangeText={handleNumberChange}
                        placeholder='Contact Number'
                        placeholderTextColor={'black'}
                    />
                    <DatePicker isDue={true} label={"Due Date"} setDate={setDueDate} setShowDatePicker={setShowDatePicker} date={dueDate} showDatePicker={showDatePicker} />
                    <Text style={styles.label}>Write a Message to help us to send a personalize remainder</Text>
                    <FullName name={message} title="Write a Message" changeNameText={(text) => setmessage(text)} />
                    <TextInput
                        placeholder='Enter Amount'
                        keyboardType='numeric'
                        value={amount}
                        onChangeText={handleAmountChange}
                        placeholderTextColor={'black'}
                        style={{ ...styles.priceInput, color: type === "collect" ? "green" : "red" }}
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <DefaultButton title='Continue' onPress={() => makeNewPost()} loading={loading} />
                </View>
            </View>
            <SnackbarComponent message={snackBarMessage} type={snackBarMessageType} close={() => { setsnackBarVisible(false) }} visible={snackBarVisible} />
        </SabkaBaad>
    )
}

export default Payment;