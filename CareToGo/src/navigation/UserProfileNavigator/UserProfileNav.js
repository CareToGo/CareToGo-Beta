import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfile from "../../screens/MyProfile/UserProfile";
import EditProfileNav from "../EditProfileTabNavigator/EditProfileTabNav";
import EditUserProfile from "../../screens/EditUserProfile/EditUserProfile";
import EditCareProfile from "../../screens/EditCareProfile/EditCareProfile";
import { Text, View, ScrollView, StyleSheet, TouchableHighlight, Image, Dimensions, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../contexts/AuthContext";
import { Entypo } from '@expo/vector-icons';


const ProfileStack = createNativeStackNavigator();

const UserProfileNav = () => {
  const navigation = useNavigation();

  const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');

  const namewidth = SCREEN_WIDTH * 0.75;
  let namesize = 27;
  if (namewidth <= 27) {
    namesize = namewidth;
  } else {
    namesize = 27;
  }

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerShown: false,
          title: "",
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerShadowVisible: true,
          headerTitleAlign: "left",
        }}
      />
      <ProfileStack.Screen
        name="EditUserProfile"
        component={EditProfileNav}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerShown: false,
          headerShadowVisible: false,
          headerTitleAlign: "left",
          animation: 'slide_from_right',
        }}
      />

      {/* <ProfileStack.Screen
        name="EditUserProfile"
        component={EditUserProfile}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerShown: false,
          headerShadowVisible: false,
          headerTitleAlign: "left",
          animation: 'slide_from_right',
          headerRight: () => (
            <Text style={{ fontSize: SCREEN_WIDTH / 12 }}>
              Edit My Profile
            </Text>
          ),
          headerLeft: () => (
            <TouchableHighlight style={{ textAlign: "right" }}>
              <Pressable onPress={() => navigation.navigate('UserProfile')}>
                <Entypo name="arrow-with-circle-down" size={30} color="#001A72" />
              </Pressable>
            </TouchableHighlight>
          ),
        }}
      />
      <ProfileStack.Group screenOptions={{ presentation: 'modal' }}>
        <ProfileStack.Screen
          name="EditCareProfile"
          component={EditCareProfile}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "#FFFFFF",
            },
            headerShown: false,
            headerShadowVisible: false,
            headerTitleAlign: "left",
          }}
        />
      </ProfileStack.Group> */}
    </ProfileStack.Navigator>
  );
};

export default UserProfileNav;
