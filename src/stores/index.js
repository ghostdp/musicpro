import { createStore , combineReducers } from 'redux';

function headerArrowReducer(state=false,action){
	if( action.type === 'HEADERARROW_CHANGE' ){
		return action.payload;
	}
	else{
		return state;
	}
}

var reducers = combineReducers({
	headerArrow : headerArrowReducer
});

var store = createStore(reducers , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

export default store;


