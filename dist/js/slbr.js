//Window Onload Event Handlers
function addEventHandler(oNode, evt, oFunc, bCaptures) {
	if (typeof (window.event) != "undefined")
		oNode.attachEvent("on" + evt, oFunc);
	else
		oNode.addEventListener(evt, oFunc, bCaptures);
}

function getEventTarget(e) {
	if (window.event) return window.event.srcElement;
	else return e.target;

}

$(document).ready(function () {
	// the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$('.modal').modal();
});

// 6 User Input Values as objects with value properties
// Own Ships Course
function osCRS() {
	oc = Snap.rad(parseFloat($("input[name='osCRS']").val(), 10));
	return (oc);
}

function osSPD() {
	os = parseFloat($("input[name='osSPD']").val(), 10);
	return (os);
}

function tCRS() {
	tc = Snap.rad(parseFloat($("input[name='tCRS']").val(), 10));
	return (tc);
}

function tSPD() {
	ts = parseFloat($("input[name='tSPD']").val(), 10);
	return (ts);
}

function lOS() {
	los = Snap.rad(parseFloat($("input[name='lOS']").val(), 10));
	return (los);
}

function bRate() {
	br = parseFloat($("input[name='bRate']").val(), 10);
	return (br);
}

//Math COnstants
var pi = Math.PI;
var k = 1934;
var top = 0;

var pi2 = pi / 2; //90 degrees
var pi3 = pi / 3; //60 degrees
var pi4 = pi / 4; //45 degrees
var pi6 = pi / 6; //30 degrees
var pi12 = pi / 12; //15 degrees

var pi3S = Math.sin(pi3); //60 degrees
var pi3C = Math.cos(pi3);
var pi4S = Math.sin(pi4); //45 degrees
var pi6S = Math.sin(pi6); //30 degrees
var pi12S = Math.sin(pi12); //15 degrees
var pi4C = Math.cos(pi4); //45 degrees
var pi6C = Math.cos(pi6); //30 degrees
var pi12C = Math.cos(pi12); //15 degrees

var lowBR = 0.01; //Set the limit for low bearing rate

//Maneuvering Board (Moboard) Container Element Information
var wide = 2 * (Math.round($("#mobo").width() / 2));
var high = 2 * (Math.round($("#mobo").height() / 2));
var r = Snap("#mobosvg");
$(function () {
	$("#mobosvg").width(wide).height(wide);
});
//Moboard Mask Container Element Information
var wideM = 2 * (Math.round($("#mask").width() / 2));
var highM = 2 * (Math.round($("#mask").height() / 2));
var m = Snap("#masksvg");

$(function () {
	$("#masksvg").width(wideM).height(wideM * 2);
});
//Evaluator Plot (EvalPlot) Container Element Information
var w = 2 * (Math.round($("#holder").width() / 2));
var h = 2 * (Math.round(w * 1.425) / 2);
var ep = Snap("#evalsvg");
$(function () {
	$("#evalsvg").width(w).height(h);
});

// Predefined SVG attributes
discattr = {
	fill: "transparent",
	stroke: "transparent",
	"stroke-width": 3
};

var pathParams = {
	fill: "none",
	stroke: "#7f8c8d",
	"stroke-width": 1
};

var thickParams = {
	fill: "none",
	stroke: "#7f8c8d",
	"stroke-width": 2
};


var losParams = {
	stroke: "#ecf0f1",
	"stroke-width": 2,
	"arrow-end": 'block-wide-long',
	fill: "none"
};

var testParams = {
	stroke: "#ff00ff",
	"stroke-width": 2,
	"arrow-end": 'block-wide-long',
	fill: "none"
};


var minorParams = {
	stroke: "#7f8c8d",
	"stroke-width": 2
};

var narrowParams = {
	stroke: "#7f8c8d",
	"stroke-width": 1,
	opacity: 1
};

var textParams = {
	fill: "#7f8c8d",
	"font-size": 10
};

var textParams1 = {
	fill: "#7f8c8d",
	"font-size": 8
};

var dotParams = {
	fill: "none",
	stroke: "#373435",
	"stroke-width": 1,
	"stroke-dasharray": ". ",
	"font-size": 10
};

var dot2Params = {
	stroke: "#7f8c8d",
	"stroke-width": 1.5,
	"stroke-dasharray": ". ",
	"font-size": 10
};

// Set Up Moboard Graphics
function moBoard() {
	var center = wide / 2;
	var center2 = wide / 2;
	var radius = wide * 0.45;
	var radius2 = wide * 0.436;
	var radius3 = wide * 0.43;
	var radius4 = wide * 0.42;
	var radius5 = wide * 0.46;
	var radius6 = wide * 0.425;

	r.circle(center, center, radius + 2).attr(thickParams);

	//Create Radial Spoke Lines and degree labels
	for (var i = 0; i < 360; i++) {
		var theta = i * (Math.PI / 180);
		var cos = Math.cos(theta);
		var sin = Math.sin(theta);

		sector = r.path([
            ["M", center + radius * cos, center2 + radius * sin],
            ["L", center + radius2 * cos, center2 + radius2 * sin]
        ]).attr(dotParams);

	}

	for (var i = 0; i < 36; i++) {
		var theta = i * 10 * (Math.PI / 180);
		var cos = Math.cos(theta);
		var sin = Math.sin(theta);
		dotick = r.path([
            ["M", center, center2],
            ["L", center + radius2 * cos, center2 + radius2 * sin]
        ]).attr(dotParams);
	}


	for (var i = 0; i < 36; i++) {
		var theta = i * 10 * (Math.PI / 180);
		var cos = Math.cos(theta);
		var sin = Math.sin(theta);

		tick = r.path([
            ["M", center + radius * cos, center2 + radius * sin],
            ["L", center + radius6 * cos, center2 + radius6 * sin]
        ]).attr(minorParams);

	}
	//Inner Circles
	for (var i = 0; i < 10; i++) {
		var rad = i * (radius / 10);
		circ = r.circle(center, center2, rad).attr(dotParams);
	}

	// Inverse Labels
	for (var i = 0; i < 36; i++) {
		var theta = i * 10 * (Math.PI / 180);
		var cos = Math.cos(theta);
		var sin = -1 * Math.sin(theta);

		label1 = r.text((center - 6 + ((radius - 35) * sin)), (center2 + 4 + ((radius - 35) * cos)), [
            [Math.round(theta * (180 / Math.PI), 0)]
        ]).attr(textParams1);
	}

	//Center Circle
	r.circle(center, center2, radius / 10).attr(dotParams);

	//Target Motion Vector
	var mtVector = r.path([
        ["M", center, center],
        ["L", center, center - 1]
    ]).attr({
		stroke: "#e74c3c",
		"stroke-width": 2
	});
	mtVector.node.id = "mtVector";
	//Ownship Motion Vector

	//LOS/TBO Vector
	var losVector = r.path([
        ["M", center, center - radius - 10],
        ["L", center, center + radius + 10]
    ]).attr(losParams);
	losVector.node.id = "losVector";


	// Vector Parallel to the LOS/TBO
	var parVector = r.path([
        ["M", center, center - radius - 10],
        ["L", center, center + radius + 10]
    ]).attr(pathParams);
	parVector.node.id = "parVector";

	// Vector Perpendicular to the LOS/TBO
	var perVector = r.path([
        ["M", center - radius - 10, center],
        ["L", center + radius + 10, center]
    ]).attr(minorParams);
	perVector.node.id = "perVector";


	var moVector = r.path([
        ["M", center, center],
        ["L", center, center + 1]
    ]).attr({
		stroke: "#2980b9",
		"stroke-width": 2
	});
	moVector.node.id = "moVector";

	var group = r.group();
	var masRec = r.rect(0, 0, wide, wide + 100).attr({
		'fill': 'rgb(11,9,11)'
	});
	group.rect(0, 0, wide, wide).attr({
		fill: "#fff"
	});
	group.circle(center, center, radius + 10).attr({
		fill: "#000"
	});

	masRec.attr({
		mask: group
	});

	// Labels
	for (var i = 0; i < 36; i++) {
		var theta = i * 10 * (Math.PI / 180);
		var cos = Math.cos(theta);
		var sin = Math.sin(theta);

		label = r.text(center - 10 + ((radius + 18) * sin), center2 + 4 + ((radius + 18) * (-1 * cos)), [
            [Math.round(theta * (180 / Math.PI), 0)]
        ]).attr(textParams);
	}

	r.circle(center, center2, 4).attr(thickParams);

	//End MoBoard SetUp Function    
}

// Set Up Evaluator Plots Graphics
function evalPlot() {
	ep.dragging = false;
	ep.highlight = false;

	var center = Math.round(w / 2);
	var center2 = w / 2;
	var radius = w / 3.25;

	//Quadrant Lines
	// Center Line
	ep.path([
        ["M", center, 10],
        ["L", center, h - 10]
    ]).attr(losParams);

	// Target Cross line
	ep.path([
        ["M", center * 0, center / 1.25],
        ["L", center * 2, center / 1.25]
    ]).attr(pathParams);

	//OS Cross Line
	ep.path([
        ["M", center * 0, center2 * 2.15],
        ["L", center * 2, center2 * 2.15]
    ]).attr(pathParams);

	// main circle for target (North Circle)
	var tCircle = ep.circle(center, center / 1.25, radius).attr(pathParams);
	tCircle.node.id = "tCircle";
	//Main Circle for Own Ship (South Circle)
	var val = 360;
	var oCircle = ep.circle(center, center2 * 2.15, radius).attr(pathParams);
	oCircle.node.id = "oCircle";
	//Target Motion Vector
	var tVector = ep.path([
        ["M", center, center / 1.25],
        ["L", center, center / 1.25 - radius]
    ]).attr({
		stroke: "#e74c3c",
		"stroke-width": 2
	});
	tVector.node.id = "tVector";
	//Ownship Motion Vector

	var cx = center;
	var cy = center2 * 2.15;

	var oVector = ep.path([
        ["M", cx, cy],
        ["L", center, center2 * 2.15 - radius]
    ]).attr({
		stroke: "#2980b9",
		"stroke-width": 2
	});
	oVector.node.id = "oVector";
	//Aft End Fires 60 degree degraded sector aft of the array 

	//end fire bearings
	var eFX1 = center + ((Math.sin(((0) + pi) + 0.5)) * radius);
	var eFY1 = center2 * 2.15 + ((-1 * (Math.cos(((0) + pi) + 0.5))) * radius);
	var eFX2 = center + ((Math.sin(((0) + pi) - 0.5)) * radius);
	var eFY2 = center2 * 2.15 + ((-1 * (Math.cos(((0) + pi) - 0.5))) * radius);


	var oBaffle = ep.path([
        ["M", center, center2 * 2.15],
        ["L", eFX1, eFY1],
        ["A", radius, radius, 0, 0, 0, eFX2, eFY2],
        ["z"]
    ]).attr({
		fill: "#2980b9",
		opacity: ".5",
		stroke: "#2980b9",
		"stroke-width": 1
	});
	oBaffle.node.id = "oBaffle";
	var oBaffleArray = oBaffle.attr("path");


	ep.circle(center, center2 * 2.15, 6).attr({
		fill: "#2980b9",
		stroke: "#0D1217",
		"stroke-width": 1.5
	});
	ep.circle(center, center / 1.25, 6).attr({
		fill: "#e74c3c",
		stroke: "#0D1217",
		"stroke-width": 1.5
	});

	//End Evaluator Plot Graphics
}
//Spped In and Across the LOS Math
//Own Ship Speed Across the Line of Sound

function llAngle() {
	var llTheta = osCRS() - lOS();
	return (llTheta);
}

function tgtAngle() {
	var taTheta = tCRS() - lOS();
	return (taTheta);
}


function sOA() {
	var soa = (Math.sin(llAngle()) * osSPD()).toFixed(2);
	if (isNaN(soa)) {
		soa = "0.0";
	}
	document.getElementById("soaRO").textContent = Math.abs(soa) + ' kts';
	return (soa);
}


function sOI() {
	var soi = (Math.cos(llAngle()) * osSPD()).toFixed(2);
	if (isNaN(soi)) {
		soi = "0.0";
	}
	document.getElementById("soiRO").textContent = soi + ' kts';
	return (soi);
}

function oscMath() {
	sOA();
	sOI();
}

//Target Speed Across the Line of Sound

function sTA() {
	var sta = (Math.sin(tgtAngle()) * tSPD()).toFixed(2);
	if (isNaN(sta)) {
		sta = "0.0";
	}
	document.getElementById('staRO').textContent = Math.abs(sta) + ' kts';
	return (sta);
}


function sTI() {
	var sti = (Math.cos(tgtAngle()) * tSPD()).toFixed(2);
	if (isNaN(sti)) {
		sti = "0.0";
	}
	document.getElementById('stiRO').textContent = sti + ' kts';
	return (sti);
}


function tgtMath() {
	sTA();
	sTI();
}

function sideCheck() {
	var side = true;
	var o = Math.sin(llAngle());
	var t = Math.sin(tgtAngle());
	if (o < 0 && t < 0) {
		side = true;
	} else if (o >= 0 && t >= 0) {
		side = true;
	} else {
		side = false;
	}
	return (side);
}


function sRa() {
	var sra = 0;
	if (sideCheck()) {
		sra = (sOA() - sTA()).toFixed(2);
	} else {
		sra = (sOA() - sTA()).toFixed(2);
	}

	return (sra);
}

function sRi() {
	var sri = (sOI() - sTI()).toFixed(2);
	return (sri);
}

$('#ratio').change(function () {
	var div21 = document.getElementById('twoOne');
	var div51 = document.getElementById('fiveOne');

	if (this.checked) {
		div51.style.color = "#ffffff";
	} else {
		div51.style.color = "#9e9e9e";
	}


	if (this.checked) {
		div21.style.color = "#9e9e9e";
	} else {
		div21.style.color = "#ffffff";
	}
});

//Relative Bearing
function relBrg() {

	var relBrg = 0;
	if ((lOS() + (Math.PI * 2)) - osCRS() >= (Math.PI * 2)) {
		relBrg = ((lOS() + (Math.PI * 2)) - osCRS() - Math.PI * 2);
	} else {
		relBrg = (lOS() + (Math.PI * 2)) - osCRS();
	}
	document.getElementById("relBRG").innerHTML = Math.round(Snap.deg(relBrg)) + ' &deg;';

	return Math.round(Snap.deg(relBrg));
}

//recipricol bearing
function repBrg() {
	var repBrg = 0;
	if (lOS() < pi) {
		repBrg = Snap.deg(lOS() + pi);
	} else {
		repBrg = Snap.deg(lOS() - pi);
	}
	document.getElementById("repBRG").innerHTML = Math.round(repBrg) + ' &deg;';

	return Math.round(relBrg);

}

// Three Minute Rule
function tmrUpdater() {
	document.getElementById('tmrPrint').innerHTML = tSPD() * 100;
	document.getElementById('omrPrint').innerHTML = Math.round(tSPD() * 33.333333);
}

//Stabilization Time
function stabTime() {
	//var cableScope = parseInt((document.getElementById('cabscope').value), 10);
	var cableScope = 1500;
	var sTi = ((cableScope * 2) / (osSPD() * 100)).toFixed(1);
	document.getElementById("stabPrint").innerHTML = sTi;
}


// Toggle Full Screen
function toggleFullScreen() {
	if (!document.fullscreenElement && // alternative standard method
		!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
		// current working methods
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.msRequestFullscreen) {
			document.documentElement.msRequestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
			document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
}


function rads() {
 if (document.getElementById('ratio').checked) {
            alert("checked");
        } else {
            alert("You didn't check it! Let me check it for you.");
        }
}

function startTheta() {
	//Eval plot Vector	
	var ep = Snap("#evalsvg");
	var tC = ep.select("#tCircle");
	var tV = ep.select("#tVector");
	var bb2 = tC.getBBox();
	var cx = bb2.x + bb2.width / 2;
	var cy = bb2.y + bb2.width / 2;

	//Angular value of Own Ship Vector and the Line of Sound    
	var tc = tCRS();
	var lOs = lOS();
	if (lOs === NaN) {
		lOs = 0;
	}

	//Describe Own Ship's Vector length, start and end points
	var tLength = Snap.path.getTotalLength(tV);
	var endPoints = Snap.path.getPointAtLength(tV, tLength);
	var ex = endPoints.x;
	var ey = endPoints.y;

	var angle = Snap.angle(cx, cy, ex, ey);

	return (angle);
}



//Eval Plot Animate Own Shp Vector
//Own Ship Vector and baffle Group

function oscDraw() {
	//Define the vector and the center point of the circle it overlays
	var ep = Snap("#evalsvg");

	var oC = ep.select("#oCircle");
	var oV = ep.select("#oVector");
	var oB = ep.select("#oBaffle");
	var bb = oC.getBBox();
	var cx = bb.x + bb.width / 2;
	var cy = bb.y + bb.width / 2;


	//Moboard Vector	
	var mb = Snap("#mobo");
	var moV = r.select("#moVector");
	var mcx = wide / 2;
	var mcy = mcx;

	var g = ep.group(oV, oB, oC);

	//Describe Own Ship's Vector length, start and end points
	var oLength = Snap.path.getTotalLength(moV);
	var endPoints = Snap.path.getPointAtLength(moV, oLength);
	var ex = endPoints.x;
	var ey = endPoints.y;

	//Angular value of Own Ship Vector and the Line of Sound    
	var oc = osCRS();
	var lOs = lOS();
	if (lOs === NaN) {
		lOs = 0;
	}

	var os = osSPD();
	var rads = 0;
	 if (document.getElementById('ratio').checked) {
            rads = os * (wide * 0.45 / 50);
        } else {
            rads = os * (wide * 0.45 / 20);
        }
	
	
	

	var startTheta = Snap.angle(cx, cy, ex, ey);
	var newTheta = Snap.deg(oc - lOs);


	//Moboard Own Ship Vector End Points
	var nOX = mcx + (Math.sin(oc) * rads);
	var nOY = mcy + ((-1 * Math.cos(oc)) * rads);

	//Rotate Own Ship Vector and Baffles to proper orientation

	var rotateTo = (startTheta - newTheta) + 180;

	g.attr({
		transform: "rotate(" + -1 * rotateTo + " " + cx + " " + cy + ")"
	});

	var pathString = "M" + mcx + "," + mcy + "L" + nOX + "," + nOY + "z";

	moV.attr('d');
	moV.animate({
		d: pathString
	}, 0, mina.easeout);
	return (endPoints);

}


//Control Rotation of Target Vector 
function tgtDraw() {
	//Define the vector and the center point of the circle it overlays

	//Eval plot Vector	
	var ep = Snap("#evalsvg");
	var tC = ep.select("#tCircle");
	var tV = ep.select("#tVector");
	var bb2 = tC.getBBox();
	var cx = bb2.x + bb2.width / 2;
	var cy = bb2.y + bb2.width / 2;

	//Moboard Vector	
	var mb = Snap("#mobo");
	var mtV = r.select("#mtVector");
	var mcx = wide / 2;
	var mcy = mcx;

	//Angular value of Own Ship Vector and the Line of Sound    
	var tc = tCRS();
	var lOs = lOS();
	if (lOs === NaN) {
		lOs = 0;
	}

	var ts = tSPD();
	var rads = 0;
	if (document.getElementById('ratio').checked) {
            rads = ts * (wide * 0.45 / 50);
        } else {
            rads = ts * (wide * 0.45 / 20);
        }
	
	
	

	//Describe Own Ship's Vector length, start and end points
	var tLength = Snap.path.getTotalLength(tV);
	var endPoints = Snap.path.getPointAtLength(tV, tLength);
	var ex = endPoints.x;
	var ey = endPoints.y;

	var startTheta = Snap.angle(cx, cy, ex, ey);
	var newTheta = Snap.deg(tgtAngle());

	//Moboard Target Vector End Points
	var nTX = mcx + (Math.sin(tc) * rads);
	var nTY = mcy + ((-1 * Math.cos(tc)) * rads);




	//Rotate Own Ship Vector and Baffles to proper orientation

	var rotateTo = (startTheta - newTheta) - 90;

	tV.attr({
		transform: "rotate(" + -1 * rotateTo + " " + cx + " " + cy + ")"
	});

	var pathString = "M" + mcx + "," + mcy + "L" + nTX + "," + nTY + "z";

	mtV.attr('d');
	mtV.animate({
		d: pathString
	}, 0, mina.easeout);

}

function slbRange() {
	var br = bRate();
	var sra = sRa();

	var range = Math.abs(k * (sra / br)).toFixed(0);
	if (range == NaN) {
		range = "00000";
	}

	if (relBrg() < 45 && relBrg() > 5) {
		relPos = "Starboard Bow";
		document.getElementById("relativePosition").innerHTML = relPos;
	} else if (relBrg() < 135 && relBrg() > 45) {
		relPos = "Starboard Beam";
		document.getElementById("relativePosition").innerHTML = relPos;
	} else if (relBrg() < 175 && relBrg() > 135) {
		relPos = "Starboard Quarter";
		document.getElementById("relativePosition").innerHTML = relPos;
	} else if (relBrg() < 355 && relBrg() > 315) {
		relPos = "Port Bow";
		document.getElementById("relativePosition").innerHTML = relPos;
	} else if (relBrg() < 315 && relBrg() > 225) {
		relPos = "Port Beam";
		document.getElementById("relativePosition").innerHTML = relPos;
	} else if (relBrg() < 225 && relBrg() > 185) {
		relPos = "Port Quarter";
		document.getElementById("relativePosition").innerHTML = relPos;
	} else if (relBrg() < 5 || relBrg() > 355) {
		relPos = "Dead Ahead";
		document.getElementById("relativePosition").innerHTML = relPos;
	} else if (relBrg() < 185 && relBrg() > 175) {
		relPos = "Dead Astern";
		document.getElementById("relativePosition").innerHTML = relPos;
	}

	var opClos = 0;
	if (sRi() < 0) {
		opClos = ("CLOSING");
	} else {
		opClos = ("OPENING");
	}

	document.getElementById('closure').innerHTML = opClos;
	document.getElementById('slbRange').innerHTML = range;
	document.getElementById('sriRO').innerHTML = sRi();
	document.getElementById('sraRO').innerHTML = sRa();


}


function tma() {

	var tc = Snap.deg(tCRS());
	var los = Snap.deg(lOS());
	var oc = Snap.deg(osCRS());
	var br = bRate();
	var lowBR = .1;
	var sta = sTA();
	var soa = sOA();

	var taDeg = Math.abs(tc - los);

	var x = taDeg;
	if (x >= 180) {
		x = (taDeg - 180);
	}


	var crsDif = Math.abs(oc - tc);

	var nta = false;
	if ((x <= 15) || (x >= 165)) {
		nta = true;
	}

	var zbr = false;
	if (sideCheck() === true && crsDif <= 15 && br <= lowBR && nta === false) {
		zbr = true;
	}

	var pointing = false;
	if (relBrg() <= 15 || relBrg() >= 345) {
		pointing = true;
	}

	var lead = false;
	if (sideCheck() === true && sta < soa && zbr === false && pointing === false && nta === false) {
		lead = true;
	}

	var overlead;
	if (sideCheck() === true && sta > soa && zbr === false && pointing === false && nta === false) {
		overlead = true;
	}

	var lag = false;
	if (sideCheck() === false && pointing === false && nta === false) {
		lag = true;
	}


	var geometry = "Unknown";
	if (lead === true) {
		geometry = "LEAD";
	} else if (overlead === true) {
		geometry = "OVERLEAD";
	} else if (lag === true) {
		geometry = "LAG";
	} else if (zbr === true) {
		geometry = "ZBR";
	} else if (pointing === true) {
		geometry = "POINTING";
	} else if (nta === true) {
		geometry = "NTA";
	} else {
		geometry = "Unknown";
	}

	//derived range values
	var maxRange = 0;
	if (geometry == "OVERLEAD") {
		maxRange = (Math.abs(soa / br) * k).toFixed(0);
	} else if (geometry == "LAG") {
		maxRange = (Math.abs(soa + tSPD()) / br * k).toFixed(0);
	} else if (geometry == "LEAD") {
		maxRange = ((tSPD() - soa) / br * k).toFixed(0);
	} else if (geometry == "POINTING") {
		maxRange = ((tSPD() * br) * k).toFixed(0);
	} else if (geometry == "NTA") {
		maxRange = "-";
	} else if (geometry == "ZBR") {
		maxRange = "-";
	}
	
	 var minRange = 0;
	 if (geometry == "OVERLEAD") {
	  minRange = (Math.abs((tSPD() - soa) / br) * k).toFixed(0);
	 } else if (geometry == "LAG") {
	  minRange = (Math.abs(soa / br) * k).toFixed(0);
	 }

	 var estRange = 0;
	 if (geometry == "POINTING") {
	  estRange = (Math.abs(tSPD() / br) * k).toFixed(0);
	 } else if (geometry == "NTA") {
	  estRange = (Math.abs(soa) / br * k).toFixed(0);
	 }

	document.getElementById('losGeo').innerHTML = geometry;
	document.getElementById('maxRNG').innerHTML = maxRange;
	document.getElementById('minRNG').innerHTML = minRange;
	document.getElementById('estRNG').innerHTML = estRange;
	console.log(taDeg);
}

//moboard test stuff
function moDraw() {
	var cx = wide / 2;
	var cy = cx;

	var mlV = r.select("#losVector");
	var mpV = r.select("#parVector");
	var mppV = r.select("#perVector");
	var lOs = lOS();
	var oc = osCRS();
	var os = osSPD();
	var rads = os * (wide * 0.45 / 20);

	var los90 = lOs + pi2;
	var sin90 = Math.sin(los90);
	var cos90 = Math.cos(los90);


	//Describe LOS's Vector length, start and end points
	var losLength = Snap.path.getTotalLength(mlV);
	var endPoints = Snap.path.getPointAtLength(mlV, losLength);
	var startPoints = Snap.path.getPointAtLength(mlV, 0);

	//Describe Own Ship's Vector length, start and end points
	var oex = cx + (Math.sin(oc) * rads);
	var oey = cy + ((-1 * Math.cos(oc)) * rads);


	var sx = startPoints.x;
	var sy = startPoints.y;
	var ex = endPoints.x;
	var ey = endPoints.y;

	var nLX1 = cx + (Math.sin(lOs) * cx);
	var nLY1 = cy + ((-1 * Math.cos(lOs)) * cx);
	var nLX2 = cx + ((-1 * Math.sin(lOs)) * cx);
	var nLY2 = cy + (Math.cos(lOs) * cx);

	//Define parallel line
	var nPDX = oex + ((nLX2 - nLX1));
	var nPDY = oey + ((nLY2 - nLY1));
	var nPDX0 = oex + (-1 * (nLX2 - nLX1));
	var nPDY0 = oey + (-1 * (nLY2 - nLY1));

	var nPX = cx + ((sin90) * cx * 1.5);
	var nPY = cy + ((-1 * cos90) * cx * 1.5);
	var nPX0 = cx + ((-1 * sin90) * cx * 1.5);
	var nPY0 = cy + (cos90 * cx * 1.5);

	//Define perpendicular line
	var nPPX = oex + (nPX0 - nPX);
	var nPPY = oey + (nPY0 - nPY);
	var nPPX0 = oex + (-1 * (nPX0 - nPX));
	var nPPY0 = oey + (-1 * (nPY0 - nPY));



	mlV.attr('d')
	var pathStringL = 'M ' + (nLX1) + ' ' + (nLY1) + ', L ' + (nLX2) + ' ' + (nLY2);
	mlV.animate({
		d: pathStringL
	}, 0, mina.easeout);

	// Draw a line parallel to the line above
	mpV.attr('d')
	var pathString = 'M ' + (nPDX0) + ' ' + (nPDY0) + ', L ' + (nPDX) + ' ' + (nPDY);
	mpV.animate({
		d: pathString
	}, 0, mina.easeout);

	// Draw a line perpendicular to the line above
	mppV.attr('d')
	var pathString = 'M ' + (nPPX0) + ' ' + (nPPY0) + ', L ' + (nPPX) + ' ' + (nPPY);
	mppV.animate({
		d: pathString
	}, 0, mina.easeout);

	relBrg();
	repBrg();

}


// onInput Functions - What happens when user changes or inputs a value
function oscHandler() {
	oscMath();
	oscDraw();
	slbRange();
	tma();
	moDraw();
}

function ossHandler() {
	oscMath();
	oscDraw();
	slbRange();
	tma();
	moDraw();
	stabTime();
}

function tcHandler() {
	tgtMath();
	tgtDraw();
	slbRange();
	tma();
}

function tsHandler() {
	tgtMath();
	tgtDraw();
	slbRange();
	tma();
	tmrUpdater();
}

function losHandler() {
	oscMath();
	tgtMath();
	slbRange();
	tma();
	moDraw();
	oscDraw();
	tgtDraw();
}

function brHandler() {
	slbRange();
	tma();
}

function chkHandler() {
oscMath();
	tgtMath();
	slbRange();
	tma();
	moDraw();
	oscDraw();
	tgtDraw();
}

//$("#ratio").change(function() {
//   moDraw();
//});

//Initialize Event Handlers for user inputs
// Own Ship Course 
document.getElementById("osCRS").addEventListener("input", oscHandler);
document.getElementById("osSPD").addEventListener("input", ossHandler);
document.getElementById("lOS").addEventListener("input", losHandler);
document.getElementById("tCRS").addEventListener("input", tcHandler);
document.getElementById("tSPD").addEventListener("input", tsHandler);
document.getElementById("bRate").addEventListener("input", brHandler);
document.getElementById("ratio").addEventListener("change", chkHandler);

//Eventhandler to draw SVG graphics
addEventHandler(window, "load", moBoard, false);
addEventHandler(window, "load", evalPlot, false);

setInterval(slbRange(), 1000);
