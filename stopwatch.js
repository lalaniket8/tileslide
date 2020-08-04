var stopwatch = function(stopwatchElementID){
	this.running = false;
	var timeElapsed = 0;
	var myTimer;

	var tick = function(){
		timeElapsed = Math.round((timeElapsed + Number.EPSILON) * 10) / 10;
		timeElapsed = (timeElapsed + 0.1);
		timeElapsed = Math.round((timeElapsed + Number.EPSILON) * 10) / 10;
		if(((timeElapsed * 10) % 10) == 0){
			document.getElementById(stopwatchElementID).innerHTML = (timeElapsed + '.0');
		}else{
			document.getElementById(stopwatchElementID).innerHTML = timeElapsed;
		}
	}
	this.start = function(){
		this.running = true;
		myTimer = setInterval(tick, 100);
	}
	this.stop = function(){
		this.running = false;
		clearInterval(myTimer);
	}
	this.reset = function(){
		this.stop();
		timeElapsed = 0;
		document.getElementById(stopwatchElementID).innerHTML = timeElapsed;
	}
	this.getValue = function() {
		return timeElapsed;
	}
}