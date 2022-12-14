import {
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../../assets/C2G.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { useAuthContext } from "../../contexts/AuthContext";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const SignInScreen = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const { height } = useWindowDimensions();
  const [signinloading, setSigninloading] = useState(false);
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = async (data) => {
    if (signinloading) {
      return;
    }
    setSigninloading(true);
    try {
      const auth = await Auth.signIn(data.email, data.password);
      setAuthUser(auth)
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
    setSigninloading(false);
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
  };
  
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.root}>
          <Image
            source={Logo}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode="contain"
          />
          <CustomInput
            name="email"
            placeholder="Email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "This is not a valid Email",
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
                  "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number.",
              },
            }}
          />

          <CustomButton
            text={signinloading ? "Loading..." : "Sign In"}
            onPress={handleSubmit(onSignInPressed)}
          />
          <CustomButton
            text="Forgot Password"
            onPress={onForgotPasswordPressed}
            type="TERTIARY"
          />
          <CustomButton
            text="Sign Up"
            onPress={onSignUpPressed}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;

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
});
