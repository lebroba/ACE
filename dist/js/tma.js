var soundVelocity = 3000;
var pi = Math.PI;
function tonal() { 
	freq = parseFloat($("input[name='freq']").val(), 10); 
	return freq;
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

function lOS(){
	var obox = oS.getBBox();
    var x = obox.x;
    var y = obox.y;
	
	var tbox = tgt.getBBox();
    var x1 = tbox.x;
    var y1 = tbox.y;
	
	var bearing = Math.round(Raphael.angle(x,y,x1,y1))-90;
	if (bearing <0){
		bearing = bearing + 360;
	}


	var correction = (Raphael.rad(bearing));
	
	return correction;
}

function aLOS(){
	los = lOS();
	
	return (los+pi)%6.28;
}


function sOA(){
    var soa = (Math.sin(Math.abs((osCRS()-lOS())))* osSPD()).toFixed(2);
    if (isNaN(soa)) {
        soa = "0.0";
    }
    document.getElementById('soaRO').textContent = Math.abs(soa) + ' kts';
    return(soa);
}


function sOI(){
    var soi = (Math.cos((osCRS()-lOS()))* osSPD()).toFixed(2);
    if (isNaN(soi)) {
        soi = "0.0";
    }
    document.getElementById('soiRO').textContent = soi + ' kts';
    return(soi);
}

function oscMath() {
    sOA();
    sOI();
}

//Target Speed Across the Line of Sound


function sTA(){
    var sta = (Math.sin(Math.abs((tCRS()-aLOS())))* tSPD()).toFixed(2);
    if (isNaN(sta)) {
        sta = "0.0";
    }
    document.getElementById('staRO').textContent = Math.abs(sta) + ' kts';
    return (sta);
}


function sTI(){
    var sti = (Math.cos((tCRS()-aLOS()))* tSPD()).toFixed(2);
    if (isNaN(sti)) {
        sti = "0.0";
    }
    document.getElementById('stiRO').textContent = sti + ' kts';
    return(sti);
}


function tgtMath(){
    sTA();
    sTI();
}

function sRa(){
    sameSide = true;
    var o = Math.sin(osCRS()-lOS());
    var t = Math.sin(tCRS()-lOS());
    if (o < 0 && t < 0) {
        sameSide = true;
    }
    else if(o >= 0 && t >= 0) {
        sameSide = true;
    }
    else {sameSide = false;}    
}


function correctedFreq(){
var dFreq = parseFloat(dShift()); 

var soa = parseFloat(sOA());	
var sti = parseFloat(sTI());	
var freq = tonal();	
	
var fC = soa/soundVelocity*dFreq;

var cF = ((sti * freq)/soundVelocity)+freq;	
	
return cF.toFixed(2);

}

function dShift(){


var soi = parseFloat(sOI());
var sti = parseFloat(sTI());
var freq = tonal();	
	
var dVal = ((soi+sti)*freq)/(soundVelocity) + freq; 	
	
return dVal.toFixed(2);
}

function contact(){


if(Raphael.isPointInsideBBox(bbox,320,240))
	{
		paper.text(cx,cy,"Yes").attr(fontDef);
		message="BBOX is lying on the point!";
	}
	else
	{
		paper.text(cx,cy,"No").attr(fontDef);	
	}

}