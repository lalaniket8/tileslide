var board = undefined;
var solvedCalloutDisplayed = undefined;
var stopwatchToggle = undefined;
init();

function minusClick(){
	if(TILE_COUNT > 2){
		TILE_COUNT--;
		init();
	}
}

function plusClick(){
	if(TILE_COUNT < 10){
		TILE_COUNT++;
		init();
	}
}

function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
};

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
};

function solvedBtnClick(){
	document.getElementById('SolvedMsg').style.display='none';
	solvedCalloutDisplayed = false;
	board.randomize(false);
	board.drawBoard();	
};

function init(){
	solvedCalloutDisplayed = false;
	stopwatchToggle = true;
	document.getElementById("boardsize-field").value = TILE_COUNT;
	
	BOARD_LEFT_OFFSET = (CANVAS_WIDTH / 2) - (TILE_SIZE * (TILE_COUNT / 2));
    BOARD_TOP_OFFSET = (CANVAS_HEIGHT / 2) - (TILE_SIZE * (TILE_COUNT / 2));
    BOARD_RIGHT_MARGIN = (BOARD_LEFT_OFFSET + (TILE_SIZE * TILE_COUNT));
    BOARD_BOTTOM_MARGIN = (BOARD_TOP_OFFSET + (TILE_SIZE * TILE_COUNT));
	
	RANDOM_STEPS = TILE_COUNT * 200;
	
	Context.create('canvas');
	Context.context.beginPath();
	Context.context.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	Context.context.fillStyle = DEFAULT_CANVAS_COLOR;
	Context.context.fill();
	
	board = new Board();
	board.randomize(false);
	board.drawBoard();
};

$(document).ready(function(){
	
	setKeyDownCallback(function(e){
		if(!solvedCalloutDisplayed){
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
				document.getElementById('SolvedMsg').style.display='block';
				document.getElementById('calloutbtn1').focus();
				solvedCalloutDisplayed = true;
			}else{
				document.getElementById('SolvedMsg').style.display='none';
				solvedCalloutDisplayed = false;
			}
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