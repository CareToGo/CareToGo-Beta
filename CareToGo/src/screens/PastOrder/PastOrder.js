import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PastOrder = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ padding: "2%" }}
      >
        <AntDesign name="left" size={25} color={"black"} />
      </TouchableOpacity>
      <Text>index</Text>
    </SafeAreaView>
  );
};

export default PastOrder;

const styles = StyleSheet.create({});
