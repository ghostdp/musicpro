
function getSessionStorage(key){
	return window.sessionStorage.getItem(key);
}

function setSessionStorage(key,value){
	window.sessionStorage.setItem(key,value);
}

export {
	getSessionStorage,
	setSessionStorage
}