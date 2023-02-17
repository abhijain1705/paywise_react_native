import { StyleSheet, Image, TouchableOpacity, ActivityIndicator, View, Text } from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Indicator from '../../../common/components/indicator';

interface ImagePickerProps {
    profilePic: string;
    image: string;
    loading: boolean;
    bottomSheetRef: React.RefObject<RBSheet>;
}

const ImagePickerComponent = ({ profilePic, image, bottomSheetRef, loading }: ImagePickerProps) => {
    return <TouchableOpacity onPress={() => bottomSheetRef.current?.open()}>
        {
            loading ? <Indicator /> : <Image source={{ uri: image.length > 0 ? image : profilePic }} style={styles.imageWrapper} />

        }
    </TouchableOpacity>;
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
    imageWrapper: { width: 200, height: 200, borderRadius: 100 },
});
