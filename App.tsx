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


function App() {


  const [user, setUser] = useState<UserInterface | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [isError, setisError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUserData({
          setUserValue: (value: UserInterface | null) => {
            if (value?.remember) {
              setUser(value);
            } else {
              setUser(null);
            }
          },
        });
        setTimeout(() => {
          setInitializing(false);
        }, 2000);
        setisError(false);
      } catch (error) {
        setInitializing(false);
        setisError(true);
        console.error('Error fetching user data:', error);
        // Handle error state here, such as displaying an error message
      }
    }
    fetchData();
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