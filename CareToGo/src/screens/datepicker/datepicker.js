import React, { useState, useRef, useMemo, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Pressable } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { useNavigation } from '@react-navigation/native';
import {CardForm } from "@stripe/stripe-react-native";
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet'

const Datepicker = () => {
    const [selectedDay, setSelectedDay] = useState('')
    const [selectedMonth, setSelectedMonth] = useState('')

    const navigation = useNavigation()

    const sheetRef = useRef(null)
    const snapPoints = useMemo(() => ["50%"], []);

    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
      }, []);
      const handleSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
      }, []);
      const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
      }, []);
    
      const scheduleOrder = () =>  {
        console.warn('Send selected date to provider')
      }

    return (
        <View style={styles.mainContainer}>
            <Calendar
                onDayPress={(e) => {
                    setSelectedDay(e.day)
                    setSelectedMonth(e.month)
                }}
            />

            <View style = {styles.date}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>{selectedMonth} - {selectedDay} : Available Times</Text>
            </View> 
            <TouchableOpacity style={styles.button} onPress={() => handleSnapPress(0)}> 
                    <Text style={{fontWeight: 'bold', fontSize: 20, color:'#FFDE59'}}>Select Timings</Text>
            </TouchableOpacity>

            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
            >
                <BottomSheetView>
                    <View style={styles.name}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Your First Name"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Your Last Name"
                    />
                    </View>
                    <CardForm
                        onFormComplete={(cardDetails) => {
                        console.log('card details', cardDetails);
                        setCard(cardDetails);
                    }}
                    style={{height: 200, marginHorizontal: 10, top: 10}}
                    />
                    <View style={styles.buttonContainer}>
                    <Pressable onPress={scheduleOrder} style={styles.scheduleOrder}>
                        <Text style={{fontWeight: 'bold', fontSize: 17, color:'#FFDE59', textAlign: 'center'}}>Place Order</Text>
                    </Pressable>
                    <Pressable onPress={() => handleClosePress()} style={styles.close}>
                        <Text style={{fontWeight: 'bold', fontSize: 17, color:'#FFFFFF', textAlign: 'center'}}>Close</Text>
                    </Pressable>
                    </View>
                </BottomSheetView> 
            </BottomSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },

    date: {
        left: 30,
        top: 20
    },

    button: {
        top: 280,
        left: 80,
        alignItems:'center',
        backgroundColor: '#001A72',
        width: '60%',
        paddingVertical: 10,
        borderRadius: 20
    },
    name: {
        flexDirection: 'row'
      },
    input: {
        height: 40,
        width: '44%',
        marginHorizontal: 12,
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 10,
        marginTop: 20
      },
    buttonContainer: {
        flexDirection: 'row',
        marginLeft: 20
      },
    scheduleOrder: {
        backgroundColor: '#001A72',
        width: '55%',
        borderRadius: 20,
        paddingVertical: 20
      },
    close: {
        backgroundColor: '#000000',
        width: '35%',
        borderRadius: 20,
        paddingVertical: 20,
        marginLeft: 15
      }
})

export default Datepicker;