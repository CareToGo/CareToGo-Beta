import {View, StyleSheet, Text} from 'react-native';
import AppointmentComp from '../../components/appointmentComp/appointmentComp';

export default function Appointments() {
    return (
        <View style={styles.container}>
            <AppointmentComp />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    appointmentContainer: {
        backgroundColor: '#EFECEC',
        height: '100%'
    }
})