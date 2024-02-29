import { combineReducers } from "redux";
import AuthReducer from "./auth";
import DashboardReducer from "./dashboard";
import UserReducer from "./user";
import RoleReducer from "./role";
import CategoryReducer from "./category";
import ProductReducer from "./product";
import TransactionReducer from "./transaction";
import BankReducer from "./bank";
import FileReducer from "./file";
import ReplicateReducer from "./replicate";

export default combineReducers({
  AuthReducer,
  DashboardReducer,
  UserReducer,
  RoleReducer,
  CategoryReducer,
  ProductReducer,
  TransactionReducer,
  BankReducer,
  FileReducer,
  ReplicateReducer,
});
