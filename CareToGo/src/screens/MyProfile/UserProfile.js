import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableHighlight, Image, Dimensions, Linking, Platform, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Auth } from "aws-amplify";
import Constants from "expo-constants";
import { Storage } from "aws-amplify";
import * as ImagePicker from "expo-image-picker";
import * as Progress from 'react-native-progress'
import { DataStore } from "aws-amplify";
import { User } from "../../models";
import { Feather } from '@expo/vector-icons';
import { configureFonts, TextInput } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";



export default function UserProfile() {
  const { dbUser, sub, setDbUser } = useAuthContext();
  const navigation = useNavigation();
  const [imageLink, setImageLink] = useState();
  const [percentage, setPercentage] = useState(0);
  const [userbio, setUserBio] = useState(dbUser?.bio || '');
  const [editingbio, setEditBio] = useState(false);
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

  const startEdit = () => {
    setEditBio(true);
  };

  const saveEdit = () => {
    setEditBio(false);
    updateUser();
  };

  const fetchLink = async () => {
    Storage.get(`${sub}.jpg`)
      .then((mylink) =>
        setImageLink(mylink)
      )
      .catch((e) => console.log(e))
  }

  useEffect(() => {
    fetchLink();
  }, []);

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const cameraRollStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (
          cameraRollStatus.status !== "granted" ||
          cameraStatus.status !== "granted"
        ) {
          alert("Sorry, we need these permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: "Images",
      aspect: [1, 1],
      quality: 1,
    });
    handleImagePicked(result);
  };

  const handleImagePicked = async (pickerResult) => {
    try {
      if (pickerResult.cancelled) {
        alert("Upload Cancelled");
        return;
      } else {
        setPercentage(0);
        const img = await fetchImageFromUri(pickerResult.uri);
        const uploadUrl = await uploadImage(`${sub}.jpg`, img);
        console.log(uploadUrl);
        const result = await Storage.get(uploadUrl);
        console.log(result);
        setImageLink(result);
        setPercentage(0);
      }
    } catch (e) {
      console.log(e);
      alert("Upload Failed!");
    }
  };

  const uploadImage = (filename, img) => {
    Auth.currentCredentials();
    return Storage.put(filename, img, {
      level: "public",
      contentType: "image/jpeg",
      progressCallback(progress) {
        setLoading(progress);
      },
    })
      .then((response) => {
        return response.key;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
  };

  const setLoading = (progress) => {
    const calculated = parseInt((progress.loaded / progress.total) * 100);
    updatePercentage(calculated);
  };

  const updatePercentage = (number) => {
    setPercentage(number);
  };

  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const editprofile = () => {
    navigation.navigate('EditUserProfile', { thelink: imageLink, passed: true });
  }

  const updateUser = async () => {
    const user = await DataStore.save(
      User.copyOf(dbUser, (updated) => {
        updated.bio = userbio;
        updated._version = parseInt(dbUser.ver);
        updated.ver = parseInt(dbUser.ver + 1);
      })
    );
    console.log(user);
    setDbUser(user);
  };

  return (
    <SafeAreaView style={{ paddingHorizontal: "0%", paddingVertical: 0, backgroundColor: "#FFFFFF" }}>
      {/* STATIC TOP HALF */}
      <View style={{ backgroundColor: "#FFFFFF", paddingBottom: "3%", paddingHorizontal:"6%" ,paddingTop: "6%", justifyContent: "center", alignItems: 'center' }}>
        {/* TOP BRIEF COMPONENT */}
        <View style={{ borderWidth: 0, width: '100%', flexDirection: "row" }}>
          <View style={{ width: "30%", justifyContent: "center", alignItems: "center" }}>
            <Image
              source={{ uri: imageLink }}
              style={{ width: "95%", height: undefined, aspectRatio: 1, borderRadius: 100 }}
            />
            <MaterialCommunityIcons
              onPress={pickImage}
              name="image-edit"
              size={24} color="#001A72"
              style={{ position: 'absolute', bottom: 0, right: 0 }}
            />
          </View>

          <View style={{ width: "70%", marginLeft: 15, justifyContent: "flex-end", borderLeftWidth: 1, paddingHorizontal: '6%', borderLeftColor: 'lightgray' }}>

            <Text
              style={{ fontSize: 12, fontWeight: "bold", color: "gray", textAlign: 'right' }}>
              WELCOME!
            </Text>
            <Text
              style={{
                textAlign: 'right',
                color: "#001A72",
                fontSize: ((SCREEN_WIDTH * 0.9 / dbUser.firstname.length) > 33 ? 33 : (SCREEN_WIDTH * 0.9 / dbUser.firstname.length)),
                fontWeight: "bold"
              }}>
              {dbUser.firstname}
            </Text>
            <Text
              style={{
                textAlign: 'right',
                color: "#001A72",
                fontSize: 12,
              }}>
              {dbUser.contactnum}
            </Text>
            <Text
              style={{
                color: "#001A72",
                fontSize: 12,
                textAlign: 'right'
              }}>
              {dbUser.email}
            </Text>
          </View>
        </View>
        {/* TOP BRIEF COMPONENT */}

        {/* UPLOAD PROGRESS BAR */}
        <View style={{ width: '100%', height: 20, borderWidth: 0, alignItems: 'center', justifyContent: 'center' }}>
          {percentage !== 0 && (
            <Progress.Bar progress={percentage / 100} width={SCREEN_WIDTH * 0.75} color='#001A72' />
          )}
        </View>
        {/* UPLOAD PROGRESS BAR */}

        {/* BIO COMPONENT */}
        <View style={{ width: '95%', borderRadius: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'lightgray', width: '90%' }}>
            BIO
          </Text>
          {editingbio ? (
            <View style={{ height: SCREEN_HEIGHT / 3, backgroundColor: 'lightgray', borderRadius: 10, padding: '6%', flexDirection: 'row', width: '100%' }}>
              <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <View style={{ width: "85%", justifyContent: 'center', alignItems: 'flex-start' }}>
                  <TextInput
                    minHeight={SCREEN_HEIGHT / 5}
                    editable={true}
                    multiline
                    style={{
                      width: '100%',
                      backgroundColor: "lightgray",
                      fontSize: 15,
                      color: 'black'
                    }}
                    numberOfLines={8}
                    onChangeText={setUserBio}
                    value={userbio}
                  />
                </View>
              </TouchableWithoutFeedback>
              <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center', marginLeft: 5 }} >
                <TouchableHighlight style={{ width: "100%", height: undefined, aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} underlayColor='white' onPress={() => saveEdit()}>
                  <MaterialIcons name="done" size={30} color="#001A72" />
                </TouchableHighlight >
              </View >
            </View>
          ) : (
            <View style={{ height: SCREEN_HEIGHT / 6.3, backgroundColor: 'lightgray', borderRadius: 10, padding: '6%', flexDirection: 'row', width: '100%' }}>
              <View style={{ width: "85%", justifyContent: 'center', alignItems: 'flex-start' }}>
                <ScrollView style={{ width: '100%', paddingHorizontal: "3%" }}>
                  <Text>
                    {userbio}
                  </Text>
                </ScrollView>
              </View>
              <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center', marginLeft: 5 }} >
                <TouchableHighlight style={{ width: "100%", height: undefined, aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} underlayColor='white' onPress={() => startEdit()}>
                  <FontAwesome name="edit" size={30} color="#001A72" />
                </TouchableHighlight >
              </View >
            </View>
          )}
        </View>
        {/* BIO COMPONENT */}
      </View>
      {/* STATIC TOP HALF */}

      {/* SCROLLED LOWER HALF */}
      <ScrollView contentContainerstyle={{ alignItems: 'center', width: '100%', justifyContent: 'center' }}>
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableHighlight style={{ width: "100%", backgroundColor: '#FFFFFF' }} underlayColor="lightgray" onPress={() => editprofile()} >
              <View style={{ width: "100%", flexDirection: "row", height: SCREEN_HEIGHT / 10 }}>
                <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
                  <MaterialCommunityIcons name="account-edit" size={30} color="#001A72" />
                </View>
                <View style={{ width: "75%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 16 }}>Edit Profile</Text>
                </View>
                <View style={{ width: "10%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center', alignItems: 'center' }}>
                  <MaterialIcons name="keyboard-arrow-up" size={24} color="gray" />
                </View>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={{ width: "100%", backgroundColor: '#FFFFFF' }} underlayColor="lightgray" onPress={() => editprofile()} >
              <View style={{ width: "100%", flexDirection: "row", height: SCREEN_HEIGHT / 10 }}>
                <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
                  <MaterialIcons name="favorite" size={30} color="#001A72" />
                </View>
                <View style={{ width: "75%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 16 }}>Favorites</Text>
                </View>
                <View style={{ width: "10%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center', alignItems: 'center' }}>
                  <MaterialIcons name="keyboard-arrow-up" size={24} color="gray" />
                </View>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={{ width: "100%", backgroundColor: '#FFFFFF' }} underlayColor="lightgray" onPress={() => editprofile()} >
              <View style={{ width: "100%", flexDirection: "row", height: SCREEN_HEIGHT / 10 }}>
                <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
                  <FontAwesome5 name="history" size={27} color="#001A72" />
                </View>
                <View style={{ width: "75%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 16 }}>Request History</Text>
                </View>
                <View style={{ width: "10%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center', alignItems: 'center' }}>
                  <MaterialIcons name="keyboard-arrow-up" size={24} color="gray" />
                </View>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={{ width: "100%", backgroundColor: '#FFFFFF' }} underlayColor="lightgray" onPress={() => sizeOnTouch()} >
              <View style={{ width: "100%", flexDirection: "row", height: SCREEN_HEIGHT / 10 }}>
                <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
                  <MaterialIcons name="accessible" size={33} color="#001A72" />
                </View>
                <View style={{ width: "75%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 16 }}>Accessibility Settings</Text>
                </View>
                <View style={{ width: "10%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center', alignItems: 'center' }}>
                  <MaterialIcons name="keyboard-arrow-up" size={24} color="gray" />
                </View>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={{ width: "100%", backgroundColor: '#FFFFFF' }} underlayColor="lightgray" onPress={() => sizeOnTouch()}>
              <View style={{ width: "100%", flexDirection: "row", height: SCREEN_HEIGHT / 10 }}>
                <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
                  <MaterialCommunityIcons name="file-document" size={30} color="#001A72" />
                </View>
                <View style={{ width: "75%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 16 }}>Terms of Services</Text>
                </View>
                <View style={{ width: "10%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center', alignItems: 'center' }}>
                  <MaterialIcons name="keyboard-arrow-up" size={24} color="gray" />
                </View>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={{ width: "100%", backgroundColor: '#FFFFFF' }} underlayColor="lightgray" onPress={() => { Linking.openURL('https://caretogo.ca') }}>
              <View style={{ width: "100%", flexDirection: "row", height: SCREEN_HEIGHT / 10 }}>
                <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
                  <MaterialCommunityIcons name="web" size={30} color="#001A72" />
                </View>
                <View style={{ width: "75%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 16 }}>Visit Our Website!</Text>
                </View>
                <View style={{ width: "10%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center', alignItems: 'center' }}>
                  <MaterialIcons name="keyboard-arrow-up" size={24} color="gray" />
                </View>
              </View>
            </TouchableHighlight>

            <TouchableHighlight style={{ width: "100%", backgroundColor: '#FFFFFF' }} underlayColor="lightgray" onPress={() => Auth.signOut()} >
              <View style={{ width: "100%", flexDirection: "row", height: SCREEN_HEIGHT / 10 }}>
                <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
                  <MaterialCommunityIcons name="logout-variant" size={30} color='#E87272' />
                </View>
                <View style={{ width: "75%", borderBottomWidth: 0, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 16, color: '#E87272' }}>Log Out</Text>
                </View>
                {/* <View style={{ width: "10%", borderBottomWidth: 0, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
              </View> */}
              </View>
            </TouchableHighlight>
          </View>

        <View style={{ height: 300 }} />
        <View style={{ marginTop: SCREEN_HEIGHT / 10, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: SCREEN_HEIGHT / 70, color: "lightgray" }}>CareToGo V. 1.0.0</Text>
          <Text style={{ fontSize: SCREEN_HEIGHT / 70, color: "lightgray" }}>© 2022 BelairCareMedical All Rights Reserved</Text>
          <Image
            source={{ uri: 'https://i.ibb.co/xFGw8GR/BCM.png' }}
            style={{ width: SCREEN_HEIGHT / 30, height: undefined, aspectRatio: 0.87 }}
          />
        </View>
      </ScrollView>
      {/* SCROLLED LOWER HALF */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 0,
    flexDirection: "row",
  },
  shadowProp: {
    shadowColor: '#CDB050',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

