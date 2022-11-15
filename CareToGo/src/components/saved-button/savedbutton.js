import { StyleSheet, View, Image } from 'react-native';

const Saved = () =>  {
    return (
        <View>
            <Image source = {require('../../../assets/homespage/savedContractors.png')} style={styles.button}/>
        </View>
    )
}

export default Saved;

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 5,
        height: 20,
        width: 20
    }
})