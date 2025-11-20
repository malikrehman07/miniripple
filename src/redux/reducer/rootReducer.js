import { combineReducers } from "redux";
import propertyReducer from "../slices/propertySlice";
import userProfileReducer from "../slices/userProfileSlice";
import userManagementReducer from "../slices/userManagementSlice";
import ticketsReducer from "../slices/ticketsSlice";

const rootReducer = combineReducers({
  property: propertyReducer,
  userProfile: userProfileReducer,
  userManagement: userManagementReducer,
  tickets: ticketsReducer,
});

export default rootReducer;
