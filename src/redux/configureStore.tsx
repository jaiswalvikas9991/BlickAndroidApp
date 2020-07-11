import {createStore, combineReducers} from 'redux';
import {Members} from './members';
import {Guests} from './guests';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      members: Members,
      guests: Guests,
    }),
  );
  return store;
};
