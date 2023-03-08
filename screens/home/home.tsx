import {
    View,
    Dimensions,
    FlatList,
    Text,
    TouchableOpacity,
    AppState,
    AppStateStatus,
} from 'react-native';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import messaging from '@react-native-firebase/messaging';
import { checkPermission } from '../../common/logic/validation';
import { UserContext } from '../../context';
import { styles } from './styles/styles';
import UserNotch from './components/userNotch';
import ButtonParent from './components/buttonParent';
import TransactionHistory from './components/transactionRecord';
import TransactionPlate from './components/transacPlate';
import { StackNavigationProp } from '@react-navigation/stack';
import { EntryInterface } from '../../common/interfaces/interface';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import {
    fetchEntry,
    handleLoadMoreEntries,
} from '../../firebase/auth/firebase_methods';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import Indicator from '../../common/components/indicator';
import { checkIfToday } from '../../common/logic/validation';
import { firebase } from '@react-native-firebase/firestore';
import SabkaBaad from '../../common/components/sabkaBaap';
import SnackbarComponent from '../../common/components/snackbar';
import AlertDialog from '../../common/components/alertDialog';

type RootStackParamList = {
    EditProfile: undefined;
    Setting: undefined;
    ReachedLimit: undefined;
    Payment: { type: string };
    Home: undefined;
    // add other screens in the stack here
};

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type HomeScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'EditProfile'
>;
type HomeProps = {
    route: HomeScreenRouteProp;
    navigation: HomeScreenNavigationProp;
};

const Home = ({ navigation, route }: HomeProps) => {

    const ScreenHeight = Dimensions.get('screen').height;
    const ScreenWidth = Dimensions.get('screen').width;
    const TopViewHeight = ScreenHeight / 2;
    const { user } = useContext(UserContext);
    const [data, setData] = useState<EntryInterface[]>([]);
    const [lastVisible, setLastVisible] = useState<
        | FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
        | undefined
    >(undefined);
    const [loading, setloading] = useState<boolean>(true);
    const [snackBarVisible, setsnackBarVisible] = useState(false);
    const [snackBarMessage, setsnackBarMessage] = useState('');
    const [snackBarMessageType, setsnackBarMessageType] = useState<
        'error' | 'success'
    >('error');

    const [appState, setAppState] = useState(AppState.currentState);
    const [isModalVisible, setModalVisible] = useState(false);
    const [title, settitle] = useState("");
    const [body, setbody] = useState("");
    const [postType, setpostType] = useState("");

    useEffect(() => {
        const appStateChangeHandler = (nextAppState: AppStateStatus) => {
            setAppState(nextAppState);
        };

        const subscription = AppState.addEventListener(
            'change',
            appStateChangeHandler,
        );

        return () => {
            subscription.remove();
        };
    }, []);

    function showDialog(title: string, body: string, type: string) {
        setModalVisible(true);
        settitle(title);
        setbody(body);
        setpostType(type);
    }

    async function sendNotification() {
        const hasPermission = await checkPermission();
        if (hasPermission) {
            if (appState === 'active') {
                messaging().onMessage(async remoteMessage => {
                });
            }
        } else {
            messaging().setBackgroundMessageHandler(async remoteMessage => {
                console.log(remoteMessage, "a fcm message arrived");
            });
        }
    }

    useEffect(() => {
        // Register a listener to detect when the app is opened from a notification
        messaging().onNotificationOpenedApp(remoteMessage => {
            // Show the dialog box when the app opens
            showDialog(remoteMessage.notification?.title ?? "notification title", remoteMessage.notification?.body?.split("[]")[0] ?? "notification body", remoteMessage.notification?.body?.split('[]')[1] ?? "collect");
        });
    }, []);

    const fectchEntry = () => {
        return fetchEntry({
            data: data,
            setLastDocument: setLastVisible,
            timeCallback: (value: boolean) => {
                setloading(value);
            },
            callingSnackBar: (type: 'error' | 'success', message: string) => {
                setsnackBarVisible(true);
                setsnackBarMessage(message);
                setsnackBarMessageType(type);
            },
            setData: setData,
            sendNotification: sendNotification,
        });
    }

    useEffect(() => {
        fectchEntry();
    }, []);


    const fetchMoreData = async () => {
        return await handleLoadMoreEntries({
            lastDocument: lastVisible,
            setLastDocument: setLastVisible,
            setData: setData,
            data: data,
            currentUserToken: user?.fcmToken ?? "",
            timeCallback: (value: boolean) => {
                setloading(value);
            },
            callingSnackBar: (type: 'error' | 'success', message: string) => {
                setsnackBarVisible(true);
                setsnackBarMessage(message);
                setsnackBarMessageType(type);
            },
            sendNotification: sendNotification,
        });
    };

    return (
        <SabkaBaad>
            <AlertDialog setModalVisible={setModalVisible} isModalVisible={isModalVisible} title={title} body={body} type={postType} />
            <View style={{ height: ScreenHeight, ...styles.parent }}>
                <View style={{ height: TopViewHeight, ...styles.top }}>
                    <UserNotch user={user} navigation={navigation} />
                    <View style={{ ...styles.debitCreditParent, height: TopViewHeight / 2 }}>
                        <TransactionHistory />
                    </View>
                    <ButtonParent navigation={navigation} />
                </View>
                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        let madeOn = item.madeOn instanceof firebase.firestore.Timestamp ? new Date(item.madeOn.seconds * 1000) : item.madeOn;
                        let ifToday = checkIfToday(madeOn);
                        let date = ifToday ? "Today" : `${madeOn.getDate()}/ ${madeOn.getMonth()}/${madeOn.getFullYear()}`;
                        let due = item.dueDate instanceof firebase.firestore.Timestamp ? new Date(item.dueDate.seconds * 1000) : item.dueDate;
                        let dueDate = `${due.getDate()}/ ${due.getMonth()}/${due.getFullYear()}`;
                        return <TransactionPlate
                            date={date}
                            amount={item.amount}
                            type={item.type}
                            due={dueDate}
                            partyName={item.partyName}
                        />
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={loading ? <Indicator /> : null}
                    contentContainerStyle={{ width: ScreenWidth, ...styles.bottom }}
                    ListFooterComponent={
                        <TouchableOpacity onPress={fetchMoreData}>
                            {loading ? <Indicator /> : <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', paddingVertical: 16, color: 'black' }}>
                                {lastVisible === undefined ? "No More Data" : "Load More"}
                            </Text>}
                        </TouchableOpacity>
                    }
                />
            </View>
            <SnackbarComponent message={snackBarMessage} type={snackBarMessageType} close={() => { setsnackBarVisible(false) }} visible={snackBarVisible} />
        </SabkaBaad>
    );
};

export default Home;
