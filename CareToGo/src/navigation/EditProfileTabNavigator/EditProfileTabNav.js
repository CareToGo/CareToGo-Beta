import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserProfile from "../../screens/MyProfile/UserProfile";
import EditUserProfile from "../../screens/EditUserProfile/EditUserProfile";
import EditCareProfile from "../../screens/EditCareProfile/EditCareProfile";
import { Text, View, ScrollView, StyleSheet, TouchableHighlight, Image, Dimensions, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../contexts/AuthContext";
import { Entypo } from '@expo/vector-icons';

const EditProfileTab = createMaterialTopTabNavigator();

const EditProfileNav = () => {
  return (
    <EditProfileTab.Navigator
      style={{ backgroundColor:"#FFFFFF", paddingTop: 20 }} 
      screenOptions={{
      tabBarLabelStyle: { fontSize: 12 },
      tabBarItemStyle: { width: 100 },
      tabBarStyle: { backgroundColor: 'powderblue' },
    }}>
      <EditProfileTab.Screen
        name="EditUserInfo"
        component={EditUserProfile}
        options={{
          tabBarLabel: 'Basic Profile',
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerShown: false,
          headerShadowVisible: false,
          headerTitleAlign: "left",
          animation: 'slide_from_right'
        }}
      />
      <EditProfileTab.Screen
        name="EditCareProfile"
        component={EditCareProfile}
        options={{
          tabBarLabel: 'Basic Profile',
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
