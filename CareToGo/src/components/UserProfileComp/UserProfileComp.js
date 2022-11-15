import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, ScrollView, StyleSheet, TouchableHighlight, Image, Dimensions, Pressable, Linking } from "react-native";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Auth } from "aws-amplify";

export default function UserProfileComp() {
  const { dbUser } = useAuthContext();
  const navigation = useNavigation();

  const editprofile = () => {
    navigation.navigate('EditUserProfile');
  }

  const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  } = Dimensions.get('window');

  return (
    <SafeAreaView style={{ paddingHorizontal: "0%", paddingVertical: 0 }}>

      <View style={{ ...styles.mainContainer, padding: "5%", ...styles.shadowProp, height: SCREEN_HEIGHT / 5.5, justifyContent: "space-between", elevation: 15, shadowColor: '#296899' }}>
        <View style={{ width: "30%", justifyContent: "center", alignItems: "center" }}>
          <Image
            source={{ uri: dbUser.image }}
            style={{ width: "95%", height: undefined, aspectRatio: 1, borderRadius: 100 }}
          />
        </View>

        <View style={{ width: "70%", paddingLeft: 30, justifyContent: "space-between"}}>

          <Text
            style={{ fontSize: 12, fontWeight: "bold", color: "gray" }}>
            WELCOME!
          </Text>
          <Text
            style={{
              color: "#001A72",
              fontSize: ((SCREEN_WIDTH * 0.9 / dbUser.firstname.length) > 33 ? 33 : (SCREEN_WIDTH * 0.9 / dbUser.firstname.length)),
              fontWeight: "bold"
            }}>
            {dbUser.firstname}
          </Text>
          <Text
            style={{
              color: "#001A72",
              fontSize: 12,
            }}>
            +1{dbUser.contactnum}
          </Text>
          <Text
            style={{
              color: "#001A72",
              fontSize: 12,
            }}>
            {dbUser.email}
          </Text>
        </View>
      </View>

      <View style={{ paddingLeft: 5, marginTop: SCREEN_HEIGHT / 30, paddingBottom: 5 }}>
        <Text style={{ fontSize: 12, fontWeight: "bold", color: "#B8C5D0" }}>Options</Text>
      </View>

      <View style={{ ...styles.shadowProp, elevation: 15, shadowColor: '#296899', borderWidth: 0 }}>
        <TouchableHighlight style={{ width: "100%", backgroundColor: '#FFFFFF' }} underlayColor="lightgray" onPress={() => editprofile()} >
          <View style={{ width: "100%", flexDirection: "row", height: SCREEN_HEIGHT / 15 }}>
            <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons name="account-edit" size={30} color="#001A72" />
            </View>
            <View style={{ width: "75%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center' }}>
              <Text style={{ fontSize: 16 }}>Edit Profile</Text>
            </View>
            <View style={{ width: "10%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={{ width: "100%", backgroundColor: '#FFFFFF' }} underlayColor="lightgray" onPress={() => sizeOnTouch()} >
          <View style={{ width: "100%", flexDirection: "row", height: SCREEN_HEIGHT / 15 }}>
            <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name="accessible" size={30} color="#001A72" />
            </View>
            <View style={{ width: "75%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center' }}>
              <Text style={{ fontSize: 16 }}>Accessibility Settings</Text>
            </View>
            <View style={{ width: "10%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={{ width: "100%", backgroundColor: '#FFFFFF' }} underlayColor="lightgray" >
          <View style={{ width: "100%", flexDirection: "row", height: SCREEN_HEIGHT / 15 }}>
            <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons name="file-document" size={30} color="#001A72" />
            </View>
            <View style={{ width: "75%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center' }}>
              <Text style={{ fontSize: 16 }}>Terms of Services</Text>
            </View>
            <View style={{ width: "10%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={{ width: "100%", backgroundColor: '#FFFFFF' }} underlayColor="lightgray" onPress={() => { Linking.openURL('https://caretogo.ca') }}>
          <View style={{ width: "100%", flexDirection: "row", height: SCREEN_HEIGHT / 15 }}>
            <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons name="web" size={30} color="#001A72" />
            </View>
            <View style={{ width: "75%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center' }}>
              <Text style={{ fontSize: 16 }}>Visit Our Website!</Text>
            </View>
            <View style={{ width: "10%", borderBottomWidth: 1, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
            </View>
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={{ width: "100%", backgroundColor: '#FFFFFF' }} underlayColor="lightgray" onPress={() => Auth.signOut()} >
          <View style={{ width: "100%", flexDirection: "row", height: SCREEN_HEIGHT / 15 }}>
            <View style={{ width: "15%", justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons name="logout-variant" size={30} color='#E87272' />
            </View>
            <View style={{ width: "75%", borderBottomWidth: 0, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: '#E87272' }}>Log Out</Text>
            </View>
            <View style={{ width: "10%", borderBottomWidth: 0, borderBottomColor: "lightgray", paddingVertical: 3, justifyContent: 'center', alignItems: 'center' }}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
            </View>
          </View>
        </TouchableHighlight>
      </View>

      <View style={{ marginTop:SCREEN_HEIGHT/10, justifyContent:'center', alignItems:'center' }}>
        <Text style={{ fontSize: SCREEN_HEIGHT/70, color:"lightgray" }}>CareToGo V. 1.0.0</Text>
        <Text style={{ fontSize: SCREEN_HEIGHT/70, color:"lightgray" }}>© 2022 BelairCareMedical All Rights Reserved</Text>
        <Image
            source={{ uri: 'https://i.ibb.co/xFGw8GR/BCM.png' }}
            style={{ width: SCREEN_HEIGHT/30, height: undefined, aspectRatio: 0.87 }}
          />
      </View>
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
