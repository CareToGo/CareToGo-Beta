import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import ViewCart from "../../components/ViewCart";
import { Storage } from "aws-amplify";
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
  const [dict, setDict] = useState({});
  const [stage, setStage] = useState("Contact");
  const [selected, setSelected] = useState([]);
  const [total, setTotal] = useState(0);
  const [imageLink, setImageLink] = useState();

  const fetchLink = async () => {
    Storage.get(`${route.params.sub}.jpg`)
      .then((mylink) => setImageLink(mylink))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchLink();
  }, []);

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
                  height: height * 0.081,
                  width: undefined,
                  aspectRatio: 1, 
                  borderRadius: 1000,
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
                  height: height * 0.081,
                  width: undefined,
                  aspectRatio: 1, 
                  borderRadius: 1000,
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
                  height: height * 0.081,
                  width: undefined,
                  aspectRatio: 1, 
                  borderRadius: 1000,
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
                  height: height * 0.081,
                  width: undefined,
                  aspectRatio: 1, 
                  borderRadius: 1000,
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
                  height: height * 0.081,
                  width: undefined,
                  aspectRatio: 1, 
                  borderRadius: 1000,
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
                  height: height * 0.081,
                  width: undefined,
                  aspectRatio: 1, 
                  borderRadius: 1000,
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
              data={JSON.parse(route.params?.nursingServices)}
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

                    if (newSelected[item.id]) {
                      setTotal(total + price);
                      dict[item.name] = price;
                    } else {
                      setTotal(total - price);
                      delete dict[item.name];
                    }
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
                  height: height * 0.081,
                  width: undefined,
                  aspectRatio: 1, 
                  borderRadius: 1000,
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
                  height: height * 0.081,
                  width: undefined,
                  aspectRatio: 1, 
                  borderRadius: 1000,
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
                  height: height * 0.081,
                  width: undefined,
                  aspectRatio: 1, 
                  borderRadius: 1000,
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
              data={JSON.parse(route.params?.pswServices)}
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
                    if (newSelected[item.id]) {
                      setTotal(total + price);
                      dict[item.name] = price;
                    } else {
                      setTotal(total - price);
                      delete dict[item.name];
                    }
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
          padding: 10,
          position: "absolute",
          top: Platform.OS == "ios" ? 12 : 0,
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
            height: height,
          },
        ]}
      ></View>
      <View
        style={{
          position: "absolute",
          bottom: height * 0.66,
          left: "5%",
        }}
      >
        <Text style={styles.name}>
          {route.params.firstName} {route.params.lastName}
        </Text>
        <Text style={styles.name}>
          {route.params.profession}
          {`\u2022 `}
          <MaterialCommunityIcons
            name={route.params.transportationMode.toLowerCase()}
            size={24}
            color="white"
          />
        </Text>
      </View>

      <Image
        source={{
          uri: imageLink,
        }}
        style={styles.image}
      />
      <Split />
      <ViewCart dict={dict} total={total} info={route.params} />
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    position: "absolute",
    width: width,
    height: height * 0.66,
    backgroundColor: "white",
    bottom: 0,
    borderTopRightRadius: 21,
    borderTopLeftRadius: 21,
    paddingTop: 30
  },
  image: {
    width: undefined,
    height: height*0.15,
    aspectRatio:1,
    resizeMode: "contain",
    position: "absolute",
    bottom: height * 0.642,
    right: 21,
    borderRadius: 12,
    zIndex: 100
  },
  name: {
    fontWeight: "700",
    fontSize: 20,

    color: "white",
  },
});

export default ContractorDetails;
