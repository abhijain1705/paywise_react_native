import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import Modal from "react-native-modal";

interface AlertDialogProp {
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    isModalVisible: boolean;
    title: string;
    body: string;
    type: string;
}

const AlertDialog = ({ setModalVisible, isModalVisible, title, body, type, }: AlertDialogProp) => {

    return (
        <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(true)} onBackButtonPress={() => setModalVisible(false)}>
            <View style={styles.modalParent}>
                <Text style={{ ...styles.title, color: type === "collect" ? 'green' : 'red' }}>{title}</Text>
                <Text style={{ ...styles.label, color: type === "collect" ? 'green' : 'red' }}>{body}</Text>
            </View>
        </Modal>
    )
}

export default AlertDialog

const styles = StyleSheet.create({
    modalParent: {
        width: '100%',
        backgroundColor: 'white',
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 12
    },
    title: {
        fontSize: 18, fontWeight: 'bold',
        textAlign: 'center',
    },
    label: {
        textAlign: 'center',
        fontSize: 15, fontWeight: '400',
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonText: {
        color: 'blue'
    }
});