import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { useAuthContext } from "../../contexts/AuthContext";
import { DataStore } from "aws-amplify";
import { Order } from "../../models";
import { useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import { Storage } from "aws-amplify";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function RequestComp({ order, navigation }) {
  const [imageLink, setImageLink] = useState(imageLink ? imageLink : null);

  useEffect(() => {
    // console.log('----reqcomp----', order);
    // console.log('----reqcomp----', JSON.parse(order.service));
    console.log('----reqcomp----', order.Worker.sub);
  }, []);

  const fetchLink = async () => {
    Storage.get(`${order.Worker.sub}.jpg`)
      .then((mylink) => {
        setImageLink(mylink)
        // console.log(mylink)
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchLink();
  }, []);


  return (
    <View style={{ flex: 1, borderBottomWidth: 1, borderColor: 'lightgray', paddingHorizontal: 15, height: 180, paddingVertical: 15 }}>
      <View style={{ height: "100%", justifyContent:'center', width: 100 }}>
        <Image
          source={{
            uri: imageLink,
          }}
          style={{ resizeMode: 'contain', height: 100, width: 100, borderRadius: 10 }}
        />
      </View>


      {/* <View
        style={tw`flex-row items-center justify-between w-8/12 p-5 `}
      >
        <View style={tw`px-3 w-5/6`}>
          <Text style={tw`font-semibold text-lg`}>
            Status: {order.status}{" "}
          </Text>
          <Text style={tw`font-semibold text-lg`}>{order.Worker.firstname}</Text>

          <Text style={tw`text-gray-500 `}>
            {createdAt.slice(0, 10)}
          </Text>
        </View>
        <Text style={tw`font-semibold text-lg`}>${total}</Text>
      </View> */}
      {/* <FlatList
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
        /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    left: "5%",
  },
  image: {
    resizeMode: "contain",
    borderRadius: 30,
  },
});
