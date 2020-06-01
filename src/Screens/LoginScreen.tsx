import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {primaryColor, secondarColor} from '../Constants/Theme';

const {width} = Dimensions.get('window');

const LoginScreen = (): JSX.Element => {
  const [iconName, setIconName] = useState('ios-eye-off');
  const [showPassword, setShowPassword] = useState(true);

  const showPasswordFunc = (): void => {
    if (iconName === 'ios-eye') {
      setIconName('ios-eye-off');
      setShowPassword(true);
    } else {
      setIconName('ios-eye');
      setShowPassword(false);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={primaryColor} barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image style={styles.logo} source={require('../Assets/car.png')} />
          {/* <Text style={styles.logoText}>Parking</Text> */}
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <Image style={styles.image} source={require('../Assets/login.jpg')} />
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Icon name="ios-person" size={20} color="#007f7f" />
          <TextInput
            placeholder="Enter email address..."
            placeholderTextColor="gray"
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="ios-key" size={20} color="#007f7f" />
          <TextInput
            placeholder="Enter password..."
            placeholderTextColor="gray"
            style={styles.input}
            secureTextEntry={showPassword}
          />
          <TouchableOpacity onPress={showPasswordFunc}>
            <Icon name={iconName} size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn2}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.options}>
          <TouchableOpacity>
            <Text style={styles.text}>Remember Me</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    padding: 10,
    backgroundColor: primaryColor,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    height: 40,
    width: 80,
    transform: [{rotateY: '180deg'}],
  },
  logoText: {
    fontSize: 22,
    color: secondarColor,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  btn: {
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: secondarColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
  },
  btnText: {
    color: '#fff',
  },
  image: {
    width: width - 40,
    height: width - 40,
    alignSelf: 'center',
    marginTop: 30,
  },
  formContainer: {
    width: '90%',
    // backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    alignSelf: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginTop: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    height: 45,
    width: '100%',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: secondarColor,
    padding: 10,
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 15,
  },
  input: {
    color: '#fff',
    fontSize: 15,
    height: 40,
    paddingLeft: 15,
    width: '85%',
  },
  btn2: {
    width: '100%',
    height: 40,
    backgroundColor: secondarColor,
    borderRadius: 15,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  loginText: {
    color: '#fff',
    fontSize: 17,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  text: {
    color: secondarColor,
    marginTop: 5,
  },
});
