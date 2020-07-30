var sprite = function(filename, isPattern){
	this.image = null;
	this.pattern = null;
	this.TO_RADIAN = Math.PI/180;

	if(filename != undefined && filename != null && filename != ""){
		this.image = new Image();
		this.image.src = filename;
		this.image.addEventListener("load",function(){
			console.log('Image:'+filename+' loaded.');
		});
		this.image.addEventListener("error",function(){
			console.log('Image:'+filename+' could not be loaded.');
		});
	if(isPattern){
		this.pattern = Context.context.createPattern(this.image,'repeat');
	}
	}else{
		console.log("sprite image not loaded, filename:"+filename);
	}

this.draw = function(x,y,w,h){
	if(this.pattern != null){
		Context.context.fillStyle = this.pattern;
		Context.context.fillRect(x,y,w,h);
	}else{
		if(w == undefined || h == undefined){
			Context.context.drawImage(this.image,x,y,this.image.width,this.image.height);
		}else{
			Context.context.drawImage(this.image,x,y,w,h);
		}
	}
};

this.rotate = function(x,y,angle){
	
	//save context
	Context.context.save();
	//move the context to the coords of picture
	Context.context.translate(x,y);
	//rotate context
	Context.context.rotate(angle * this.TO_RADIAN);
	//Draw image on the context such that center of the image is at the origin
	Context.context.drawImage(this.image,-(this.image.width/2),-(this.image.height/2));
	//reverse translation and rotation
	Context.context.restore();
};

};