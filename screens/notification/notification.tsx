import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { notificationStyles } from './style/style';
import messaging from '@react-native-firebase/messaging';
import { sendPushNotification } from './logic/logic';
import { unsubscribe } from './logic/logic';


const NotificationScreen = () => {

  const [fcmToken, setFcmToken] = useState('');
  useEffect(() => {
    // Get the FCM token for this deviced
    messaging()
      .getToken()
      .then(token => {
        console.log('FCM Token:', token);
        setFcmToken(token);
      })

    return unsubscribe;
  }, []);


  messaging().onMessage(async (remoteMessage) => {
    console.log('A new FCM message arrived!', remoteMessage);
    // You can handle the message here and display it to the user
  });

  return (
    <View style={notificationStyles.wrapper}>
      <TouchableOpacity
        onPress={() => sendPushNotification(fcmToken)}
        style={notificationStyles.button}
      >
        <Text style={notificationStyles.buttonLabel}>Send Notification</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotificationScreen;