$(document).ready(function() {
		
	//some variables
	var r, g, b, gray;
	var character, line = "";
	
	//sprite stuff
	var sprite = document.getElementById("sprite");
	var W = sprite.width;
	var H = sprite.height;
	
	//temporary canvas for pixel processing
	var tcanvas = document.createElement("canvas");
	tcanvas.width = W;
	tcanvas.height = H; //same as the image
	var tc = tcanvas.getContext("2d");
	//painting the canvas white before painting the image to deal with pngs
	tc.fillStyle = "white";
	tc.fillRect(0, 0, W, H);
	//drawing the image on the canvas
	tc.drawImage(sprite, 0, 0, W, H);
	
	//accessing pixel data
	var pixels = tc.getImageData(0, 0, W, H);
	var colordata = pixels.data;
	//every pixel gives 4 integers -> r, g, b, a
	//so length of colordata array is W*H*4
	var ascii = document.getElementById("ascii");
	for(var i = 0; i < colordata.length; i = i+4)
	{
		r = colordata[i];
		g = colordata[i+1];
		b = colordata[i+2];
		//converting the pixel into grayscale
		gray = r*0.34 + g*0.5 + b*0.16;
		//overwriting the colordata array with grayscale values
		colordata[i] = colordata[i+1] = colordata[i+2] = gray;
		
		//text for ascii art.
		//blackish = dense characters like "W", "@"
		//whitish = light characters like "`", "."
		if(gray > 250) character = " "; //almost white
		else if(gray > 230) character = "`";
		else if(gray > 200) character = ":";
		else if(gray > 175) character = "*";
		else if(gray > 150) character = "+";
		else if(gray > 125) character = "#";
		else if(gray > 50) character = "W";
		else character = "@"; //almost black
		
		//newlines and injection into dom
		if(i != 0 && (i/4)%W == 0) //if the pointer reaches end of pixel-line
		{
			ascii.appendChild(document.createTextNode(line));
			//newline
			ascii.appendChild(document.createElement("br"));
			//emptying line for the next row of pixels.
			line = "";
		}
		
		line += character;
	}
	
	var frames = 10;
	var container = document.getElementById("asciiContainer");
	var frame_width = parseInt(window.getComputedStyle(container).width)/frames;
	container.style.width = frame_width + "px";

	ascii.style.marginLeft = "0";

	setInterval(loop, 1000/10);

	function loop()
	{
		var current_ml = parseFloat(ascii.style.marginLeft);
		if (current_ml == frame_width*(frames-1)*(-1))
		{
			ascii.style.marginLeft = 0;
		} else {
			ascii.style.marginLeft = (current_ml - frame_width) + "px";
		}
	}
});
