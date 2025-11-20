// src/redux/reducers/propertyReducer.js

import { SET_PROPERTY_DATA } from "../actions/propertyActions";

const initialState = {
  _id: null,
  propertyId: null,
  domain: null,
  propertyName: null,
  user: null,
  status: null,
};

const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROPERTY_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default propertyReducer;
