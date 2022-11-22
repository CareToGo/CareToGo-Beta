import { TouchableOpacity, ImageBackground, Animated, View, Text, TextInput, StyleSheet, Button, Alert, ScrollView, Dimensions, Image, Platform, Pressable } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'
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
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const EditCareProfile = () => {
  const navigation = useNavigation();
  const { dbUser, sub, setDbUser } = useAuthContext();
  const [mobility, setMobility] = useState(dbUser?.mobility || "");
  const [feeding, setFeeding] = useState(dbUser?.feeding || "");
  const [mealprep, setMealprep] = useState(dbUser?.mealprep || "");
  const [gender, setGender] = useState(dbUser?.gender || "");
  const [dob, setDOB] = useState(dbUser?.dob || "");
  const [email, setEmail] = useState(dbUser?.email || "");
  const [contactnum, setNum] = useState(dbUser?.contactnum || "");
  const [emergency, setEmer] = useState(dbUser?.emergency || "");
  const [address, setAddress] = useState(dbUser?.address || "");
  const [da, setDA] = useState(dbUser?.detailedaddress || "");
  const [postal, setPostal] = useState(dbUser?.postalcode || "");
  const [lat, setLat] = useState(dbUser?.lat + "" || "0");
  const [lng, setLng] = useState(dbUser?.lng + "" || "0");
  const [date, setDate] = useState(new Date('1996-12-25'));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [addyshow, setAddyShow] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const _map = useRef(null);
  const [selected, setSelected] = React.useState("");
  const data = [
    { key: '1', value: 'TOTALCARE' },
    { key: '2', value: 'SOMEASSISTANCE' },
    { key: '3', value: 'INDEPENDENT' },
  ]

  useEffect(() => {
    console.log('---------', dbUser.feeding)
  }, []);

  useEffect(() => {
    if (_map.current) {
      // console.log('animating the camera to', lat, lng)
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

  const validateInput = () => {
    var phoneregex = /^(\+1)?(\d){10}$/;
    var emailregex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!phoneregex.test(contactnum)) {
      alert('Please enter a valid phone number (+1)')
    } else if (!phoneregex.test(emergency)) {
      alert('Please enter a valid emergency number (+1)')
    } else if (!emailregex.test(email)) {
      alert('Please enter a valid email address')
    } else if (phoneregex.test(contactnum) && phoneregex.test(emergency) && emailregex.test(email)) {
      onSave()
    }
  }

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
        updated.postalcode = postal;
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

          <View style={{ width: '90%', flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom: 30, zIndex: 100 }}>
            <View style={{ width: '25%' }}>
              <Text>Mobility</Text>
            </View>
            <View style={{ width: '75%' }}>
              <SelectList
                setSelected={(val) => setSelected(val)}
                data={data}
                save="value"
                placeholder={dbUser.feeding}
                boxStyles={{ width: '100%', borderWidth: 0, borderBottomWidth: 1, borderRadius: 0 }}
                inputStyles={{ color:'black' }}
                dropdownStyles={{ backgroundColor: 'white', height: 135, position:'absolute', width: '100%', top: 36, borderWidth: 1, borderRadius: 0 }}
                dropdownTextStyles={{ color:'#001A72' }}
                search={false}
              />
            </View>
          </View>

          <View style={{ width: '90%', flexDirection:'row', justifyContent:'space-between', alignItems:'center', zIndex: 99 }}>
            <View style={{ width: '25%' }}>
              <Text>Mobility</Text>
            </View>
            <View style={{ width: '75%' }}>
              <SelectList
                setSelected={(val) => setSelected(val)}
                data={data}
                save="value"
                placeholder={dbUser.feeding}
                boxStyles={{ width: '100%' }}
                inputStyles={{ fontSize: 10 }}
                dropdownStyles={{ backgroundColor: '#FFFFFF', height: 135, position:'absolute' }}
                dropdownTextStyles={{ color:'#ffde59' }}
                search={false}
              />
            </View>
          </View>


        </View>

        <View style={{ height: 300 }}/>

        <TouchableOpacity
          style={{ backgroundColor: '#3b5092', padding: 10, borderRadius: 10, marginVertical: 10, width: '90%', height: SCREEN_HEIGHT / 15, justifyContent: 'center' }}
          onPress={validateInput}
          underlayColor='#FFFFFF'>
          <Text style={{ color: '#ffde59', fontSize: 18, textAlign: 'center' }}>SAVE</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};



export default EditCareProfile;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFFFFF",
    padding: '5%',
    width: "100%",
    justifyContent: "center",
    alignItems: 'center',
  }
});
