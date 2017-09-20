// Constants
var high = 200 * (Math.round($(document).height() / 2));
var wide = 200 * (Math.round($("#board").width() / 2));
var r = Raphael("map", wide, high);
r.setViewBox(0, 0, wide * 100, high * 100);
r.dragging = false;
r.highlight = false;


console.log(wide);
console.log(high);


// Setting preserveAspectRatio to 'none' lets you stretch the SVG
r.canvas.setAttribute('preserveAspectRatio', 'none');


// Change the widht and the height attributes manually through DOM
$('#paper').attr('width', 1000).attr('height', 1000);



var pi = Math.PI; // 3.141592653589793238462643383279502
var pi2 = pi / 2; // 90 degrees to correct for SVG space

var scenarioTimer;
var scenarioTime = 0;

var pixelRatio = 1;
// 1 pixel = 1 yard

//speed in knots * 2000 = speed in yards / 60 = yards traveled per minute / 30 = pixels traveled per minute


function distance(spd) {
	var spdYds = spd * 2000;
	var spdMin = Math.round(spdYds / 60);
	var spdPix = Math.round(spdMin / 30);
}

// Inputs
// Own Ships Course
function osCRS() {
	oc = Raphael.rad(parseFloat($("input[name='osCRS']").val(), 10));
	return oc;
}
// Own Ships Speed
function osSPD() {
	os = parseFloat($("input[name='osSPD']").val(), 10);
	return os;
}

// target Course
function tCRS() {
	tc = Raphael.rad(parseFloat($("input[name='tCRS']").val(), 10));
	return tc;
}
// target Speed
function tSPD() {
	ts = parseFloat($("input[name='tSPD']").val(), 10);
	return ts;
}
// True bearing from own ship
function brgValue() {
	brg = Raphael.rad(parseFloat($("input[name='brg']").val(), 10));
	return brg;
}
// Range from own ship
function rngValue() {
	rng = parseFloat($("input[name='rng']").val(), 10);
	return rng;
}

function lOS() {
	var obox = oS.getBBox();
	var x = obox.x;
	var y = obox.y;

	var tbox = tgt.getBBox();
	var x1 = tbox.x;
	var y1 = tbox.y;

	var bearing = Math.round(Raphael.angle(x, y, x1, y1)) - 90;
	if (bearing < 0) {
		bearing = bearing + 360;
	}


	var correction = (Raphael.rad(bearing));

	return correction;
}



window.onload = function () {
	//Setup the game board
	var board = r.rect(0, 0, wide, high);
	board.attr({fill: "none"});
	var wX = wide / 10000;
	var hY = high / 10000;

	var dotParams = {
		stroke: "rgb(99,147,212)",
		"stroke-width": 30
	};

	for (var i = 0; i < wX; i++) {
		var spacer = i * 10000;
		latitude = r.path([
      ["M", spacer, 0],
      ["L", spacer, high]
    ]).attr(dotParams);
	}

	for (var i = 0; i < hY; i++) {
		var spacer = i * 10000;
		longitude = r.path([
      ["M", 0, spacer],
      ["L", wide, spacer]
    ]).attr(dotParams);
	}

	tgt = r.circle(wide / 2, high / 2, 200);
	tgt.node.id = "tgtCircle";
	tgt.attr({
		fill: "rgb(233,74,67)"
	});

	oS = r.circle(wide / 2, high / 2, 200);
	oS.node.id = "oSCircle";
	oS.attr({
		fill: "rgb(0,90,140)"
	});

	passive = r.circle(wide / 2, high / 2, 30000);
	passive.node.id = "pCircle";

	active = r.circle(wide / 2, high / 2, 15000);
	active.node.id = "aCircle";
	
	osGroup = r.set(oS, passive, active);
	passive.attr({
		'stroke-width': 50,
		stroke: 'rgb(0,90,146)',
		"stroke-dasharray":"- "
	});

};




function startScenario() {

	$("#brg").prop('disabled', true);
	$("#rng").prop('disabled', true);
	$('#playBtn').prop('disabled', true);
	tgtDraw();

	scenarioLoop();
}


$("#playBtn").click(function () {
	startScenario();
});


function osMove() {
	var obox = oS.getBBox();
	var x = obox.x;
	var y = obox.y;

	var dx = Math.cos(osCRS() - pi2) * (osSPD() * 33);
	var dy = Math.sin(osCRS() - pi2) * (osSPD() * 33);


	osGroup.translate(dx, dy);

	var dot = r.circle(x, y, 100).attr({
		fill: "#2980b9"
	});

	oscMath();
}


function oHistory() {

	var dot = r.circle(x, y, 2).attr({
		fill: "#2980b9"
	});
}


function tHistory() {

	var dot = r.circle(x, y, 2).attr({
		fill: "#8D3315"
	});
}


function tgtDraw() {

	var bbox = oS.getBBox();
	var x = bbox.x;
	var y = bbox.y;

	var dx = Math.cos(brgValue() - pi2) * (rngValue() * 1000);
	var dy = Math.sin(brgValue() - pi2) * (rngValue() * 1000);

	tgt.translate(dx, dy);

}


function tMove() {
	var tbox = tgt.getBBox();
	var x = tbox.x;
	var y = tbox.y;

	var dx = Math.sin(tCRS()) * tSPD() * 33;
	var dy = Math.cos(tCRS() + pi) * tSPD() * 33;


	abox = aCircle.getBBox();
  	pbox = pCircle.getBBox();

	tgt.translate(dx, dy);

	var dot = r.circle(x, y, 100).attr({
		fill: "#8D3315"
	});
	
	
	if(Raphael.isPointInsideBBox(pbox,dx,dy))
	{
		console.log("yes");
	}
	else
	{
		console.log("no");	
	}
	
	tgtMath();
}

//Predetermined run patterns for target
function rpOne() {
	var tCRS = $('#tCRS').val;
	var tSPD = $('#tSPD').val;

	$("#tCRS").prop('disabled', true);
	$("#tSPD").prop('disabled', true);


	tCRS = 130;
	tSPD = 12;

}



//Update Target Summary Table Every Minute
function summaryUpdate() {

	var obox = oS.getBBox();
	var x = obox.x;
	var y = obox.y;

	var tbox = tgt.getBBox();
	var x1 = tbox.x;
	var y1 = tbox.y;

	var bearing = Math.round(Raphael.angle(x, y, x1, y1)) - 90;
	if (bearing < 0) {
		bearing = bearing + 360;
	}


	var correction = Math.abs(Math.sin(Raphael.rad(bearing)));

	var c = r.path("M" + x + y + "L" + x1 + y1);
	var range = Math.floor(c.getTotalLength() / correction);

	var trackFreq = 410;


	$("#tgtSum").append('<tr>' + '<td>' + (scenarioTime + 1) + '</td>' + '<td>' + bearing + '&deg;' + '</td><td>' +

		range + ' yds' + '</td> <td>' + $('#tCRS').val() + '&deg;' + '</td><td>' + $('#tSPD').val() + 'kts' + '</td> <td>' +

		dShift() + ' Hz' + '</td><td>' + correctedFreq() + ' Hz' + '</td></tr>');

	scenarioTime += 1;

}


function get_elapsed_time_string(total_seconds) {
	function pretty_time_string(num) {
		return (num < 10 ? "0" : "") + num;
	}

	var hours = Math.floor(total_seconds / 3600);
	total_seconds = total_seconds % 3600;

	var minutes = Math.floor(total_seconds / 60);
	total_seconds = total_seconds % 60;

	var seconds = Math.floor(total_seconds);

	// Pad the minutes and seconds with leading zeros, if required
	hours = pretty_time_string(hours);
	minutes = pretty_time_string(minutes);
	seconds = pretty_time_string(seconds);

	// Compose the string for display
	var currentTimeString = hours + ":" + minutes + ":" + seconds;

	return currentTimeString;
}

function scenarioLoop() {

	var elapsed_seconds = 0;
	setInterval(function () {
		elapsed_seconds = elapsed_seconds + 1;
		$('#timerText').text(get_elapsed_time_string(elapsed_seconds));
	}, 1000);

	setInterval(function () {
		tMove();
		osMove();
		summaryUpdate();
	}, 6 * 10000);

}


function pauseScenario() {
	clearInterval(scenarioLoop);
}
$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });

 // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  //$('.collapsible').collapsible();

  $('.button-collapse').sideNav({
      menuWidth: 500, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true, // Choose whether you can drag to open on touch screens,
      }
  );
