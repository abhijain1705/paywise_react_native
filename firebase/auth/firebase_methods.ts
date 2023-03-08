import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import {
  firebase,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {EntryInterface, UserInterface} from '../../common/interfaces/interface';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import BackgroundTimer from 'react-native-background-timer';

interface CreateAccountProps {
  email?: string;
  password?: string;
  name?: string;
  fcmToken?: string;
  birthday?: Date;
  timeCallback: (value: boolean) => void;
  callingSnackBar: (type: 'error' | 'success', mesage: string) => void;
  remember?: boolean;
}

interface fetchUserInterface {
  setUserValue: (value: UserInterface | null) => void;
  user: FirebaseAuthTypes.User | null;
}

interface fetchEntryProp {
  lastDocument?:
    | FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
    | undefined;
  setLastDocument: React.Dispatch<
    React.SetStateAction<
      | FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
      | undefined
    >
  >;
  timeCallback: (value: boolean) => void;
  callingSnackBar: (type: 'error' | 'success', mesage: string) => void;
  setData: React.Dispatch<React.SetStateAction<EntryInterface[]>>;
  data: EntryInterface[];
  currentUserToken?: string;
  sendNotification(): Promise<void>;
}

export const resetPasswordLinkSentToEmail = (props: CreateAccountProps) => {
  const {email, callingSnackBar, timeCallback} = props;
  timeCallback(true);
  auth()
    .sendPasswordResetEmail(email!)
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
    .signInWithEmailAndPassword(email!, password!)
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
  const {
    email,
    password,
    name,
    fcmToken,
    birthday,
    timeCallback,
    remember,
    callingSnackBar,
  } = props;
  timeCallback(true);
  auth()
    .createUserWithEmailAndPassword(email!, password!)
    .then(usercredentials => {
      addUserToDatabase(
        usercredentials.user,
        name!,
        timeCallback,
        remember!,
        fcmToken!,
        birthday!,
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
  callingSnackBar: (type: 'error' | 'success', mesage: string) => void,
  type: 'error' | 'success',
  message: string,
) => {
  callingSnackBar(type, message);
};

const addUserToDatabase = (
  user: FirebaseAuthTypes.User,
  name: string,
  timeCallback: (value: boolean) => void,
  remember: boolean,
  fcmToken: string,
  birthday: Date,
  callingSnackBar: (type: 'error' | 'success', mesage: string) => void,
) => {
  const db = firebase.firestore();
  db.collection(process.env.API_USER_DOC!)
    .doc(user.uid)
    .set({
      email: user.email,
      name: name,
      fcmToken: fcmToken,
      birthday: birthday,
      profilePic: process.env.DEFAULT_PROFILE_PIC,
      remember: remember,
      totalDebitValuation: 0,
      totalCreditValuation: 0,
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

export const fetchUserData = async ({
  setUserValue,
  user,
}: fetchUserInterface) => {
  try {
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
    } else {
      setUserValue(null);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const logOut = async () => {
  try {
    await auth().signOut();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateUser = async ({
  name,
  birthday,
  timeCallback,
  callingSnackBar,
}: CreateAccountProps) => {
  try {
    const db = firebase.firestore();
    const docId = auth().currentUser?.uid;
    let userDoc = db.collection(process.env.API_USER_DOC!).doc(docId);
    if (name) {
      userDoc.update({name: name});
    }

    if (birthday !== undefined) {
      userDoc.update({birthday: birthday});
    }
    callingSnackBar('success', 'profile updated successfully');
    timeCallback(false);
  } catch (error) {
    callingSnackBar('error', 'error in update, try later!');
    timeCallback(false);
  }
};

export const addNewEntry = async (
  timeCallback: (value: boolean) => void,
  callingSnackBar: (type: 'error' | 'success', mesage: string) => void,
  partyName: string,
  mobileNumber: string,
  dueDate: Date,
  message: string,
  amount: string,
  type: string,
) => {
  try {
    timeCallback(true);
    const db = firebase.firestore();
    const docId = auth().currentUser?.uid;
    await db
      .collection(process.env.API_USER_DOC!)
      .doc(docId)
      .collection(process.env.API_ENTRY_DOC!)
      .doc(`${docId}-${new Date().getTime()}`)
      .set({
        partyName: partyName,
        mobileNumber: mobileNumber,
        dueDate: dueDate,
        message: message,
        amount: amount,
        type: type,
        madeOn: new Date(),
        uid: `${docId}-${new Date().getTime()}`,
      });

    let user = await db.collection(process.env.API_USER_DOC!).doc(docId).get();
    if (user.exists) {
      let amt = amount.split('₹');
      const userData = user.data() as UserInterface;
      await db
        .collection(process.env.API_USER_DOC!)
        .doc(docId)
        .update(
          type === 'collect'
            ? {
                totalCreditValuation:
                  userData.totalCreditValuation + Number(amt[1]),
              }
            : {
                totalDebitValuation:
                  userData.totalDebitValuation + Number(amt[1]),
              },
        );
    }
    timeCallback(false);
    callingSnackBar('success', 'successfully add entry');
  } catch (error) {
    timeCallback(false);
    callingSnackBar('error', 'error occured try again later');
  }
};

const headers = {
  Authorization: `key=${process.env.SERVER_API_KEY!}`,
};

export async function makeRequest(
  currentUserToken: string,
  title: string,
  body: string,
  type: string,
) {
  const fcmToken = await messaging().getToken();
  console.log(fcmToken, currentUserToken);
  
  await axios
    .post(
      process.env.FIREBASE_API!,
      {
        registration_ids: [
          currentUserToken === undefined ? fcmToken : currentUserToken,
        ],
        notification: {
          body: `${body}[]${type}`,
          title: title,
        },
      },
      {headers},
    )
    .then(res => {
      // console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
}

export const fetchEntry = async ({
  setLastDocument,
  timeCallback,
  callingSnackBar,
  setData,
  currentUserToken,
  sendNotification,
}: fetchEntryProp) => {
  let PAGE_SIZE = 6;
  try {
    timeCallback(true);
    const docId = auth().currentUser?.uid;
    const query = await firebase
      .firestore()
      .collection(process.env.API_USER_DOC!)
      .doc(docId)
      .collection(process.env.API_ENTRY_DOC!)
      .orderBy('madeOn', 'desc')
      .limit(PAGE_SIZE);

    await query.onSnapshot(snapshot => {
      if (snapshot.empty) {
        setData([]);
        setLastDocument(undefined);
      } else {
        const data = snapshot.docs.map(doc => ({
          ...doc.data(),
        })) as EntryInterface[];
        const scheduledEntries = new Set<string>();
        data.map((item, ind) => {
          let dueDate =
            item.dueDate instanceof firebase.firestore.Timestamp
              ? new Date(item.dueDate.seconds * 1000).getTime()
              : item.dueDate.getTime();
          let timeDiff = dueDate - Date.now();
          if (timeDiff > 0 && !scheduledEntries.has(item.uid)) {
            console.log(timeDiff);

            let title = `Time to ${item.type} ₹ ${item.amount} to ${item.partyName}`;
            let body = `The due date has arrived dont forget to ${item.type} it`;
            // Schedule a background task to call makeRequest when the entry's due date is reached
            BackgroundTimer.setTimeout(() => {
              makeRequest(currentUserToken!, title, body, item.type);
              sendNotification();
            }, timeDiff);
            scheduledEntries.add(item.uid);
          }
        });
        setData(data);
        setLastDocument(snapshot.docs[snapshot.docs.length - 1]);
      }
    });

    timeCallback(false);
  } catch (error) {
    timeCallback(false);
    callingSnackBar('error', 'error in data fetching, try again later.');
  }
};

export const handleLoadMoreEntries = async ({
  lastDocument,
  setLastDocument,
  timeCallback,
  callingSnackBar,
  setData,
  data,
  sendNotification,
  currentUserToken,
}: fetchEntryProp) => {
  let PAGE_SIZE = 6;
  try {
    timeCallback(true);
    const docId = auth().currentUser?.uid;
    const query = await firebase
      .firestore()
      .collection(process.env.API_USER_DOC!)
      .doc(docId)
      .collection(process.env.API_ENTRY_DOC!)
      .orderBy('madeOn', 'desc')
      .startAfter(lastDocument)
      .limit(PAGE_SIZE);
    const snapshot = await query.get();

    if (snapshot.empty) {
      setLastDocument(undefined);
    } else {
      const newData = snapshot.docs.map(doc => ({
        ...doc.data(),
      })) as EntryInterface[];
      const scheduledEntries = new Set<string>();
      data.map((item, ind) => {
        let dueDate =
          item.dueDate instanceof firebase.firestore.Timestamp
            ? new Date(item.dueDate.seconds * 1000).getTime()
            : item.dueDate.getTime();
        let timeDiff = dueDate - Date.now();
        if (timeDiff > 0 && !scheduledEntries.has(item.uid)) {
          let title = `Time to ${item.type} ₹ ${item.amount} to ${item.partyName}`;
          let body = `The due date has arrived dont forget to ${item.type} it`;
          // Schedule a background task to call makeRequest when the entry's due date is reached
          BackgroundTimer.setTimeout(() => {
            makeRequest(currentUserToken!, title, body, item.type);
            sendNotification();
          }, timeDiff);
          scheduledEntries.add(item.uid);
        }
      });

      setData([...data, ...newData]);
      setLastDocument(snapshot.docs[snapshot.docs.length - 1]);
    }
    timeCallback(false);
  } catch (error) {
    timeCallback(false);
    callingSnackBar('error', 'error in data fetching, try again later.');
  }
};
