import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../../assets/C2G.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { useRoute } from "@react-navigation/native";
import { Auth } from "aws-amplify";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const ConfirmEmailScreen = () => {
  const route = useRoute();
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { username: route?.params?.username },
  });
  const email = watch("username");
  const navigation = useNavigation();

  const onConfirmPressed = async (data) => {
    try {
      await Auth.confirmSignUp(data.username, data.code);
      navigation.navigate("SignIn");
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };

  const onResendPress = async () => {
    try {
      await Auth.resendSignUp(email);
      Alert.alert("Success", "Code was resent to your email");
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };
  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.root}>
          <Text style={styles.title}> Confirm your email</Text>

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
            name="code"
            placeholder="Enter your confirmation code"
            control={control}
            rules={{
              required: "Code is required",
            }}
          />

          <CustomButton
            text="Confirm"
            onPress={handleSubmit(onConfirmPressed)}
          />
          <CustomButton
            text="Resend Code"
            onPress={onResendPress}
            type="SECONDARY"
          />
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

export default ConfirmEmailScreen;

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
