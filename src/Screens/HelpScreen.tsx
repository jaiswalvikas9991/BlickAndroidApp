import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {secondaryColor} from '../Constants/Theme';
import HeaderComponent from '../Components/HeaderComponent';

const HelpScreen = (props: any): JSX.Element => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={secondaryColor} />
      <HeaderComponent navigation={props.navigation} header={'Help'} />
    </View>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
