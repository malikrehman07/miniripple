// src/redux/actions/propertyActions.js

export const SET_PROPERTY_DATA = "SET_PROPERTY_DATA";

export const setPropertyData = (propertyData) => ({
  type: SET_PROPERTY_DATA,
  payload: propertyData,
});
