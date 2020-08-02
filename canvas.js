var Context = {
	context : null,
	canvas : null,
	create : function(elementId){
		this.canvas = document.getElementById(elementId);
		this.context = this.canvas.getContext('2d');
		this.canvas.width = CANVAS_WIDTH;
		this.canvas.height = CANVAS_HEIGHT;
	}
};


