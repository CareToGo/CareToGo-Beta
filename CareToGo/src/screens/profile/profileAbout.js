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
import AboutComponent from "./profile-screen-components/about/aboutComponent";
import EditAbout from "./profile-screen-components/about/editAbout";
import { Auth } from "aws-amplify";

export default function ProfileAbout() {
  const [aboutEdit, setAboutEdit] = useState(false);

  const setTrue = () => {
    setAboutEdit(true);
  };

  const setFalse = () => {
    setAboutEdit(false);
  };

  if (aboutEdit) {
    return (
      <View style={styles.container}>
        <EditAbout setFalse={setFalse} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <AboutComponent />
        <TouchableOpacity style={styles.buttonContainer} onPress={setTrue}>
          <Text>Edit Profile</Text>
        </TouchableOpacity>

        <Text
          style={{ textAlign: "center", color: "red", margin: 10 }}
          onPress={() => Auth.signOut()}
        >
          Sign Out
        </Text>
      </View>
    );
  }
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
