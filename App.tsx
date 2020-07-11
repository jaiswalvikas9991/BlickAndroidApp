import React from 'react';
import {View, StyleSheet} from 'react-native';
import MainStackNavigator from './src/Config/MainStackNavigator';
import {Provider} from 'react-redux';
import {ConfigureStore} from './src/redux/configureStore';

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <MainStackNavigator />
      </View>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
