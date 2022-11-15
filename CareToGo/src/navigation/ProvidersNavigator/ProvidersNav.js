import { Image, View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homescreen from "../../screens/Homescreen/Homescreen";
import ContractorDetails from "../../screens/contractordetails/contractordetails";
import OrderScreen from "../../screens/orderscreen/orderscreen";
import Datepicker from "../../screens/datepicker/datepicker";
import Appointments from "../../screens/appointments/appointments";
import C2G from "../../../assets/homespage/C2G.png";
import { Ionicons } from "@expo/vector-icons";

const HomeStack = createNativeStackNavigator();

const ProvidersNav = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="ContractorList"
        component={Homescreen}
        options={{
          headerTitle: "",
          headerShown: false,
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          // headerLeft: () => (
          //   <View style={{ width: 120, height: 20 }}>
          //     <Image style={{ width: "100%", height: "100%", resizeMode: "contain" }} source={C2G} />
          //   </View>
          // ),
          // headerRight: () => (
          //   <View style={{ justifyContent:'center', width: 36, height: 36, backgroundColor:'lightgray', borderRadius: 10, alignItems:'center' }}>
          //     <Ionicons name="options" size={24} color="#001A72" />
          //   </View>
          // ),
        }}
      />
      <HomeStack.Screen
        name="contractor-details"
        component={ContractorDetails}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="orders"
        component={OrderScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="date-picker"
        component={Datepicker}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="appointment-order"
        component={Appointments}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export default ProvidersNav;
