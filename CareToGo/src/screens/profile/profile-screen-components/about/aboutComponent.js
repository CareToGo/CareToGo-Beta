import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import HeaderButtons from "../../profile-header-buttons/HeaderButtons";
// import DummyImage from "../../../../../assets/profile-dummy-image/emily.png";
import { useAuthContext } from "../../../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function AboutComponent() {
  const { dbUser } = useAuthContext();
  const navigation = useNavigation();
  return (
    <ScrollView style={{ paddingHorizontal: "5%", paddingBottom: 20 }}>
      <HeaderButtons />
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          {/* <Image
            source={DummyImage}
            style={{ paddingHorizontal: "5%", paddingVertical: "5%" }}
          /> */}
        </TouchableOpacity>

        <View style={styles.detailsContainer}>
          <Text style={{ fontWeight: "bold" }}>{dbUser.name}</Text>
          <View style={styles.phone}>
            <Text
              style={{ fontSize: 10, fontWeight: "bold", color: "#B8C5D0" }}
            >
              Address
            </Text>
            <Text>{dbUser.address}</Text>
          </View>
        </View>
      </View>

      <View style={styles.mainContainer}>
        <Text style={{ fontSize: 20, fontStyle: "italic" }}>BIO</Text>
        <Text style={{ top: 10, fontSize: 12, paddingHorizontal: 15 }}>
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat..
        </Text>
      </View>

      <View style={styles.mainContainer}>
        <Text
          style={{
            paddingLeft: 20,
            paddingTop: 10,
            fontSize: 12,
            fontStyle: "italic",
            fontWeight: "bold",
          }}
        >
          Emergency Contact
        </Text>
        <View style={{ paddingLeft: 70, paddingTop: 10 }}>
          <Text>Tommy Sawyer</Text>
          <Text>647-420-420</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFFFFF",
    padding: "5%",
    borderRadius: 20,
    top: "5%",
    flexDirection: "row",
    marginVertical: "2%",
  },
  detailsContainer: { padding: "5%" },
  phone: {
    top: 10,
  },
  email: {
    top: 20,
  },
  date: {
    top: 30,
  },
  bioContainer: {
    backgroundColor: "#FFFFFF",
    width: "80%",
    height: "35%",
    borderRadius: 20,
    top: 50,
    left: 45,
  },

  emergencyContainer: {
    backgroundColor: "#FFFFFF",
    width: "80%",
    height: "20%",
    borderRadius: 20,
    top: 70,
    left: 45,
    flexDirection: "row",
  },
});
