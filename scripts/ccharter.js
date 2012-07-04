var ChordCharter = {
	
	drawChord: function (canvasId, originX, originY, chordName, chordFrets) {

		var chord = {
			name: chordName,
			frets: chordFrets
		};
	
		var c=document.getElementById(canvasId);
		var ctx=c.getContext("2d");
		ctx.fillStyle="#000";
	
		var origin = { x: originX, y: originY };
		var props = { width: 50, height: 60 };
	
		// horizontals
	
		for (counter in new Array(0, 1, 2, 3, 4)) {
			ctx.moveTo(origin.x - 1, origin.y + (counter * props.height / 4));
			ctx.lineTo(origin.x + props.width + 1, origin.y + (counter * props.height / 4));
			ctx.stroke();
		}
	
		// verts
	
		for (counter in new Array(0, 1, 2, 3, 4, 5)) {
			ctx.moveTo(origin.x + (counter * props.width / 5), origin.y);
			ctx.lineTo(origin.x + (counter * props.width / 5), origin.y + props.height);
			ctx.stroke();
		}
	
		ctx.stroke();
	
		// label
	
		ctx.font = "bold 10pt Verdana";
		ctx.textAlign = "center";
		ctx.fillText(chord.name, origin.x + props.width / 2, origin.y - 5);
		ctx.font = "7pt Verdana";
	
		// If any dots are after 4, adjust the root to be the lowest non-zero fret
		// If the root is zero , thicken the top fret
	
		var baseFret = 0;
		var adjBaseFret = false;
		var lowestFret = 0;
	
		for (j=0; j < chord.frets.length; j++) {
			if (chord.frets.charAt(j) != 'x' && chord.frets.charAt(j) != 'X' && chord.frets.charAt(j) > 0) {
				if (chord.frets.charAt(j) < lowestFret || lowestFret == 0) {
					lowestFret = chord.frets.charAt(j);
				}
				if (chord.frets.charAt(j) > 4) {
					adjBaseFret = true;
				}
			}
		}
	
		if (adjBaseFret) {
			baseFret = lowestFret - 1;
		}
	
		// dots
	
		var dotsize = 3.5;
	
		var i = 0;
	
		for (j=0; j < chord.frets.length; j++) {
	
			ctx.alignText = "left";
			ctx.fillText(chord.frets.charAt(j), origin.x + (i * props.width / 5), origin.y + props.height + 12);
	
			if (chord.frets.charAt(j) == 0) {
	
	
			} else if (chord.frets.charAt(j) == 'x' || chord.frets.charAt(j) == 'X') {
	
			} else {
				ctx.beginPath();
				ctx.arc(origin.x + (i * props.width / 5), origin.y - 7.5 + (15 * (chord.frets.charAt(j) - baseFret)), dotsize, 0, Math.PI*2,true);
				ctx.closePath();
				ctx.fill();
			}
			i++;
		}
	
		// base fret indicator
	
		if (baseFret > 0) {
			ctx.alignText = "left";
			ctx.fillText(baseFret + 1, origin.x - 10, origin.y + 11);
		} else {
			ctx.alignText = "left";
			ctx.fillText("3", origin.x - 10, origin.y + 41);
		}
	}
};