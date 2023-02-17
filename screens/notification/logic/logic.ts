import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import PushNotification from 'react-native-push-notification';
import {CHANNEL_ID, FIREBASE_API, SERVER_API_KEY} from '@env';

const showSystemNotification = (title: string, body: string) => {
  PushNotification.localNotification({
    channelId: process.env.CHANNEL_ID, // the ID of the notification channel
    title: title,
    message: body,
    smallIcon: 'ic_notification',
    largeIcon: 'ic_launcher',
    playSound: true,
    soundName: 'default',
    autoCancel: true,
  });
};

// Listen for incoming FCM messages
export const unsubscribe = messaging().onMessage(async message => {
  console.log('FCM Message:', message);
  // Display the notification in the app while it's running in the foreground
  // For Android, use the react-native-notifications library to display notifications in the system tray
  showSystemNotification(
    message.notification?.title ?? '',
    message.notification?.body ?? '',
  );
});

export const sendPushNotification = async (fcmToken: string) => {
  if (!fcmToken) {
    console.log('FCM token not found');
    return;
  }
  var data = JSON.stringify({
    data: {},
    notification: {
      body: 'My Notifications Title',
      title: 'My Notifications Body',
    },
    to: fcmToken,
  });

  var config = {
    method: 'post',
    url: process.env.FIREBASE_API,
    headers: {
      Authorization:
        `key=${process.env.SERVER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
