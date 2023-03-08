import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import firebase from '@react-native-firebase/app';
import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export const validateEmail = (email: string) => {
  // Email validation using regex
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  // password validation using regex
  const lowercaseRegex = /^(?=.*[a-z])/;
  const uppercaseRegex = /^(?=.*[A-Z])/;
  const numberRegex = /^(?=.*\d)/;
  const specialCharRegex = /^(?=.*[@$!%*?&])/;
  const lengthRegex = /^[A-Za-z\d@$!%*?&]{8,}/;

  let error = '';

  if (!lowercaseRegex.test(password)) {
    error = 'Password must contain at least one lowercase letter';
  } else if (!uppercaseRegex.test(password)) {
    error = 'Password must contain at least one uppercase letter';
  } else if (!numberRegex.test(password)) {
    error = 'Password must contain at least one number';
  } else if (!specialCharRegex.test(password)) {
    error = 'Password must contain at least one special character';
  } else if (!lengthRegex.test(password)) {
    error = 'Password must be at least 8 characters long';
  }

  return error;
};

export async function checkPermission() {
  const enabled = await messaging().hasPermission();
  if (enabled) {
    // User has permission to send push notifications
    return true;
  } else {
    // User does not have permission to send push notifications
    const status = await messaging().requestPermission();
    if (status === messaging.AuthorizationStatus.AUTHORIZED) {
      // User has just granted permission to send push notifications
      return true;
    } else {
      // User has denied permission to send push notifications
      Alert.alert(
        'Permission Required',
        'Please grant permission for push notifications in order to receive important updates.',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => checkPermission(),
          },
        ],
        {cancelable: false},
      );
      return false;
    }
  }
}
// firebase.firestore().m
export function checkIfToday(date: Date) {
  
  const today = new Date();

  return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()
}
