import {View, StyleSheet, Text, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderButtons from '../../profile-header-buttons/HeaderButtons'
export default function CareComponent() {

    const navigation = useNavigation()

    const ToSupport = () => {
        navigation.navigate('support')
    }

    return (
        <ScrollView style={styles.container}>
            <HeaderButtons />

            <View style={styles.activities}>
                <View style={styles.activitesTitle}>
                    <Text style={{fontWeight: 'bold', fontSize: 15, top: 30, left: 80}}>Activites of Daily Living</Text>
                </View>
                <View style={{flexDirection: 'row', top: 50, left: 60}}>
                    <Text>MOBILITY:</Text>
                    <Text style={{left: 50}}>Indpenedent</Text>
                </View>

                <View style={{flexDirection: 'row', top: 90, left: 60}}>
                    <Text>MOBILITY:</Text>
                    <Text style={{left: 50}}>Indpenedent</Text>
                </View>

                <View style={{flexDirection: 'row', top: 130, left: 60}}>
                    <Text>MOBILITY:</Text>
                    <Text style={{left: 50}}>Indpenedent</Text>
                </View>
            </View>

            <View style={styles.needs}>
                <View style={styles.needsTitle}>
                    <Text style={{fontWeight: 'bold', fontSize: 15, top: 30, left: 120}}>Care Needs</Text>
                </View>
                <View style={{flexDirection: 'row', top: 50, left: 60}}>
                    <Text>MOBILITY:</Text>
                    <Text style={{left: 50}}>Indpenedent</Text>
                </View>

                <View style={{flexDirection: 'row', top: 90, left: 60}}>
                    <Text>MOBILITY:</Text>
                    <Text style={{left: 50}}>Indpenedent</Text>
                </View>

                <View style={{flexDirection: 'row', top: 130, left: 60}}>
                    <Text>MOBILITY:</Text>
                    <Text style={{left: 50}}>Indpenedent</Text>
                </View>
                
            </View>
                <TouchableOpacity style={styles.support} onPress={ToSupport}>
                    <Text>Support</Text>
                </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    
    activities: {
        backgroundColor: 'white',
        width: '80%',
        height: '80%',
        borderRadius: 40,
        top: 50,
        left: 45,
    },
    needs: {
        backgroundColor: '#D1D9E6',
        width: '80%',
        height: '80%',
        borderRadius: 40,
        marginTop: 80,
        left: 45,
    },
    editProfile: {
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#C4C4C4',
        marginTop: 30,
        left: 85
    },

    support: {
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: '#C4C4C4',
        marginTop: 20,
        left: 85
    }
})