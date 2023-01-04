import {
  TouchableOpacity,
  ImageBackground,
  Animated,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  Dimensions,
  Image,
  Platform,
  Pressable,
  SafeAreaView
} from "react-native";
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { MaterialIcons, FontAwesome, MaterialCommunityIcons, Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../contexts/AuthContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SelectList } from 'react-native-dropdown-select-list'
import MapView from "react-native-maps";
import Contractor from "../../components/contractorcomponent/contractor";
import restaurants from "../../../assets/data/restaurants.json";
import { DataStore } from "aws-amplify";
import { Worker } from "../../models";
import { useBasketContext } from "../../contexts/BasketContext";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function FirstTimeEdit() {
  const navigation = useNavigation();
  const { dbUser, sub, setDbUser } = useAuthContext();
  const [firstname, setFName] = useState(dbUser?.firstname || "");
  const [lastname, setLName] = useState(dbUser?.lastname || "");
  const [gender, setGender] = useState(dbUser?.gender || "");
  const [dob, setDOB] = useState(dbUser?.dob || "");
  const [email, setEmail] = useState(dbUser?.email || "");
  const [contactnum, setNum] = useState(dbUser?.contactnum || "");
  const [emergency, setEmer] = useState(dbUser?.emergency || "");
  const [address, setAddress] = useState(dbUser?.address || "");
  const [da, setDA] = useState(dbUser?.detailedaddress || "");
  const [lat, setLat] = useState(dbUser?.lat + "" || "0");
  const [lng, setLng] = useState(dbUser?.lng + "" || "0");
  const [postal, setPostal] = useState(dbUser?.postalcode || "");
  const [mobility, setMobility] = useState(dbUser?.mobility || "");
  const [grooming, setGrooming] = useState(dbUser?.grooming || "");
  const [feeding, setFeeding] = useState(dbUser?.feeding || "");
  const [mealprep, setMealprep] = useState(dbUser?.mealprep || "");

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(dbUser?.dob));
  const [mode, setMode] = useState("date");
  const [addyshow, setAddyShow] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const _map = useRef(null);
  const data = [
    { key: '1', value: 'TOTAL CARE' },
    { key: '2', value: 'SOME ASSISTANCE' },
    { key: '3', value: 'INDEPENDENT' },
  ]

  useEffect(() => {
    console.log(1)
  }, []);

  const changeGender = () => {
    if (gender == "Male") {
      setGender("Female");
    } else if (gender == "Female") {
      setGender("Other");
    } else if (gender == "Other") {
      setGender("Male");
    }
  };

  const fadeIn = () => {
    showDatepicker();
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 500,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const onChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShow(false);
      const currentDate = selectedDate;
      var year = currentDate.getFullYear();
      var month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      var day = currentDate.getDate().toString().padStart(2, "0");
      var bday = year + "-" + month + "-" + day;
      console.log(year + "-" + month + "-" + day);
      setDOB(bday);
      setDate(new Date(currentDate));
    }
    if (Platform.OS === "ios") {
      const currentDate = selectedDate;
      var year = currentDate.getFullYear();
      var month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      var day = currentDate.getDate().toString().padStart(2, "0");
      var bday = year + "-" + month + "-" + day;
      console.log(year + "-" + month + "-" + day);
      setDOB(bday);
      setDate(new Date(currentDate));
    }
  };

  const showDatepicker = () => {
    showMode("date");
    console.log("pressed");
  };

  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(true);
    } else if (Platform.OS === "ios") {
      setShow(true);
    }
    setMode(currentMode);
  };

  const closePicker = () => {
    if (Platform.OS === "ios") {
      fadeOut();
      const timeId = setTimeout(() => {
        setShow(false);
      }, 500);
      return () => {
        clearTimeout(timeId);
      };
    }
  };

  const pickAddy = () => {
    setAddyShow(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 500,
    }).start();
  };

  const closeAddy = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    const timeId = setTimeout(() => {
      setAddyShow(false);
    }, 500);
    return () => {
      clearTimeout(timeId);
    };
  };

  const changeMobility = (val) => {
    if (val == 1) {
      setMobility('TOTALCARE');
    } else if (val == 2) {
      setMobility('SOMEASSISTANCE');
    } else {
      setMobility('INDEPENDENT');
    }
  };

  const changeGrooming = (val) => {
    if (val == 1) {
      setGrooming('TOTALCARE');
    } else if (val == 2) {
      setGrooming('SOMEASSISTANCE');
    } else {
      setGrooming('INDEPENDENT');
    }
  };

  const changeFeeding = (val) => {
    if (val == 1) {
      setFeeding('TOTALCARE');
    } else if (val == 2) {
      setFeeding('SOMEASSISTANCE');
    } else {
      setFeeding('INDEPENDENT');
    }
  };

  const changeMealprep = (val) => {
    if (val == 1) {
      setMealprep('TOTALCARE');
    } else if (val == 2) {
      setMealprep('SOMEASSISTANCE');
    } else {
      setMealprep('INDEPENDENT');
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF" }}>
      <View style={{ paddingLeft: 15, paddingTop: 15 }}>
        <Text style={{ fontSize: 27, fontWeight: '300' }}>Create Your New Profile...</Text>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingTop: 10, alignItems: "center" }}
      >
        <View style={{ ...styles.mainContainer }}>
          <View style={{ ...styles.inputContainer }}>
            <View style={{ justifyContent: "center", width: 30 }}>
              <MaterialIcons
                name="drive-file-rename-outline"
                size={30}
                color="#001A72"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                width: SCREEN_WIDTH - 87,
                borderColor: "lightgray",
                borderBottomWidth: 1,
              }}
            >
              <TextInput
                style={{
                  borderRightWidth: 1,
                  borderColor: "lightgray",
                  flex: 1,
                  color: "black",
                  paddingHorizontal: 10,
                  fontSize: 15,
                }}
                autoCapitalize="words"
                onChangeText={setFName}
                value={firstname}
              />
              <TextInput
                style={{
                  flex: 1,
                  color: "black",
                  paddingHorizontal: 10,
                  fontSize: 15,
                }}
                autoCapitalize="words"
                onChangeText={setLName}
                value={lastname}
              />
            </View>

            <View
              style={{
                justifyContent: "center",
                borderColor: "lightgray",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{ color: "lightgray", fontSize: 9, textAlign: "right" }}
              >
                NAME
              </Text>
            </View>
          </View>

          <View style={{ ...styles.inputContainer }}>
            <View style={{ justifyContent: "center", width: 30 }}>
              <MaterialIcons name="person-pin" size={30} color="#001A72" />
            </View>

            <TouchableOpacity
              style={{
                flex: 1,
                paddingLeft: 10,
                justifyContent: "center",
                borderColor: "lightgray",
                borderBottomWidth: 1,
              }}
              onPress={changeGender}
            >
              <Text style={{ color: "black", fontSize: 15 }}>{gender}</Text>
            </TouchableOpacity>

            <View
              style={{
                justifyContent: "center",
                borderColor: "lightgray",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{ color: "lightgray", fontSize: 9, textAlign: "right" }}
              >
                GENDER
              </Text>
            </View>
          </View>

          <View style={{ ...styles.inputContainer }}>
            <View style={{ justifyContent: "center", width: 30 }}>
              <FontAwesome name="birthday-cake" size={27} color="#001A72" />
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                paddingLeft: 10,
                justifyContent: "center",
                borderColor: "lightgray",
                borderBottomWidth: 1,
              }}
              onPress={fadeIn}
            >
              <Text style={{ color: "black", fontSize: 15 }}>{dob}</Text>
              {Platform.OS == "android" && show && (
                <DateTimePicker
                  diplay="spinner"
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
            </TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                borderColor: "lightgray",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{ color: "lightgray", fontSize: 9, textAlign: "right" }}
              >
                BIRTHDAY
              </Text>
            </View>
          </View>

          <View style={{ ...styles.inputContainer }}>
            <View style={{ justifyContent: "center", width: 30 }}>
              <MaterialCommunityIcons
                name="email-edit"
                size={30}
                color="#001A72"
              />
            </View>

            <View
              style={{
                flex: 1,
                paddingLeft: 10,
                justifyContent: "center",
                borderColor: "lightgray",
                borderBottomWidth: 1,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  color: "black",
                  fontSize: 15,
                }}
                onChangeText={setEmail}
                value={email}
              />
            </View>

            <View
              style={{
                justifyContent: "center",
                borderColor: "lightgray",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{ color: "lightgray", fontSize: 9, textAlign: "right" }}
              >
                EMAIL
              </Text>
            </View>
          </View>

          <View style={{ ...styles.inputContainer }}>
            <View style={{ justifyContent: "center", width: 30 }}>
              <MaterialIcons name="smartphone" size={30} color="#001A72" />
            </View>

            <View
              style={{
                flex: 1,
                paddingLeft: 10,
                justifyContent: "center",
                borderColor: "lightgray",
                borderBottomWidth: 1,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  color: "black",
                  fontSize: 15,
                }}
                onChangeText={setNum}
                value={contactnum}
                placeholder="Required"
              />
            </View>

            <View
              style={{
                justifyContent: "center",
                borderColor: "lightgray",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{ color: "lightgray", fontSize: 9, textAlign: "right" }}
              >
                PHONE
              </Text>
            </View>
          </View>

          <View style={{ ...styles.inputContainer }}>
            <View style={{ justifyContent: "center", width: 30 }}>
              <MaterialIcons name="contact-phone" size={30} color="#001A72" />
            </View>

            <View
              style={{
                flex: 1,
                paddingLeft: 10,
                justifyContent: "center",
                borderColor: "lightgray",
                borderBottomWidth: 1,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  color: "black",
                  fontSize: 15,
                }}
                onChangeText={setEmer}
                value={emergency}
              />
            </View>

            <View
              style={{
                justifyContent: "center",
                borderColor: "lightgray",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{ color: "lightgray", fontSize: 9, textAlign: "right" }}
              >
                EMERGENCY
              </Text>
            </View>
          </View>

          <View style={{ ...styles.inputContainer }}>
            <View style={{ justifyContent: "center", width: 30 }}>
              <Entypo name="location" size={30} color="#001A72" />
            </View>

            <TouchableOpacity
              style={{
                flex: 1,
                paddingLeft: 10,
                justifyContent: "center",
                borderColor: "lightgray",
                borderBottomWidth: 1,
              }}
              onPress={pickAddy}
            >
              <Text
                numberOfLines={1}
                style={{
                  color: "black",
                  fontSize: 15,
                }}
              >
                {address}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                justifyContent: "center",
                borderColor: "lightgray",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{ color: "lightgray", fontSize: 9, textAlign: "right" }}
              >
                ADDRESS
              </Text>
            </View>
          </View>

          <View style={{ ...styles.inputContainer }}>
            <View style={{ justifyContent: "center", width: 30 }}>
              <MaterialIcons name="edit-location" size={30} color="#001A72" />
            </View>

            <View
              style={{
                flex: 1,
                paddingLeft: 10,
                justifyContent: "center",
                borderColor: "lightgray",
                borderBottomWidth: 1,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  color: "black",
                  fontSize: 15,
                }}
                onChangeText={setDA}
                value={da}
                placeholder="Unit, Apartment..."
              />
            </View>

            <View
              style={{
                justifyContent: "center",
                borderColor: "lightgray",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{ color: "lightgray", fontSize: 9, textAlign: "right" }}
              >
                ADDRESS 2
              </Text>
            </View>
          </View>

          <View style={{ ...styles.inputContainer }}>
            <View style={{ justifyContent: "center", width: 30 }}>
              <MaterialCommunityIcons
                name="mailbox"
                size={30}
                color="#001A72"
              />
            </View>

            <View
              style={{
                flex: 1,
                paddingLeft: 10,
                justifyContent: "center",
                borderColor: "lightgray",
                borderBottomWidth: 1,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  color: "black",
                  fontSize: 15,
                }}
                onChangeText={setPostal}
                value={postal}
                placeholder="Unit, Apartment..."
              />
            </View>

            <View
              style={{
                justifyContent: "center",
                borderColor: "lightgray",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{ color: "lightgray", fontSize: 9, textAlign: "right" }}
              >
                POSTAL CODE
              </Text>
            </View>
          </View>

          <View style={{ width: '100%', zIndex: 99, height: 90, marginTop: 30 }}>
            <View style={{ height: 30, paddingLeft: 6 }}>
              <Text style={{ fontSize: 15 }}>Mobility</Text>
            </View>

            <View style={styles.selectorContainer}>
              <View style={{ width: '15%', alignItems: 'center', paddingLeft: '5%' }}>
                <MaterialIcons name="wheelchair-pickup" size={24} color="#001A72" />
              </View>
              <View style={{ width: '85%' }}>
                <SelectList
                  setSelected={(val) => changeMobility(val)}
                  data={data}
                  save="key"
                  placeholder={(mobility == 'SOMEASSISTANCE') ? 'SOME ASSISTANCE' : (mobility == 'TOTALCARE') ? 'TOTCAL CARE' : 'INDEPENDENT'}
                  boxStyles={{ width: '100%', borderWidth: 0 }}
                  dropdownStyles={styles.dropdownContainer}
                  dropdownItemStyles={{ height: 36 }}
                  search={false}
                  arrowicon={<AntDesign name="caretdown" size={15} color="#007AFF" />}
                />
              </View>
            </View>
          </View>

          <View style={{ width: '100%', zIndex: 98, height: 90, marginTop: 10 }}>
            <View style={{ height: 30, paddingLeft: 6 }}>
              <Text style={{ fontSize: 15 }}>Grooming</Text>
            </View>

            <View style={styles.selectorContainer}>
              <View style={{ width: '15%', alignItems: 'center', paddingLeft: '5%' }}>
                <Entypo name="scissors" size={24} color="#001A72" />
              </View>
              <View style={{ width: '85%' }}>
                <SelectList
                  setSelected={(val) => changeGrooming(val)}
                  data={data}
                  save="key"
                  placeholder={(grooming == 'SOMEASSISTANCE') ? 'SOME ASSISTANCE' : (grooming == 'TOTALCARE') ? 'TOTCAL CARE' : 'INDEPENDENT'}
                  boxStyles={{ width: '100%', borderWidth: 0 }}
                  dropdownStyles={styles.dropdownContainer}
                  dropdownItemStyles={{ height: 36 }}
                  search={false}
                  arrowicon={<AntDesign name="caretdown" size={15} color="#007AFF" />}
                />
              </View>
            </View>
          </View>

          <View style={{ width: '100%', zIndex: 97, height: 90, marginTop: 10  }}>
            <View style={{ height: 30, paddingLeft: 6 }}>
              <Text style={{ fontSize: 15 }}>Feeding</Text>
            </View>

            <View style={styles.selectorContainer}>
              <View style={{ width: '15%', alignItems: 'center', paddingLeft: '5%' }}>
                <MaterialCommunityIcons name="food-variant" size={24} color="#001A72" />
              </View>
              <View style={{ width: '85%' }}>
                <SelectList
                  setSelected={(val) => changeFeeding(val)}
                  data={data}
                  save="key"
                  placeholder={(feeding == 'SOMEASSISTANCE') ? 'SOME ASSISTANCE' : (grooming == 'TOTALCARE') ? 'TOTCAL CARE' : 'INDEPENDENT'}
                  boxStyles={{ width: '100%', borderWidth: 0 }}
                  dropdownStyles={styles.dropdownContainer}
                  dropdownItemStyles={{ height: 36 }}
                  search={false}
                  arrowicon={<AntDesign name="caretdown" size={15} color="#007AFF" />}
                />
              </View>
            </View>
          </View>

          <View style={{ width: '100%', zIndex: 96, height: 90 }}>
            <View style={{ height: 30, paddingLeft: 6 }}>
              <Text style={{ fontSize: 15 }}>MealPrep</Text>
            </View>

            <View style={styles.selectorContainer}>
              <View style={{ width: '15%', alignItems: 'center', paddingLeft: '5%' }}>
                <MaterialCommunityIcons name="chef-hat" size={24} color="#001A72" />
              </View>
              <View style={{ width: '85%' }}>
                <SelectList
                  setSelected={(val) => changeMealprep(val)}
                  data={data}
                  save="key"
                  placeholder={(mealprep == 'SOMEASSISTANCE') ? 'SOME ASSISTANCE' : (mealprep == 'TOTALCARE') ? 'TOTCAL CARE' : 'INDEPENDENT'}
                  boxStyles={{ width: '100%', borderWidth: 0 }}
                  dropdownStyles={styles.dropdownContainer}
                  dropdownItemStyles={{ height: 36 }}
                  search={false}
                  arrowicon={<AntDesign name="caretdown" size={15} color="#007AFF" />}
                />
              </View>
            </View>
          </View>

        </View>

        {Platform.OS == "ios" && show && (
          <Animated.View
            style={{
              opacity: fadeAnim,
              position: "absolute",
              top: "10%",
              alignItems: "center",
              width: "90%",
              backgroundColor: "lightgray",
              borderRadius: 10,
              borderWidth: 3,
              borderColor: "lightgray",
            }}
          >
            <DateTimePicker
              style={{ width: "100%", backgroundColor: "white" }}
              testID="dateTimePicker"
              display="spinner"
              value={new Date(date)}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#007AFF",
                padding: 10,
                borderRadius: 10,
                marginVertical: 10,
              }}
              onPress={closePicker}
              underlayColor="#FFFFFF"
            >
              <Text style={{ color: "white", fontSize: 18 }}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        <View style={{ height: 10 }} />

        <TouchableOpacity
          style={{ backgroundColor: '#3b5092', padding: 10, borderRadius: 10, marginVertical: 10, width: '90%', height: SCREEN_HEIGHT / 15, justifyContent: 'center' }}
          // onPress={onSave}
          underlayColor='#FFFFFF'>
          <Text style={{ color: '#ffde59', fontSize: 18, textAlign: 'center' }}>SAVE</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {addyshow && (
        <Animated.View
          style={{
            ...styles.addressInputContainer,
            opacity: fadeAnim,
            padding: "1%",
          }}
        >
          <MapView
            style={styles.map}
            ref={_map}
            initialRegion={{
              latitude: 43.65107,
              longitude: -79.347015,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: parseFloat(lat),
                longitude: parseFloat(lng),
              }}
            />
          </MapView>

          <GooglePlacesAutocomplete
            placeholder={dbUser ? dbUser.address : "Address"}
            styles={{
              textInputContainer: {
                width: "100%",
                backgroundColor: "",
              },
              textInput: {
                height: SCREEN_HEIGHT / 15,
                width: "100%",
                color: "black",
                fontSize: 15,
                borderWidth: 1,
                borderColor: "lightgray",
              },
              predefinedPlacesDescription: {
                color: "#1faadb",
              },
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            onPress={(data, detail = null) => {
              console.log("---------------------", data.description);
              console.log(
                "---------------------",
                detail.geometry.location.lat
              );
              console.log(
                "---------------------",
                detail.geometry.location.lng
              );
              setAddress(data.description);
              setLat(detail.geometry.location.lat);
              setLng(detail.geometry.location.lng);
            }}
            fetchDetails={true}
            enablePoweredByContainer={false}
            minLength={2}
            query={{
              key: "AIzaSyAwqJ3mR3salkuJ6noO2q9RvslWxIX5t3Y",
              language: "en",
            }}
            debounce={400}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#007AFF",
              padding: 10,
              borderRadius: 10,
              marginVertical: 10,
            }}
            onPress={closeAddy}
            underlayColor="#FFFFFF"
          >
            <Text style={{ color: "white", fontSize: 18 }}>Confirm</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 10,
    paddingHorizontal: "3%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    borderColor: "lightgray",
    paddingBottom: 0,
    borderRadius: 10,
    paddingHorizontal: 5,
    height: SCREEN_HEIGHT / 12,
    justifyContent: "center",
  },
  addressInputContainer: {
    position: "absolute",
    top: "10%",
    width: "100%",
    height: SCREEN_HEIGHT * 0.5,
    borderWidth: 3,
    borderColor: "lightgray",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    padding: "3%",
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    borderRadius: 10,
    backgroundColor: "white",
  },
  selectorContainer: {
    width: '100%', flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', borderWidth: 1, borderColor: 'lightgray',
    borderRadius: 10, marginTop: -6
  },
  dropdownContainer: {
    backgroundColor: '#F9FCFF', position: 'absolute', width: '118.5%',
    top: '80%', left: '-18%', borderWidth: 1,
    paddingHorizontal: 10, borderColor: 'lightgray'
  }
});
