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
import Icon from 'react-native-vector-icons/Ionicons';
import {
  primaryColor,
  secondaryColor,
  baseURL,
  authKey,
} from '../Constants/Theme';
import AsyncStorage from '@react-native-community/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';

const {width} = Dimensions.get('window');

const RegistrationScreen = (props: any): JSX.Element => {
  const [iconName, setIconName] = useState('ios-eye-off');
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [flatNo, setFlatNo] = useState('');
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

  const navigaateToLogin = (): void => {
    props.navigation.goBack();
  };

  const validateEmail = (email_: string): boolean => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email_).toLowerCase());
  };

  const signUpHelper = async () => {
    setSpinner(true);
    await register();
    setSpinner(false);
  };

  const register = async (): Promise<void> => {
    if (!validateEmail(email)) {
      console.log('Not a valid email');
      Alert.alert('Not a valid email');
      return;
    }
    if (password.length < 5) {
      console.log('Not a valid password');
      Alert.alert('Password Must of atleast of length 5');
      return;
    }
    if (address.length <= 0) {
      console.log('Building Id must not be empty');
      Alert.alert('Building Id must not be empty');
      return;
    }
    if (flatNo.length < 0) {
      console.log('Flat Number must not be empty');
      Alert.alert('Flat Number must not be empty');
      return;
    }
    const data = {
      email: email,
      password: password,
      building_id: address,
      flat_id: flatNo,
    };
    console.log(JSON.stringify(data));
    try {
      const response = await fetch(`${baseURL}/auth/user_signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      var json = await response.json();
      if (json.status !== 200) {
        throw new Error(json.errors);
      }
      await AsyncStorage.setItem(authKey, json.data[0].token);
      console.log(json);
    } catch (error) {
      console.log(JSON.stringify(error));
      Alert.alert(error.message);
      return;
    }
    props.navigation.navigate('Drawer', {
      user_data: {
        user_name: json.data[0].user_name,
        building_id: json.data[0].building_id,
        flat_id: json.data[0].flat_id,
      },
    });
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
          <View style={styles.headerTop}>
            <Text style={styles.logoText}>Blick</Text>
            <TouchableOpacity style={styles.btn} onPress={navigaateToLogin}>
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
          </View>
          <Image style={styles.logo} source={require('../Assets/car.png')} />
        </View>
        <Text style={styles.signUp}>Sign Up</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Icon name="ios-locate" size={20} color="#007f7f" />
            <TextInput
              placeholder="Enter building Id..."
              placeholderTextColor="gray"
              style={styles.input}
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="ios-home" size={20} color="#007f7f" />
            <TextInput
              placeholder="Enter flat no..."
              placeholderTextColor="gray"
              style={styles.input}
              value={flatNo}
              onChangeText={(text) => setFlatNo(text)}
            />
          </View>
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
          <TouchableOpacity style={styles.btn2} onPress={signUpHelper}>
            <Text style={styles.RegistrationText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 300,
    padding: 10,
    backgroundColor: primaryColor,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 20,
  },
  headerTop: {
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 0,
    width: width,
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    height: width - 250,
    width: width - 60,
    transform: [{rotateY: '180deg'}],
    marginBottom: 20,
  },
  logoText: {
    fontSize: 22,
    color: '#fff',
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
    alignSelf: 'flex-end',
  },
  btnText: {
    color: '#fff',
  },
  signUp: {
    fontSize: 28,
    color: secondaryColor,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
  },
  formContainer: {
    width: '90%',
    padding: 10,
    alignSelf: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginTop: 10,
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
  RegistrationText: {
    color: '#fff',
    fontSize: 17,
  },
});
