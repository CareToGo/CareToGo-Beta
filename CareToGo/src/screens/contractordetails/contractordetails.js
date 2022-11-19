import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import {
  SharedElement,
  SharedElementTransition,
  nodeFromRef,
} from "react-native-shared-element";
import { set } from "react-native-reanimated";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ContractorDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [stage, setStage] = useState("Contact");
  const [selected, setSelected] = useState([]);
  const pressNurse = () => {
    setStage("Nurse");
  };
  const pressContact = () => {
    setStage("Contact");
  };
  const pressPsw = () => {
    setStage("Psw");
  };

  const Split = () => {
    if (stage == "Contact") {
      return (
        <View style={styles.bg}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={pressContact}
                style={{
                  backgroundColor: "#A6C4DD",
                  height: height * 0.06911,
                  width: width * 0.14953271,
                  borderRadius: 32,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons name="contacts" size={24} color="white" />
              </TouchableOpacity>
              <Entypo name="dot-single" size={24} color="#A6C4DD" />
            </View>
            <View style={{}}>
              <TouchableOpacity
                onPress={pressPsw}
                style={{
                  backgroundColor: "#A6C4DD",
                  height: height * 0.06911,
                  width: width * 0.14953271,
                  borderRadius: 32,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "black",
                }}
              >
                <MaterialIcons name="work" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View style={{}}>
              <TouchableOpacity
                onPress={pressNurse}
                style={{
                  backgroundColor: "#A6C4DD",
                  height: height * 0.06911,
                  width: width * 0.14953271,
                  borderRadius: 32,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons
                  name="medical-services"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
    if (stage == "Nurse") {
      return (
        <View style={styles.bg}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <View>
              <TouchableOpacity
                onPress={pressContact}
                style={{
                  backgroundColor: "#A6C4DD",
                  height: height * 0.06911,
                  width: width * 0.14953271,
                  borderRadius: 32,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons name="contacts" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View style={{}}>
              <TouchableOpacity
                onPress={pressPsw}
                style={{
                  backgroundColor: "#A6C4DD",
                  height: height * 0.06911,
                  width: width * 0.14953271,
                  borderRadius: 32,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "black",
                }}
              >
                <MaterialIcons name="work" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={pressNurse}
                style={{
                  backgroundColor: "#A6C4DD",
                  height: height * 0.06911,
                  width: width * 0.14953271,
                  borderRadius: 32,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons
                  name="medical-services"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
              <Entypo name="dot-single" size={24} color="#A6C4DD" />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              data={JSON.parse(route.params.nursingServices)}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => (
                <View style={tw` border-t border-gray-200 flex-shrink py-0`} />
              )}
              renderItem={({
                item: { id, name, description, price },
                item,
              }) => (
                <TouchableOpacity
                  onPress={() => {
                    let newSelected = { ...selected };
                    newSelected[item.id] = !newSelected[item.id];
                    setSelected(newSelected);
                  }}
                  style={tw`flex-row items-center justify-evenly p-3 ${
                    selected[id] && "bg-gray-200"
                  }`}
                >
                  <View style={tw`px-3 w-5/6`}>
                    <Text style={tw`font-semibold text-lg`}>{name}</Text>
                    <Text style={tw`text-gray-500 `}>{description}</Text>
                  </View>
                  <Text style={tw`text-lg `}>${price}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      );
    }
    if (stage == "Psw") {
      return (
        <View style={styles.bg}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <View>
              <TouchableOpacity
                onPress={pressContact}
                style={{
                  backgroundColor: "#A6C4DD",
                  height: height * 0.06911,
                  width: width * 0.14953271,
                  borderRadius: 32,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons name="contacts" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={pressPsw}
                style={{
                  backgroundColor: "#A6C4DD",
                  height: height * 0.06911,
                  width: width * 0.14953271,
                  borderRadius: 32,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "black",
                }}
              >
                <MaterialIcons name="work" size={24} color="white" />
              </TouchableOpacity>
              <Entypo name="dot-single" size={24} color="#A6C4DD" />
            </View>
            <View style={{}}>
              <TouchableOpacity
                onPress={pressNurse}
                style={{
                  backgroundColor: "#A6C4DD",
                  height: height * 0.06911,
                  width: width * 0.14953271,
                  borderRadius: 32,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MaterialIcons
                  name="medical-services"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              data={JSON.parse(route.params.pswServices)}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => (
                <View style={tw` border-t border-gray-200 flex-shrink py-0`} />
              )}
              renderItem={({
                item: { id, name, description, price },
                item,
              }) => (
                <TouchableOpacity
                  onPress={() => {
                    let newSelected = { ...selected };
                    newSelected[item.id] = !newSelected[item.id];
                    setSelected(newSelected);
                  }}
                  style={tw`flex-row items-center justify-evenly p-3 ${
                    selected[id] && "bg-gray-200"
                  }`}
                >
                  <View style={tw`px-3 w-5/6`}>
                    <Text style={tw`font-semibold text-lg`}>{name}</Text>
                    <Text style={tw`text-gray-500 `}>{description}</Text>
                  </View>
                  <Text style={tw`text-lg `}>${price}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      );
    }
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
      <Split />
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

