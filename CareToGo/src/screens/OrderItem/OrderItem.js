import { StyleSheet, Text, View } from "react-native";
import React from "react";

const OrderItem = (prop) => {
  const keys = Object.keys(prop.dict);
  return (
    <>
      {keys.map((key) => {
        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: "#999",
            }}
            key={key}
          >
            <Text style={{ fontWeight: "600", fontSize: 16 }}>{key}</Text>
            <Text style={{ opacity: 0.7, fontSize: 16 }}>
              ${prop.dict[key]}
            </Text>
          </View>
        );
      })}
    </>
  );
};

export default OrderItem;

const styles = StyleSheet.create({});
