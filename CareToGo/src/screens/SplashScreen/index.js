import AnimatedSplash from "react-native-animated-splash-screen";
import C2G from "../../../assets/C2G.png"



const SplashScreen = () => {
  return (
    <AnimatedSplash
      translucent={false}
      isLoaded={true}
      logoImage={C2G}
      backgroundColor={"#FFFFFF"}
      logoHeight={300}
      logoWidth={250}
    >
    </AnimatedSplash>
  );
};

export default SplashScreen;