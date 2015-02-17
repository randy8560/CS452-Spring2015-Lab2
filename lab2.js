/*
	Randy Parisi
	Lab2
	Description: 2d shape movement
*/

var canvas;
var gl;

var NumVertices  = 3;

var points = [];
var colors = [];

var xpos = 0.0;
var ypos = 0.0;

var translationMat4 = mat4(); 

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	translationMat4 = translate(xpos,ypos,0);

	//Keys
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
	
	//Triangle and Colors
    points = new Float32Array([-.25, -.25,0,1, 0, .25, 0,1,.25, -.25,0,1]);
	colors = new Float32Array([0,1,0,1,0,0,0,0,1]);

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

	translationMat4z = gl.getUniformLocation(program, "translationMatrix"); 

    render();
}

  var filter = 0;
    var currentlyPressedKeys = {};
    function handleKeyDown(event) {
        currentlyPressedKeys[event.keyCode] = true;
        if (String.fromCharCode(event.keyCode) == "A") {
			xpos -= .1;
        }
		if (String.fromCharCode(event.keyCode) == "D") {
			xpos += .1;
        }
		if (String.fromCharCode(event.keyCode) == "W") {
			ypos += .1;
        }
		if (String.fromCharCode(event.keyCode) == "S") {
			ypos -= .1;
        }
		if (String.fromCharCode(event.keyCode) == "1") {
			xpos = 0;
			ypos = 0;
        }
    }
    function handleKeyUp(event) {
        currentlyPressedKeys[event.keyCode] = false;
    }

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT);
	
	translationMat4 = translate(xpos,ypos,0);
   
	gl.uniformMatrix4fv(translationMat4z,false,flatten(translationMat4));

    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    requestAnimFrame( render );
}
