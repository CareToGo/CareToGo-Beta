import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  ScrollViewBase,
  SafeAreaView,
} from "react-native";
import { Formik } from "formik";
import { Button, Title, RadioButton } from "react-native-paper";
import { useState } from "react";

export default function EditAbout({ setFalse }) {
  const [checked, setChecked] = useState("");
  const [value, setValue] = useState("");

  return (
    <ScrollView style={styles.scrollableView}>
      <Formik
        initialValues={{
          careReceiver: "",
          firstName: "",
          lastName: "",
          day: "",
          month: "",
          year: "",
          address: "",
          city: "",
          province: "",
          postcode: "",
          languages: "",
          gender: "",
          emergencyName: "",
          emergencyNumber: "",
          bio: "",
        }}
        onSubmit={(values) => console.warn(`This is the form data: ${values}`)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <View style={styles.firstname}>
              <Text style={{ marginLeft: 40, fontWeight: "bold" }}>
                First Name:
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                placeholder={"Jay"}
              />
            </View>
            <View style={styles.lastname}>
              <Text style={{ marginLeft: 40, fontWeight: "bold" }}>
                Last Name:
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                placeholder={"Doe"}
              />
            </View>

            <View style={styles.dateContainer}>
              <Text style={{ marginLeft: 40, fontWeight: "bold" }}>
                Date of Birth:
              </Text>
              <View style={styles.birthday}>
                <TextInput
                  style={styles.day}
                  onChangeText={handleChange("day")}
                  onBlur={handleBlur("day")}
                  keyboardType={"numeric"}
                  placeholder={"DD"}
                />
                <TextInput
                  style={styles.month}
                  onChangeText={handleChange("month")}
                  onBlur={handleBlur("month")}
                  keyboardType={"numeric"}
                  placeholder={"MM"}
                />
                <TextInput
                  style={styles.year}
                  onChangeText={handleChange("year")}
                  onBlur={handleBlur("year")}
                  keyboardType={"numeric"}
                  placeholder={"YYYY"}
                />
              </View>
            </View>
            <View style={styles.address}>
              <Text style={{ marginLeft: 40, fontWeight: "bold" }}>
                Address (include Unit #):
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                placeholder={"350 Victoria St."}
              />
            </View>

            <View style={styles.regioncontainer}>
              <View style={styles.region}>
                <TextInput
                  style={styles.city}
                  onChangeText={handleChange("city")}
                  onBlur={handleBlur("city")}
                  placeholder={"Toronto"}
                />
                <TextInput
                  style={styles.province}
                  onChangeText={handleChange("province")}
                  onBlur={handleBlur("province")}
                  placeholder={"ON"}
                />
                <TextInput
                  style={styles.postcode}
                  onChangeText={handleChange("postcode")}
                  onBlur={handleBlur("postcode")}
                  placeholder={"M5B2K3"}
                />
              </View>
            </View>

            <View style={styles.gender}>
              <TouchableOpacity style={styles.genderContainer}>
                <Text style={{ color: "#FFDE59", fontWeight: "bold", top: 8 }}>
                  Male:
                </Text>
                <RadioButton
                  value="male"
                  status={checked === "male" ? "checked" : "unchecked"}
                  onPress={() => setChecked("male")}
                  color={"#FFDE59"}
                  uncheckedColor={"#838D95"}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.genderContainer}>
                <Text style={{ color: "#FFDE59", fontWeight: "bold", top: 8 }}>
                  Female:
                </Text>
                <RadioButton
                  style={{ width: "100%" }}
                  value="female"
                  status={checked === "female" ? "checked" : "unchecked"}
                  onPress={() => setChecked("female")}
                  color={"#FFDE59"}
                  uncheckedColor={"#838D95"}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.genderContainer}>
                <Text style={{ color: "#FFDE59", fontWeight: "bold", top: 8 }}>
                  Other:
                </Text>
                <RadioButton
                  value="other"
                  status={checked === "other" ? "checked" : "unchecked"}
                  onPress={() => setChecked("other")}
                  color={"#FFDE59"}
                  uncheckedColor={"#838D95"}
                />
              </TouchableOpacity>
            </View>
            <RadioButton.Group
              onValueChange={(newValue) => setValue(newValue)}
              value={value}
            >
              <View style={styles.receiverContainer}>
                <Text style={{ marginLeft: 40, fontWeight: "bold" }}>
                  I am seeking care for:
                </Text>
                <View style={styles.carereceiver}>
                  <View style={styles.receiver}>
                    <Text
                      style={{ color: "#FFDE59", fontWeight: "bold", top: 8 }}
                    >
                      Myself:
                    </Text>
                    <RadioButton value="myself" color={"#FFDE59"} />
                  </View>
                  <View style={styles.receiver}>
                    <Text
                      style={{ color: "#FFDE59", fontWeight: "bold", top: 8 }}
                    >
                      Other:
                    </Text>
                    <RadioButton value="other" color={"#FFDE59"} />
                  </View>
                </View>
              </View>
            </RadioButton.Group>

            <View style={styles.emergencyContainer}>
              <Text style={{ marginLeft: 40, fontWeight: "bold" }}>
                Emergency Contact
              </Text>
              <View style={styles.emergency}>
                <TextInput
                  style={styles.emergname}
                  onChangeText={handleChange("emergencyName")}
                  onBlur={handleBlur("emergency")}
                  placeholder={"Jay Doe"}
                />
                <TextInput
                  style={styles.emergnumber}
                  onChangeText={handleChange("emergencyNumber")}
                  onBlur={handleBlur("emergencyNumber")}
                  placeholder={"(416) 777 7777"}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancel} onPress={setFalse}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.save}
                onPress={() => {
                  console.log(values);
                }}
              >
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollableView: {
    paddingBottom: 40,
  },
  firstname: {
    top: 40,
  },
  lastname: {
    top: 60,
  },
  input: {
    height: 40,
    marginTop: 10,
    marginHorizontal: 40,
    borderWidth: 1,
    padding: 10,
  },
  dateContainer: {
    top: 80,
  },

  birthday: {
    flexDirection: "row",
    left: 30,
  },
  day: {
    height: 40,
    width: "20%",
    marginHorizontal: 15,
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
  },
  month: {
    height: 40,
    width: "20%",
    marginHorizontal: 15,
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
  },
  year: {
    height: 40,
    width: "20%",
    marginHorizontal: 15,
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
  },

  address: {
    top: 100,
  },
  regioncontainer: {
    top: 120,
  },
  region: {
    flexDirection: "row",
    left: 30,
  },
  city: {
    height: 40,
    width: "20%",
    marginHorizontal: 15,
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
  },
  province: {
    height: 40,
    width: "20%",
    marginHorizontal: 15,
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
  },
  postcode: {
    height: 40,
    width: "20%",
    marginHorizontal: 15,
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
  },
  gender: {
    top: 140,
    flexDirection: "row",
    marginLeft: 30,
  },
  genderContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    backgroundColor: "#001A72",
    paddingLeft: 15,
    borderRadius: 10,
  },
  receiverContainer: {
    top: 155,
  },
  carereceiver: {
    flexDirection: "row",
  },
  receiver: {
    flexDirection: "row",
    top: 10,
    left: 30,
    marginHorizontal: 10,
    backgroundColor: "#001A72",
    paddingLeft: 15,
    borderRadius: 10,
  },
  emergencyContainer: {
    top: 185,
  },
  emergency: {
    flexDirection: "row",
    left: 10,
  },
  emergname: {
    height: 40,
    width: "40%",
    marginHorizontal: 15,
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
  },
  emergnumber: {
    height: 40,
    width: "40%",
    marginHorizontal: 15,
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    left: 20,
    top: 190,
    height: 1000,
  },
  cancel: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 30,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#C4C4C4",
    top: 30,
    left: 10,
  },
  save: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#C4C4C4",
    top: 30,
    left: 10,
  },
});
