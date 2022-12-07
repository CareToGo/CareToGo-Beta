import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfile from "../../screens/MyProfile/UserProfile";
import EditProfileNav from "../EditProfileTabNavigator/EditProfileTabNav";
import EditUserProfile from "../../screens/EditUserProfile/EditUserProfile";
import EditCareProfile from "../../screens/EditCareProfile/EditCareProfile";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../contexts/AuthContext";
import { Entypo } from "@expo/vector-icons";
import RequestScreen from "../../screens/RequestScreen/RequestScreen";
import PastOrder from "../../screens/PastOrder/PastOrder";

const RequestStack = createNativeStackNavigator();

const RequestNavigator = () => {
  const navigation = useNavigation();

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");

  const namewidth = SCREEN_WIDTH * 0.75;
  let namesize = 27;
  if (namewidth <= 27) {
    namesize = namewidth;
  } else {
    namesize = 27;
  }

  return (
    <RequestStack.Navigator>
      <RequestStack.Screen
        name="RequestScreen"
        component={RequestScreen}
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
      <RequestStack.Screen
        name="PastOrder"
        component={PastOrder}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerShown: false,
          headerShadowVisible: false,
          headerTitleAlign: "left",
          animation: "slide_from_right",
        }}
      />
    </RequestStack.Navigator>
  );
};

export default RequestNavigator;
