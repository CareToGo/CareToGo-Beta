import {Text, View, StyleSheet} from 'react-native';
import HeaderButtons from './profile-header-buttons/HeaderButtons';

export default function Support() {
    return(
        <View style={styles.container}>
            <Text style={{fontWeight: 'bold'}}>Chat engine goes here</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})