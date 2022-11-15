import {View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HeaderButtons() {

    const navigation = useNavigation()

    const ToAbout = () => {
        navigation.navigate('profile-about')
    }

    const ToCare = () => {
        navigation.navigate('profile-care')
    }

    const ToBilling = () => {
        navigation.navigate('profile-payment')
    }
    return(
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={ToAbout}>
                <Text style={{color:'#4BC9FE', fontWeight: 'bold'}}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.carebutton} onPress={ToCare}>
                <Text style={{color:'#4BC9FE', fontWeight: 'bold'}}>Care Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={ToBilling}>
                <Text style={{color:'#4BC9FE', fontWeight: 'bold'}}>Billing</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 30,
        flexDirection: 'row',
        left: 17.5
    },
    carebutton: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 18,
        marginHorizontal: 5,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#FFFFFF',
    },

    button: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#FFFFFF',
    }
})