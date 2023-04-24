import {legacy_createStore as createStore} from "redux";
import {reducer} from "./Reducer";

export let store=createStore(reducer);