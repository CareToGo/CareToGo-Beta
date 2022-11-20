import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import { useRef, useCallback, useState, useMemo, useEffect } from "react";
import { useBasketContext } from "../../contexts/BasketContext";
import {
  CardForm,
  initPaymentSheet,
  presentPaymentSheet,
  useStripe,
} from "@stripe/stripe-react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Worker } from "../../models";
import { DataStore, graphqlOperation, API } from "aws-amplify";
import { createPaymentIntent } from "../../graphql/mutations";

const OrderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [worker, setWorker] = useState(null);
  const [services, setServices] = useState();
  const [count, setCount] = useState(0);
  const pressHandler = () => {
    navigation.navigate("date-picker");
  };
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [clientSecret, setClientSecret] = useState(null);

  const queryWorker = async (arg) => {
    const subscription = DataStore.observeQuery(Worker, (worker) =>
      worker.id("eq", arg)
    ).subscribe((snapshot) => {
      const { items } = snapshot;
      setWorker(items[0]);
      setServices(JSON.parse(items[0].services));
    });
  };

  useEffect(() => {
    const id = route.params.id;
    queryWorker(id);
  }, []);

  const { createOrder } = useBasketContext();

  const onAddToOrder = async () => {
    Object.keys(selected).forEach(function (key) {
      if (selected[key] === false) {
        delete selected[key];
      }
    });

    const keys = Object.keys(selected);
    let service_array = [];
    service_array = services.filter((g) => keys.includes(g.id)).map((g) => g);

    await createOrder(service_array, service_array.length * 35);
  };

  const [selected, setSelected] = useState({});

  const amount = Math.floor(100);
  useEffect(() => {
    fetchPaymentIntent();
  }, []);

  useEffect(() => {
    if (clientSecret) {
      initializePaymentSheet();
    }
  }, [clientSecret]);

  const fetchPaymentIntent = async () => {
    const response = await API.graphql(
      graphqlOperation(createPaymentIntent, { amount })
    );

    setClientSecret(response.data.createPaymentIntent.clientSecret);
  };

  const initializePaymentSheet = async () => {
    if (!clientSecret) {
      return;
    }
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      customFlow: false,
      merchantDisplayName: "Example Inc.",
      style: "alwaysDark",
    });
    console.log("success");
    if (error) {
      Alert.alert(error);
    }
  };

  const openPaymentSheet = async () => {
    if (!clientSecret) {
      return;
    }
    const { error } = await presentPaymentSheet({ clientSecret });

    if (error) {
      Alert.alert(`Error code: ${error.code} `, error.message);
    } else {
      onAddToOrder();
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  const placeOrder = () => {
    openPaymentSheet();
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView nestedScrollEnabled={true} style={styles.container}>
        <View style={{ marginTop: 50 }}>
          <Text style={tw`text-center py-5 text-lg `}>Select</Text>
        </View>
        <View style={tw`border-t border-gray-200 flex`}></View>

        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View style={tw` border-t border-gray-200 flex-shrink py-0`} />
          )}
          renderItem={({ item: { id, name, description, price }, item }) => (
            <TouchableOpacity
              onPress={() => {
                let newSelected = { ...selected };
                newSelected[item.id] = !newSelected[item.id];
                setSelected(newSelected);
              }}
              style={tw`flex-row items-center justify-between p-5 ${
                selected[id] && "bg-gray-200"
              }`}
            >
              <View>
                <Text style={tw`font-semibold text-lg`}>{name}</Text>
                <Text style={tw`text-gray-500`}>{description}</Text>
              </View>
              <Text style={tw`text-lg`}>${price}</Text>
            </TouchableOpacity>
          )}
        />

        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.now}
            // onPress={() => {
            //   handleSnapPress(0);
            //   onAddToOrder();
            // }}
            onPress={placeOrder}
          >
            <Text style={{ color: "white" }}>Now</Text>
          </Pressable>

          <Pressable onPress={pressHandler} style={styles.later}>
            <Text>Later</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },

  image: {
    top: 20,
    left: 25,
  },
  select: {
    justifyContent: "center",
    alignItems: "center",
    top: 50,
  },
  menuitem: {
    top: 60,
    marginVertical: 10,
  },
  item: {
    marginTop: 10,
    flexDirection: "row",
  },
  buttonContainer: {
    top: 40,
    flexDirection: "row",
    left: 10,
  },

  now: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "black",
    marginHorizontal: 20,
  },
  later: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#C4C4C4",
  },
  name: {
    flexDirection: "row",
  },
  input: {
    height: 40,
    width: "44%",
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginLeft: 20,
  },
  placeOrder: {
    backgroundColor: "#001A72",
    width: "55%",
    borderRadius: 20,
    paddingVertical: 20,
  },
  close: {
    backgroundColor: "#000000",
    width: "35%",
    borderRadius: 20,
    paddingVertical: 20,
    marginLeft: 15,
  },
});

export default OrderScreen;
