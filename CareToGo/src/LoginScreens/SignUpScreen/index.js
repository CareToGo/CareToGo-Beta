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

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_REGEX = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

const SignUpScreen = () => {
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");
  const navigation = useNavigation();

  const onRegisterPressed = async (data) => {
    const { username, password, phonenumber } = data;
    try {
      await Auth.signUp({
        username,
        password,
        attribute: { phonenumber },
      });
      navigation.navigate("ConfirmEmail", username);
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };
  const onTermsOfUsePressed = () => {
    console.warn("Term of Use");
  };
  const onPrivacyPressed = () => {
    console.warn("Privacy");
  };
  const onSignPressed = () => {
    navigation.navigate("SignIn");
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.root}>
          <Text style={styles.title}> Create an account</Text>

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
          <CustomInput
            name="phonenumber"
            placeholder="Phone Number"
            control={control}
            rules={{
              required: "Phone Number is required",
              pattern: {
                value: PHONE_REGEX,
                message: "This is not a valid Phone Number",
              },
            }}
          />

          <CustomInput
            name="password"
            placeholder={"Password"}
            control={control}
            secureTextEntry={true}
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password should be minimum 8 characters long",
              },
              pattern: {
                value: PASSWORD_REGEX,
                message:
                  "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character.",
              },
            }}
          />
          <CustomInput
            name="repeatpassword"
            placeholder={"Repeat Password"}
            control={control}
            secureTextEntry={true}
            rules={{
              validate: (value) => value === pwd || "Password do not match",
            }}
          />
          <CustomButton
            text="Register"
            onPress={handleSubmit(onRegisterPressed)}
          />
          <Text style={styles.text}>
            By registering, you confirm that you accept out{" "}
            <Text style={styles.link} onPress={onTermsOfUsePressed}>
              Terms of Use
            </Text>{" "}
            and{" "}
            <Text style={styles.link} onPress={onPrivacyPressed}>
              Privacy Policy
            </Text>
          </Text>
          <CustomButton
            text="Have an account? Sign in"
            onPress={onSignPressed}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

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
