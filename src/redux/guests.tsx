import {GUESTS} from '../shared/guests';
import * as ActionTypes from './ActionTypes';

// export const initialState = {
//   members: MEMBERS,
// };

export const Guests = (state = GUESTS, action: {type: any; payload: any}) => {
  switch (action.type) {
    case ActionTypes.ADD_GUEST:
      var guest = action.payload;
      return state.concat(guest.data);
    default:
      return state;
  }
};
