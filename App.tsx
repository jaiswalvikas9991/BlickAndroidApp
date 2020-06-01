import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import LoginScreen from './src/Screens/LoginScreen';

function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <LoginScreen />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
