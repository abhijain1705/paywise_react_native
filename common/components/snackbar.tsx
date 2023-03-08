import { StyleSheet, View } from 'react-native';
import { Snackbar } from 'react-native-paper';

interface SnackBarProps {
    message: string;
    visible: boolean;
    type: "error" | "success";
    close: () => void;
}

const SnackbarComponent = (props: SnackBarProps) => {
    const { message, type, close, visible } = props;
    return (
        <View>
            <Snackbar
                visible={visible}
                style={{ backgroundColor: type == "error" ? "red" : "green" }}
                onDismiss={() => close()}
                duration={60000}
                action={{
                    label: 'Dismiss',
                    onPress: () => close(),
                }}>
                {message}
            </Snackbar>

        </View>
    )
}

export default SnackbarComponent

const styles = StyleSheet.create({})