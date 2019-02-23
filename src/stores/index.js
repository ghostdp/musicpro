import { createStore , combineReducers } from 'redux';

function headerArrowReducer(state=false,action){
	if( action.type === 'HEADERARROW_CHANGE' ){
		return action.payload;
	}
	else{
		return state;
	}
}
function musicNameIdReducer(state='',action){
	if( action.type === "MUSICNAMEID_CHANGE" ){
		return action.payload;
	}
	else{
		return state;
	}
}

function isMusicPlayReducer(state=false,action){
	if( action.type === "ISMUSICPLAY_CHANGE" ){
		return action.payload;
	}
	else{
		return state;
	}
}

function musicNameReducer(state='巅峰榜 · 热歌',action){
	if( action.type === 'MUSICNAME_CHANGE' ){
		return action.payload;
	}
	else{
		return state;
	}
}

var reducers = combineReducers({
	headerArrow : headerArrowReducer,
	musicNameId : musicNameIdReducer,
	isMusicPlay : isMusicPlayReducer,
	musicName : musicNameReducer
});

var store = createStore(reducers , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

export default store;


