import {MEMBERS} from '../shared/members';
import * as ActionTypes from './ActionTypes';

// export const initialState = {
//   members: MEMBERS,
// };

export const Members = (state = MEMBERS, action: {type: any; payload: any}) => {
  switch (action.type) {
    case ActionTypes.ADD_MEMBER:
      var member = action.payload;
      console.log(member.data);
      return state.concat(member.data);
    default:
      return state;
  }
};
