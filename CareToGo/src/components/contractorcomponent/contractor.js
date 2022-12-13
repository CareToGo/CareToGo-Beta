import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Storage } from "aws-amplify";
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
  const pressHandler = () => {
    navigation.navigate("contractor-details", worker);
  };
  const [imageLink, setImageLink] = useState();

  const fetchLink = async () => {
    Storage.get(`${worker.sub}.jpg`)
      .then((mylink) => setImageLink(mylink))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    fetchLink();
  }, []);
  return (
    <SafeAreaView style={{ padding: 10 }}>
      <TouchableOpacity
        onPress={pressHandler}
        style={{ marginBottom: 10, height: height * 0.216, padding: 10 }}
      >
        <SharedElement id={`${worker?.id}.bg`}>
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
        <SharedElement id={`${worker?.id}.name`}>
          <Text style={styles.nurseTitle}>
            {worker?.firstName} {worker?.lastName} {`\u2022 `}
            <MaterialCommunityIcons
              name={worker?.transportationMode.toLowerCase()}
              size={25}
              color="white"
            />{" "}
            {`\u2022 `}
            {worker?.profession}
          </Text>
        </SharedElement>
        <SharedElement id={`${worker?.id}.image`}>
          <Image
            source={{
              uri: imageLink,
            }}
            style={styles.image}
          />
        </SharedElement>

        <Text style={styles.details}>
          {worker?.experience} years of Experience
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
              rating={worker?.rating}
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
    bottom: -height * 0.159,
    right: "4%",
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
