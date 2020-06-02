import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import {secondarColor} from '../Constants/Theme';
import HeaderComponent from '../Components/HeaderComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

const HomeScreen = (props: any): JSX.Element => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={secondarColor} />
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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </Text>
          <View style={[styles.heading, {marginTop: 3}]}>
            <Icon name="home" size={20} />
            <Text style={styles.value}>Flat No : </Text>
            <Text style={styles.address}>29</Text>
          </View>
          <View style={[styles.heading, {marginTop: 3}]}>
            <Icon name="account" size={20} />
            <Text style={styles.value}>Guests : </Text>
            <Text style={styles.address}>9</Text>
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
    color: secondarColor,
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
    color: secondarColor,
    marginLeft: 10,
  },
  img: {
    height: 100,
    width: 100,
  },
});
