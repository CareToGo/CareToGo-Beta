import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";

export default function AppointmentComp() {
  const date = () => {
    console.warn("The date should change dynamically");
  };

  const timeInfo = () => {
    console.warn(
      "The times of the appointment, name, and care profile should be dynamically rendered"
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Pressable style={{ justifyContent: "center" }} onPress={date}>
          <Text style={styles.titleContainer}>Monday, January 18th</Text>
        </Pressable>

        <TouchableOpacity
          style={styles.appointmentContainer}
          onPress={timeInfo}
        >
          <View>
            <Text style={{ left: 10, fontWeight: "bold", marginVertical: 5 }}>
              10 a.m.
            </Text>
            <Text style={{ left: 10, fontWeight: "bold" }}>11 a.m.</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={{ fontWeight: "bold", marginVertical: 5 }}>
              Yao Tian
            </Text>
            <Text>Standard Care Profile</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mainContainer: {
    top: 20,
    left: 25,
  },

  titleContainer: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#6C63FF",
    marginBottom: 10,
  },

  appointmentContainer: {
    backgroundColor: "#E2E0DF",
    width: "80%",
    paddingVertical: 20,
    flexDirection: "row",
  },
  infoContainer: {
    marginLeft: "auto",
    right: 20,
  },
});
