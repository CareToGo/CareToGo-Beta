import { KeyboardAvoidingView, Platform } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import SplashNav from "./src/navigation/SplashNavigator/SplashNav";
import { Amplify, DataStore } from "aws-amplify";
import config from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native/dist/Auth";
import AuthContextProvider from "./src/contexts/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import BasketContextProvider from "./src/contexts/BasketContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginNavigation from "./src/LoginNavigation";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); 
LogBox.ignoreAllLogs(); 

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const PUBLISHABLE_KEY =
  "pk_test_51LPvpUDNDwI2KDMrrnp2QTRXShgLkjMZME7p8cSlhOvGa9XxXtMPbfJiLCgCLWE7z2PcDvULJdoiP5rpW9u7KMD200dEKnJAmM";

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthContextProvider>
          <BasketContextProvider>
            <StripeProvider
              publishableKey={
                "pk_test_51LPvpUDNDwI2KDMrrnp2QTRXShgLkjMZME7p8cSlhOvGa9XxXtMPbfJiLCgCLWE7z2PcDvULJdoiP5rpW9u7KMD200dEKnJAmM"
              }
            >
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
              >
                <LoginNavigation />
              </KeyboardAvoidingView>
            </StripeProvider>
          </BasketContextProvider>
        </AuthContextProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
