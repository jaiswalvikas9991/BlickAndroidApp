import React from 'react';
import {View, StyleSheet} from 'react-native';
import MainStackNavigator from './src/Config/MainStackNavigator';

function App() {
  return (
    <View style={styles.container}>
      <MainStackNavigator />
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
