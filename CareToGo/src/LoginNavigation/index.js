import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthContext } from "../contexts/AuthContext";
import { View, ActivityIndicator } from "react-native";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import SignInScreen from "../LoginScreens/SignInScreen";
import SignUpScreen from "../LoginScreens/SignUpScreen";
import ConfirmEmailScreen from "../LoginScreens/ConfirmEmailScreen";
import ForgotPasswordScreen from "../LoginScreens/ForgotPasswordScreen";
import NewPasswordScreen from "../LoginScreens/NewPasswordScreen";
import SplashNav from "../navigation/SplashNavigator/SplashNav";
import SplashScreen from "../screens/SplashScreen";
import TabNav from "../navigation/TabNavigator/TabNav";
import Homescreen from "../screens/Homescreen/Homescreen";
import EditUserProfile from "../screens/EditUserProfile/EditUserProfile";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ProvidersNav from "../navigation/ProvidersNavigator/ProvidersNav";
import RequestNavigator from "../navigation/RequestNavigator/RequestNavigator";
import UserProfileNav from "../navigation/UserProfileNavigator/UserProfileNav";
import {
  FontAwesome5,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const LoginNavigation = () => {
  const { authUser } = useAuthContext();
  const [user, setUser] = useState(undefined);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUser(authUser);
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  });

  if (authUser === undefined) {
    return (
      <SplashScreen />
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authUser ? (
        <>
          <Stack.Screen name="SplashNav" component={SplashNav} />
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        </>
      )}
    </Stack.Navigator >
  );
};

export default LoginNavigation;





        // <Tab.Navigator
        //   activeColor="#ffde59"
        //   inactiveColor="#001A72"
        //   barStyle={{ backgroundColor: "#FFFFFF" }}
        // >
        //   <Tab.Screen
        //     name="Providers"
        //     component={ProvidersNav}
        //     options={{
        //       headerShown: false,
        //       tabBarIcon: ({ color }) => (
        //         <FontAwesome5 name="user-nurse" size={25} color={color} />
        //       ),
        //       tabBarLabel: <Text style={{ color: "#001A72" }}>PROVIDERS</Text>,
        //     }}
        //   />
        //   <Tab.Screen
        //     name="Requests"
        //     component={RequestNavigator}
        //     options={{
        //       headerShown: false,
        //       tabBarIcon: ({ color }) => (
        //         <Entypo name="calendar" size={25} color={color} />
        //       ),
        //       tabBarLabel: <Text style={{ color: "#001A72" }}>REQUESTS</Text>,
        //     }}
        //   />
        //   <Tab.Screen
        //     name="SETTINGS"
        //     component={UserProfileNav}
        //     options={{
        //       headerShown: false,
        //       tabBarIcon: ({ color }) => (
        //         <MaterialCommunityIcons
        //           name="account-cog"
        //           size={25}
        //           color={color}
        //         />
        //       ),
        //       tabBarLabel: <Text style={{ color: "#001A72" }}>SETTINGS</Text>,
        //     }}
        //   />
        // </Tab.Navigator>