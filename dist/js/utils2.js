/***** Utilities *******/

$('#plusbtn').click(function () {

    var course = $('#tCRS').value;

    $("#history").append('<tr>' + '<td>' + '<input type="checkbox" name="delete" />' + '</td>' + '<td>' + $('#osCRS').val() + '&deg;' + '</td><td>' + $('#osSPD').val() + ' kts' + '</td> <td>' + $('#lOS').val() + '&deg;' + '</td><td>' + $('#bRate').val() + '&deg;/min' + '</td> <td>' + $('#tCRS').val() + '&deg;' + '</td><td>' + $('#tSPD').val() + ' kts' + '</td><td>' + $('#losGeo').text() + ' </td><td>' + $('#slbRange').text() + ' yards' + '</td></tr>');
});
$('.minusbtn').click(function () {
    $('#history tr').has('input[name="delete"]:checked').remove()
});


var w = 2 * (Math.round($("#holder").width() / 2));
var h = 2 * (Math.round(w * 1.425) / 2);

var top = 0;

var pi = Math.PI;
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

var center = Math.round(w / 2);
var center2 = center / 1.25;
var radius = (w / 3.25);




// Target Course Vectors Based on LOS
// 15 degrees
var cb1 = ep.circle(center + ((pi12S) * radius), center2 + ((-pi12C) * radius), 4).attr({
    fill: "#677274",
    stroke: "rgb(11, 9, 11)",
    "stroke-width": 1
}).mouseover(function () {
    cb1.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    cb1.animate({
        "r": 4
    }, 100);
});

cb1.node.id = "cBtn1";
cb1.node.onclick = function () {
    deg15();
}
ep.circle(center + ((pi12S) * radius), center2 + ((-pi12C) * radius), 15).attr(discattr).click(function () {
    deg15();
}).mouseover(function () {
    cb1.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    cb1.animate({
        "r": 4
    }, 100);
});;;

// 30 degrees						
var cb2 = ep.circle(center + ((pi6S) * radius), center2 + ((-pi6C) * radius), 4).attr({
    fill: "#677274",
    stroke: "rgb(11, 9, 11)",
    "stroke-width": 1
}).mouseover(function () {
    cb2.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    cb2.animate({
        "r": 4
    }, 100);
});
cb2.node.id = "cBtn2";
cb2.node.onclick = function () {
    deg30();
}
ep.circle(center + ((pi6S) * radius), center2 + ((-pi6C) * radius), 15).attr(discattr).click(function () {
    deg30();
}).mouseover(function () {
    cb2.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    cb2.animate({
        "r": 4
    }, 100);
});;;

// 45 degrees
var cb3 = ep.circle(center + ((pi4S) * radius), center2 + ((-pi4C) * radius), 4).attr({
    fill: "#677274",
    stroke: "rgb(11, 9, 11)",
    "stroke-width": 1
}).mouseover(function () {
    cb3.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    cb3.animate({
        "r": 4
    }, 100);
});
cb3.node.id = "cBtn3";
cb3.node.onclick = function () {
    deg45();
}

ep.circle(center + ((pi4S) * radius), center2 + ((-pi4C) * radius), 15).attr(discattr).click(function () {
    deg45();
}).mouseover(function () {
    cb3.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    cb3.animate({
        "r": 4
    }, 100);
});;;

// 60 degrees
var cb4 = ep.circle(center + ((pi3S) * radius), center2 + ((-pi3C) * radius), 4).attr({
    fill: "#677274",
    stroke: "rgb(11, 9, 11)",
    "stroke-width": 1
}).click(function () {
    deg60();
}).mouseover(function () {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    this.animate({
        "r": 4
    }, 100);
});
ep.circle(center + ((pi3S) * radius), center2 + ((pi3C) * radius), 15).attr(discattr).click(function () {
    deg60();
}).mouseover(function () {
    cb4.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    cb4.animate({
        "r": 4
    }, 100);
});;;

// 120 degrees
var cb5 = ep.circle(center + ((pi3S) * radius), center2 + ((pi3C) * radius), 4).attr({
    fill: "#677274",
    stroke: "rgb(11, 9, 11)",
    "stroke-width": 1
}).click(function () {
    deg120();
}).mouseover(function () {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    this.animate({
        "r": 4
    }, 100);
});

ep.circle(center + ((pi3S) * radius), center2 + ((pi3C) * radius), 15).attr(discattr).click(function () {
    deg120();
}).mouseover(function () {
    cb5.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    cb5.animate({
        "r": 4
    }, 100);
});;;

// 135 degrees
var cb6 = ep.circle(center + ((pi4S) * radius), center2 + ((pi4C) * radius), 4).attr({
    fill: "#677274",
    stroke: "rgb(11, 9, 11)",
    "stroke-width": 1
}).click(function () {
    deg135();
}).mouseover(function () {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    this.animate({
        "r": 4
    }, 100);
});

ep.circle(center + ((pi4S) * radius), center2 + ((pi4C) * radius), 4).attr(discattr).click(function () {
    deg135();
}).mouseover(function () {
    cb6.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    cb6.animate({
        "r": 4
    }, 100);
});;;

// 150 degrees
var cb7 = ep.circle(center + ((pi6S) * radius), center2 + ((pi6C) * radius), 4).attr({
    fill: "#677274",
    stroke: "rgb(11, 9, 11)",
    "stroke-width": 1
}).click(function () {
    deg150();
}).mouseover(function () {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    this.animate({
        "r": 4
    }, 100);
});

ep.circle(center + ((pi6S) * radius), center2 + ((pi6C) * radius), 15).attr(discattr).click(function () {
    deg150();
}).mouseover(function () {
    cb7.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    cb7.animate({
        "r": 4
    }, 100);
});;;

// 165 degrees
var cb8 = ep.circle(center + ((pi12S) * radius), center2 + ((pi12C) * radius), 4).attr({
    fill: "#677274",
    stroke: "rgb(11, 9, 11)",
    "stroke-width": 1
}).click(function () {
    deg165();
}).mouseover(function () {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    this.animate({
        "r": 4
    }, 100);
});
ep.circle(center + ((pi12S) * radius), center2 + ((pi12C) * radius), 15).attr(discattr).click(function () {
    deg165();
}).mouseover(function () {
    cb8.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    cb8.animate({
        "r": 4
    }, 100);
});;;

// 195 degrees				
var cb9 = ep.circle(center + ((-pi12S) * radius), center2 + ((pi12C) * radius), 4).attr({
    fill: "#677274",
    stroke: "rgb(11, 9, 11)",
    "stroke-width": 1
}).click(function () {
    deg195();
}).mouseover(function () {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    this.animate({
        "r": 4
    }, 100);
});

ep.circle(center + ((-pi12S) * radius), center2 + ((pi12C) * radius), 15).attr(discattr).click(function () {
    deg195();
}).mouseover(function () {
    cb9.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    cb9.animate({
        "r": 4
    }, 100);
});;;

// 210 degrees	
var cb10 = ep.circle(center + ((-pi6S) * radius), center2 + ((pi6C) * radius), 4).attr({
    fill: "#677274",
    stroke: "rgb(11, 9, 11)",
    "stroke-width": 1
}).click(function () {
    deg210();
}).mouseover(function () {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    this.animate({
        "r": 4
    }, 100);
});

ep.circle(center + ((-pi6S) * radius), center2 + ((pi6C) * radius), 15).attr(discattr).click(function () {
    deg210();
}).mouseover(function () {
    cb10.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    cb10.animate({
        "r": 4
    }, 100);
});;;

// 245 degrees
var cb11 = ep.circle(center + ((-pi3S) * radius), center2 + ((pi3C) * radius), 4).attr({
    fill: "#677274",
    stroke: "rgb(11, 9, 11)",
    "stroke-width": 1
}).click(function () {
    deg240();
}).mouseover(function () {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    this.animate({
        "r": 4
    }, 100);
});
ep.circle(center + ((-pi3S) * radius), center2 + ((pi3C) * radius), 15).attr(discattr).click(function () {
    deg240();
}).mouseover(function () {
    cb11.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    cb11.animate({
        "r": 4
    }, 100);
});;;

// 225 degrees

var cb12 = ep.circle(center + ((-pi4S) * radius), center2 + ((pi4C) * radius), 4).attr({
    fill: "#677274",
    stroke: "rgb(11, 9, 11)",
    "stroke-width": 1
}).click(function () {
    deg225();
}).mouseover(function () {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    this.animate({
        "r": 4
    }, 100);
});
ep.circle(center + ((-pi4S) * radius), center2 + ((pi4C) * radius), 15).attr(discattr).click(function () {
    deg225();
}).mouseover(function () {
    cb12.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    cb12.animate({
        "r": 4
    }, 100);
});;;

// 300 Degrees Left
var cb13 = ep.circle(center + ((-pi3S) * radius), center2 + ((-pi3C) * radius), 4).attr({
    fill: "#677274",
    stroke: "rgb(11, 9, 11)",
    "stroke-width": 1
}).click(function () {
    deg300();
}).mouseover(function () {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    this.animate({
        "r": 4
    }, 100);
});
ep.circle(center + ((-pi3S) * radius), center2 + ((-pi3C) * radius), 15).attr(discattr).click(function () {
    deg300();
}).mouseover(function () {
    cb13.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    cb13.animate({
        "r": 4
    }, 100);
});;;

// 315 Degrees
var cb14 = ep.circle(center + ((-pi4S) * radius), center2 + ((-pi4C) * radius), 4).attr({
    fill: "#677274",
    stroke: "rgb(11, 9, 11)",
    "stroke-width": 1
}).click(function () {
    deg315();
}).mouseover(function () {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    this.animate({
        "r": 4
    }, 100);
});

ep.circle(center + ((-pi4S) * radius), center2 + ((-pi4C) * radius), 15).attr(discattr).click(function () {
    deg315();
}).mouseover(function () {
    cb14.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    cb14.animate({
        "r": 4
    }, 100);
});;;
// 330 Degrees

var cb15 = ep.circle(center + ((-pi6S) * radius), center2 + ((-pi6C) * radius), 4).attr({
    fill: "#677274",
    stroke: "rgb(11, 9, 11)",
    "stroke-width": 1
}).click(function () {
    deg330();
}).mouseover(function () {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    this.animate({
        "r": 4
    }, 100);
});

ep.circle(center + ((-pi6S) * radius), center2 + ((-pi6C) * radius), 15).attr(discattr).click(function () {
    deg330();
}).mouseover(function () {
    cb15.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    cb15.animate({
        "r": 4
    }, 100);
});;;

// 60 Degrees Right
var cb16 = ep.circle(center + ((-pi12S) * radius), center2 + ((-pi12C) * radius), 4).attr({
    fill: "#677274",
    stroke: "rgb(11, 9, 11)",
    "stroke-width": 1
}).click(function () {
    deg345();
}).mouseover(function () {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    this.animate({
        "r": 4
    }, 100);
});

ep.circle(center + ((-pi12S) * radius), center2 + ((-pi12C) * radius), 15).attr(discattr).click(function () {
    deg345();
}).mouseover(function () {
    cb16.animate({
        "r": 8
    }, 100);
}).mouseout(function () {
    cb16.animate({
        "r": 4
    }, 100);
});;;
// End Course Estimates

//* Target Course Estimate buttons *//
function setCrs() {
    var los = document.getElementById('lOS').value;
    var tc = document.getElementById('tCRS').value;
    var newTheta = (los + 15) % 360;

    //Rotate Own Ship Vector and Baffles to proper orientation

    var rotateTo = (startTheta - newTheta) - 90;
    document.getElementById('tCRS').value = newTheta;
    return false;
}

function deg15() {
    setCrs();
    tgtDraw();
    moDraw();
}

function setCrs1() {
    var los = document.getElementById('lOS').value;
    var tc = document.getElementById('tCRS').value;
    var newTheta = (los + 30) % 360;

    //Rotate Own Ship Vector and Baffles to proper orientation

    var rotateTo = (startTheta - newTheta) - 90;
    document.getElementById('tCRS').value = newTheta;
    return false;
}

function deg30() {
    setCrs1();
    tgtDraw();
     moDraw();
}

function setCrs2() {
    var los = document.getElementById('lOS').value;
    var tc = document.getElementById('tCRS').value;
    var newTheta = (los + 45) % 360;

    //Rotate Own Ship Vector and Baffles to proper orientation

    var rotateTo = (startTheta - newTheta) - 90;
    document.getElementById('tCRS').value = newTheta;
    return false;
}

function deg45() {
    setCrs2();
    tgtDraw();
     moDraw();
}

function setCrs3() {
    var los = document.getElementById('lOS').value;
    var tc = document.getElementById('tCRS').value;
    var newTheta = (los + 60) % 360;

    //Rotate Own Ship Vector and Baffles to proper orientation

    var rotateTo = (startTheta - newTheta) - 90;
    document.getElementById('tCRS').value = newTheta;
    return false;
}

function deg60() {
    setCrs3();
    tgtDraw();
     moDraw();
}

function setCrs4() {
    var los = document.getElementById('lOS').value;
    var tc = document.getElementById('tCRS').value;
    var newTheta = (los + 120) % 360;

    //Rotate Own Ship Vector and Baffles to proper orientation

    var rotateTo = (startTheta - newTheta) - 90;
    document.getElementById('tCRS').value = newTheta;
    return false;
}

function deg120() {
    setCrs4();
    tgtDraw();
     moDraw();
}

function setCrs5() {
    var los = document.getElementById('lOS').value;
    var tc = document.getElementById('tCRS').value;
    var newTheta = (los + 135) % 360;

    //Rotate Own Ship Vector and Baffles to proper orientation

    var rotateTo = (startTheta - newTheta) - 90;
    document.getElementById('tCRS').value = newTheta;
    return false;
}

function deg135() {
    setCrs5();
    tgtDraw();
     moDraw();
}

function setCrs6() {
    var los = document.getElementById('lOS').value;
    var tc = document.getElementById('tCRS').value;
    var newTheta = (los + 150) % 360;

    //Rotate Own Ship Vector and Baffles to proper orientation

    var rotateTo = (startTheta - newTheta) - 90;
    document.getElementById('tCRS').value = newTheta;
    return false;
}

function deg150() {
    setCrs6();
    tgtDraw();
     moDraw();
}

function setCrs7() {
    var los = document.getElementById('lOS').value;
    var tc = document.getElementById('tCRS').value;
    var newTheta = (los + 165) % 360;

    //Rotate Own Ship Vector and Baffles to proper orientation

    var rotateTo = (startTheta - newTheta) - 90;
    document.getElementById('tCRS').value = newTheta;
    return false;
}

function deg165() {
    setCrs7();
    tgtDraw();
     moDraw();
}

function setCrs8() {
    var los = document.getElementById('lOS').value;
    var tc = document.getElementById('tCRS').value;
    var newTheta = (los + 195) % 360;

    //Rotate Own Ship Vector and Baffles to proper orientation

    var rotateTo = (startTheta - newTheta) - 90;
    document.getElementById('tCRS').value = newTheta;
    return false;
}

function deg195() {
    setCrs8();
    tgtDraw();
     moDraw();
}

function setCrs9() {
    var los = document.getElementById('lOS').value;
    var tc = document.getElementById('tCRS').value;
    var newTheta = (los + 210) % 360;

    //Rotate Own Ship Vector and Baffles to proper orientation

    var rotateTo = (startTheta - newTheta) - 90;
    document.getElementById('tCRS').value = newTheta;
    return false;
}

function deg210() {
    setCrs9();
    tgtDraw();
     moDraw();
}

function setCrs10() {
    var los = document.getElementById('lOS').value;
    var tc = document.getElementById('tCRS').value;
    var newTheta = (los + 225) % 360;

    //Rotate Own Ship Vector and Baffles to proper orientation

    var rotateTo = (startTheta - newTheta) - 90;
    document.getElementById('tCRS').value = newTheta;
    return false;
}

function deg225() {
    setCrs10();
    tgtDraw();
     moDraw();
}

function setCrs11() {
    var los = document.getElementById('lOS').value;
    var tc = document.getElementById('tCRS').value;
    var newTheta = (los + 240) % 360;

    //Rotate Own Ship Vector and Baffles to proper orientation

    var rotateTo = (startTheta - newTheta) - 90;
    document.getElementById('tCRS').value = newTheta;
    return false;
}

function deg240() {
    setCrs11();
    tgtDraw();
     moDraw();
}

function setCrs12() {
    var los = document.getElementById('lOS').value;
    var tc = document.getElementById('tCRS').value;
    var newTheta = (los + 300) % 360;

    //Rotate Own Ship Vector and Baffles to proper orientation

    var rotateTo = (startTheta - newTheta) - 90;
    document.getElementById('tCRS').value = newTheta;
    return false;
}

function deg300() {
    setCrs12();
    tgtDraw();
     moDraw();
}

function setCrs13() {
    var los = document.getElementById('lOS').value;
    var tc = document.getElementById('tCRS').value;
    var newTheta = (los + 315) % 360;

    //Rotate Own Ship Vector and Baffles to proper orientation

    var rotateTo = (startTheta - newTheta) - 90;
    document.getElementById('tCRS').value = newTheta;
    return false;
}

function deg315() {
    setCrs13();
    tgtDraw();
     moDraw();
}

function setCrs14() {
    var los = document.getElementById('lOS').value;
    var tc = document.getElementById('tCRS').value;
    var newTheta = (los + 330) % 360;

    //Rotate Own Ship Vector and Baffles to proper orientation

    var rotateTo = (startTheta - newTheta) - 90;
    document.getElementById('tCRS').value = newTheta;
    return false;
}

function deg330() {
    setCrs14();
    tgtDraw();
     moDraw();
}

function setCrs15() {
    var los = document.getElementById('lOS').value;
    var tc = document.getElementById('tCRS').value;
    var newTheta = (los + 345) % 360;

    //Rotate Own Ship Vector and Baffles to proper orientation

    var rotateTo = (startTheta - newTheta) - 90;
    document.getElementById('tCRS').value = newTheta;
    return false;
}

function deg345() {
    setCrs15();
    tgtDraw();
     moDraw();
}

/********** What is the LOS Geometry ************************/

var x = tc - lOS();
if (x >= 180) {
    x = (taDeg - 180);
}



var crsDif = (osCRS() - tCRS()).toFixed(2);

var nta = false;
if ((x <= 15) || (x >= 165)) {
    nta = true;
}

var zbr = false;
if (sideCheck === true && crsDif <= 15 && bRate() <= lowBR && nta === false) {
    zbr = true;
}

var pointing = false;
if (relBrg <= 15 || relBrg >= 345) {
    pointing = true;
}

var lead = false;
if (sideCheck === true && sTa > sOa && zbr === false && pointing === false && nta === false) {
    lead = true;
}

var overlead;
if (sideCheck === true && sOa > sTa && zbr === false && pointing === false && nta === false) {
    overlead = true;
}

var lag = false;
if (sideCheck === false && pointing === false && nta === false) {
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
    maxRange = (Math.abs(sOa / bRate()) * k).toFixed(0);
} else if (geometry == "LAG") {
    maxRange = (Math.abs(sOa + spdT) / bRate() * k).toFixed(0);
} else if (geometry == "LEAD") {
    maxRange = ((spdT - sOa) / bRate() * k).toFixed(0);
} else if (geometry == "POINTING") {
    maxRange = ((spdT * bRate()) * k).toFixed(0);
} else if (geometry == "NTA") {
    maxRange = "-";
} else if (geometry == "ZBR") {
    maxRange = "-";
}




function geoHandlers() {
        
    document.getElementById('losGeo').innerHTML = geometry;
    document.getElementById('maxRNG').innerHTML = maxRange;
    document.getElementById('minRNG').innerHTML = minRange;
    document.getElementById('estRNG').innerHTML = estRange;
    clickers();
}

