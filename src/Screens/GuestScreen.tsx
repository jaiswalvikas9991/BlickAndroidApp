import React, {useState, useEffect, Dispatch} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {primaryColor} from '../Constants/Theme';
import HeaderComponent from '../Components/HeaderComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddGuestComponent from '../Components/AddGuestComponent';
import DataModel from '../DataModel/DataModel';
import GuestsComponent from '../Components/GuestsComponent';
import {connect} from 'react-redux';
import {addGuest} from '../redux/ActionCreators';
import {AnyAction} from 'redux';

const mapStateToProps = (state: {guests: any}) => {
  const {guests} = state;
  return {guests};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  addGuest: (data: Object) => dispatch(addGuest(data)),
});

const GuestScreen = (props: any): JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false);
  // const [guests, setGuests] = useState([]);

  const openAddGuestModal = (): void => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    const dataModel = new DataModel();
    dataModel
      .getGuests()
      .then((response) => {
        props.addGuest(response.data.user.guests);
      })
      .catch(() => {
        console.log('Server Error');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={primaryColor} />
      <HeaderComponent navigation={props.navigation} header={'Guests'} />

      <GuestsComponent guests={props.guests} />

      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={openAddGuestModal}>
          <AddGuestComponent
            closeModal={setModalVisible}
            addGuest={props.addGuest}
          />
        </Modal>
      )}

      <TouchableOpacity style={styles.btn} onPress={openAddGuestModal}>
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestScreen);

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
