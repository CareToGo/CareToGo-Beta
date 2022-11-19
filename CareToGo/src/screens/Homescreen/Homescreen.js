import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Contractor from "../../components/contractorcomponent/contractor";
import { useBasketContext } from "../../contexts/BasketContext";
import c2g from "../../../assets/homespage/C2G.png";
import tw from "tailwind-react-native-classnames";
import { AntDesign } from "@expo/vector-icons";

const height = 900;
const width = 428;
export default function Homescreen() {
  const { workers } = useBasketContext();

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          paddingHorizontal: "4%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image style={{ width: 200, resizeMode: "contain" }} source={c2g} />
        <TouchableOpacity>
          <AntDesign name="search1" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <FlatList
        data={workers}
        renderItem={({ item }) => <Contractor worker={item} />}
      />
      <View style={styles.bg} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor:'#FFFFFF'
  },
  bg: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "red",
    transform: [{ translateY: height }],
    borderRadius: 32,
  },
});
