import auth from '@react-native-firebase/auth';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/firestore';
import {UserInterface} from '../../common/interfaces/interface';
import storage from '@react-native-firebase/storage';
import {API_USER_DOC, DEFAULT_PROFILE_PIC} from '@env';

interface CreateAccountProps {
  email: string;
  password?: string;
  name?: string;
  timeCallback: (value: boolean) => void;
  callingSnackBar: (type: string, mesage: string) => void;
  remember?: boolean;
}

interface fetchUserInterface {
  setUserValue: (value: UserInterface | null) => void;
}

interface updateImageProp {
  imageToName: string;
  imageToSend: string;
  timeToCallForImageChange: (value: boolean) => void;
  callingSnackBar: (type: string, mesage: string) => void;
  settingImageBackToState: (value: string) => void;
}

interface updateNameProp {
  name: string;
  timeToCallForNameChange: (value: boolean) => void;
  callingSnackBar: (type: string, mesage: string) => void;
}

export const resetPasswordLinkSentToEmail = (props: CreateAccountProps) => {
  const {email, callingSnackBar, timeCallback} = props;
  timeCallback(true);
  auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      timeCallback(false);
      showSnackBar(callingSnackBar, 'success', 'password reset email sent');
    })
    .catch(() => {
      timeCallback(false);
      showSnackBar(
        callingSnackBar,
        'error',
        'Failed to send password reset email',
      );
    });
};

export const loginToAccount = (props: CreateAccountProps) => {
  const {email, password, timeCallback, remember, callingSnackBar} = props;
  timeCallback(true);
  auth()
    .signInWithEmailAndPassword(email, password!)
    .then(userCredential => {
      const db = firebase.firestore();
      db.collection(process.env.API_USER_DOC!)
        .doc(userCredential.user.uid)
        .update({remember: remember});
      showSnackBar(callingSnackBar, 'success', 'welcome back');
      timeCallback(false);
    })
    .catch(error => {
      switch (error.code) {
        case 'auth/invalid-email':
          showSnackBar(callingSnackBar, 'error', 'Invalid email address');
          timeCallback(false);
          break;
        case 'auth/user-disabled':
          showSnackBar(
            callingSnackBar,
            'error',
            'User account has been disabled',
          );
          timeCallback(false);
          break;
        case 'auth/user-not-found':
          showSnackBar(callingSnackBar, 'error', 'User not found');
          timeCallback(false);
          break;
        case 'auth/wrong-password':
          showSnackBar(callingSnackBar, 'error', 'Invalid password');
          timeCallback(false);
          break;
        case 'auth/too-many-requests':
          showSnackBar(
            callingSnackBar,
            'error',
            'Too many failed login attempts. Try again later.',
          );
          timeCallback(false);
          break;
        default:
          showSnackBar(callingSnackBar, 'error', 'Failed to sign in:');
          timeCallback(false);
          break;
      }
      return null;
    });
};

export const createAccount = (props: CreateAccountProps) => {
  const {email, password, name, timeCallback, remember, callingSnackBar} =
    props;
  timeCallback(true);
  auth()
    .createUserWithEmailAndPassword(email, password!)
    .then(usercredentials => {
      addUserToDatabase(
        usercredentials.user,
        name!,
        timeCallback,
        remember!,
        callingSnackBar,
      );
    })
    .catch(error => {
      timeCallback(false);
      if (error.code === 'auth/email-already-in-use') {
        showSnackBar(
          callingSnackBar,
          'error',
          'That email address is already in use!',
        );
        return;
      }

      if (error.code === 'auth/invalid-email') {
        showSnackBar(
          callingSnackBar,
          'error',
          'That email address is invalid!',
        );
        return;
      }
      showSnackBar(callingSnackBar, 'error', error.code);
    });
};

const showSnackBar = (
  callingSnackBar: (type: string, mesage: string) => void,
  type: string,
  message: string,
) => {
  callingSnackBar(type, message);
};

const addUserToDatabase = (
  user: FirebaseAuthTypes.User,
  name: string,
  timeCallback: (value: boolean) => void,
  remember: boolean,
  callingSnackBar: (type: string, mesage: string) => void,
) => {
  const db = firebase.firestore();
  db.collection(process.env.API_USER_DOC!)
    .doc(user.uid)
    .set({
      email: user.email,
      name: name,
      profilePic: process.env.DEFAULT_PROFILE_PIC,
      remember: remember,
      // add any other user data that you want to store
    })
    .then(() => {
      showSnackBar(callingSnackBar, 'success', 'account created successfully');
      timeCallback(false);
    })
    .catch(error => {
      showSnackBar(callingSnackBar, 'error', 'Error occured try again later');
      timeCallback(false);
      return;
    });
};

export const fetchUserData = async ({setUserValue}: fetchUserInterface) => {
  try {
    const user = firebase.auth().currentUser;

    if (user) {
      const docRef = firebase
        .firestore()
        .collection(process.env.API_USER_DOC!)
        .doc(user.uid);
      docRef.onSnapshot(doc => {
        if (doc.exists) {
          const userData = doc.data() as UserInterface;
          setUserValue(userData);
        } else {
          setUserValue(null);
        }
      });
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateName = async (prop: updateNameProp) => {
  try {
    const docId = firebase.auth().currentUser?.uid;
    prop.timeToCallForNameChange(true);
    await firebase
      .firestore()
      .collection(process.env.API_USER_DOC!)
      .doc(docId)
      .update({
        name: prop.name,
      });
    prop.timeToCallForNameChange(false);
    showSnackBar(prop.callingSnackBar, 'success', 'user update successfully');
  } catch (error) {
    console.log(error);
    prop.timeToCallForNameChange(false);
    showSnackBar(prop.callingSnackBar, 'error', 'error in updating values');
  }
};

export const updateImage = async (prop: updateImageProp) => {
  try {
    const docId = firebase.auth().currentUser?.uid;
    prop.timeToCallForImageChange(true);
    const reference = storage().ref(`Images/${prop.imageToName}`);
    const response = await fetch(prop.imageToSend);
    const blob = await response.blob();
    const task = reference.put(blob);
    await task;
    const downloadURL = await reference.getDownloadURL();
    console.log('Image uploaded to Firebase Storage:', downloadURL);
    await firebase
      .firestore()
      .collection(process.env.API_USER_DOC!)
      .doc(docId)
      .update({
        profilePic: downloadURL,
      });
    prop.timeToCallForImageChange(false);
    prop.settingImageBackToState('');
  } catch (error) {
    console.log(error);
    prop.timeToCallForImageChange(false);
    prop.settingImageBackToState('');
    showSnackBar(prop.callingSnackBar, 'error', 'error in updating values');
  }
};
