$(document).ready(function(){
	Context.create('canvas');
	Context.context.beginPath();
	Context.context.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	Context.context.fillStyle = DEFAULT_CANVAS_COLOR;
	Context.context.fill();
	
	var board = new Board();
	
	board.randomize(false);
	board.drawBoard();	
	
	setKeyDownCallback(function(e){
		switch(e.code){
			case 'KeyW':
				board.moveUp(true);
			break;
			case 'KeyA':
				board.moveLeft(true);
			break;
			case 'KeyS':
				board.moveDown(true);
			break;
			case 'KeyD':
				board.moveRight(true);
			break;
			case 'ArrowUp':
				board.moveUp(true);
			break;
			case 'ArrowLeft':
				board.moveLeft(true);
			break;
			case 'ArrowDown':
				board.moveDown(true);
			break;
			case 'ArrowRight':
				board.moveRight(true);
			break;
			default:
		}
		
		if(board.checkBoard()){
			$('p').html('SOLVED!');
		}else{
			$('p').html('');
		}
	});
	
	var touchEndCancelCallback = function(){
		
		if(Math.abs(Touch.delX) > Math.abs(Touch.delY)){//left-right
			if(Touch.X > Touch.oldX){//left to right swipe
				board.moveRight(true);
			}else{//right to left swipe
				board.moveLeft(true);
			}
		}else if(Math.abs(Touch.delX) < Math.abs(Touch.delY)){//up-down
			if(Touch.Y > Touch.oldY){//top to bottom swipe
				board.moveDown(true);
			}else{//bottom to top swipe
				board.moveUp(true);
			}
		}else{}
		
	};
	
	setOntouchcancelCallback(touchEndCancelCallback);
	
	setOntouchendCallback(touchEndCancelCallback);
	
});