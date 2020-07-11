/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  Text,
  Alert,
} from 'react-native';
import {secondaryColor} from '../Constants/Theme';
import HeaderComponent from '../Components/HeaderComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DataModel from '../DataModel/DataModel';

const {width} = Dimensions.get('window');

const HomeScreen = (props: any): JSX.Element => {
  // console.log(JSON.stringify(props));
  const [address, setAddress] = useState('');
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const dataModel = new DataModel({});
    dataModel
      .getBuildingInfo()
      .then((response: any) => {
        console.log(response.data.buildingInfo);
        setAddress(response.data.buildingInfo.address);
      })
      .catch((error: {message: string}) => {
        Alert.alert(error.message);
      });

    dataModel
      .getGuests()
      .then((response: any) => {
        setGuests(response.data.user.guests);
      })
      .catch(() => {
        Alert.alert('Server Error');
      });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={secondaryColor} />
      <HeaderComponent navigation={props.navigation} header={'Home'} />

      <View style={styles.homeContainer}>
        <View style={styles.homeLeft}>
          <Image source={require('../Assets/house.png')} style={styles.img} />
          <View style={styles.homeBottom}>
            <Text style={styles.number}>9</Text>
            <Text style={styles.text}>Members</Text>
          </View>
        </View>
        <View style={styles.homeRight}>
          <View style={styles.heading}>
            <Icon name="map" size={18} />
            <Text style={styles.value}>Address</Text>
          </View>

          <Text style={styles.address} numberOfLines={3}>
            {address}
          </Text>
          <View style={[styles.heading, {marginTop: 3}]}>
            <Icon name="home" size={20} />
            <Text style={styles.value}>Flat No : </Text>
            <Text style={styles.address}>
              {props.route.params.params.flat_id}
            </Text>
          </View>
          <View style={[styles.heading, {marginTop: 3}]}>
            <Icon name="account" size={20} />
            <Text style={styles.value}>Guests : </Text>
            <Text style={styles.address}>{guests.length}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5',
  },
  homeContainer: {
    width: width - 30,
    alignSelf: 'center',
    marginTop: 20,
    height: 170,
    borderRadius: 10,
    elevation: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  homeLeft: {
    backgroundColor: '#fff',
    height: 170,
    padding: 10,
    paddingBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  number: {
    color: secondaryColor,
    fontSize: 20,
  },
  text: {
    color: 'gray',
    fontSize: 20,
    marginLeft: 10,
  },
  homeRight: {
    width: width - 180,
    height: '100%',
    backgroundColor: '#fff',
    borderLeftWidth: 0.5,
    borderLeftColor: '#99e0e0',
    padding: 5,
    paddingLeft: 10,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    fontSize: 17,
    marginLeft: 5,
  },
  value: {
    fontSize: 18,
    color: secondaryColor,
    marginLeft: 10,
  },
  img: {
    height: 100,
    width: 100,
  },
});
