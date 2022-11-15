import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { useAuthContext } from "../../contexts/AuthContext";
// import EditAbout from "../profile/profile-screen-components/about/editAbout";
// import AboutComponent from "../profile/profile-screen-components/about/aboutComponent";

export default function ViewProfileScreen() {
  const { dbUser } = useAuthContext();
  return (
    <View style={styles.container}>
      {/* <AboutComponent /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#C4C4C4",
    bottom: 70,
    left: 120,
  },
});
