var Context = {
	context : null,
	canvas : null,
	create : function(elementId){
		this.canvas = document.getElementById(elementId);
		this.context = this.canvas.getContext('2d');
	}
};