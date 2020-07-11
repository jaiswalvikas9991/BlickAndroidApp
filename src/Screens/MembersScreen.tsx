import React, {Dispatch, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import {primaryColor, secondaryColor} from '../Constants/Theme';
import HeaderComponent from '../Components/HeaderComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {addMember} from '../redux/ActionCreators';
import {AnyAction} from 'redux';

const mapStateToProps = (state: {members: any}) => {
  const {members} = state;
  return {members};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  addMember: (data: Object) => dispatch(addMember(data)),
});

const MembersScreen = (props: any): JSX.Element => {
  console.log('members = ==== ', props.members);

  useEffect(() => {
    const data = [
      {
        id: '6',
        name: 'a',
        age: '10',
      },
      {
        id: '7',
        name: 'b',
        age: '12',
      },
      {
        id: '8',
        name: 'c',
        age: '14',
      },
    ];
    props.addMember(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={secondaryColor} />
      <HeaderComponent navigation={props.navigation} header={'Members'} />

      <FlatList
        data={props.members}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return <Text>{item.name}</Text>;
        }}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          props.addMember([{id: '9', name: 'saurabh', age: '22'}])
        }>
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(MembersScreen);
