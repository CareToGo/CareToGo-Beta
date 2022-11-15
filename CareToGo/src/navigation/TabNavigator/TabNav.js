import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import SavedContractors from "../../screens/savedcontractors/savedcontractors";
import Appointments from "../../screens/appointments/appointments";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UserProfileNav from "../UserProfileNavigator/UserProfileNav";
import { Text } from "react-native";
import ProvidersNav from "../ProvidersNavigator/ProvidersNav"

const Tab = createMaterialBottomTabNavigator();

export default function TabNav() {
  return (
    <Tab.Navigator activeColor="#ffde59" inactiveColor="#001A72" barStyle={{ backgroundColor: "#FFFFFF" }}>
      <Tab.Screen
        name="Providers"
        component={ProvidersNav}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-nurse" size={25} color={color} />
          ),
          tabBarLabel: <Text style={{ color:'#001A72' }}>PROVIDERS</Text>
        }}
      />
      <Tab.Screen
        name="Services"
        component={SavedContractors}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="medical-services" size={25} color={color} />
          ),
          tabBarLabel: <Text style={{ color:'#001A72' }}>SERVICES</Text>
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={Appointments}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="calendar" size={25} color={color} />
          ),
          tabBarLabel: <Text style={{ color:'#001A72' }}>REQUESTS</Text>
        }}
      />
      <Tab.Screen
        name="SETTINGS"
        component={UserProfileNav}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-cog" size={25} color={color} />
          ),
          tabBarLabel: <Text style={{ color:'#001A72' }}>SETTINGS</Text>
        }}
      />
    </Tab.Navigator>
  );
}
