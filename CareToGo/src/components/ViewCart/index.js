import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
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
const ViewCart = (prop) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [clientSecret, setClientSecret] = useState(null);
  const { createOrder } = useBasketContext();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const worker = prop.info;
    fetchPaymentIntent();
    console.log(JSON.parse(worker.nursingServices));
    const nS = JSON.parse(worker.nursingServices);
    const pS = JSON.parse(worker.pswServices);

    setServices([...nS, ...pS]);
  }, []);

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
          <Text style={styles.modalCheckoutButton}>Order</Text>
          <OrderItem dict={prop.dict} />
          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}>Subtotal</Text>
            <Text>${prop.total}</Text>
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
    height: 500,
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
