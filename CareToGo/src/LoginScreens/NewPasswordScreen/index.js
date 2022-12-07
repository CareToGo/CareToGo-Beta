import { StyleSheet, Text, View, Alert } from "react-native";
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
const NewPasswordScreen = () => {
  const { control, handleSubmit } = useForm();

  const navigation = useNavigation();
  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };
  const onSubmit = async (data) => {
    try {
      await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
      navigation.navigate("SignIn");
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
            name="code"
            placeholder="Code"
            control={control}
            rules={{
              required: "Code is required",
            }}
          />
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
            name="password"
            placeholder={"New Password"}
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

          <CustomButton text="Submit" onPress={handleSubmit(onSubmit)} />

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

export default NewPasswordScreen;

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
