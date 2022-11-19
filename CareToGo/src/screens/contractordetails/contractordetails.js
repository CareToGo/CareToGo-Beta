import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef,
} from "react-native-shared-element";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ContractorDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const pressHandler = () => {
    navigation.navigate("orders", {
      id: route.params.id,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <AntDesign
        name="arrowleft"
        size={28}
        style={{
          padding: 12,
          position: "absolute",
          top: height * 0.04,
          left: "2%",
          zIndex: 2,
        }}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: "#4D80C5",
            borderRadius: 0,
            height: height * 0.3 + 32,
          },
        ]}
      ></View>
      <Text style={styles.name}>
        {route.params.firstName} {route.params.lastName} {`\u2022 `}
        {route.params.profession}
        {`\u2022 `}
        <FontAwesome
          name={route.params.transportationMode.toLowerCase()}
          size={24}
          color="white"
        />
      </Text>

      <Image
        source={{
          uri: "http://www.by-lee.com/nurse0.jpg",
        }}
        style={styles.image}
      />

      <View style={styles.bg}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#A6C4DD",
              height: 64,
              width: 64,
              borderRadius: 32,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons name="contacts" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#A6C4DD",
              height: 64,
              width: 64,
              borderRadius: 32,
              alignItems: "center",
              justifyContent: "center",
              borderColor: "black",
            }}
          >
            <MaterialIcons name="work" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={pressHandler}
            style={{
              backgroundColor: "#A6C4DD",
              height: 64,
              width: 64,
              borderRadius: 32,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons name="medical-services" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View>
          <Entypo name="dot-single" size={24} color="black" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "white",
    transform: [{ translateY: height * 0.3 }],
    borderRadius: 32,
    padding: 10,
    paddingTop: 32 + 10,
  },
  image: {
    width: width * 0.3,
    height: height * 0.13,
    resizeMode: "contain",
    position: "absolute",
    top: height / 5.8,
    right: 15,
    borderRadius: 32,
  },
  name: {
    fontWeight: "700",
    fontSize: 20,
    position: "absolute",
    top: height / 4,
    left: "5%",
    color: "white",
  },
});

export default ContractorDetails;
