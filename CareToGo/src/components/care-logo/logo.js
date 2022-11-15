import { StyleSheet, Text, View, Image} from 'react-native';

const Logo = () => {
    return (
        <View style={styles.logoContainer}>
            <Image source={require('../../../assets/homespage/c2g.png')} style={styles.logo}/>
        </View>
    )
}

export default Logo;

const styles = StyleSheet.create({
    logo: {
        height: 130,
        width: 130,
    },
})