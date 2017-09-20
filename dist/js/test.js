	function mobo() {
	 var wide = $("#findr").width();

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

	 var center = wide / 2;
	 var center2 = center;
	 var radius = wide * .45;

	 var crsORad = parseFloat(document.getElementById('osCRS').value) * (pi / 180);
	 var losRad = parseFloat(document.getElementById('LOS').value) * (pi / 180);
	 var crsTRad = parseFloat(document.getElementById('tgtCRS').value) * (pi / 180);
	 var spdO = parseFloat(document.getElementById("osSPD").value, 10);
	 var spdT = parseFloat(document.getElementById("tgtSPD").value, 10);

	 var laSin = Math.sin(crsORad);
	 var laCos = Math.cos(crsORad);
	 var taSin = Math.sin(crsTRad);
	 var taCos = Math.cos(crsTRad);
	 var thetaSin = Math.sin(losRad);
	 var thetaCos = Math.cos(losRad);
	 var pa = losRad + pi / 2;
	 var paSin = Math.sin(pa);
	 var paCos = Math.cos(pa);

	 var rads = spdO * (radius / 20);
	 var tads = spdT * (radius / 20);

	 var nOX = center + ((laSin) * rads);
	 var nOY = center2 + ((-1 * laCos) * rads);

	 var nTX = center + ((taSin) * tads);
	 var nTY = center2 + ((-1 * taCos) * tads);

	 var nLX = center + ((thetaSin) * center * 0.95);
	 var nLY = center2 + ((-1 * thetaCos) * center * 0.95);
	 var nLX0 = center + ((-1 * thetaSin) * center * 0.95);
	 var nLY0 = center2 + ((thetaCos) * center * 0.95);

    //var length = Math.sqrt((nLX0-nLX)*(nLX0-nLX)+(nLY0-nLY)*(nLY0-nLY));
    //var a = {x:nLX0,y:nLY0};
	//var b = {x:nLX,y:nLY}; 
    // var slope = -1 / ((b.y - a.y) / (b.x - a.x));     
          

    var m = (nLY0 - nLY) / (nLX0 - nLX);
    var b = nLY-(m * nLX);
        
    //bottom points    
	 var nPDX = nOX + ((nLX0-nLX));
	 var nPDY = nOY + ((nLY0-nLY));
        
	 //top points
     var nPDX0 = nOX + (-1 * (nLX0 - nLX));
	 var nPDY0 = nOY + (-1 * (nLY0 - nLY)); 
        
	 var nPX = center + ((paSin) * center * 0.5);
	 var nPY = center2 + ((-1 * paCos) * center * 0.5);
	 var nPX0 = center + ((-1 * paSin) * center);
	 var nPY0 = center2 + ((paCos) * center);

		
		
//Test Function of perpendicular lines
			 var nPPX = nOX + (nPX0 - nPX) ;
	 var nPPY = nOY + (nPY0 - nPY) ;
	 var nPPX0 = nOX + (-1 * (nPX0 - nPX)) ;
	 var nPPY0 = nOY + (-1 * (nPY0 - nPY)) ;
		
		
		
	/*	
	 var nPPX = nOX + (nPX0 - nPX) * .85;
	 var nPPY = nOY + (nPY0 - nPY) * .85;
	 var nPPX0 = nOX + (-1 * (nPX0 - nPX)) * .85;
	 var nPPY0 = nOY + (-1 * (nPY0 - nPY)) * .85;
      */  
	 // Own ship Vector

	 var moanim = Raphael.animation({
	  cx: nOX,
	  cy: nOY
	 }, 200);
	 moHandle.animate(moanim);
	 moVectorArray[0][1] = center;
	 moVectorArray[0][2] = center2;
	 moVectorArray[1][1] = nOX;
	 moVectorArray[1][2] = nOY;
	 moVector.attr({
	  path: moVectorArray
	 });

	 // Target Vector

	 var toanim = Raphael.animation({
	  cx: nTX,
	  cy: nTY
	 }, 1e1);
	 toHandle.animate(moanim);
	 toVectorArray[0][1] = center;
	 toVectorArray[0][2] = center;
	 toVectorArray[1][1] = nTX;
	 toVectorArray[1][2] = nTY;
	 toVector.attr({
	  path: toVectorArray
	 });

	 // LOS Vector

	 var lVectorArray = lVector.attr("path");
	 lVectorArray[0][1] = nLX0;
	 lVectorArray[0][2] = nLY0;
	 lVectorArray[1][1] = nLX;
	 lVectorArray[1][2] = nLY;
	 lVector.attr({
	  path: lVectorArray,
	 });

	 // Parallel Vector
    
	 var pdVectorArray = pdVector.attr("path");
	 pdVectorArray[0][1] = nPDX0;
	 pdVectorArray[0][2] = nPDY0;
	 pdVectorArray[1][1] = nPDX;
	 pdVectorArray[1][2] = nPDY;
	 pdVector.attr({
	  path: pdVectorArray
	 });

    
        
	 // Perpendicular Vector

	 var ppVectorArray = ppVector.attr("path");
	 ppVectorArray[0][1] = nPPX0;
	 ppVectorArray[0][2] = nPPY0;
	 ppVectorArray[1][1] = nPPX;
	 ppVectorArray[1][2] = nPPY;
	 ppVector.attr({
	  path: ppVectorArray
	 });

	 // Data Circles
	 var marbRad = parseInt(document.getElementById("maxRNG").innerHTML, 10);
	 var mirbRad = parseInt(document.getElementById("minRNG").innerHTML, 10);
	 var erbRad = parseInt(document.getElementById("estRNG").innerHTML, 10);

	 tdz.animate({
	  r: tads
	 }, 100);

	 mirb.animate({
	  r: mirbRad / 100
	 }, 100);

	 marb.animate({
	  r: marbRad / 100
	 }, 100);

	 erb.animate({
	  r: erbRad / 100
	 }, 100);
}






//moboard test stuff
function losDraw() {
    var cx = wide / 2;
    var cy = cx;

    var mlV = r.select("#losVector");	
	var lOs = lOS();

	//Describe LOS's Vector length, start and end points
    var losLength = Snap.path.getTotalLength(mlV);
    var endPoints = Snap.path.getPointAtLength(mlV, losLength);
    var startPoints = Snap.path.getPointAtLength(mlV, 0);
	
	var sx = startPoints.x;
	var sy = startPoints.y;
    var ex = endPoints.x;
    var ey = endPoints.y;	
	
    var nLX1 = cx + (Math.sin(lOs) * cx );
	var nLY1 = cy + ((-1 * Math.cos(lOs)) * cx);
	var nLX2 = cx + ((-1 * Math.sin(lOs)) * cx);
	var nLY2 = cy + (Math.cos(lOs) * cx); 
	
    //Rotate LOS and TBO to proper orientation   
    /*var newTheta = Snap.deg(lOs);

    var rotateTo = (newTheta);
	
	
    mlV.attr({
        transform: "rotate(" + -1 * rotateTo + " " + cx + " " + cy + ")"
    }); */
    
    mlV.attr('d')
    var pathStringL ='M '+ (nLX1) + ' ' + (nLY1) + ', L ' + (nLX2) + ' ' + (nLY2);
    mlV.animate({d: pathStringL}, 0, mina.easeout);

	
	
}

function paraDraw(){
    var cx = wide / 2;
    var cy = cx;
    
	var lOs = lOS();
	var los90 = lOs+pi2;
	var oc = osCRS();
	var sin90 = Math.sin(los90);
	var cos90 = Math.cos(los90);
	
	
	var mpV = r.select("#parVector");
	var moV = r.select("#moVector");
    
	 //pdVectorArray[0][1] = nPDX0; start x
	 //pdVectorArray[0][2] = nPDY0; start y
	 //pdVectorArray[1][1] = nPDX;  end x
	 //pdVectorArray[1][2] = nPDY;  end y
	
	//bottom points    
	 //var nPDX = ex + ((nLX0-nLX));
	 //var nPDY = ey + ((nLY0-nLY));
        
	 //top points
     //var nPDX0 = nOX + (-1 * (nLX0 - nLX));
	 //var nPDY0 = nOY + (-1 * (nLY0 - nLY)); 

	
    
//Describe Own Ship's Vector length, start and end points
   var oLength = Snap.path.getTotalLength(moV);
   var endPoints = Snap.path.getPointAtLength(moV, oLength); 
   var ex = endPoints.x;
   var ey = endPoints.y;
	
	
	 //Describe Own Ship's Vector length, start and end points
	var los2 = lOs+pi2;
	
    var os = osSPD();
    var rads = os * (wide * 0.45 / 20);
	
	//Parallel points    
	 var nPDX = ex + sin90;
	 var nPDY = ey + ((-1 * cos90) * ex);
     var nPDX0 = ex + ((-1 * sin90) * ex);
	 var nPDY0 = ey + (cos90 * ex);
	
	// Draw a normal to the line above
    mpV.attr('d')
    var pathString ='M '+ (nPDX0) + ' ' + (nPDY0) + ', L ' + (nPDX) + ' ' + (nPDY);
    mpV.animate({d: pathString}, 0, mina.easeout);

}
