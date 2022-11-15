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
import EditUserProfile from "../../screens/EditUserProfile/EditUserProfile";
import { useEffect } from "react";
import AnimatedSplash from "react-native-animated-splash-screen";
import C2G from "../../../assets/homespage/C2G.png";
import FirstTimeEdit from "../../screens/FirstTimeEdit/FirstTimeEdit";

const Stack = createNativeStackNavigator();

const SplashNav = () => {
  const { dbUser, sub, loading } = useAuthContext();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");

  useEffect(() => {
    console.log("SpashLoading", sub, dbUser, loading);
  }, []);

  return (
    <AnimatedSplash
      translucent={false}
      isLoaded={!loading}
      logoImage={C2G}
      backgroundColor={"#FFFFFF"}
      logoHeight={300}
      logoWidth={250}
    >
      <Stack.Navigator>
        {!loading && dbUser ? (
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
        )}
      </Stack.Navigator>
    </AnimatedSplash>
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
