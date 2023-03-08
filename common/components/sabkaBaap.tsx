import { Text, View } from 'react-native'
import React, { ReactNode } from 'react';
import { styles } from '../styles/styles';

type Props = {
    children: ReactNode;
};

const SabkaBaad: React.FC<Props> = ({ children }) => {
    return (
        <View style={styles.wrapper}>
            {children}
        </View>
    );
};

export default SabkaBaad;
