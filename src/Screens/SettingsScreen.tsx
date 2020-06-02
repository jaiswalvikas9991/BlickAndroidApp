import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {secondarColor} from '../Constants/Theme';
import HeaderComponent from '../Components/HeaderComponent';

const SettingsScreen = (props: any): JSX.Element => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={secondarColor} />
      <HeaderComponent navigation={props.navigation} header={'Settings'} />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
