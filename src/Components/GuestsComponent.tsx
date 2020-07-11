import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  Image,
} from 'react-native';

const {width} = Dimensions.get('window');

function GuestData(props: any) {
  return (
    <View style={styles.carContainer}>
      <Image source={require('../Assets/car.png')} style={styles.img} />
      <View style={{marginLeft: 50}}>
        <Text style={styles.heading}>Car Number</Text>
        <Text style={styles.numberText}>{props.item.car_number}</Text>
      </View>
    </View>
  );
}

function GuestsComponent(props: any) {
  console.log(props.guests);
  return (
    <View style={styles.container}>
      <FlatList
        data={props.guests}
        renderItem={({item}) => {
          return <GuestData item={item} />;
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export default GuestsComponent;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
  },
  carContainer: {
    width: width - 60,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 5,
    elevation: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 40,
  },
  heading: {
    color: 'gray',
  },
  numberText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 22,
  },
  img: {
    width: 80,
    height: 40,
    position: 'absolute',
    left: -40,
    transform: [{rotateY: '180deg'}],
  },
});
