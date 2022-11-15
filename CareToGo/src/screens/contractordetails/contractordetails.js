import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Map from "../../../assets/contractor-details-page/contractorDetailsMap.png";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef,
} from "react-native-shared-element";

const height = 900;
const width = 428;

const ContractorDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const services = route.params.service;

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
          top: 20 * 2,
          left: 10,
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
      </Text>
      <Text style={styles.jobTitle}>{route.params.profession}</Text>
      <Image
        source={{
          uri: "http://www.by-lee.com/nurse0.jpg",
        }}
        style={styles.image}
      />

      <View style={styles.bg}>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
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
            <View
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
              <AntDesign name="Trophy" size={24} color="white" />
            </View>
            <View
              style={{
                backgroundColor: "#A6C4DD",
                height: 64,
                width: 64,
                borderRadius: 32,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign name="customerservice" size={24} color="white" />
            </View>
          </View>
          <View>
            <Text>{route.params.transportationMode}</Text>
          </View>
        </ScrollView>
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
    width: 120,
    height: 120,
    resizeMode: "contain",
    position: "absolute",
    top: height / 6,
    right: 15,
    borderRadius: 32,
  },
  name: {
    fontWeight: "700",
    fontSize: 20,
    position: "absolute",
    top: height / 4,
    left: "5%",
  },
});

export default ContractorDetails;
