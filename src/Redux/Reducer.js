import { combineReducers } from "redux";
import { actionType } from "./Action";

const initialState = {
  currentUser:[],
  products: [],
  product:[],
  categories:[],
  fastDelivery : false,
  searchText : "",
  setCategory:"" 
};

function productReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actionType.CURRENT_USER:
      return { ...state, currentUser: payload };
    case actionType.SET_PRODUCT:
      return { ...state, products: payload };
    case actionType.SELECT_PRODUCT:
      return { ...state, product: payload };
    case actionType.CATEGORIES:
      return { ...state, categories: payload };
    case actionType.SET_CATEGORY:
      return { ...state, setCategory: payload };
    case actionType.FAST_DELIVERY:
      return {...state, fastDelivery:payload};
    case actionType.SEARCH_TEXT:
      return {...state, searchText:payload};

    default:
        return state;
  }
}

export let reducer = combineReducers({ allProducts: productReducer });
