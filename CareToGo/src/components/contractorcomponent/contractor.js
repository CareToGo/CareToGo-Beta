import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef,
} from "react-native-shared-element";
import StarRating from "react-native-star-rating";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Contractor = ({ worker }) => {
  const navigation = useNavigation();
  console.log(width, height);
  const pressHandler = () => {
    navigation.navigate("contractor-details", worker);
  };

  return (
    <SafeAreaView style={{ padding: 10 }}>
      <TouchableOpacity
        onPress={pressHandler}
        style={{ marginBottom: 10, height: height * 0.216, padding: 10 }}
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
            <FontAwesome
              name={worker.transportationMode.toLowerCase()}
              size={25}
              color="white"
            />{" "}
            {`\u2022 `}
            {worker.profession}
          </Text>
        </SharedElement>
        <SharedElement id={`${worker.id}.image`}>
          <Image
            source={{
              uri: "http://www.by-lee.com/nurse0.jpg",
            }}
            style={styles.image}
          />
        </SharedElement>

        <Text style={styles.details}>
          {worker.experienceDescription} years of Experience
        </Text>

        <View
          style={{
            flexDirection: "row",

            alignItems: "center",
          }}
        >
          <View
            style={{ flexDirection: "row", padding: 5, alignItems: "center" }}
          >
            <Text style={{ color: "white", padding: 0 }}>
              {" "}
              5 Km {`\u2022 `} 20 min {`\u2022 `}
            </Text>
            <StarRating
              disabled={true}
              fullStarColor={"#A6C4DD"}
              maxStars={5}
              rating={4.5}
              starSize={18}
              containerStyle={{ width: 100 }}
            />
          </View>
        </View>
        <View style={{ padding: 5 }}></View>
        <View style={styles.bg} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Contractor;

const styles = StyleSheet.create({
  image: {
    width: width * 0.3,
    height: height * 0.13,
    resizeMode: "contain",
    position: "absolute",
    bottom: -115,
    right: 15,
    borderRadius: 30,
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
    fontSize: 15,
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
