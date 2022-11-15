import { StyleSheet, View, Image} from 'react-native';
import App from '../../../App';

const AppointButton = () => {
    return (
        <View>
            <Image source = {require('../../../assets/homespage/appointments.png')} style={styles.button}/>
        </View>
    )
}

export default AppointButton;

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 15,    }
})