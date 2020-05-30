import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import LoginComponent from './App/Components/LoginComponent';

function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <LoginComponent />
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
