var Board = function(){
	this.tilemap = new Array(TILE_COUNT);
	this.maskSprite = new sprite('resources/images/mask.png',false);
	this.tileSprite = new sprite('resources/images/block.png',false);
	
	var tile_number = 1;
	for(var i=0; i<TILE_COUNT; i++){
		tile_number = i + 1;
		this.tilemap[i] = new Array(TILE_COUNT);
		for(var j=0; j<TILE_COUNT; j++){
			this.tilemap[i][j] = tile_number;//new tile(tile_number,i,j);
			tile_number = tile_number + TILE_COUNT;
		}
	}
	
	this.randomize = async function(animate){
		$('p').html('SHUFLING...');
		var ret = 0;
		for(var i=0; i<RANDOM_STEPS; i++){
			var move = Math.floor(Math.random() * 4);
			switch(move){
				case 0:
				ret = this.moveLeft(animate);
				break;
				case 1:
				ret = this.moveRight(animate);
				break;
				case 2:
				ret = this.moveUp(animate);
				break;
				case 3:
				ret = this.moveDown(animate);
				break;
				default:
			}
			if(ret != 0){
				i--;
			}else{
				if(animate){
					//this.drawBoard();
					await new Promise(resolve => setTimeout(resolve, ANIMATION_TIMEOUT));
				}
			}
		}
		$('p').html('');
	};
	
	this.drawTile = function(i,j){
		
		var tile_number_string = this.tilemap[i][j];
		if(this.tilemap[i][j] < 10){
			tile_number_string = '0'+tile_number_string;
		}
		
		var x = (BOARD_LEFT_OFFSET + (i * TILE_SIZE));
		var y = (BOARD_TOP_OFFSET + (j * TILE_SIZE));
		
		if(this.tilemap[i][j] != (TILE_COUNT * TILE_COUNT)){
			this.tileSprite.draw(x,y,TILE_SIZE ,TILE_SIZE);
			Context.context.fillStyle = 'black';
			Context.context.font = TILE_FONT;
			Context.context.fillText(tile_number_string, (x + (TILE_SIZE/2) - (TILE_SIZE/8)), (y + (TILE_SIZE/2) + (TILE_SIZE/18)));
		}else{
			this.maskSprite.draw(x,y,TILE_SIZE ,TILE_SIZE);
		}
	};
		
	this.drawBoard = function(){
		for(var i=0; i<TILE_COUNT; i++){
			for(var j=0; j<TILE_COUNT; j++){
				this.drawTile(i,j);
			}
		}
	};
	
	this.checkBoard = function(){
		for(var i=0; i<TILE_COUNT; i++){
			for(var j=0; j<TILE_COUNT; j++){
				if( ((i * TILE_COUNT) + j + 1) != this.tilemap[j][i]){return false;}
			}
		}
		return true;
	};
	
	this.moveLeft = function(animate){
		var ret = 0;
		var blankTile = undefined;
		var i = 0;
		var j = 0;
		for(i=0; i<TILE_COUNT; i++){
			for(j=0; j<TILE_COUNT; j++){
				if(this.tilemap[i][j] == (TILE_COUNT * TILE_COUNT)){blankTile = this.tilemap[i][j];break;}
			}
			if(blankTile){break;}
		}
		if(blankTile != undefined){
			//var i = blankTile.tile_x_in;
			//var j = blankTile.tile_y_in;
			if(i<TILE_COUNT-1){
				var temp_tile = this.tilemap[i][j];
				this.tilemap[i][j] = this.tilemap[i+1][j];
				//this.tilemap[i][j].tile_x_in = i;
				//this.tilemap[i][j].tile_x = (BOARD_LEFT_OFFSET + (this.tilemap[i][j].tile_x_in * TILE_SIZE));
				this.tilemap[i+1][j] = temp_tile;
				//this.tilemap[i+1][j].tile_x_in = i+1;
				//this.tilemap[i+1][j].tile_x = (BOARD_LEFT_OFFSET + (this.tilemap[i+1][j].tile_x_in * TILE_SIZE));
				if(animate){
					this.drawTile(i,j);
					this.drawTile(i+1,j);
				}
				
			}else{
				ret = 1;
			}
		}
		return ret;
	};
	this.moveRight = function(animate){
		var ret = 0;
		var blankTile = undefined;
		var i = 0;
		var j = 0;
		for(i=0; i<TILE_COUNT; i++){
			for(j=0; j<TILE_COUNT; j++){
				if(this.tilemap[i][j] == (TILE_COUNT * TILE_COUNT)){blankTile = this.tilemap[i][j];break;}
			}
			if(blankTile){break;}
		}
		if(blankTile != undefined){
			//var i = blankTile.tile_x_in;
			//var j = blankTile.tile_y_in;
			if(i>0){
				var temp_tile = this.tilemap[i][j];
				this.tilemap[i][j] = this.tilemap[i-1][j];
				//this.tilemap[i][j].tile_x_in = i;
				//this.tilemap[i][j].tile_x = (BOARD_LEFT_OFFSET + (this.tilemap[i][j].tile_x_in * TILE_SIZE));
				this.tilemap[i-1][j] = temp_tile;
				if(animate){
					this.drawTile(i,j);
					this.drawTile(i-1,j);
				}
			}else{
				ret = 1;
			}
		}
		return ret;
	};
	this.moveUp = function(animate){
		var ret = 0;
		var blankTile = undefined;
		for(i=0; i<TILE_COUNT; i++){
			for(j=0; j<TILE_COUNT; j++){
				if(this.tilemap[i][j] == (TILE_COUNT * TILE_COUNT)){blankTile = this.tilemap[i][j];break;}
			}
			if(blankTile){break;}
		}
		if(blankTile != undefined){
			//var i = blankTile.tile_x_in;
			//var j = blankTile.tile_y_in;
			if(j<TILE_COUNT-1){
				var temp_tile = this.tilemap[i][j];
				this.tilemap[i][j] = this.tilemap[i][j+1];
				//this.tilemap[i][j].tile_y_in = j;
				//this.tilemap[i][j].tile_y = (BOARD_TOP_OFFSET + (this.tilemap[i][j].tile_y_in * TILE_SIZE));
				this.tilemap[i][j+1] = temp_tile;
				if(animate){
					this.drawTile(i,j);
					this.drawTile(i,j+1);
				}
			}else{
				ret = 1;
			}
		}
		return ret;
	};
	this.moveDown = function(animate){
		var ret = 0;
		var blankTile = undefined;
		var i = 0;
		var j = 0;
		for(i=0; i<TILE_COUNT; i++){
			for(j=0; j<TILE_COUNT; j++){
				if(this.tilemap[i][j] == (TILE_COUNT * TILE_COUNT)){blankTile = this.tilemap[i][j];break;}
			}
			if(blankTile){break;}
		}
		if(blankTile != undefined){
			//var i = blankTile.tile_x_in;
			//var j = blankTile.tile_y_in;
			if(j>0){
				var temp_tile = this.tilemap[i][j];
				this.tilemap[i][j] = this.tilemap[i][j-1];
				//this.tilemap[i][j].tile_y_in = j;
				//this.tilemap[i][j].tile_y = (BOARD_TOP_OFFSET + (this.tilemap[i][j].tile_y_in * TILE_SIZE));
				this.tilemap[i][j-1] = temp_tile;
				if(animate){
					this.drawTile(i,j);
					this.drawTile(i,j-1);
				}
			}else{
				ret = 1;
			}
		}
		return ret;
	};
};

