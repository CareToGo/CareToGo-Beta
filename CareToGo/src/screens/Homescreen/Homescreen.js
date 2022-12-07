import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Contractor from "../../components/contractorcomponent/contractor";
import { useBasketContext } from "../../contexts/BasketContext";
import c2g from "../../../assets/homespage/C2G.png";
import tw from "tailwind-react-native-classnames";
import { AntDesign } from "@expo/vector-icons";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { useState } from "react";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default function Homescreen() {
  const { workers } = useBasketContext();
  const [selected, setSelected] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(workers);
  const [isEnabled, setIsEnabled] = useState(false);
  const data = [
    { key: "1", value: "Housekeeping" },
    { key: "2", value: "Personal Care" },
    { key: "3", value: "Transportation" },
    { key: "4", value: "Respite Care" },
    { key: "5", value: "Meal Support" },
    { key: "6", value: "Catheter Care" },
    { key: "7", value: "Wound Care" },
    { key: "8", value: "Nursing Assessment" },
    { key: "9", value: "IV Therapy" },
  ];
  const flip = () => {
    setIsEnabled(!isEnabled);
    setSelectedWorker(workers);
  };
  const select = () => {
    let array = [];
    for (let i = 0; i < workers.length; i++) {
      let table = [];
      for (let j = 0; j < selected.length; j++) {
        if (
          workers[i].nursingServices.includes(selected[j]) ||
          workers[i].pswServices.includes(selected[j])
        ) {
          table.push(i);
        }
        if (table.length == selected.length) {
          if (!array.includes(workers[i])) {
            array.push(workers[i]);
          }
        }
      }
    }
    setSelectedWorker(array);
    if (selected.length === 0) {
      setSelectedWorker(workers);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          paddingHorizontal: "4%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: width / 2, resizeMode: "contain" }}
          source={c2g}
        />
        <TouchableOpacity onPress={flip}>
          <AntDesign name="search1" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {isEnabled ? (
        <View
          style={{
            paddingHorizontal: "3%",
          }}
        >
          <MultipleSelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            label="Services"
            onSelect={select}
            save="value"
            notFoundText="No Worker Found"
          />
        </View>
      ) : (
        <View></View>
      )}

      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <FlatList
        data={selectedWorker}
        renderItem={({ item }) => <Contractor worker={item} />}
      />
      <View style={styles.bg} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "3%",
    backgroundColor: "#FFFFFF",
  },
  bg: {
    position: "absolute",
    width: width,
    height: height,
    backgroundColor: "red",
    transform: [{ translateY: height }],
    borderRadius: 32,
  },
});
