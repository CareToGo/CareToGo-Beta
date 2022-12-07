import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import EditUserProfile from "../../screens/EditUserProfile/EditUserProfile";
import EditCareProfile from "../../screens/EditCareProfile/EditCareProfile";
import { Dimensions } from "react-native";

const EditProfileTab = createMaterialTopTabNavigator();

const EditProfileNav = () => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");
  const insets = useSafeAreaInsets();

  return (
    <EditProfileTab.Navigator
      style={{ backgroundColor: "#FFFFFF" }}
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarItemStyle: { width: SCREEN_WIDTH * 0.45 },
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          marginTop: insets.top,
          height: 45,
          shadowOffset: { height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 1,
        },
        tabBarContentContainerStyle: {
          alignItems: "center",
          justifyContent: "center",
          width: SCREEN_WIDTH,
        },
        tabBarIndicatorContainerStyle: {
          alignItems: "center",
          justifyContent: "center",
          width: SCREEN_WIDTH,
        },
        tabBarIndicatorStyle: {
          width: SCREEN_WIDTH * 0.45,
          height: 4,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: SCREEN_WIDTH * 0.05,
          borderRadius: 10,
        },
        tabBarPressOpacity: 0.2,
        tabBarPressColor: "#004cff",
        tabBarBounces: true,
      }}
    >
      <EditProfileTab.Screen
        name="EditUserProfile"
        component={EditUserProfile}
        options={{
          tabBarLabel: "User Profile",
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerShown: false,
          headerShadowVisible: false,
          headerTitleAlign: "left",
          animation: "slide_from_right",
        }}
      />
      <EditProfileTab.Screen
        name="EditCareProfile"
        component={EditCareProfile}
        options={{
          tabBarLabel: "Care Profile",
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerShown: false,
          headerShadowVisible: false,
          headerTitleAlign: "left",
        }}
      />
    </EditProfileTab.Navigator>
  );
};

export default EditProfileNav;
