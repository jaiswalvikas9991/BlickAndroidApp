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
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  primaryColor,
  secondaryColor,
  baseURL,
  authKey,
} from '../Constants/Theme';
import Spinner from 'react-native-loading-spinner-overlay';
import {ScrollView} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

const LoginScreen = (props: any): JSX.Element => {
  const [iconName, setIconName] = useState('ios-eye-off');
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [spinner, setSpinner] = useState(false);

  const showPasswordFunc = (): void => {
    if (iconName === 'ios-eye') {
      setIconName('ios-eye-off');
      setShowPassword(true);
    } else {
      setIconName('ios-eye');
      setShowPassword(false);
    }
  };

  const validateEmail = (email_: string): boolean => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email_).toLowerCase());
  };

  const loginHelper = async () => {
    setSpinner(true);
    await login();
    setSpinner(false);
  };

  const login = async (): Promise<void> => {
    if (!validateEmail(email)) {
      console.log('Not a valid email');
      Alert.alert('Not a valid email');
      return;
    }
    if (password.length < 5) {
      console.log('Not a valid password');
      Alert.alert('Password must be greater than length 5');
      return;
    }
    const data: {email: string; password: string} = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch(`${baseURL}auth/user_login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      var json = await response.json();
      //console.log(json);
      if (json.status !== 200) {
        return;
      }
      await AsyncStorage.setItem(authKey, json.data[0].token);
    } catch (error) {
      console.log('This is error');
      console.log(error);
      Alert.alert('Server Error');
      return;
    }
    props.navigation.navigate('Drawer', {
      user_data: {
        user_name: json.data[0].user_name,
        building_id: json.data[0].building_id,
        flat_id: json.data[0].flat_id,
      },
    });
    console.log(await AsyncStorage.getItem(authKey));
    console.log(json.data[0].user_name);
  };

  const navigateToRegister = (): void => {
    props.navigation.navigate('Register');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={spinner}
          //Text with the Spinner
          textContent={'Loading...'}
          //Text style of the Spinner Text
          textStyle={{color: primaryColor}}
        />
        <StatusBar backgroundColor={primaryColor} barStyle="light-content" />
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image style={styles.logo} source={require('../Assets/car.png')} />
            {/* <Text style={styles.logoText}>Parking</Text> */}
          </View>
          <TouchableOpacity style={styles.btn} onPress={navigateToRegister}>
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
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="ios-key" size={20} color="#007f7f" />
            <TextInput
              placeholder="Enter password..."
              placeholderTextColor="gray"
              style={styles.input}
              secureTextEntry={showPassword}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity onPress={showPasswordFunc}>
              <Icon name={iconName} size={20} color="#007f7f" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btn2} onPress={loginHelper}>
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
    </ScrollView>
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
    color: secondaryColor,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  btn: {
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: secondaryColor,
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
    borderColor: secondaryColor,
    padding: 10,
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 15,
  },
  input: {
    color: secondaryColor,
    fontSize: 15,
    height: 40,
    paddingLeft: 15,
    width: '85%',
  },
  btn2: {
    width: '100%',
    height: 40,
    backgroundColor: secondaryColor,
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
    color: secondaryColor,
    marginTop: 5,
  },
});
