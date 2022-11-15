import { TouchableOpacity, ImageBackground, Animated, View, Text, TextInput, StyleSheet, Button, Alert, ScrollView, Dimensions, Image, Platform, Pressable } from "react-native";
import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { User } from "../../models";
import { useAuthContext } from "../../contexts/AuthContext";
import { DataStore } from "aws-amplify";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from 'react-native-maps';
import { Entypo } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, route } from "@react-navigation/native";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { Storage } from "aws-amplify";
import Constants from "expo-constants";
import * as Progress from 'react-native-progress';
import { CognitoUserPool } from "amazon-cognito-identity-js";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

const EditUserProfile = ({ route }) => {
  const { thelink, passed } = route.params;
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
  const [date, setDate] = useState(new Date('1996-12-25'));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [addyshow, setAddyShow] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const _map = useRef(null);



  useEffect(() => {
    if (_map.current) {
      console.log('animating the camera to', lat, lng)
      _map.current.fitToCoordinates([{
        latitude: lat,
        longitude: lng,
      }], {
        edgePadding: {
          bottom: 300,
          right: 300,
          top: 300,
          left: 300,
        },
        animated: true,
      })
    }
  }, [lat, lng]);

  useEffect(() => {
    console.log('---------', dbUser.address)
  }, []);

  const pickAddy = () => {
    setAddyShow(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 500
    }).start();
  }

  const closeAddy = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    const timeId = setTimeout(() => {
      setAddyShow(false);
    }, 500)
    return () => {
      clearTimeout(timeId)
    }
  }

  const changeGender = () => {
    if (gender == 'Male') {
      setGender('Female')
    } else if (gender == 'Female') {
      setGender('Other')
    } else if (gender == 'Other') {
      setGender('Male')
    }
  };

  const fadeIn = () => {
    showDatepicker();
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 500
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closePicker = () => {
    if (Platform.OS === 'ios') {
      fadeOut();
      const timeId = setTimeout(() => {
        setShow(false);
      }, 500)
      return () => {
        clearTimeout(timeId)
      }
    }
  }

  const onChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShow(false);
      const currentDate = selectedDate;
      var year = currentDate.getFullYear();
      var month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      var day = currentDate.getDate().toString().padStart(2, "0");
      var bday = year + '-' + month + '-' + day;
      console.log(year + '-' + month + '-' + day);
      setDOB(bday);
      setDate(new Date(currentDate));
    }
    if (Platform.OS === 'ios') {
      const currentDate = selectedDate;
      var year = currentDate.getFullYear();
      var month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      var day = currentDate.getDate().toString().padStart(2, "0");
      var bday = year + '-' + month + '-' + day;
      console.log(year + '-' + month + '-' + day);
      setDOB(bday);
      setDate(new Date(currentDate));
    }
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(true);
    } else if (Platform.OS === 'ios') {
      setShow(true);
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
    console.log('pressed')
  };

  const onSave = async () => {
    if (dbUser) {
      await updateUser();
    } else {
      await createUser();
    }
  };

  const updateUser = async () => {
    const user = await DataStore.save(
      User.copyOf(dbUser, (updated) => {
        updated.firstname = firstname;
        updated.lastname = lastname;
        updated.dob = dob;
        updated.email = email;
        updated.contactnum = contactnum;
        updated.address = address;
        updated.detailedaddress = da;
        updated.lat = parseFloat(lat);
        updated.lng = parseFloat(lng);
        updated._version = parseInt(dbUser.ver);
        updated.ver = parseInt(dbUser.ver + 1);
      })
    );
    console.log(user);
    setDbUser(user);
  };

  const createUser = async () => {
    try {
      const user = await DataStore.save(
        new User({
          sub,
          address: 'supernintendo',
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          firstname,
          lastname,
          ver: 1,
          dob,
          email,
          contactnum,
          image: imageData,
        })
      );
      setDbUser(user);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <View style={{ backgroundColor: '#FFFFFF' }}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', height: SCREEN_HEIGHT }}>
        <View style={{ ...styles.mainContainer }}>
          <View style={{ ...styles.inputContainer }}>
            <View style={{ justifyContent: 'center', width: 30 }}>
              <MaterialIcons name="drive-file-rename-outline" size={30} color="#001A72" />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', width: SCREEN_WIDTH * 0.9 - 75, borderColor: 'lightgray', borderBottomWidth: 1 }}>
              <TextInput
                style={{
                  borderRightWidth: 1,
                  borderColor: 'lightgray',
                  flex: 1,
                  color: "black",
                  paddingHorizontal: 10,
                  fontSize: SCREEN_WIDTH * 0.6 / firstname.length
                }}
                autoCapitalize='words'
                onChangeText={setFName}
                value={firstname}
              />
              <TextInput
                style={{
                  flex: 1,
                  color: "black",
                  paddingHorizontal: 10,
                  fontSize: SCREEN_WIDTH * 0.6 / firstname.length
                }}
                autoCapitalize='words'
                onChangeText={setLName}
                value={lastname}
              />
            </View>

            <View style={{ justifyContent: 'center', borderColor: 'lightgray', borderBottomWidth: 1 }}>
              <Text style={{ color: 'lightgray', fontSize: 12, textAlign: 'right' }}>NAME</Text>
            </View>
          </View>

          <View style={{ ...styles.inputContainer }}>
            <View style={{ justifyContent: 'center', width: 30 }}>
              <MaterialIcons name="person-pin" size={30} color="#001A72" />
            </View>

            <TouchableOpacity style={{ flex: 1, paddingLeft: 10, justifyContent: 'center', borderColor: 'lightgray', borderBottomWidth: 1 }} onPress={changeGender}>
              <Text style={{ color: 'black', fontSize: 21 }}>{gender}</Text>
            </TouchableOpacity>

            <View style={{ justifyContent: 'center', borderColor: 'lightgray', borderBottomWidth: 1 }}>
              <Text style={{ color: 'lightgray', fontSize: 12, textAlign: 'right' }}>GENDER</Text>
            </View>
          </View>

          <View style={{ ...styles.inputContainer }}>
            <View style={{ justifyContent: 'center', width: 30 }}>
              <FontAwesome name="birthday-cake" size={30} color="#001A72" />
            </View>
            <TouchableOpacity style={{ flex: 1, paddingLeft: 10, justifyContent: 'center', borderColor: 'lightgray', borderBottomWidth: 1, }} onPress={fadeIn}>
              <Text style={{ color: 'black', fontSize: 21 }}>{dob}</Text>
              {Platform.OS == 'android' && show && (
                <DateTimePicker
                  diplay="spinner"
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange} />
              )}
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', borderColor: 'lightgray', borderBottomWidth: 1 }}>
              <Text style={{ color: 'lightgray', fontSize: 12, textAlign: 'right' }}>BIRTHDAY</Text>
            </View>
          </View>

          <View style={{ ...styles.inputContainer }}>
            <View style={{ justifyContent: 'center', width: 30 }}>
              <MaterialCommunityIcons name="email-edit" size={30} color="#001A72" />
            </View>

            <View style={{ flex: 1, paddingLeft: 10, justifyContent: 'center', borderColor: 'lightgray', borderBottomWidth: 1 }}>
              <TextInput
                style={{
                  flex: 1,
                  color: "black",
                  fontSize: SCREEN_WIDTH * 1.0 / email.length
                }}
                onChangeText={setEmail}
                value={email}
              />
            </View>

            <View style={{ justifyContent: 'center', borderColor: 'lightgray', borderBottomWidth: 1 }}>
              <Text style={{ color: 'lightgray', fontSize: 12, textAlign: 'right' }}>EMAIL</Text>
            </View>
          </View>

          <View style={{ ...styles.inputContainer }}>
            <View style={{ justifyContent: 'center', width: 30 }}>
              <MaterialIcons name="smartphone" size={30} color="#001A72" />
            </View>

            <View style={{ flex: 1, paddingLeft: 10, justifyContent: 'center', borderColor: 'lightgray', borderBottomWidth: 1 }}>
              <TextInput
                style={{
                  flex: 1,
                  color: "black",
                  fontSize: 18
                }}
                onChangeText={setNum}
                value={contactnum}
              />
            </View>

            <View style={{ justifyContent: 'center', borderColor: 'lightgray', borderBottomWidth: 1 }}>
              <Text style={{ color: 'lightgray', fontSize: 12, textAlign: 'right' }}>PHONE</Text>
            </View>
          </View>

          <View style={{ ...styles.inputContainer }}>
            <View style={{ justifyContent: 'center', width: 30 }}>
              <MaterialIcons name="contact-phone" size={30} color="#001A72" />
            </View>

            <View style={{ flex: 1, paddingLeft: 10, justifyContent: 'center', borderColor: 'lightgray', borderBottomWidth: 1 }}>
              <TextInput
                style={{
                  flex: 1,
                  color: "black",
                  fontSize: 18
                }}
                onChangeText={setEmer}
                value={emergency}
              />
            </View>

            <View style={{ justifyContent: 'center', borderColor: 'lightgray', borderBottomWidth: 1 }}>
              <Text style={{ color: 'lightgray', fontSize: 12, textAlign: 'right' }}>EMERGENCY</Text>
            </View>
          </View>

          <View style={{ ...styles.inputContainer }}>
            <View style={{ justifyContent: 'center', width: 30 }}>
              <MaterialIcons name="edit-location" size={30} color="#001A72" />
            </View>

            <TouchableOpacity style={{ flex: 1, paddingLeft: 10, justifyContent: 'center', borderColor: 'lightgray', borderBottomWidth: 1 }} onPress={pickAddy} >
              <Text style={{ color: 'black', fontSize: SCREEN_WIDTH * 1.1 / address.length }}>
                {address}
              </Text>
            </TouchableOpacity>

            <View style={{ justifyContent: 'center', borderColor: 'lightgray', borderBottomWidth: 1 }}>
              <Text style={{ color: 'lightgray', fontSize: 12, textAlign: 'right' }}>ADDRESS</Text>
            </View>
          </View>

          <View style={{ ...styles.inputContainer }}>
            <View style={{ justifyContent: 'center', width: 30 }}>
              <MaterialIcons name="edit-location" size={30} color="#001A72" />
            </View>

            <View style={{ flex: 1, paddingLeft: 10, justifyContent: 'center', borderColor: 'lightgray', borderBottomWidth: 1 }}>
              <TextInput
                style={{
                  flex: 1,
                  color: "black",
                  fontSize: 15
                }}
                onChangeText={setDA}
                value={da}
                placeholder='Unit, Apartment...'
              />
            </View>

            <View style={{ justifyContent: 'center', borderColor: 'lightgray', borderBottomWidth: 1 }}>
              <Text style={{ color: 'lightgray', fontSize: 12, textAlign: 'right' }}>ADDRESS 2</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={{ backgroundColor: '#3b5092', padding: 10, borderRadius: 10, marginVertical: 10, width: '90%', height:SCREEN_HEIGHT/15, justifyContent:'center'  }}
          onPress={onSave}
          underlayColor='#FFFFFF'>
          <Text style={{ color: '#ffde59', fontSize: 18, textAlign: 'center' }}>SAVE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ backgroundColor: '#3b5092', padding: 10, borderRadius: 10, marginVertical: 10, width: '90%', height:SCREEN_HEIGHT/15, justifyContent:'center' }}
          onPress={onSave}
          underlayColor='#FFFFFF'>
          <Text style={{ color: '#ffde59', fontSize: 18, textAlign: 'center' }}>SAVE & NEXT</Text>
        </TouchableOpacity>

        {(Platform.OS == 'ios' && show &&
          <Animated.View style={{ opacity: fadeAnim, position: 'absolute', top: '10%', alignItems: 'center', width: "90%", backgroundColor: 'lightgray', borderRadius: 10, borderWidth: 3, borderColor: 'lightgray' }}>
            <DateTimePicker style={{ width: '100%', backgroundColor: 'white' }}
              testID="dateTimePicker"
              display="spinner"
              value={new Date(date)}
              mode={mode}
              is24Hour={true}
              onChange={onChange} />
            <TouchableOpacity
              style={{ backgroundColor: '#007AFF', padding: 10, borderRadius: 10, marginVertical: 10 }}
              onPress={closePicker}
              underlayColor='#FFFFFF'>
              <Text style={{ color: 'white', fontSize: 18 }}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>


      {(addyshow &&
        <Animated.View style={{ ...styles.addressInputContainer, opacity: fadeAnim, padding: '1%' }}>
          <MapView
            style={styles.map}
            ref={_map}
            initialRegion={{
              latitude: 43.651070,
              longitude: -79.347015,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <MapView.Marker coordinate={{ latitude: parseFloat(lat), longitude: parseFloat(lng) }} />
          </MapView>

          <GooglePlacesAutocomplete
            placeholder={dbUser ? dbUser.address : "Address"}
            styles={{
              textInputContainer: {
                width: '100%',
                backgroundColor: '',
              },
              textInput: {
                height: SCREEN_HEIGHT / 15,
                width: '100%',
                color: 'black',
                fontSize: 15,
                borderWidth: 1,
                borderColor: 'lightgray'
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            onPress={(data, detail = null) => {
              console.log('---------------------', data.description)
              console.log('---------------------', detail.geometry.location.lat)
              console.log('---------------------', detail.geometry.location.lng)
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
            style={{ backgroundColor: '#007AFF', padding: 10, borderRadius: 10, marginVertical: 10 }}
            onPress={closeAddy}
            underlayColor='#FFFFFF'>
            <Text style={{ color: 'white', fontSize: 18 }}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

    </View>
  );
};



export default EditUserProfile;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 0,
    paddingBottom: 10,
    paddingHorizontal: '5%',
    width: "100%",
    justifyContent: "center",
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    borderColor: 'lightgray',
    paddingBottom: 0,
    borderRadius: 10,
    paddingHorizontal: 5,
    height: SCREEN_HEIGHT / 12,
    justifyContent: 'center'
  },
  addressInputContainer: {
    position: 'absolute',
    top: '10%',
    width: "100%",
    height: SCREEN_HEIGHT * 0.5,
    borderWidth: 3,
    borderColor: 'lightgray',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    padding: '3%'
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    borderRadius: 10,
    backgroundColor: 'white'
  },
  cardinput: {
    borderRadius: 10,
    width: '90%',
    height: 30,
    margin: 5,
    borderBottomWidth: 1,
    paddingVertical: 0,
    color: 'white',
    textAlignVertical: 'bottom',
    paddingVertical: 0,
    paddingLeft: 30
  },
  shadowProp: {
    shadowColor: '#001A72',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  }
});
