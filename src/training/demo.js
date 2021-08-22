import { createStore } from 'redux';
import { status, sort } from './actions/index';
import myReducer from './reducers/index';

const store = createStore(myReducer);

console.log('DEFAULT : ', store.getState());

//Thay doi status
store.dispatch(status());
console.log('TOGGLE_STATUS : ', store.getState());

//Thay doi sap xep
store.dispatch(sort({
    by: 'name',
    value: -1
}));

console.log('SORT : ', store.getState());
