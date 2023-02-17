import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react';
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ImagePickerResponse, launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';

interface BottomSheetProp {
    bottomSheetRef: React.RefObject<RBSheet>;
    changeImage: (uri: string, name: string) => void
}


const BottomSheetComponent = ({ bottomSheetRef, changeImage }: BottomSheetProp) => {


    const launchCameraWithPermission = async () => {


        const options: CameraOptions = {
            mediaType: 'photo',
            includeBase64: true,
            quality: 0.5
        };

        await launchCamera(options, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                changeImage("", "");
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                changeImage("", "");
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets?.length) {
                changeImage(response.assets[0].uri ?? "", response.assets[0].fileName ?? "");
            }
        });
    }

    const launchGalleryWithPermission = async () => {

        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            includeBase64: true,
            quality: 0.5
        };

        await launchImageLibrary(options, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
                changeImage("", "");
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
                changeImage("", "");
            } else if (response.assets?.length) {
                changeImage(response.assets[0].uri ?? "", response.assets[0].fileName ?? "");
            }
        });
    }


    return (
        <RBSheet
            ref={bottomSheetRef}
            height={200}
            closeOnDragDown={true}
            closeOnPressMask={false}
            openDuration={250}
            customStyles={{
                container: {
                    justifyContent: "center",
                    alignItems: "center"
                }
            }}
        >
            <View style={styles.parent}>
                <TouchableOpacity onPress={launchCameraWithPermission}>
                    <Icon name="camera-alt" size={30} color="black" />
                    <Text style={styles.label}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={launchGalleryWithPermission}>
                    <Icon name="photo-library" size={30} color="black" />
                    <Text style={styles.label}>Gallery</Text>
                </TouchableOpacity>
            </View>
        </RBSheet>
    )
}

export default BottomSheetComponent

const styles = StyleSheet.create({
    parent: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 100
    },
    label: {
        color: 'black'
    }
})