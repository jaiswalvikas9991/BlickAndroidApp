import {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {baseURL, authKey} from '../Constants/Theme';

class DataModel extends Component {
  constructor(props: any) {
    super(props);
  }

  getBuildingInfo = async () => {
    const query = {
      query: '{ buildingInfo { address } }',
    };
    const response = await fetch(`${baseURL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await AsyncStorage.getItem(authKey)}`,
      },
      body: JSON.stringify(query),
    });
    // console.log(response);
    return response.json();
  };

  getGuests = async () => {
    const query = {
      query: '{ user { guests { car_number } } }',
    };
    const response = await fetch(`${baseURL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await AsyncStorage.getItem(authKey)}`,
      },
      body: JSON.stringify(query),
    });
    return response.json();
  };
}

export default DataModel;
