import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../../contexts/AuthContext";
import { DataStore } from "aws-amplify";
import { Order } from "../../models";
import { useState, useEffect } from "react";
import RequestComp from "../../components/RequestComp/RequestComp";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function RequestScreen() {
  const { dbUser } = useAuthContext();
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);

  const queryOrder = async (arg) => {
    const subscription = DataStore.observeQuery(Order, (order) =>
      order.userID("eq", arg)
    ).subscribe((snapshot) => {
      const { items } = snapshot;
      setOrders([]);
      setOrders(items);
    });
  };

  useEffect(() => {
    queryOrder(dbUser.id);
  }, []);

  if (orders.length == 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Loading Requests</Text>
      </SafeAreaView>
    )
  }

 if (orders.length !== 0) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Active Requests</Text>
      <FlatList
        data={orders}
        renderItem={({ item }) => <RequestComp order={item} navigation={navigation} />}
      />
    </SafeAreaView>
  );
 }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    fontWeight: "300",
    fontSize: 30,
    paddingTop: "3%",
    paddingLeft: "3%"
  },
  image: {
    width: width * 0.3,
    height: height * 0.13,
    resizeMode: "contain",
    borderRadius: 30,
  },
});
