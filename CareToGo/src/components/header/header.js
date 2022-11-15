import { StyleSheet, View} from 'react-native';
import Logo from '../care-logo/logo'
import Saved from '../saved-button/savedbutton';
import AppointButton from '../calender-button/appointmentButton';



export default function Header() {
  return (
    <View style={styles.container}>

      <View style={styles.tabContainer}>

        <View style={styles.logContainer}>
          <Logo/>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonBackground}>
            <Saved />
          </View>
          <View style={styles.buttonBackground}>
            <AppointButton />
          </View>
        </View>
      </View>    
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  logContainer: {
    position: 'absolute',
    right: 50
  },

  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 50,
    left: 30
  },

  buttonBackground: {
    backgroundColor: 'lightgray',
    width: 33,
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 10
  }
});
