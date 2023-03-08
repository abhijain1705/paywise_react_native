import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface DatePickerProps {
    showDatePicker: boolean;
    date: Date;
    isDue?: boolean;
    label: string;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
    setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
}

const DatePicker = ({ setDate, label, isDue, setShowDatePicker, showDatePicker, date }: DatePickerProps) => {


    const handleDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const openDatePicker = () => {
        setShowDatePicker(true);
    };

    const formatDate = (date: Date) => {
        return `${date?.getDate()}/${date?.getMonth() + 1}/${date?.getFullYear()}`;
    };

    let dateAfterYear = new Date(new Date().setFullYear(new Date().getFullYear() + 100));
    let dayBefore100 = new Date(new Date().setFullYear(new Date().getFullYear() - 100));
    const today = new Date();  // get the current date
    const twoDaysAfter = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);

    return (
        <View style={styles.nameParent}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.dateParent}>
                <TextInput
                    style={{ ...styles.input, flex: 1, borderWidth: 0 }}
                    value={formatDate(date)}
                    placeholderTextColor={'black'}
                    editable={false}
                />
                <TouchableOpacity onPress={openDatePicker}>
                    <Icon name='calendar' size={24} color='black' />
                </TouchableOpacity>
            </View>
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    minimumDate={isDue ? twoDaysAfter : dayBefore100}
                    maximumDate={isDue ? dateAfterYear : new Date()}
                />
            )}
        </View>
    )
}

export default DatePicker

const styles = StyleSheet.create({
    label: {
        color: 'black',
    },
    nameParent: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
    },
    input: {
        borderColor: 'gray',
        width: '100%',
        borderWidth: 1,
        borderRadius: 12,
        color: 'black',
        padding: 12,
    },
    dateParent: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 12,
        paddingRight: 12,
    },
})