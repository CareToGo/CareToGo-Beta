import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import EditPayments from './profile-screen-components/payment/editPayment';
import PaymentComponent from './profile-screen-components/payment/paymentComponent';
 

export default function ProfilePayment() {
    
    const [paymentsEdited, setPaymentsEdited] = useState(false)

    const setToTrue = () => {
        setPaymentsEdited(true)
    }

    const setToFalse = () => {
        setPaymentsEdited(false)
    }

    if (paymentsEdited) {
        return (
            <EditPayments setToFalse={setToFalse} />
        )
    } else {
        return (
            <View style={styles.container}>
                <PaymentComponent />
                <TouchableOpacity style={styles.buttonContainer} onPress={setToTrue}>
                    <Text>Edit Profile</Text>
                </TouchableOpacity> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonContainer: {
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#C4C4C4',
        left: 120,
        top: 50
    },
})