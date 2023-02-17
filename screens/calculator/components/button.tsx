import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { handleInput, cleanInput, result } from '../logic/calculation';

interface ButtonComponentProp {
    value?: string;
    type?: string;
    setnumber: React.Dispatch<React.SetStateAction<string>>;
    number: string;
    setloading: React.Dispatch<React.SetStateAction<boolean>>;
    callingSnackBar: (type: string, mesage: string) => void;
}

const ButtonComponent = ({ type, value, setnumber, number, setloading, callingSnackBar }: ButtonComponentProp) => {

    const whichFunctionToCallOnClick = () => {
        return type == 'number' || type == 'operator'
            ? handleInput({ input: value!, setnumber: setnumber, type: type, number: number, callingSnackBar: callingSnackBar }) : type == "clean"
                ? cleanInput({ setnumber: setnumber }) :
                type == "result"
                    ? result({ setloading: setloading, setnumber: setnumber, number: number, callingSnackBar: callingSnackBar }) : null
    }

    return (
        <TouchableOpacity
            onPress={whichFunctionToCallOnClick}
            style={styles.parent}>
            <Text style={styles.label}>{value}</Text>
        </TouchableOpacity>
    );
};

export default ButtonComponent;

const styles = StyleSheet.create({
    parent: {
        textAlign: 'center',
        width: '30%',
        height: 100,
        padidng: 4,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },
    label: {
        color: 'black',
        fontSize: 20,
        fontWeight: '700',
    },
});
