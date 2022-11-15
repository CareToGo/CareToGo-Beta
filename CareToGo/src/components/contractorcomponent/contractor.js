import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef,
} from "react-native-shared-element";

const height = 900;
const width = 428;

const Contractor = ({ worker }) => {
  const navigation = useNavigation();

  const pressHandler = () => {
    navigation.navigate("contractor-details", worker);
    console.log(worker);
  };

  return (
    <SafeAreaView style={{ padding: 10 }}>
      <TouchableOpacity
        onPress={pressHandler}
        style={{ marginBottom: 10, height: 200, padding: 10 }}
      >
        <SharedElement id={`${worker.id}.bg`}>
          <View
            style={[
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: "#4D80C5",
                borderRadius: 16,
                height: height * 0.21,
              },
            ]}
          />
        </SharedElement>
        <SharedElement id={`${worker.id}.name`}>
          <Text style={styles.nurseTitle}>
            {worker.firstName} {worker.lastName} {`\u2022 `}
            {worker.profession}
          </Text>
        </SharedElement>
        <Text style={styles.details}>{worker.experienceDescription}</Text>

        <SharedElement id={`${worker.id}.image`}>
          <Image
            source={{
              uri: "http://www.by-lee.com/nurse0.jpg",
            }}
            style={styles.image}
          />
        </SharedElement>
        <View
          style={{
            flexDirection: "row",

            alignItems: "center",
          }}
        >
          <View style={{ padding: 5 }}>
            <FontAwesome name="bicycle" size={40} color="white" />
          </View>
          <View style={{ flexDirection: "column", padding: 5 }}>
            <Text style={{ color: "white" }}> Distance: 5 Km</Text>
            <Text style={{ color: "white", alignItems: "center" }}>
              <AntDesign name="staro" size={12} color="white" />
              4.98
            </Text>
          </View>
        </View>
        <View style={styles.bg} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Contractor;

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    position: "absolute",
    bottom: -115,
    right: 15,
    borderRadius: 32,
  },

  nurseTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 15,
    marginHorizontal: 10,
  },

  details: {
    color: "white",
    fontSize: 11,
    opacity: 0.7,
    marginVertical: 5,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  bg: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "white",
    transform: [{ translateY: height }],
    borderRadius: 32,
    padding: 10,
    paddingTop: 32 + 10,
  },
});
