import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {
  primaryColor,
  secondaryColor,
  baseURL,
  authKey,
} from '../Constants/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';

const {width} = Dimensions.get('window');

const AddGuestComponent = (props: any): JSX.Element => {
  const [carNumber, setCarNumber] = useState('');
  const [spinner, setSpinner] = useState(false);

  const addGuestHelper = async () => {
    setSpinner(true);
    // console.log(await AsyncStorage.getItem(authKey));
    await addGuest();
    setSpinner(false);
  };

  const addGuest = async (): Promise<void> => {
    const data: {car_number: string} = {
      car_number: carNumber,
    };

    try {
      const response = await fetch(`${baseURL}/user/add_guest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await AsyncStorage.getItem(authKey)}`,
        },
        body: JSON.stringify(data),
      });
      var json = await response.json();

      if (json.status !== 200) {
        return;
      } else {
        props.addGuest(data);
        props.closeModal(false);
      }
    } catch (error) {
      console.log('This is error');
      console.log(error);
      Alert.alert('Server Error');
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={spinner}
        //Text with the Spinner
        textContent={'Loading...'}
        //Text style of the Spinner Text
        textStyle={{color: primaryColor}}
      />
      <View style={styles.header}>
        <Text style={styles.heading}>Add Guest</Text>
        <Icon
          name="close"
          size={25}
          color="#ff0000"
          onPress={() => props.closeModal(false)}
        />
      </View>
      <TextInput
        value={carNumber}
        placeholder="Enter car number.."
        placeholderTextColor="gray"
        onChangeText={(text) => setCarNumber(text)}
        style={styles.input}
      />
      <TouchableOpacity style={styles.btn} onPress={addGuestHelper}>
        <Text style={styles.btnText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddGuestComponent;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: width,
    elevation: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 45,
    width: '100%',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: secondaryColor,
    padding: 10,
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 15,
  },
  btn: {
    width: '100%',
    height: 40,
    backgroundColor: secondaryColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    elevation: 10,
    marginBottom: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 17,
  },
});
