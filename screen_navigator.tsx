import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './screens/sign_up/sign_up';
import Login from './screens/login_in/login';
import ForgotPasswordScreen from './screens/forgot_password/forgot_password_screen';
import { UserContext } from './context';
import { useContext } from 'react';
import Home from './screens/home/home';
import Setting from './screens/settings/setting';
import EditProfile from './screens/edit/editProfile';
import HeaderComponent from './common/components/header';
import Payment from './screens/payment/payment';

type RootStackParamList = {
    Payment: { type: "collect" | "pay" };
    Setting: undefined;
    Home: undefined;
    EditProfile: undefined;
    SignUp: undefined;
    ForgotPassword: undefined;
    Login: undefined;
};

function AuthenticatedStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
            <Stack.Screen name="EditProfile" options={{
                header: ({ navigation }) => {
                    return <HeaderComponent navigation={navigation} title={'Edit Profile'} />
                }
            }} component={EditProfile} />
            <Stack.Screen name='Setting' options={{
                header: ({ navigation }) => {
                    return <HeaderComponent navigation={navigation} title={'Settings'} />
                }
            }} component={Setting} />
            <Stack.Screen name='Payment' options={{
                header: ({ navigation }) => {
                    return <HeaderComponent navigation={navigation} title={'Payment'} />
                }
            }} component={Payment} initialParams={{ type: 'collect' }} />
        </Stack.Navigator>
    );
}


const Stack = createStackNavigator<RootStackParamList>();

function MyStack() {
    const { user } = useContext(UserContext);

    return (
        <NavigationContainer>
            {
                user === null ?
                    <Stack.Navigator>
                        <Stack.Screen name="SignUp" options={{
                            headerTitleAlign: 'center',
                            headerStyle: {
                                backgroundColor: '#fff', // Change this to the desired background color
                            },
                        }} component={SignUp} />
                        <Stack.Screen name="Login" options={{
                            headerTitleAlign: 'center',
                            headerStyle: {
                                backgroundColor: '#fff', // Change this to the desired background color
                            },
                        }} component={Login} />
                        <Stack.Screen name="ForgotPassword" options={{
                            headerTitleAlign: 'center',
                            headerStyle: {
                                backgroundColor: '#fff', // Change this to t he desired background color
                            },
                        }} component={ForgotPasswordScreen} />
                    </Stack.Navigator>
                    : <AuthenticatedStack />
            }
        </NavigationContainer>
    );
}

export default MyStack;