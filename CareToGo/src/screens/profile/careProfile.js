import React, {useState} from 'react';
import {Text, View, ScrollView, StyleSheet, TouchableOpacity, Image} from 'react-native';
import CareComponent from './profile-screen-components/care/careComponent';
import EditCare from './profile-screen-components/care/editCare';
export default function CareProfile() {

    const [editCare, setEditCare] = useState(false)

    const setEditTrue = () => {
        setEditCare(true)
    }

    const setEditFalse = () => {
        setEditCare(false)
    }

    if(editCare) {
        return (
            <View style={styles.container}>
                <EditCare setEditFalse={setEditFalse} />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <CareComponent />
                <TouchableOpacity style={styles.buttonContainer} onPress={setEditTrue}>
                    <Text>Edit Care Profile</Text>
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
        bottom: 70,
        left: 120
    },
})