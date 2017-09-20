//Window Onload Event Handlers
function addEventHandler(oNode, evt, oFunc, bCaptures) {
    if (typeof(window.event) != "undefined")
        oNode.attachEvent("on" + evt, oFunc);
    else
        oNode.addEventListener(evt, oFunc, bCaptures);
}

function getEventTarget(e) {
    if (window.event) return window.event.srcElement;
    else return e.target;

}

//Set Up SVG Graphics
var wide = Math.floor($("#mobo").width());
var high = $("#mobo").height();
var r = Snap("#mobosvg");
$(function() {
  $("#mobosvg").width(wide).height(wide);
});

var w = Math.floor($("#holder").width());
var h = w*1.425;
var paper = Snap("#evalsvg");
$(function() {
  $("#holder").width(w).height(h);
});
// Constants

var pi = Math.PI;
var k = 1934;
var top = 0;

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

var center = Math.round(w / 3);
var center2 = center * 1.25;
var radius = (w / 3.25);

// Defined SVG attributes

discattr = {
    fill: "transparent",
    stroke: "transparent",
    "stroke-width": 3
};

    var pathParams = {
        stroke: "#7f8c8d",
        "stroke-width": 1
    };

    var losParams = {
        stroke: "#ecf0f1",
        "stroke-width": 2,
        "arrow-end": 'block-wide-long'
    };

    var minorParams = {
        stroke: "#7f8c8d",
        "stroke-width": 1.5
    };

    var narrowParams = {
        stroke: "#7f8c8d",
        "stroke-width": 1,
        opacity: 0.5
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
        stroke: "#7f8c8d",
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

    r.dragging = false;
    r.highlight = false;

    var center = wide / 2;
    var center2 = wide / 2;
    var radius = wide * 0.45;
    var radius2 = wide * 0.436;
    var radius3 = wide * 0.43;
    var radius4 = wide * 0.42;
    var radius5 = wide * 0.46;


    //Baffle Modification Test

    var baffle = r.path([
        ["M", center, center2],
        ["L", center, center2],
        ["A", radius, radius, 0, 0, 0, center, center2],
        ["z"]
    ]).attr({
        fill: "#000",
        opacity: "0.1",
        stroke: "#2980b9",
        "stroke-width": 0
    });
    baffle.node.id = "baffle";

    var baffleArray = baffle.attr("path");

    for (var i = 0; i < 360; i++) {
        var theta = i * (Math.PI / 180);
        var cos = Math.cos(theta);
        var sin = Math.sin(theta);

        sector = r.path([
            ["M", center + radius * cos, center2 + radius * sin],
            ["L", center + radius2 * cos, center2 + radius2 * sin]
        ]).attr(narrowParams);

    }

    for (var i = 0; i < 36; i++) {
        var theta = i * 10 * (Math.PI / 180);
        var cos = Math.cos(theta);
        var sin = Math.sin(theta);

        tick = r.path([
            ["M", center + radius * cos, center2 + radius * sin],
            ["L", center + radius3 * cos, center2 + radius3 * sin]
        ]).attr(minorParams);

    }

    for (var i = 0; i < 36; i++) {
        var theta = i * 10 * (Math.PI / 180);
        var cos = Math.cos(theta);
        var sin = Math.sin(theta);
        dotick = r.path([
            ["M", center, center2],
            ["L", center + radius * cos, center2 + radius * sin]
        ]).attr(dotParams);
    }
//Inner Circles
    for (var i = 0; i < 10; i++) {
        var rad = i * (radius / 10);
        circ = r.circle(center, center2, rad).attr(dotParams);
    }


    // Labels
    for (var i = 0; i < 36; i++) {
        var radius = wide * 0.465;
        var theta = i * 10 * (Math.PI / 180);
        var cos = Math.cos(theta);
        var sin = Math.sin(theta);

        label = r.text(center + (radius * 1.02 * sin), center2 + (radius * 1.02 * (-1 * cos)), [
            [Math.round(theta * (180 / Math.PI), 0)]
        ]).attr(textParams);
    }

    for (var i = 0; i < 36; i++) {
        var radius = wide * 0.43;
        var theta = i * 10 * (Math.PI / 180);
        var cos = Math.cos(theta);
        var sin = -1 * Math.sin(theta);

        label1 = r.text(center + (radius * sin), center2 + (radius * cos), [
            [Math.round(theta * (180 / Math.PI), 0)]
        ]).attr(textParams1);
    }

    // Target Speed Bubble
    tdz = r.circle(center, center, 0).attr({
        fill: "#e74c3c",
        stroke: "#7f8c8d",
        "stroke-width": 1,
        opacity: 0.5
    });

    //Center Circle
    r.circle(center, center2, radius / 10).attr({
        fill: "#7f8c8d",
        "stroke-width": 0
    });

    r.circle(center, center2, radius / 10).attr({
        fill: "#0d1217",
        stroke: "#1D2833",
        "stroke-width": 1
    });

}

// Set Up Evaluator Plot Graphics
function evalPlot() {
    paper.dragging = false;
    paper.highlight = false;

    var center = Math.round(w / 3);
    var center2 = w / 2;
    var radius = w / 3.25;

    // Center Line
    paper.path([
        ["M", center, center * 0.25],
        ["L", center, center * 4.25]
    ]).attr(pathParams);

    // Target Cross line
    paper.path([
        ["M", center * 0, center * 1.25],
        ["L", center * 2, center * 1.25]
    ]).attr(pathParams);

    //Target Circle    
    // main circle for target
    tc = paper.circle(center, center * 1.25, radius).attr(dotParams);

    /* tc.glow({
        width: 18, opacity: .15,
        fill: false, color: "#7f8c8d", offset: 2       
    }); */

    //OS Cross Line

    paper.path([
        ["M", center * 0, center2 * 2.15],
        ["L", center * 2, center2 * 2.15]
    ]).attr(pathParams);

    var tVector = paper.path([
        ["M", center, center * 1.25],
        ["L", center, center * 1.25]
    ]).attr({
        stroke: "#e74c3c",
        "stroke-width": 1
    });

    //Center Circle
    paper.circle(center, center * 1.25, 4).attr({
        fill: "#e74c3c",
        stroke: "#0D1217",
        "stroke-width": 1
    });

    tLength = tVector.getTotalLength();
    tVector.node.id = "tVector";
    var tVectorArray = tVector.attr("path");
    tHandle = paper.circle(center, (center*1.25)+radius, 4).attr({
        fill: "#e74c3c",
        stroke: "#0D1217",
        "stroke-width": 1,
        cursor: "move",
    });

    tHandle.node.id = "tcap"

    // Own Ship Circle
    var oCircle = paper.circle(center, center2 * 2.15, radius).attr(dotParams);
    /* oCircle.glow({
        width: 18, opacity: .15,
        fill: false, color: "#7f8c8d", offset: 2
    }); */

    var oVector = paper.path([
        ["M", center, center2 * 2.15],
        ["L", center, (center2 * 2.15)-radius]
    ]).attr({
        stroke: "#2980b9",
        "stroke-width": 1
    });

    paper.circle(center, center2 * 2.15, 4).attr({
        fill: "#2980b9",
        stroke: "#0D1217",
        "stroke-width": 1
    });
    var oBaffle = paper.path([
        ["M", center, center2 * 2.15],
        ["L", center, center2 * 1.8],
        ["A", radius, radius, 0, 0, 0, center, center2 * 1.79],
        ["z"]
    ]).attr({
        fill: "#2980b9",
        opacity: ".5",
        stroke: "#2980b9",
        "stroke-width": 1
    });
    oBaffle.node.id = "oBaffle";
    oVector.node.id = "oVector";

    var oBaffleArray = oBaffle.attr("path");
    var oVectorArray = oVector.attr("path");
    oHandle = paper.circle(center, (center2 * 2.15)-radius, 4).attr({
        fill: "#2980b9",
        stroke: "#0D1217",
        "stroke-width": 1,
        cursor: "move",
    });
    oHandle.node.id = "ocap";
}

// 15-30-45-60 Course Guesser Buttons
// Target Course Vectors Based on LOS
// 15 degrees
var cb1 = paper.circle(center + ((pi12S) * radius), center2 + ((-pi12C) * radius), 4).attr({
    fill: "#677274",
    stroke: "#0D1217",
    "stroke-width": 1
}).mouseover(function() {
    cb1.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    cb1.animate({
        "r": 4
    }, 100);
});

cb1.node.id = "cBtn1";
cb1.node.onclick = function() {
    deg15();
}
paper.circle(center + ((pi12S) * radius), center2 + ((-pi12C) * radius), 15).attr(discattr).click(function() {
    deg15();
}).mouseover(function() {
    cb1.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    cb1.animate({
        "r": 4
    }, 100);
});;;

// 30 degrees						
var cb2 = paper.circle(center + ((pi6S) * radius), center2 + ((-pi6C) * radius), 4).attr({
    fill: "#677274",
    stroke: "#0D1217",
    "stroke-width": 1
}).mouseover(function() {
    cb2.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    cb2.animate({
        "r": 4
    }, 100);
});
cb2.node.id = "cBtn2";
cb2.node.onclick = function() {
    deg30();
}
paper.circle(center + ((pi6S) * radius), center2 + ((-pi6C) * radius), 15).attr(discattr).click(function() {
    deg30();
}).mouseover(function() {
    cb2.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    cb2.animate({
        "r": 4
    }, 100);
});;;

// 45 degrees
var cb3 = paper.circle(center + ((pi4S) * radius), center2 + ((-pi4C) * radius), 4).attr({
    fill: "#677274",
    stroke: "#0D1217",
    "stroke-width": 1
}).mouseover(function() {
    cb3.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    cb3.animate({
        "r": 4
    }, 100);
});
cb3.node.id = "cBtn3";
cb3.node.onclick = function() {
    deg45();
}

paper.circle(center + ((pi4S) * radius), center2 + ((-pi4C) * radius), 15).attr(discattr).click(function() {
    deg45();
}).mouseover(function() {
    cb3.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    cb3.animate({
        "r": 4
    }, 100);
});;;

// 60 degrees
var cb4 = paper.circle(center + ((pi3S) * radius), center2 + ((-pi3C) * radius), 4).attr({
    fill: "#677274",
    stroke: "#0D1217",
    "stroke-width": 1
}).click(function() {
    deg60();
}).mouseover(function() {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    this.animate({
        "r": 4
    }, 100);
});
paper.circle(center + ((pi3S) * radius), center2 + ((pi3C) * radius), 15).attr(discattr).click(function() {
    deg60();
}).mouseover(function() {
    cb4.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    cb4.animate({
        "r": 4
    }, 100);
});;;

// 120 degrees
var cb5 = paper.circle(center + ((pi3S) * radius), center2 + ((pi3C) * radius), 4).attr({
    fill: "#677274",
    stroke: "#0D1217",
    "stroke-width": 1
}).click(function() {
    deg120();
}).mouseover(function() {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    this.animate({
        "r": 4
    }, 100);
});

paper.circle(center + ((pi3S) * radius), center2 + ((pi3C) * radius), 15).attr(discattr).click(function() {
    deg120();
}).mouseover(function() {
    cb5.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    cb5.animate({
        "r": 4
    }, 100);
});;;

// 135 degrees
var cb6 = paper.circle(center + ((pi4S) * radius), center2 + ((pi4C) * radius), 4).attr({
    fill: "#677274",
    stroke: "#0D1217",
    "stroke-width": 1
}).click(function() {
    deg135();
}).mouseover(function() {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    this.animate({
        "r": 4
    }, 100);
});

paper.circle(center + ((pi4S) * radius), center2 + ((pi4C) * radius), 4).attr(discattr).click(function() {
    deg135();
}).mouseover(function() {
    cb6.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    cb6.animate({
        "r": 4
    }, 100);
});;;

// 150 degrees
var cb7 = paper.circle(center + ((pi6S) * radius), center2 + ((pi6C) * radius), 4).attr({
    fill: "#677274",
    stroke: "#0D1217",
    "stroke-width": 1
}).click(function() {
    deg150();
}).mouseover(function() {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    this.animate({
        "r": 4
    }, 100);
});

paper.circle(center + ((pi6S) * radius), center2 + ((pi6C) * radius), 15).attr(discattr).click(function() {
    deg150();
}).mouseover(function() {
    cb7.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    cb7.animate({
        "r": 4
    }, 100);
});;;

// 165 degrees
var cb8 = paper.circle(center + ((pi12S) * radius), center2 + ((pi12C) * radius), 4).attr({
    fill: "#677274",
    stroke: "#0D1217",
    "stroke-width": 1
}).click(function() {
    deg165();
}).mouseover(function() {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    this.animate({
        "r": 4
    }, 100);
});
paper.circle(center + ((pi12S) * radius), center2 + ((pi12C) * radius), 15).attr(discattr).click(function() {
    deg165();
}).mouseover(function() {
    cb8.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    cb8.animate({
        "r": 4
    }, 100);
});;;

// 195 degrees				
var cb9 = paper.circle(center + ((-pi12S) * radius), center2 + ((pi12C) * radius), 4).attr({
    fill: "#677274",
    stroke: "#0D1217",
    "stroke-width": 1
}).click(function() {
    deg195();
}).mouseover(function() {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    this.animate({
        "r": 4
    }, 100);
});

paper.circle(center + ((-pi12S) * radius), center2 + ((pi12C) * radius), 15).attr(discattr).click(function() {
    deg195();
}).mouseover(function() {
    cb9.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    cb9.animate({
        "r": 4
    }, 100);
});;;

// 210 degrees	
var cb10 = paper.circle(center + ((-pi6S) * radius), center2 + ((pi6C) * radius), 4).attr({
    fill: "#677274",
    stroke: "#0D1217",
    "stroke-width": 1
}).click(function() {
    deg210();
}).mouseover(function() {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    this.animate({
        "r": 4
    }, 100);
});

paper.circle(center + ((-pi6S) * radius), center2 + ((pi6C) * radius), 15).attr(discattr).click(function() {
    deg210();
}).mouseover(function() {
    cb10.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    cb10.animate({
        "r": 4
    }, 100);
});;;

// 245 degrees
var cb11 = paper.circle(center + ((-pi3S) * radius), center2 + ((pi3C) * radius), 4).attr({
    fill: "#677274",
    stroke: "#0D1217",
    "stroke-width": 1
}).click(function() {
    deg240();
}).mouseover(function() {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    this.animate({
        "r": 4
    }, 100);
});
paper.circle(center + ((-pi3S) * radius), center2 + ((pi3C) * radius), 15).attr(discattr).click(function() {
    deg240();
}).mouseover(function() {
    cb11.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    cb11.animate({
        "r": 4
    }, 100);
});;;

// 225 degrees

var cb12 = paper.circle(center + ((-pi4S) * radius), center2 + ((pi4C) * radius), 4).attr({
    fill: "#677274",
    stroke: "#0D1217",
    "stroke-width": 1
}).click(function() {
    deg225();
}).mouseover(function() {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    this.animate({
        "r": 4
    }, 100);
});
paper.circle(center + ((-pi4S) * radius), center2 + ((pi4C) * radius), 15).attr(discattr).click(function() {
    deg225();
}).mouseover(function() {
    cb12.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    cb12.animate({
        "r": 4
    }, 100);
});;;

// 300 Degrees Left
var cb13 = paper.circle(center + ((-pi3S) * radius), center2 + ((-pi3C) * radius), 4).attr({
    fill: "#677274",
    stroke: "#0D1217",
    "stroke-width": 1
}).click(function() {
    deg300();
}).mouseover(function() {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    this.animate({
        "r": 4
    }, 100);
});
paper.circle(center + ((-pi3S) * radius), center2 + ((-pi3C) * radius), 15).attr(discattr).click(function() {
    deg300();
}).mouseover(function() {
    cb13.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    cb13.animate({
        "r": 4
    }, 100);
});;;

// 315 Degrees
var cb14 = paper.circle(center + ((-pi4S) * radius), center2 + ((-pi4C) * radius), 4).attr({
    fill: "#677274",
    stroke: "#0D1217",
    "stroke-width": 1
}).click(function() {
    deg315();
}).mouseover(function() {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    this.animate({
        "r": 4
    }, 100);
});

paper.circle(center + ((-pi4S) * radius), center2 + ((-pi4C) * radius), 15).attr(discattr).click(function() {
    deg315();
}).mouseover(function() {
    cb14.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    cb14.animate({
        "r": 4
    }, 100);
});;;
// 330 Degrees

var cb15 = paper.circle(center + ((-pi6S) * radius), center2 + ((-pi6C) * radius), 4).attr({
    fill: "#677274",
    stroke: "#0D1217",
    "stroke-width": 1
}).click(function() {
    deg330();
}).mouseover(function() {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    this.animate({
        "r": 4
    }, 100);
});

paper.circle(center + ((-pi6S) * radius), center2 + ((-pi6C) * radius), 15).attr(discattr).click(function() {
    deg330();
}).mouseover(function() {
    cb15.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    cb15.animate({
        "r": 4
    }, 100);
});;;

// 60 Degrees Right
var cb16 = paper.circle(center + ((-pi12S) * radius), center2 + ((-pi12C) * radius), 4).attr({
    fill: "#677274",
    stroke: "#0D1217",
    "stroke-width": 1
}).click(function() {
    deg345();
}).mouseover(function() {
    this.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    this.animate({
        "r": 4
    }, 100);
});

paper.circle(center + ((-pi12S) * radius), center2 + ((-pi12C) * radius), 15).attr(discattr).click(function() {
    deg345();
}).mouseover(function() {
    cb16.animate({
        "r": 8
    }, 100);
}).mouseout(function() {
    cb16.animate({
        "r": 4
    }, 100);
});;;
// End Course Estimates


//showpage provides virtual page functionality by chaning the css display property on "virtual" pages. 
function showpage(id) {
    clearpages()
    var page = document.getElementById('page' + id);
    page.style.display = "block";
}

function clearpages() {
    for (var i = 1; i <= 9; i++) {
        var pages = document.getElementById('page' + i);
        pages.style.display = "none";
    }
}


// SLB Range Logic

//Eventhandler to draw SVG graphics
addEventHandler(window, "load", moBoard, false);
addEventHandler(window, "load", evalPlot, false);


//Vector Drawing Functions

// Draw course vector for own ship
function oscDraw() {
        var center2 = (w / 2) * 2.15;


        var crsORad = parseFloat(document.getElementById('osCRS').value) * (Math.PI / 180);
        var losRad = parseFloat(document.getElementById('lOS').value) * (Math.PI / 180);

        if (isNaN(losRad)) {
            losRad = (Math.floor((360 / pi)));
        }
        if (isNaN(crsORad)) {
            crsORad = (Math.floor((90 / pi)));
        }

        var laSin = Math.sin(crsORad - losRad);
        var laCos = Math.cos(crsORad - losRad);

        var nOX = center + ((laSin) * radius);
        var nOY = center2 + ((-1 * laCos) * radius);

        //end fire bearings
        var endFire1 = (Math.sin(((crsORad - losRad) + pi) + 0.5));
        var endFire2 = (Math.cos(((crsORad - losRad) + pi) + 0.5));
        var endFire3 = (Math.sin(((crsORad - losRad) + pi) - 0.5));
        var endFire4 = (Math.cos(((crsORad - losRad) + pi) - 0.5));

        var eFX1 = center + ((endFire1) * radius);
        var eFY1 = center2 + ((-1 * endFire2) * radius);
        var eFX2 = center + ((endFire3) * radius);
        var eFY2 = center2 + ((-1 * endFire4) * radius);

        var oanim = Snap.animation({
            cx: nOX,
            cy: nOY
        }, 200);
        oHandle.animate(oanim);
	var oBaffle = $("#oBaffle");
    	var oVector = $("#oVector");

    var oBaffleArray = oBaffle.attr("path");
    var oVectorArray = oVector.attr("path");
	

console.log($("#oBaffle").attr("path"));

     /*   oBaffleArray[1][1] = eFX1;
        oBaffleArray[1][2] = eFY1;
        oBaffleArray[2][6] = eFX2;
        oBaffleArray[2][7] = eFY2;
        oBaffle.attr({
            path: oBaffleArray
        });

        evalPlot.oVectorArray[1][1] = nOX;
        evalPlot.oVectorArray[1][2] = nOY;
        evalPlot.oVector.attr({
            path: oVectorArray
        });  */
    }

    // Draw course vector for target
    function tgtDraw() {
        var w = $("#holder").width();

        var pi = Math.PI;

        var center = Math.round(w / 3);
        var center2 = center * 1.25;
        var radius = (w / 3.25);

        var losRad = parseFloat(document.getElementById('LOS').value) * (pi / 180);
        var crsTRad = parseFloat(document.getElementById('tgtCRS').value) * (pi / 180);

        var taSin = Math.sin(crsTRad - losRad);
        var taCos = Math.cos(crsTRad - losRad);

        var nTX = center + (taSin * radius);
        var nTY = center2 + ((-1 * taCos) * radius);

        var tanim = Snap.animation({
            cx: nTX,
            cy: nTY
        }, 1e1);
        tHandle.animate(tanim);

        tVectorArray[1][1] = nTX;
        tVectorArray[1][2] = nTY;
        tVector.attr({
            path: tVectorArray
        });

    }


    // Functions handle user inputs for Own Ship and Target Speed

    function ossHandler() {
        var losRad = parseFloat($('#lOS').val() * (pi / 180));
        var crsORad = parseFloat($('#osCRS').val() * (pi / 180));
        var llTheta = Math.abs(crsORad - losRad);
        var spdO = parseFloat(document.getElementById("osSPD").value, 10);
        var sinTheta = spdO * Math.sin(llTheta);
        var cosTheta = spdO * Math.cos(llTheta);
        var sOa = Math.abs(sinTheta.toFixed(1));
        if (isNaN(sOa)) {
            sOa = "0.0";
        }
        var sOi = cosTheta.toFixed(1);
        if (isNaN(sOi)) {
            sOi = "0.0";
        }
        document.getElementById('soaRO').textContent = sOa + ' kts';
        document.getElementById('soiRO').textContent = sOi + ' kts';
    }

    function tsHandler() {
        var losRad = parseFloat($('#lOS').val() * (pi / 180));
        var crsTRad = parseFloat($('#tCRS').val() * (pi / 180));
        var taTheta = (crsTRad - losRad);
        var spdT = parseFloat(document.getElementById("tSPD").value, 10);
        var sinTheta = spdT * Math.sin(taTheta);
        var cosTheta = spdT * Math.cos(taTheta);
        var sTa = Math.abs(sinTheta.toFixed(1));
        if (isNaN(sTa)) {
            sTa = "0.0";
        }
        var sTi = cosTheta.toFixed(1);
        if (isNaN(sTi)) {
            sTi = "0.0";
        }

        document.getElementById('staRO').textContent = sTa + ' kts';
        document.getElementById('stiRO').textContent = sTi + ' kts';
    }


    function brHandler() {
        console.log("brHandler fired");
    }


    function sideChecker() {
        var losRad = parseFloat($('#lOS').val() * (pi / 180));
        var crsORad = parseFloat($('#osCRS').val() * (pi / 180));
        var crsTRad = parseFloat($('#tCRS').val() * (pi / 180));
        var llTheta = (crsORad - losRad);
        var taTheta = (crsTRad - losRad);
        var sinLL = Math.sin(llTheta);
        var sinTA = Math.sin(taTheta);

        var side = false;
        if (sinLL < 0 && sinTA < 0) {
            side = true;
        } else if (sinLL >= 0 && sinTA >= 0) {
            side = true;
        } else {
            side = false;
        }
        console.log(sinLL, sinTA, side);
    }

    // Functions handle user inputs for Own Ship and Target Course

    function oscHandler() {
        var losRad = parseFloat($('#lOS').val() * (pi / 180));
        var crsORad = parseFloat($('#osCRS').val() * (pi / 180));
        var spdO = parseFloat($("#osSPD").val());
        var llTheta = (crsORad - losRad);
        var sinTheta = Math.sin(llTheta);

        ossHandler();
        oscDraw();
        sideChecker();
    };


    function tcHandler() {
        var losRad = parseFloat($('#lOS').val() * (pi / 180));
        var crsTRad = parseFloat($('#osCRS').val() * (pi / 180));
        var spdT = parseFloat($("#osSPD").val());
        var taTheta = Math.abs(crsTRad - losRad);
        var sinTheta = Math.sin(taTheta);


        tsHandler();
        sideChecker();
    }


    function losHandler() {
        oscHandler();
        ossHandler();
        tcHandler();
        tsHandler();
        sideChecker();
    }

    //Initialize Event Handlers for user inputs
    // Own Ship Course 
    document.getElementById("oCRS").addEventListener("input", oscHandler);
    document.getElementById("oSPD").addEventListener("input", ossHandler);
    document.getElementById("lOS").addEventListener("input", losHandler);
    document.getElementById("tCRS").addEventListener("input", tcHandler);
    document.getElementById("tSPD").addEventListener("input", tsHandler);
    document.getElementById("bRate").addEventListener("input", brHandler);