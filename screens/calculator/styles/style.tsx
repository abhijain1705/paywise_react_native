import { StyleSheet } from 'react-native';

export const calculatorStyles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: 0,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    parent: {
        flex: 1,
        position: 'relative',
        justifyContent: 'space-between',
    },
    valueWrapper: {
        position: 'absolute',
        textAlign: 'right',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        right: 0,
        top: 50
    },
    value: {
        color: 'black',
        fontSize: 40,
    }
});