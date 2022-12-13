import {
  Text,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNav from "../TabNavigator/TabNav";
import { useAuthContext } from "../../contexts/AuthContext";
import SplashScreen from "../../screens/SplashScreen";
import EditUserProfile from "../../screens/EditUserProfile/EditUserProfile";
import { useEffect } from "react";
import AnimatedSplash from "react-native-animated-splash-screen";
import C2G from "../../../assets/homespage/C2G.png";
import FirstTimeEdit from "../../screens/FirstTimeEdit/FirstTimeEdit";

const Stack = createNativeStackNavigator();

const SplashNav = () => {
  const { authUser, dbUser, loading, queryUser, setLoading, sub } = useAuthContext();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setLoading(false);
    }, 2000)
    return () => {
      clearTimeout(timeId);
    }
  }, []);

  useEffect(() => {
    queryUser(authUser.attributes.sub);
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!loading ? (dbUser ? (
        <Stack.Screen
          name="HomeTabs"
          component={TabNav}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="FirstTimeEditPage"
          component={FirstTimeEdit}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "#FFFFFF",
            },
            headerShadowVisible: false,
            headerTitleAlign: "left",
            animation: "slide_from_right",
            headerLeft: () => (
              <Text style={{ fontSize: SCREEN_WIDTH / 12 }}>
                Edit New Profile...
              </Text>
            ),
          }}
        />
      )) : (
        <Stack.Screen
          name="SplashingScreen"
          component={SplashScreen}
        />
      )
      }
    </Stack.Navigator>
  );
};

export default SplashNav;

const styles = StyleSheet.create({
  loadingScreen: {
    backgroundColor: "#FFFFFF",
    borderRadius: 0,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});
