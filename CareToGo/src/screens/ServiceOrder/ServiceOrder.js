import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { DataStore } from "aws-amplify";
import { NurseService, PSWService } from "../../models";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ServiceCart from "../../components/ServiceCart";

export default function ServiceOrder() {
  const [nurseServices, setNurseServices] = useState([]);
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState([]);

  const [isEnabled, setIsEnabled] = useState(false);
  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", Date(date));
    hideDatePicker();
  };

  const [total, setTotal] = useState(0);
  const [dict, setDict] = useState({});
  const personalSupport = () => {
    setIsEnabled(false);
  };

  const nurseSupport = () => {
    setIsEnabled(true);
  };

  const queryPSWService = async () => {
    const subscription = DataStore.observeQuery(PSWService).subscribe(
      (snapshot) => {
        const { items } = snapshot;
        setServices(items);
        let initialSelected = {};
        for (let item of items) {
          initialSelected[item.id] = false;
          setSelected(initialSelected);
        }
      }
    );
  };
  const queryNurseService = async () => {
    const subscription = DataStore.observeQuery(NurseService).subscribe(
      (snapshot) => {
        const { items } = snapshot;
        setNurseServices(items);
      }
    );
  };
  useEffect(() => {
    queryPSWService();
    queryNurseService();
  }, []);

  const onSave = async () => {
    await updateWorker();
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {isEnabled ? (
          <FlatList
            data={nurseServices}
            keyExtractor={(item) => item.id}
            ListHeaderComponentStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
            ListHeaderComponent={() => (
              <View style={styles.sliderContainer}>
                <TouchableOpacity
                  style={styles.clickableArea}
                  onPress={personalSupport}
                >
                  <Text style={styles.sliderText}>Personal Support</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.clickableArea}
                  onPress={nurseSupport}
                >
                  <Text style={styles.sliderText}>Nursing</Text>
                  <View
                    style={{ height: 1, borderWidth: 0.5, width: 60 }}
                  ></View>
                </TouchableOpacity>
              </View>
            )}
            ItemSeparatorComponent={() => (
              <View style={tw` border-t border-gray-200 flex-shrink py-0`} />
            )}
            renderItem={({ item: { id, name, description, price }, item }) => (
              <TouchableOpacity
                onPress={() => {
                  let newSelected = { ...selected };
                  newSelected[item.id] = !newSelected[item.id];
                  setSelected(newSelected);
                  if (newSelected[item.id]) {
                    setTotal(total + price);
                    dict[item.name] = price;
                  } else {
                    setTotal(total - price);
                    delete dict[item.name];
                  }
                }}
                style={tw`flex-row items-center justify-between p-5 ${
                  selected[id] && "bg-gray-200"
                }`}
              >
                <View style={tw`w-4/5`}>
                  <Text style={tw`font-semibold text-lg`}>{name}</Text>
                  <Text style={tw`text-gray-500`}>{description}</Text>
                </View>
                <View style={tw``}>
                  <Text style={tw`text-lg`}>${price}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <FlatList
            data={services}
            keyExtractor={(item) => item.id}
            ListHeaderComponentStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
            ListHeaderComponent={() => (
              <View style={styles.sliderContainer}>
                <TouchableOpacity
                  style={styles.clickableArea}
                  onPress={personalSupport}
                >
                  <Text style={styles.sliderText}>Personal Support</Text>
                  <View style={{ height: 1, borderWidth: 0.5, width: 130 }} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.clickableArea}
                  onPress={nurseSupport}
                >
                  <Text style={styles.sliderText}>Nursing</Text>
                </TouchableOpacity>
              </View>
            )}
            ItemSeparatorComponent={() => (
              <View style={tw` border-t border-gray-200 flex-shrink py-0`} />
            )}
            renderItem={({ item: { id, name, description, price }, item }) => (
              <TouchableOpacity
                onPress={() => {
                  let newSelected = { ...selected };
                  newSelected[item.id] = !newSelected[item.id];
                  setSelected(newSelected);
                  if (newSelected[item.id]) {
                    setTotal(total + price);
                    dict[item.name] = price;
                  } else {
                    setTotal(total - price);
                    delete dict[item.name];
                  }
                }}
                style={tw`flex-row items-center justify-between p-5 ${
                  selected[id] && "bg-gray-200"
                }`}
              >
                <View style={tw`w-4/5`}>
                  <Text style={tw`font-semibold text-lg`}>{name}</Text>
                  <Text style={tw`text-gray-500`}>{description}</Text>
                </View>
                <View style={tw``}>
                  <Text style={tw`text-lg`}>${price}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      {/* <View
        style={tw`flex-row justify-evenly py-5 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          style={[
            tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`,
            { backgroundColor: "#4D80C5" },
          ]}
        >
          <AntDesign name="check" size={15} color="white" />
          <Text style={tw`text-white text-center`}>Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={showDatePicker}
          style={tw`flex bg-gray-100 flex-row justify-between w-24 px-4 py-3 rounded-full shadow-lg`}
        >
          <AntDesign name="clockcircleo" size={15} color="black" />
          <Text style={tw`text-black text-center`}>Later</Text>
        </TouchableOpacity>
      </View> */}
      {/* 
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
      /> */}
      <ServiceCart dict={dict} total={total} info={"hello"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderContainer: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  clickableArea: {
    width: "50%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderText: {
    fontSize: 17,
    fontWeight: "500",
  },
  slider: {
    position: "absolute",
    width: "48%",
    height: "90%",
    borderRadius: 10,
    backgroundColor: "#f4f4f4",
  },
});
