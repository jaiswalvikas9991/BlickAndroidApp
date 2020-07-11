import * as ActionTypes from './ActionTypes';

export const addMember = (data: Object) => ({
  type: ActionTypes.ADD_MEMBER,
  payload: {
    data: data,
  },
});

export const addGuest = (data: Object) => ({
  type: ActionTypes.ADD_GUEST,
  payload: {
    data: data,
  },
});
