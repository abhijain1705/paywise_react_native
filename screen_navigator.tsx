import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './screens/sign_up/sign_up';
import Login from './screens/login_in/login';
import ForgotPasswordScreen from './screens/forgot_password/forgot_password_screen';
import HomeScreen from './screens/home/home';
import { UserContext } from './context';
import { useContext } from 'react';
import Notification from './screens/notification/notification';
import Calculator from './screens/calculator/calculator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NameUpdate from './screens/name/name_update';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



function MyStack() {
    const { user } = useContext(UserContext);

    return (
        <NavigationContainer>
            {
                !user ?
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
                                backgroundColor: '#fff', // Change this to the desired background color
                            },
                        }} component={ForgotPasswordScreen} />
                    </Stack.Navigator>
                    :
                    <Tab.Navigator screenOptions={({ route }) => ({
                        tabBarIcon: ({ color, size }) => {
                            let iconName;

                            if (route.name === 'HomeScreen') {
                                iconName = 'home';
                            } else if (route.name === 'Calculator') {
                                iconName = 'calculator';
                            } else if (route.name === 'Notification') {
                                iconName = 'bell';
                            } else if(route.name === "NameUpdate") {
                                iconName = "account";
                            }

                            return (
                                <>{
                                    iconName ? <Icon
                                        name={iconName}
                                        size={size}
                                        color={color}
                                    /> : null
                                }</>
                            );
                        },
                        tabBarLabelStyle: {
                            fontSize: 12,
                            fontWeight: 'bold',
                        },
                        tabBarShowLabel: true,
                        tabBarActiveTintColor: 'black',
                        tabBarInactiveTintColor: 'grey'
                    })}>
                        <Tab.Screen name='HomeScreen' component={HomeScreen} />
                        <Tab.Screen name='NameUpdate' component={NameUpdate} />
                        <Tab.Screen name='Calculator' component={Calculator} />
                        <Tab.Screen name='Notification' component={Notification} />
                    </Tab.Navigator>

            }</NavigationContainer>
    );
}

export default MyStack;