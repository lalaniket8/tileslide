var board = undefined;
var solvedCalloutDisplayed = undefined;
var stopwatchDisplayToggle = true;
var stopwatch = new stopwatch("stopwatchvalue");

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

function toggle(){
	if(stopwatchDisplayToggle){
		stopwatchDisplayToggle = false;
		document.getElementById("stopwatch").style.display = 'none';
	}else{
		stopwatchDisplayToggle = true;
		document.getElementById("stopwatch").style.display = 'block';
	}
	document.getElementById('canvas').focus();
}

function toggleSound(){
	if(SOUND_TOGGLE){
		SOUND_TOGGLE = false;
		document.getElementById("sound").style.display = 'none';
	}else{
		SOUND_TOGGLE = true;
		document.getElementById("sound").style.display = 'block';
	}
	document.getElementById('canvas').focus();
};

function openNav() {
	document.getElementById("mySidenav").style.width = "260px";
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
	document.getElementById("boardsize-field").value = TILE_COUNT;
	
	stopwatch.reset();
	
	if(stopwatchDisplayToggle){
		document.getElementById("stopwatch").style.display = 'block';
	}else{
		document.getElementById("stopwatch").style.display = 'none';
	}
	
	CANVAS_WIDTH = (TILE_SIZE * TILE_COUNT);
	CANVAS_HEIGHT = (TILE_SIZE * TILE_COUNT);
	
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
					if(!stopwatch.running && stopwatchDisplayToggle){
						stopwatch.start();
					}
				break;
				case 'KeyA':
					board.moveLeft(true);
					if(!stopwatch.running && stopwatchDisplayToggle){
						stopwatch.start();
					}
				break;
				case 'KeyS':
					board.moveDown(true);
					if(!stopwatch.running && stopwatchDisplayToggle){
						stopwatch.start();
					}
				break;
				case 'KeyD':
					board.moveRight(true);
					if(!stopwatch.running && stopwatchDisplayToggle){
						stopwatch.start();
					}
				break;
				case 'ArrowUp':
					board.moveUp(true);
					if(!stopwatch.running && stopwatchDisplayToggle){
						stopwatch.start();
					}
				break;
				case 'ArrowLeft':
					board.moveLeft(true);
					if(!stopwatch.running && stopwatchDisplayToggle){
						stopwatch.start();
					}
				break;
				case 'ArrowDown':
					board.moveDown(true);
					if(!stopwatch.running && stopwatchDisplayToggle){
						stopwatch.start();
					}
				break;
				case 'ArrowRight':
					board.moveRight(true);
					if(!stopwatch.running && stopwatchDisplayToggle){
						stopwatch.start();
					}
				break;
				default:
			}
			if(board.checkBoard()){
				board.playSound(WIN_SOUND);
				document.getElementById('SolvedMsg').style.display='block';
				document.getElementById('calloutbtn1').focus();
				solvedCalloutDisplayed = true;
				if(stopwatch.running){
					stopwatch.stop();
					console.log(stopwatch.getValue());
					var time = stopwatch.getValue();
					var mins = Math.floor(time / 60);
					var secs = Math.round(((time % 60) + Number.EPSILON) * 10) / 10;
					if(mins > 0){
						document.getElementById('callout-text1').innerHTML = 'Solved in ' + mins + ' min ' + secs + ' secs!';
					}else{
						document.getElementById('callout-text1').innerHTML = 'Solved in ' + secs + ' secs!';
					}
					stopwatch.reset();
				}else{
					document.getElementById('callout-text1').innerHTML = 'Solved!';
				}
			}else{
				document.getElementById('SolvedMsg').style.display='none';
				solvedCalloutDisplayed = false;
			}
		}
	});
	
	var touchEndCancelCallback = function(){
		if(!solvedCalloutDisplayed){
			if(Math.abs(Touch.delX) > Math.abs(Touch.delY)){//left-right
				if(Touch.X > Touch.oldX){//left to right swipe
					board.moveRight(true);
					if(!stopwatch.running && stopwatchDisplayToggle){
							stopwatch.start();
						}
				}else{//right to left swipe
					board.moveLeft(true);
					if(!stopwatch.running && stopwatchDisplayToggle){
							stopwatch.start();
						}
				}
			}else if(Math.abs(Touch.delX) < Math.abs(Touch.delY)){//up-down
				if(Touch.Y > Touch.oldY){//top to bottom swipe
					board.moveDown(true);
					if(!stopwatch.running && stopwatchDisplayToggle){
							stopwatch.start();
						}
				}else{//bottom to top swipe
					board.moveUp(true);
					if(!stopwatch.running && stopwatchDisplayToggle){
							stopwatch.start();
						}
				}
			}else{}
			if(board.checkBoard()){
				document.getElementById('SolvedMsg').style.display='block';
				document.getElementById('calloutbtn1').focus();
				solvedCalloutDisplayed = true;
				if(stopwatch.running){
					stopwatch.stop();
					console.log(stopwatch.getValue());
					var time = stopwatch.getValue();
					var mins = Math.floor(time / 60);
					var secs = Math.round(((time % 60) + Number.EPSILON) * 10) / 10;
					if(mins > 0){
						document.getElementById('callout-text1').innerHTML = 'Solved in ' + mins + ' min ' + secs + ' secs!';
					}else{
						document.getElementById('callout-text1').innerHTML = 'Solved in ' + secs + ' secs!';
					}
					stopwatch.reset();
				}else{
					document.getElementById('callout-text1').innerHTML = 'Solved!';
				}
			}else{
				document.getElementById('SolvedMsg').style.display='none';
				solvedCalloutDisplayed = false;
			}
		}
		
	};
	setOntouchcancelCallback(touchEndCancelCallback);
	setOntouchendCallback(touchEndCancelCallback);
});