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
import tw from "tailwind-react-native-classnames";
import { AntDesign } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function Appointments() {
  const { dbUser } = useAuthContext();

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
    console.log(orders);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={tw`flex-row justify-end px-5`}>
        <Text style={tw`text-lg font-semibold`}>Past Order</Text>
      </View>
      <Text style={styles.title}> Requests</Text>
      <View style={{ flex: 1 }}>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View style={tw` border-t border-gray-200 flex-shrink py-0`} />
          )}
          renderItem={({
            item: { id, service, total, createdAt, name, status },
            item,
          }) => (
            <TouchableOpacity
              style={tw`flex-row items-center p-5`}
              onPress={() => {}}
            >
              <Image
                source={{
                  uri: "http://www.by-lee.com/nurse0.jpg",
                }}
                style={styles.image}
              />
              <View
                style={tw`flex-row items-center justify-between w-8/12 p-5 `}
              >
                <View style={tw`px-3 w-5/6`}>
                  <Text style={tw`font-semibold text-lg`}>
                    Status: {status}{" "}
                  </Text>
                  <Text style={tw`font-semibold text-lg`}>{name}</Text>

                  <Text style={tw`text-gray-500 `}>
                    {createdAt.slice(0, 10)}
                  </Text>
                </View>
                <Text style={tw`font-semibold text-lg`}>${total}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: "700",
    fontSize: 20,

    left: "5%",
  },
  image: {
    width: width * 0.3,
    height: height * 0.13,
    resizeMode: "contain",
    borderRadius: 30,
  },
});
