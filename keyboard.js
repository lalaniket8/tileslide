var keydownCallback = undefined;

setKeyDownCallback = function(f){
	keydownCallback = f;
};

$(document).keydown(function(e){
	keydownCallback(e);
});