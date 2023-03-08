import React, { useEffect, useState } from 'react';
import {
  SafeAreaView
} from 'react-native';
import { UserInterface } from './common/interfaces/interface';
import { UserContext } from './context';
import { fetchUserData } from './firebase/auth/firebase_methods';
import ErrorScreen from './screens/error/error_screen';
import SplashScreen from './screens/splash_screen/splashScreen';
import MyStack from './screen_navigator';
import auth from '@react-native-firebase/auth';

function App() {

  const [user, setUser] = useState<UserInterface | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [isError, setisError] = useState(false);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          await fetchUserData({
            setUserValue: (value: UserInterface | null) => {
              if (value?.remember) {
                setUser(value);
              } else {
                setUser(null);
              }
            },
            user: user
          });
          setTimeout(() => {
            setInitializing(false);
          }, 1200);
          setisError(false);
        } catch (error) {
          setTimeout(() => {
            setInitializing(false);
          }, 1200);
          setisError(true);
          console.error('Error fetching user data:', error);
          // Handle error state here, such as displaying an error message
        }
      } else {
        setUser(null);
        setTimeout(() => {
          setInitializing(false);
        }, 1200);
      }
    });
    return unsubscribe;
  }, [])

  if (initializing) {
    return <SplashScreen />
  }

  if (isError) {
    return <ErrorScreen />
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <UserContext.Provider value={{ user, setUser }}>
        <MyStack />
      </UserContext.Provider>
    </SafeAreaView>
  );
}

export default App;
