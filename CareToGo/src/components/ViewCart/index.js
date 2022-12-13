import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import OrderItem from "../../screens/OrderItem/OrderItem";
import {
  CardForm,
  initPaymentSheet,
  presentPaymentSheet,
  useStripe,
} from "@stripe/stripe-react-native";
import { useBasketContext } from "../../contexts/BasketContext";
import { createPaymentIntent } from "../../graphql/mutations";
import { AntDesign } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import tw from "tailwind-react-native-classnames";
const ViewCart = (prop) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [clientSecret, setClientSecret] = useState(null);
  const { createOrder } = useBasketContext();
  const [services, setServices] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [datenow, setDateNow] = useState(new Date());

  useEffect(() => {
    const worker = prop.info;
    fetchPaymentIntent();
    const nS = JSON.parse(worker.nursingServices);
    const pS = JSON.parse(worker.pswServices);

    setServices([...nS, ...pS]);
  }, []);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
    setModalVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (data) => {
    hideDatePicker();
    setDate(data);
  };
  
  useEffect(() => {
    if (clientSecret) {
      initializePaymentSheet();
    }
  }, [clientSecret]);

  const onAddToOrder = async () => {
    const keys = Object.keys(prop.dict);
    let service_array = [];
    service_array = services
      .filter((service) => keys.includes(service.name))
      .map((service) => service);

    await createOrder(service_array, prop.total, prop.info);
  };

  const fetchPaymentIntent = async () => {
    const total = prop.total * 100;
    const response = await API.graphql(
      graphqlOperation(createPaymentIntent, { total })
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
    setModalVisible(false);
  };

  const checkoutModalContent = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={styles.modalContainer}
        ></TouchableOpacity>
        <View style={styles.modalCheckoutContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <AntDesign name="down" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalCheckoutButton}>Order</Text>
          <ScrollView>
            <OrderItem dict={prop.dict} />

            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Time</Text>
              <Text>{date.toString().slice(0, -18)}</Text>
            </View>
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text>${prop.total}</Text>
            </View>

            <View
              style={tw`flex-row justify-evenly pt-4 pb-2 mt-auto border-t border-gray-100`}
            >
              <TouchableOpacity
                onPress={() => setDate(new Date())}
                style={[
                  tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`,
                  { backgroundColor: "#A6C4DD" },
                ]}
              >
                <AntDesign name="check" size={15} color="white" />
                <Text style={tw`text-white text-center`}>Now </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={showDatePicker}
                style={tw`flex bg-gray-100 flex-row justify-between w-24 px-4 py-3 rounded-full shadow-lg`}
              >
                <AntDesign name="clockcircleo" size={15} color="black" />
                <Text style={tw`text-black text-center`}>Later</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                minimumDate={datenow}
                date={date}
                display="inline"
              />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: "#A6C4DD",
                  alignItems: "center",
                  borderRadius: 30,
                  width: 300,
                  position: "relative",
                  padding: 13,
                }}
                onPress={placeOrder}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </>
    );
  };
  return (
    <>
      {prop.dict ? (
        <Modal
          animationType="sliding"
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          {checkoutModalContent()}
        </Modal>
      ) : (
        <View></View>
      )}
      {prop.total ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
            position: "absolute",
            justifyContent: "center",
            bottom: "2%",
            zIndex: 999,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",

              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                marginTop: 20,
                backgroundColor: "#A6C4DD",
                padding: 13,
                borderRadius: 30,
                width: 300,
                justifyContent: "space-around",
                position: "relative",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text style={{ color: "white", fontSize: 20 }}>View Cart </Text>
              <Text style={{ color: "white", fontSize: 20 }}>
                ${prop.total}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </>
  );
};

export default ViewCart;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalCheckoutContainer: {
    backgroundColor: "white",
    padding: 16,
    height: "70%",
    borderWidth: 1,
  },
  modalCheckoutButton: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
    marginTop: 10,
  },
  subtotalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  subtotalText: {
    textAlign: "left",
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 10,
  },
});
