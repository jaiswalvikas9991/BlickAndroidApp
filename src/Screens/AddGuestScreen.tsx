import React from 'react';
import {View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {primaryColor, secondarColor} from '../Constants/Theme';
import HeaderComponent from '../Components/HeaderComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddGuestScreen = (props: any): JSX.Element => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={secondarColor} />
      <HeaderComponent navigation={props.navigation} header={'Add Guest'} />
      <TouchableOpacity style={styles.btn}>
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default AddGuestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    position: 'absolute',
    bottom: 40,
    right: 40,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
});
