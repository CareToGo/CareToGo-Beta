import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const ForgotPasswordScreen = () => {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };
  const onSendPressed = async (data) => {
    try {
      await Auth.forgotPassword(data.username);
      navigation.navigate("NewPassword");
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.root}>
          <Text style={styles.title}>Reset Your Password</Text>

          <CustomInput
            name="username"
            placeholder="Email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: EMAIL_REGEX,
                message: "This is not a valid Email",
              },
            }}
          />

          <CustomButton text="Send" onPress={handleSubmit(onSendPressed)} />

          <CustomButton
            text="Back to Sign in"
            onPress={onSignInPressed}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "F9FBFC",
  },
  logo: {
    width: "70%",
    maxHeight: 200,
    maxWidth: 300,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
});
