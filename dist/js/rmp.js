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

// 6 User Input Values as objects with value properties
// Own Ships Course
function osCRS() {
	oc = Snap.rad(parseFloat($("input[name='osCRS']").val(), 10));
	return (oc);
}

function tCRS() {
	tc = Snap.rad(parseFloat($("input[name='tCRS']").val(), 10));
	return (tc);
}

function lOS() {
	los = Snap.rad(parseFloat($("input[name='lOS']").val(), 10));
	return (los);
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

//Maneuvering Board (Moboard) Container Element Information
var wide = 2 * (Math.round($("#mobo2").height() / 2));
var high = 2 * (Math.round($("#mobo2").height() / 2));
var r = Snap("#rmpsvg");
$(function () {
	$("#rmpsvg").width(high).height(high);
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

var tgtParams = {
	fill: "none",
	stroke: "#F44336",
	"stroke-width": 2
};

var osParams = {
	fill: "#2196F3",
	stroke: "#2196F3",
	"stroke-width": 2
};

var losParams = {
	stroke: "#2196F3",
	"stroke-width": 2,
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

// Set Up own ship Graphics
function osCircle() {
	var center = wide / 2;
	var center2 = wide / 2;
	var radius = wide / 3 * 0.45;
	var radius1 = wide / 3 * 0.455;
	var radius2 = wide / 3 * 0.436;
	var radius3 = wide / 3 * 0.43;
	var radius4 = wide / 3 * 0.42;
	var radius5 = wide / 3 * 0.46;
	var radius6 = wide / 3 * 0.425;

	var oC = r.circle(center, center, radius + 2).attr(losParams);
	oC.node.id = "oC";
	//race track Circle
	r.circle(center, center, radius * 2.5).attr(thickParams);

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
            ["M", center + radius1 * cos, center2 + radius1 * sin],
            ["L", center + radius6 * cos, center2 + radius6 * sin]
        ]).attr(losParams);

	}

	// Inner Labels
	for (var i = 0; i < 36; i++) {
		var theta = i * 10 * (Math.PI / 180);
		var deg = Math.round(theta * (180 / Math.PI), 0);
		var cos = -1 * Math.cos(theta);
		var sin = Math.sin(theta);

		label1 = r.text((center - 6 + ((radius - 25) * sin)), (center + 2 + ((radius - 25) * cos)), [
            [('0' + deg).slice(-3)]
        ]).attr(textParams1);

		label1.node.id = "label" + i;
	}

	//Own Ship Inner Circle
	r.circle(center, center2, radius - 12).attr(losParams);



	//Ownship Motion Vector

	//LOS/TBO Vector
	var losVector = r.path([
        ["M", center, center - radius - 10],
        ["L", center, center]
    ]).attr(losParams);
	losVector.node.id = "osVector";




	// Labels
	for (var i = 0; i < 36; i++) {
		var theta = i * 10 * (Math.PI / 180);
		var deg = Math.round(theta * (180 / Math.PI), 0);
		var cos = Math.cos(theta);
		var sin = Math.sin(theta);

		label = r.text(center - 10 + ((radius + 18) * sin), center + 4 + ((radius + 18) * (-1 * cos)), [
            [('0' + deg).slice(-3)]
        ]).attr(textParams);
	}

	r.circle(center, center2, 4).attr(osParams);


	var innerGroup = r.g(label1, losVector);
	//End MoBoard SetUp Function    
}

// Set Up target Graphics
function tgtCircle() {
	var center = wide / 4.25;
	var center2 = wide / 4.25;
	var radius = wide / 3 * 0.45;
	var radius2 = wide / 3 * 0.436;
	var radius3 = wide / 3 * 0.43;
	var radius4 = wide / 3 * 0.42;
	var radius5 = wide / 3 * 0.46;
	var radius6 = wide / 3 * 0.425;

	r.circle(center, center, radius + 2).attr(tgtParams);

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

	// Inner Labels
	for (var i = 0; i < 36; i++) {
		var theta = i * 10 * (Math.PI / 180);
		var deg = Math.round(theta * (180 / Math.PI), 0);
		var cos = -1 * Math.cos(theta);
		var sin = Math.sin(theta);

		var label1 = r.text((center - 6 + ((radius - 25) * sin)), (center2 + 4 + ((radius - 25) * cos)), [
            [('0' + deg).slice(-3)]
        ]).attr(textParams1);
	}

	//Own Ship Inner Circle
	r.circle(center, center2, radius - 12).attr(tgtParams);




	//Target Inner Circle
	r.circle(center, center2, radius - 12).attr(tgtParams);


	//Ownship Motion Vector

	//LOS/TBO Vector
	var losVector = r.path([
        ["M", center, center - radius - 10],
        ["L", center, center]
    ]).attr(losParams);
	losVector.node.id = "tgtVector";




	// Labels
	for (var i = 0; i < 36; i++) {
		var theta = i * 10 * (Math.PI / 180);
		var deg = Math.round(theta * (180 / Math.PI), 0);
		var cos = Math.cos(theta);
		var sin = Math.sin(theta);

		label = r.text(center - 10 + ((radius + 18) * sin), center2 + 4 + ((radius + 18) * (-1 * cos)), [
            [('0' + deg).slice(-3)]
        ]).attr(textParams);
	}

	r.circle(center, center2, 4).attr(thickParams);

	//End MoBoard SetUp Function    
}

function oSpin() {
	//Define the vector and the center point of the circle it overlays
	var r = Snap("#rmpsvg");

	var oC = r.select("#oC");
	var oV = r.select("#oVector");
	var labels = 0;
	var bb = oC.getBBox();
	var cx = bb.x + bb.width / 2;
	var cy = bb.y + bb.width / 2;
	var lab0 = r.select("label0");
	var lab1 = r.select("label1");
	var lab2 = r.select("label2");
	var lab3 = r.select("label3");
	var lab4 = r.select("label4");
	var lab5 = r.select("label5");
	var lab6 = r.select("label6");
	var lab7 = r.select("label7");
	var lab8 = r.select("label8");
	var lab9 = r.select("label9");
	var lab10 = r.select("label10");
	var lab11 = r.select("label11");
	var lab12 = r.select("label12");
	var lab13 = r.select("label13");
	var lab14 = r.select("label14");
	var lab15 = r.select("label15");
	var lab16 = r.select("label16");
	var lab17 = r.select("label17");
	var lab18 = r.select("label18");
	var lab19 = r.select("label19");
	var lab20 = r.select("label20");
	var lab21 = r.select("label21");
	var lab22 = r.select("label22");
	var lab23 = r.select("label23");
	var lab24 = r.select("label24");
	var lab25 = r.select("label25");
	var lab26 = r.select("label26");
	var lab27 = r.select("label27");
	var lab28 = r.select("label28");
	var lab29 = r.select("label29");
	var lab30 = r.select("label30");
	var lab31 = r.select("label31");
	var lab32 = r.select("label32");
	var lab33 = r.select("label33");
	var lab34 = r.select("label34");

	var g = r.group(lab0, lab1, lab2, lab3,
lab4, lab5, lab6, lab7, lab8, lab9, lab10,
lab11, lab12, lab13, lab14, lab15, lab16, lab17
,lab18, lab19, lab20, lab21, lab22, lab23, lab24
,lab25, lab26, lab27, lab28, lab29, lab30,
lab31, lab32, lab33,lab34);

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
	var newTheta = Snap.deg(oc);


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

document.getElementById("osCRS").addEventListener("input", oSpin);




//Eventhandler to draw SVG graphics
addEventHandler(window, "load", osCircle, false);
addEventHandler(window, "load", tgtCircle, false);
