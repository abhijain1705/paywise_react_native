import { View } from 'react-native'
import React, { useContext, createRef, useState } from 'react';
import { homeStyles } from './styles/style';
import { UserContext } from '../../context';
import { styles } from '../../common/styles/styles';
import ImagePickerComponent from './components/image_picker';
import BottomSheetComponent from './components/bottom_sheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import { updateImage } from '../../firebase/auth/firebase_methods';
import SnackbarComponent from '../../common/components/snackbar';
import DefaultButton from '../../common/components/defaultButton';

function HomeScreen() {

  // ref
  const bottomSheetRef = createRef<RBSheet>();

  const [imageLoading, setImageLoading] = useState(false);
  const [snackBarVisible, setsnackBarVisible] = useState(false);
  const [snackBarMessage, setsnackBarMessage] = useState("");
  const [snackBarMessageType, setsnackBarMessageType] = useState("error");
  const [imageTosend, setimageTosend] = useState("");
  const [imageToShow, setimageToShow] = useState("");

  const changeImage = (uri: string, name: string) => {
    console.log(uri, name);

    setimageTosend(name);
    setimageToShow(uri);
  }

  const { user } = useContext(UserContext);

  const updateImageInDatabase = async () => {
    await updateImage({
      imageToName: imageTosend,
      imageToSend: imageToShow,
      timeToCallForImageChange: (value: boolean) => {
        setImageLoading(value);
      },
      callingSnackBar: (type: string, message: string) => {
        setsnackBarVisible(true);
        setsnackBarMessage(message);
        setsnackBarMessageType(type);
      },
      settingImageBackToState: (value: string) => {
        setimageTosend(value);
        setimageToShow(value);
      }
    });
  };

  function cancel() {
    setimageToShow("");
    setimageTosend("");
  }

  return (
    <View style={styles.wrapper}>
      <View style={homeStyles.main}>
        <ImagePickerComponent loading={imageLoading} image={imageToShow} bottomSheetRef={bottomSheetRef} profilePic={user?.profilePic!} />
        {imageTosend ? <DefaultButton title="save" loading={imageLoading} onPress={updateImageInDatabase} /> : null}
        {imageTosend ? <DefaultButton title="cancel" loading={imageLoading} onPress={cancel} /> : null}
        <BottomSheetComponent changeImage={changeImage} bottomSheetRef={bottomSheetRef} />
      </View>
      <SnackbarComponent message={snackBarMessage} type={snackBarMessageType} close={() => { setsnackBarVisible(false) }} visible={snackBarVisible} />
    </View>
  )
}


export default HomeScreen;
