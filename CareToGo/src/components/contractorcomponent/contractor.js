import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef,
} from "react-native-shared-element";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Storage } from "aws-amplify";
import StarRating from "react-native-star-rating";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Contractor = ({ worker }) => {
  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.navigate("contractor-details", worker);
  };
  const [imageLink, setImageLink] = useState(imageLink ? imageLink : null);

  const fetchLink = async () => {
    Storage.get(`${worker.sub}.jpg`)
      .then((mylink) => setImageLink(mylink))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchLink();
  }, []);

  return (
    <View style={{ width: '100%', paddingHorizontal: 12, marginVertical: 10 }}>
      <TouchableOpacity
        onPress={pressHandler}
        style={{ height: 180 }}
      >

        <SharedElement id={`${worker?.id}.bg`}>
          <View
            style={[
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: worker.online ? "#4D80C5" : "lightgray",
                borderRadius: 12,
                height: 180,
              },
            ]}
          >
            <Image
              source={{
                uri: imageLink,
              }}
              style={{...styles.image, opacity: worker.online ? 1.0 : 0.3 }}
            />
          </View>
        </SharedElement>

        <SharedElement id={`${worker?.id}.name`}>
          <Text style={styles.nurseTitle}>
            {worker?.firstName} {worker?.lastName} {`\u2022 `}
            <MaterialCommunityIcons
              name={worker?.transportationMode.toLowerCase()}
              size={25}
              color="white"
            />
            {" "}
            {`\u2022 `}
            {worker?.profession}
          </Text>
        </SharedElement>

        <Text style={styles.details}>
          {worker?.experience} Years of Experience
        </Text>

        {width > 360 ? (
          <View style={{ flexDirection: "row", alignItems: "center" }} >
            <View style={{ flexDirection: "row", padding: 5, alignItems: "center" }} >
              <Text style={{ color: "white", padding: 0 }}>
                {" "}5 Km{" "}{`\u2022`}{" "}20 min{" "}{`\u2022`}{" "}
              </Text>
              <StarRating
                disabled={true}
                fullStarColor={"#ffde59"}
                maxStars={5}
                rating={worker?.rating}
                starSize={18}
                containerStyle={{ width: 100 }}
              />
            </View>
          </View>
        ) : (
          <>
            <View style={{ flexDirection: "row", padding: 5, alignItems: "center", marginBottom: 10 }} >
              <Text style={{ color: "white", padding: 0 }}>
                {" "}
                5 Km{" "}{`\u2022`}{" "}20 min
              </Text>
            </View>

            <View style={{ flexDirection: "row", paddingLeft: 6, alignItems: "center" }} >
              <StarRating
                disabled={true}
                fullStarColor={"#ffde59"}
                maxStars={5}
                rating={worker?.rating}
                starSize={18}
                containerStyle={{ width: 100 }}
              />
            </View>
          </>




        )}


        <View style={{ padding: 5 }}></View>
        <View style={styles.bg} />
      </TouchableOpacity>
    </View>
  );
};

export default Contractor;

const styles = StyleSheet.create({
  image: {
    width: "30%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    position: "absolute",
    bottom: "5%",
    right: "3%",
    borderRadius: 15
  },

  nurseTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 15,
    marginHorizontal: 10
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
