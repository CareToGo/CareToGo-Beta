import { TouchableOpacity, View, Text, TextInput, StyleSheet, Button, Alert, ScrollView, Dimensions, Image, Platform, Pressable } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'
import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { User } from "../../models";
import { useAuthContext } from "../../contexts/AuthContext";
import { DataStore } from "aws-amplify";
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, route } from "@react-navigation/native";
import { GOOGLE_MAPS_APIKEY } from "@env";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const EditCareProfile = () => {
  const navigation = useNavigation();
  const { dbUser, sub, setDbUser } = useAuthContext();
  const [mobility, setMobility] = useState(dbUser?.mobility || "");
  const [grooming, setGrooming] = useState(dbUser?.grooming || "");
  const [feeding, setFeeding] = useState(dbUser?.feeding || "");
  const [mealprep, setMealprep] = useState(dbUser?.mealprep || "");
  const [bathing, setBathing] = useState(dbUser?.bathing || "");
  const [toileting, setToileting] = useState(dbUser?.toileting || "");
  const [allergies, setAllergies] = useState(dbUser?.allergies || "");
  const [diagnosis, setDiagnosis] = useState(dbUser?.diagnosis || "");
  const data = [
    { key: '1', value: 'TOTAL CARE' },
    { key: '2', value: 'SOME ASSISTANCE' },
    { key: '3', value: 'INDEPENDENT' },
  ]

  useEffect(() => {
  }, []);

  const onSave = async () => {
    if (dbUser) {
      await updateUser();
    } else {
      await createUser();
    }
  };

  const updateUser = async () => {
    const user = await DataStore.save(
      User.copyOf(dbUser, (updated) => {
        updated.mobility = mobility;
        updated.grooming = grooming;
        updated.feeding = feeding;
        updated.mealprep = mealprep;
        updated.bathing = bathing;
        updated.toileting = toileting;
        updated.allergies = allergies;
        updated.diagnosis = diagnosis;
        updated._version = parseInt(dbUser.ver);
        updated.ver = parseInt(dbUser.ver + 1);
      })
    );
    console.log(user);
    setDbUser(user);
  };

  const changeMobility = (val) => {
    if (val == 1) {
      setMobility('TOTALCARE');
    } else if (val == 2) {
      setMobility('SOMEASSISTANCE');
    } else {
      setMobility('INDEPENDENT');
    }
  };

  const changeGrooming = (val) => {
    if (val == 1) {
      setGrooming('TOTALCARE');
    } else if (val == 2) {
      setGrooming('SOMEASSISTANCE');
    } else {
      setGrooming('INDEPENDENT');
    }
  };

  const changeFeeding = (val) => {
    if (val == 1) {
      setFeeding('TOTALCARE');
    } else if (val == 2) {
      setFeeding('SOMEASSISTANCE');
    } else {
      setFeeding('INDEPENDENT');
    }
  };

  const changeMealprep = (val) => {
    if (val == 1) {
      setMealprep('TOTALCARE');
    } else if (val == 2) {
      setMealprep('SOMEASSISTANCE');
    } else {
      setMealprep('INDEPENDENT');
    }
  };

  const changeBathing = (val) => {
    if (val == 1) {
      setBathing('TOTALCARE');
    } else if (val == 2) {
      setBathing('SOMEASSISTANCE');
    } else {
      setBathing('INDEPENDENT');
    }
  };

  const changeToileting = (val) => {
    if (val == 1) {
      setToileting('TOTALCARE');
    } else if (val == 2) {
      setToileting('SOMEASSISTANCE');
    } else {
      setToileting('INDEPENDENT');
    }
  };

  return (
    <View style={{ backgroundColor: '#FFFFFF' }}>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <View style={{ ...styles.mainContainer }}>

          <View style={{ width: '100%', zIndex: 99, height: 90 }}>
            <View style={{ height: 30, paddingLeft: 6 }}>
              <Text style={{ fontSize: 15 }}>Mobility</Text>
            </View>

            <View style={styles.selectorContainer}>
              <View style={{ width: '15%', alignItems: 'center', paddingLeft: '5%' }}>
                <MaterialIcons name="wheelchair-pickup" size={24} color="#001A72" />
              </View>
              <View style={{ width: '85%' }}>
                <SelectList
                  setSelected={(val) => changeMobility(val)}
                  data={data}
                  save="key"
                  placeholder={(mobility == 'SOMEASSISTANCE') ? 'SOME ASSISTANCE' : (mobility == 'TOTALCARE') ? 'TOTCAL CARE' : 'INDEPENDENT'}
                  boxStyles={{ width: '100%', borderWidth: 0 }}
                  dropdownStyles={styles.dropdownContainer}
                  dropdownItemStyles={{ height: 36 }}
                  search={false}
                  arrowicon={<AntDesign name="caretdown" size={15} color="#007AFF" />}
                />
              </View>
            </View>
          </View>

          <View style={{ width: '100%', zIndex: 98, height: 90 }}>
            <View style={{ height: 30, paddingLeft: 6 }}>
              <Text style={{ fontSize: 15 }}>Grooming</Text>
            </View>

            <View style={styles.selectorContainer}>
              <View style={{ width: '15%', alignItems: 'center', paddingLeft: '5%' }}>
                <Entypo name="scissors" size={24} color="#001A72" />
              </View>
              <View style={{ width: '85%' }}>
                <SelectList
                  setSelected={(val) => changeGrooming(val)}
                  data={data}
                  save="key"
                  placeholder={(grooming == 'SOMEASSISTANCE') ? 'SOME ASSISTANCE' : (grooming == 'TOTALCARE') ? 'TOTCAL CARE' : 'INDEPENDENT'}
                  boxStyles={{ width: '100%', borderWidth: 0 }}
                  dropdownStyles={styles.dropdownContainer}
                  dropdownItemStyles={{ height: 36 }}
                  search={false}
                  arrowicon={<AntDesign name="caretdown" size={15} color="#007AFF" />}
                />
              </View>
            </View>
          </View>

          <View style={{ width: '100%', zIndex: 97, height: 90 }}>
            <View style={{ height: 30, paddingLeft: 6 }}>
              <Text style={{ fontSize: 15 }}>Feeding</Text>
            </View>

            <View style={styles.selectorContainer}>
              <View style={{ width: '15%', alignItems: 'center', paddingLeft: '5%' }}>
                <MaterialCommunityIcons name="food-variant" size={24} color="#001A72" />
              </View>
              <View style={{ width: '85%' }}>
                <SelectList
                  setSelected={(val) => changeFeeding(val)}
                  data={data}
                  save="key"
                  placeholder={(feeding == 'SOMEASSISTANCE') ? 'SOME ASSISTANCE' : (grooming == 'TOTALCARE') ? 'TOTCAL CARE' : 'INDEPENDENT'}
                  boxStyles={{ width: '100%', borderWidth: 0 }}
                  dropdownStyles={styles.dropdownContainer}
                  dropdownItemStyles={{ height: 36 }}
                  search={false}
                  arrowicon={<AntDesign name="caretdown" size={15} color="#007AFF" />}
                />
              </View>
            </View>
          </View>

          <View style={{ width: '100%', zIndex: 96, height: 90 }}>
            <View style={{ height: 30, paddingLeft: 6 }}>
              <Text style={{ fontSize: 15 }}>MealPrep</Text>
            </View>

            <View style={styles.selectorContainer}>
              <View style={{ width: '15%', alignItems: 'center', paddingLeft: '5%' }}>
                <MaterialCommunityIcons name="chef-hat" size={24} color="#001A72" />
              </View>
              <View style={{ width: '85%' }}>
                <SelectList
                  setSelected={(val) => changeMealprep(val)}
                  data={data}
                  save="key"
                  placeholder={(mealprep == 'SOMEASSISTANCE') ? 'SOME ASSISTANCE' : (mealprep == 'TOTALCARE') ? 'TOTCAL CARE' : 'INDEPENDENT'}
                  boxStyles={{ width: '100%', borderWidth: 0 }}
                  dropdownStyles={styles.dropdownContainer}
                  dropdownItemStyles={{ height: 36 }}
                  search={false}
                  arrowicon={<AntDesign name="caretdown" size={15} color="#007AFF" />}
                />
              </View>
            </View>
          </View>

          <View style={{ width: '100%', zIndex: 95, height: 90 }}>
            <View style={{ height: 30, paddingLeft: 6 }}>
              <Text style={{ fontSize: 15 }}>Bathing</Text>
            </View>

            <View style={styles.selectorContainer}>
              <View style={{ width: '15%', alignItems: 'center', paddingLeft: '5%' }}>
                <MaterialCommunityIcons name="bathtub" size={24} color="#001A72" />
              </View>
              <View style={{ width: '85%' }}>
                <SelectList
                  setSelected={(val) => changeBathing(val)}
                  data={data}
                  save="key"
                  placeholder={(bathing == 'SOMEASSISTANCE') ? 'SOME ASSISTANCE' : (bathing == 'TOTALCARE') ? 'TOTCAL CARE' : 'INDEPENDENT'}
                  boxStyles={{ width: '100%', borderWidth: 0 }}
                  dropdownStyles={styles.dropdownContainer}
                  dropdownItemStyles={{ height: 36 }}
                  search={false}
                  arrowicon={<AntDesign name="caretdown" size={15} color="#007AFF" />}
                />
              </View>
            </View>
          </View>

          <View style={{ width: '100%', zIndex: 94, height: 90 }}>
            <View style={{ height: 30, paddingLeft: 6 }}>
              <Text style={{ fontSize: 15 }}>Toileting</Text>
            </View>

            <View style={styles.selectorContainer}>
              <View style={{ width: '15%', alignItems: 'center', paddingLeft: '5%' }}>
                <FontAwesome5 name="toilet-paper" size={24} color="#001A72" />
              </View>
              <View style={{ width: '85%' }}>
                <SelectList
                  setSelected={(val) => changeToileting(val)}
                  data={data}
                  save="key"
                  placeholder={(toileting == 'SOMEASSISTANCE') ? 'SOME ASSISTANCE' : (toileting == 'TOTALCARE') ? 'TOTCAL CARE' : 'INDEPENDENT'}
                  boxStyles={{ width: '100%', borderWidth: 0 }}
                  dropdownStyles={styles.dropdownContainer}
                  dropdownItemStyles={{ height: 36 }}
                  search={false}
                  arrowicon={<AntDesign name="caretdown" size={15} color="#007AFF" />}
                />
              </View>
            </View>
          </View>

          <View style={{ width: '100%', zIndex: 93 }}>
            <View style={{ height: 30, paddingLeft: 6 }}>
              <Text style={{ fontSize: 15 }}>Allergies</Text>
            </View>

            <View style={styles.selectorContainer}>
              <View style={{ width: '15%', alignItems: 'center', paddingLeft: '5%' }}>
                <FontAwesome5 name="allergies" size={24} color="#001A72" />
              </View>
              <View style={{ width: '85%', marginLeft: 20, paddingVertical: 20, borderLeftWidth: 1, borderColor:'lightgray' }}>
                <TextInput
                  minHeight={48}
                  editable={true}
                  multiline={true}
                  style={{
                    paddingLeft: 10,
                    paddingRight: 30,
                    color: "black",
                    fontSize: 15,
                    textAlignVertical: "top"
                  }}
                  onChangeText={setAllergies}
                  value={allergies}
                  placeholder="any allergies that your healthcare provider should know about?"
                />
              </View>
            </View>
          </View>

          <View style={{ width: '100%', zIndex: 92, marginTop: 20 }}>
            <View style={{ height: 30, paddingLeft: 6 }}>
              <Text style={{ fontSize: 15 }}>Diagnosis</Text>
            </View>

            <View style={styles.selectorContainer}>
              <View style={{ width: '15%', alignItems: 'center', paddingLeft: '5%' }}>
                <Fontisto name="doctor" size={24} color="#001A72" />
              </View>
              <View style={{ width: '85%', marginLeft: 20, paddingVertical: 20, borderLeftWidth: 1, borderColor:'lightgray' }}>
                <TextInput
                  minHeight={48}
                  editable={true}
                  multiline={true}
                  style={{
                    paddingLeft: 10,
                    paddingRight: 30,
                    color: "black",
                    fontSize: 15,
                    textAlignVertical: "top"
                  }}
                  onChangeText={setDiagnosis}
                  value={diagnosis}
                  placeholder="any allergies that your healthcare provider should know about?"
                />
              </View>
            </View>
          </View>

        </View>

        <View style={{ height: 10 }} />

        <TouchableOpacity
          style={{ backgroundColor: '#3b5092', padding: 10, borderRadius: 10, marginVertical: 10, width: '90%', height: SCREEN_HEIGHT / 15, justifyContent: 'center' }}
          onPress={onSave}
          underlayColor='#FFFFFF'>
          <Text style={{ color: '#ffde59', fontSize: 18, textAlign: 'center' }}>SAVE</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />

      </ScrollView>
    </View>
  );
};

export default EditCareProfile;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFFFFF", paddingBottom: 10, paddingHorizontal: "6%",
    width: "100%", justifyContent: "center", alignItems: "center", paddingTop: 30
  },
  selectorContainer: {
    width: '100%', flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', borderWidth: 1, borderColor: 'lightgray',
    borderRadius: 10, marginTop: -6
  },
  dropdownContainer: {
    backgroundColor: '#F9FCFF', position: 'absolute', width: '118.5%',
    top: '80%', left: '-18%', borderWidth: 1,
    paddingHorizontal: 10, borderColor: 'lightgray'
  }
});
