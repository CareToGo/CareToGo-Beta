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
import TabNav from "../navigation/TabNavigator/TabNav";
import Homescreen from "../screens/Homescreen/Homescreen";
import EditUserProfile from "../screens/EditUserProfile/EditUserProfile";

const Stack = createNativeStackNavigator();

const LoginNavigation = () => {
  const { dbUser, authUser } = useAuthContext();
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen
            name="HomeTabs"
            component={TabNav}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="EditUserProfile" component={EditUserProfile} />
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default LoginNavigation;
