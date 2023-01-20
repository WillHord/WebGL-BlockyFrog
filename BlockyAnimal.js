// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  void main() {
    gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
  }
`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }
`

const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2

// Global variables
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;
let u_ModelMatrix;
let u_GlobalRotateMatrix;

let MousePos = [0,0];


// UI gloabl variables
let g_selectedColor = [1.0, 1.0, 1.0, 1.0];
let g_selectedSize = 5;
let g_selectedType = POINT;
let g_segments = 10;
let g_globalRotateAngle = -45;
let g_globalRotateAngleY = 0;

let globalRotateX = 0;
let globalRotateY = 0;

let g_animation = true;
let g_specialAnimation = false;
let g_specialAnimationStartTime = null;


// Global joint angles
let backRightLegJoint1 = 0;
let backRightLegJoint2 = 0;
let backRightLegJoint3 = 0;

let backLeftLegJoint1 = 0;
let backLeftLegJoint2 = 0;
let backLeftLegJoint3 = 0;

let frontRightLegJoint1 = 0;
let frontRightLegJoint2 = 0;
let frontRightLegJoint3 = 0;

let frontLeftLegJoint1 = 0;
let frontLeftLegJoint2 = 0;
let frontLeftLegJoint3 = 0;

let bodyJoint = 0;

let headJoint = 0;
let upperLipJoint = 0;
let lowerLipJoint = 0;

function addActionsForHtmlUI(){
  // Camera Angle Slider
  document.getElementById("angleSlide").addEventListener("input", function(){globalRotateX = this.value;});
  document.getElementById("angleSlide2").addEventListener("input", function(){globalRotateY = this.value;});


  // Back right leg sliders
  document.getElementById("backRightLegJoint1").addEventListener("mousemove", function(){backRightLegJoint1 = this.value;});
  document.getElementById("backRightLegJoint2").addEventListener("mousemove", function(){backRightLegJoint2 = this.value;});
  document.getElementById("backRightLegJoint3").addEventListener("mousemove", function(){backRightLegJoint3 = this.value;});

  // Back left leg sliders
  document.getElementById("backLeftLegJoint1").addEventListener("mousemove", function(){backLeftLegJoint1 = this.value;});
  document.getElementById("backLeftLegJoint2").addEventListener("mousemove", function(){backLeftLegJoint2 = this.value;});
  document.getElementById("backLeftLegJoint3").addEventListener("mousemove", function(){backLeftLegJoint3 = this.value;});

  // Front right leg sliders
  document.getElementById("frontRightLegJoint1").addEventListener("mousemove", function(){frontRightLegJoint1 = this.value;});
  document.getElementById("frontRightLegJoint2").addEventListener("mousemove", function(){frontRightLegJoint2 = this.value;});
  document.getElementById("frontRightLegJoint3").addEventListener("mousemove", function(){frontRightLegJoint3 = this.value;});

  // Front left leg sliders
  document.getElementById("frontLeftLegJoint1").addEventListener("mousemove", function(){frontLeftLegJoint1 = this.value;});
  document.getElementById("frontLeftLegJoint2").addEventListener("mousemove", function(){frontLeftLegJoint2 = this.value;});
  document.getElementById("frontLeftLegJoint3").addEventListener("mousemove", function(){frontLeftLegJoint3 = this.value;});

  // Body joint slider
  document.getElementById("bodyJoint").addEventListener("mousemove", function(){bodyJoint = this.value;});

  // Head joint slider
  document.getElementById("HeadJoint").addEventListener("mousemove", function(){headJoint = this.value;});
  document.getElementById("upperLipJoint").addEventListener("mousemove", function(){upperLipJoint = this.value;});
  document.getElementById("lowerLipJoint").addEventListener("mousemove", function(){lowerLipJoint = this.value;});

  // Animation on off
  document.getElementById("animationOn").addEventListener("click", function(){g_animation = true;});
  document.getElementById("animationOff").addEventListener("click", function(){g_animation = false;}); 

}

function setupWebGL() {
	// Retrieve <canvas> element
	canvas = document.getElementById("webgl");

	// Get the rendering context for WebGL
	// gl = getWebGLContext(canvas, {preserveDrawingBuffer: true});
  gl = getWebGLContext(canvas, false)
	if (!gl) {
		console.log("Failed to get the rendering context for WebGL");
		return;
	}

  gl.enable(gl.DEPTH_TEST);
}

function connectVariablesToGLSL() {
  // Initialize shaders
	if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
		console.log("Failed to intialize shaders.");
		return;
	}

	// // Get the storage location of a_Position
	a_Position = gl.getAttribLocation(gl.program, "a_Position");
	if (a_Position < 0) {
		console.log("Failed to get the storage location of a_Position");
		return;
	}

	// Get the storage location of u_FragColor
	u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
	if (!u_FragColor) {
		console.log("Failed to get the storage location of u_FragColor");
		return;
	}

  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) {
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }

  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
  if (!u_GlobalRotateMatrix) {
    console.log('Failed to get the storage location of u_GlobalRotateMatrix');
    return;
  }

  let identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}

function main() {
  // Set up canvas and gl variables
	setupWebGL();
  // Set up GLSL shader programs and connect GLSL variables
  connectVariablesToGLSL();

  // getValues();
  addActionsForHtmlUI();

  canvas.onmousemove = function(ev) { if (ev.buttons == 1) { moveAnimal(ev); } };
  canvas.onmousedown = function(ev) { if (ev.shiftKey) { g_specialAnimation = true;}};

	// Specify the color for clearing <canvas>
	gl.clearColor(0.0, 0.0, 0.0, 1.0);

	// Clear <canvas>
	// gl.clear(gl.COLOR_BUFFER_BIT);

  // renderAllShapes();
  requestAnimationFrame(tick);
}

var g_startTime = performance.now()/1000;
var g_seconds = performance.now()/1000 - g_startTime;

function tick(){
  // console.log(performance.now());
  g_seconds = performance.now()/1000 - g_startTime;
  // console.log(g_seconds);

  updateAnimationAngles();
  renderAllShapes();

  requestAnimationFrame(tick);
}

function updateAnimationAngles(){
  if(g_animation){
    backRightLegJoint1 = (Math.max(120*Math.sin(g_seconds), 0));
    backRightLegJoint2 = (Math.min(-90*Math.sin(g_seconds), 40));
    backRightLegJoint3 = (Math.max(45*Math.sin(g_seconds),0));

    backLeftLegJoint1 = (Math.max(120*Math.sin(g_seconds), 0));
    backLeftLegJoint2 = (Math.min(-90*Math.sin(g_seconds), 40));
    backLeftLegJoint3 = (Math.max(45*Math.sin(g_seconds), 0));

    frontRightLegJoint1 = (Math.max(-40* -Math.sin(g_seconds), 0));
    frontRightLegJoint2 = (Math.max(-90* -Math.sin(g_seconds), -40));
    frontRightLegJoint3 = (Math.max(45*Math.sin(g_seconds), 0));

    frontLeftLegJoint1 = (Math.max(-40* -Math.sin(g_seconds), 0));
    frontLeftLegJoint2 = (Math.max(-90* -Math.sin(g_seconds), -40));
    frontLeftLegJoint3 = (Math.max(45*Math.sin(g_seconds), 0));

    headJoint = (Math.max(45*Math.sin(g_seconds), 0));

    bodyJoint = (Math.min(-15*Math.sin(g_seconds), 0));
  }
  if(g_specialAnimation){
    if(g_specialAnimationStartTime == null){
      g_specialAnimationStartTime = g_seconds;
    }
    upperLipJoint = (5*Math.sin(g_seconds*4.5));
    lowerLipJoint = (-5*Math.sin(g_seconds*4.5));

    if(g_seconds > g_specialAnimationStartTime + 4){
      g_specialAnimation = false;
      g_specialAnimationStartTime = null;
    }
  }
}

function moveAnimal(ev){
  g_globalRotateAngle += ev.movementX;
  g_globalRotateAngleY += ev.movementY;
}


function convertCoordinatesEventToGL(ev){
  var x = ev.clientX; // x coordinate of a mouse pointer
	var y = ev.clientY; // y coordinate of a mouse pointer
	var rect = ev.target.getBoundingClientRect();

	x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
	y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

  return([x,y]);
}

function renderAllShapes(){

  // Check the time at the start of this function
  var startTime = performance.now();

  var globalRotMat = new Matrix4().rotate(g_globalRotateAngle, 0, 1, 0).rotate(g_globalRotateAngleY, 1, 0, 0);
  globalRotMat.translate(-.25,.3,0);
  globalRotMat.scale(0.75, 0.75, 0.75);
  globalRotMat.rotate(globalRotateX, 0, 1, 0);
  globalRotMat.rotate(globalRotateY, 1, 0, 0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  renderScene();

  var duration = performance.now() - startTime;
  sendTextToHTML(" ms: " + duration.toFixed(2) + " fps: " + Math.floor(10000/duration), "numdot");
}

function sendTextToHTML(text, id){
  var htmlElm = document.getElementById(id);
  if(!htmlElm){
    console.log("Error: could not find HTML element with id: " + id);
    return;
  }
  htmlElm.innerHTML = text;
}


function renderScene(){
  let body = new Cube();
        body.color = [94, 221, 95, 1];
        body.matrix.setTranslate(-.1, -.2, 0.0);
        body.matrix.rotate(bodyJoint, 0, 0, 1);
        let tempBodyMatrix = new Matrix4(body.matrix);
        // this.bodyMatrix = new Matrix4(body.matrix);
        body.matrix.rotate(-10, 0, 0, 1);
        body.matrix.scale(1, .20, 0.5);
        body.render();

        let underBody = new Cube();
        underBody.color = [255, 255, 255, 1];
        underBody.matrix = new Matrix4(tempBodyMatrix);
        underBody.matrix.translate(-.111, -.1, 0.0);
        underBody.matrix.rotate(-10, 0, 0, 1);
        underBody.matrix.scale(1.1, .12, 0.5);
        underBody.render();  


        // Draw head
        let head = new Cube();
        head.color = [94, 221, 95, 1];
        head.matrix = new Matrix4(tempBodyMatrix);
        head.matrix.translate(-.35, 0, -0.0501);
        head.matrix.rotate(0, 0, 0, 1);
        head.matrix.rotate(headJoint, 0, 0, 1);
        // let tempHeadMatrix1 = new Matrix4(head.matrix);
        let tempHeadMatrix = new Matrix4(head.matrix);
        head.matrix.scale(.4, .35, 0.601);
        head.render();

        // Lower lip
        let lowerLip = new Cube();
        lowerLip.color = [255, 255, 255, 1];
        lowerLip.matrix = new Matrix4(tempHeadMatrix);
        lowerLip.matrix.translate(.1, .075, .12);
        lowerLip.matrix.rotate(20, 0, 0, 1);
        lowerLip.matrix.rotate(lowerLipJoint, 0, 0, 1);
        lowerLip.matrix.scale(-.2, .05, 0.35);
        lowerLip.render();

        // Upper lip
        let upperLip = new Cube();
        upperLip.color = [255, 255, 255, 1];
        upperLip.matrix = new Matrix4(tempHeadMatrix);
        upperLip.matrix.translate(.1, .075, .12);
        upperLip.matrix.rotate(-20, 0, 0, 1);
        upperLip.matrix.rotate(upperLipJoint, 0, 0, 1);
        upperLip.matrix.scale(-.2, .05, 0.35);
        upperLip.render();

        // Draw eyes
        let outerEye1 = new Cube();
        outerEye1.color = [147, 19, 13, 1];
        outerEye1.matrix = new Matrix4(tempHeadMatrix);
        outerEye1.matrix.translate(-.05, .2, .075);
        let outerEye1Matrix = new Matrix4(outerEye1.matrix);
        outerEye1.matrix.rotate(0, 0, 0, 1);
        outerEye1.matrix.scale(.1, .1, .1);
        outerEye1.render();

        let innerEye1 = new Cube();
        innerEye1.color = [0, 0, 0, 1];
        innerEye1.matrix = outerEye1Matrix;
        innerEye1.matrix.translate(-.025, .025, .025);
        innerEye1.matrix.rotate(0, 0, 0, 1);
        innerEye1.matrix.scale(.05, .05, .05);
        innerEye1.render();

        let outerEye2 = new Cube();
        outerEye2.color = [147, 19, 13, 1];
        outerEye2.matrix = new Matrix4(tempHeadMatrix);
        outerEye2.matrix.translate(-.05, .2, .4);
        let outerEye2Matrix = new Matrix4(outerEye2.matrix);
        outerEye2.matrix.rotate(0, 0, 0, 1);
        outerEye2.matrix.scale(.1, .1, .1);
        outerEye2.render();

        let innerEye2 = new Cube();
        innerEye2.color = [0, 0, 0, 1];
        innerEye2.matrix = outerEye2Matrix;
        innerEye2.matrix.translate(-.025, .025, .025);
        innerEye2.matrix.rotate(0, 0, 0, 1);
        innerEye2.matrix.scale(.05, .05, .05);
        innerEye2.render();
        
        // Draw Back Left Leg
        let femur = new Cube();
        femur.color = [94, 221, 95, 1];
        femur.matrix = new Matrix4(tempBodyMatrix);
        // femur.matrix = this.bodyMatrix;
        femur.matrix.translate(.93, -.1, .05);
        femur.matrix.rotate(backLeftLegJoint1, 0, 0, 1);
        let tempfemurMatrix = new Matrix4(femur.matrix);
        femur.matrix.rotate(-75, 0, 0, 1);
        femur.matrix.scale(.15, -.45, -.1);
        femur.render();

        let tibia = new Cube();
        tibia.color = [94, 221, 95, 1];
        tibia.matrix = tempfemurMatrix;
        tibia.matrix.translate(-.5,-.23,0);
        tibia.matrix.rotate(backLeftLegJoint2, 0, 0, 1);
        var temptibiaMatrix = new Matrix4(tibia.matrix);
        
        tibia.matrix.rotate(65, 0, 0, 1);
        tibia.matrix.scale(.15, -.55, -.1);
        tibia.render();

        let foot = new Cube();
        foot.color = [255, 134, 0, 1];
        foot.matrix = temptibiaMatrix;
        foot.matrix.translate(.55, -.25, -.125);
        foot.matrix.rotate(backLeftLegJoint3, 0, 0, 1);
        let tempfootMatrix = new Matrix4(foot.matrix);
        foot.matrix.rotate(90, 0, 0, 1);
        foot.matrix.scale(.1, .25, .15);
        
        foot.render();

        // Draw toes
        let toe = new TriangularPrism();
        toe.color = [255, 134, 0, 1];
        toe.matrix = new Matrix4(tempfootMatrix);
        toe.matrix.translate(-.25, 0, .155);
        toe.matrix.rotate(135, 0, 1, 0);
        toe.matrix.scale(.12, .1, .12);
        toe.render();


        // Draw Back Right Leg
        femur.color = [94, 221, 95, 1];
        femur.matrix = new Matrix4(tempBodyMatrix);
        femur.matrix.translate(.93, -.1, .55);
        femur.matrix.rotate(backRightLegJoint1, 0, 0, 1);
        tempfemurMatrix = new Matrix4(femur.matrix);
        femur.matrix.rotate(-75, 0, 0, 1);
        femur.matrix.scale(.15, -.45, -.1);
        femur.render();

        // let tibia = new Cube();
        tibia.color = [94, 221, 95, 1];
        tibia.matrix = tempfemurMatrix;
        tibia.matrix.translate(-.5,-.23,0);
        tibia.matrix.rotate(backRightLegJoint2, 0, 0, 1);
        var temptibiaMatrix = new Matrix4(tibia.matrix);
        
        tibia.matrix.rotate(65, 0, 0, 1);
        tibia.matrix.scale(.15, -.55, -.1);
        tibia.render();

        foot.color = [255, 134, 0, 1];
        foot.matrix = temptibiaMatrix;
        foot.matrix.translate(.55, -.25, -.125);
        foot.matrix.rotate(backRightLegJoint3, 0, 0, 1);
        tempfootMatrix = new Matrix4(foot.matrix);
        foot.matrix.rotate(90, 0, 0, 1);
        foot.matrix.scale(.1, .25, .15);
        
        foot.render();

        toe.color = [255, 134, 0, 1];
        toe.matrix = new Matrix4(tempfootMatrix);
        toe.matrix.translate(-.25, 0, .155);
        toe.matrix.rotate(135, 0, 1, 0);
        toe.matrix.scale(.12, .1, .12);
        toe.render();

        // Draw Front Left Leg
        femur.color = [94, 221, 95, 1];
        femur.matrix = new Matrix4(tempBodyMatrix);
        femur.matrix.translate(-.075,  -.05, .05);
        femur.matrix.rotate(frontLeftLegJoint1, 0, 0, 1);
        tempfemurMatrix = new Matrix4(femur.matrix);
        femur.matrix.rotate(50, 0, 0, 1);
        femur.matrix.scale(.15, -.4, -.1);
        femur.render();

        // let tibia = new Cube();
        tibia.color = [94, 221, 95, 1];
        tibia.matrix = tempfemurMatrix;
        tibia.matrix.translate(.3, -.1, 0);
        tibia.matrix.rotate(frontLeftLegJoint2, 0, 0, 1);
        var temptibiaMatrix = new Matrix4(tibia.matrix);

        tibia.matrix.rotate(-50, 0, 0, 1);
        tibia.matrix.scale(.15, -.52, -.1);
        tibia.render();

        // let foot = new Cube();
        foot.color = [255, 134, 0, 1];
        foot.matrix = temptibiaMatrix;
        foot.matrix.translate(-.2, -.45, -.125);
        foot.matrix.rotate(frontLeftLegJoint3, 0, 0, 1);
        tempfootMatrix = new Matrix4(foot.matrix);
        foot.matrix.rotate(90, 0, 0, 1);
        foot.matrix.scale(.1, .3, .15);
        foot.render();

        toe.color = [255, 134, 0, 1];
        toe.matrix = new Matrix4(tempfootMatrix);
        toe.matrix.translate(-.3, 0, .155);
        toe.matrix.rotate(135, 0, 1, 0);
        toe.matrix.scale(.12, .1, .12);
        toe.render();


        // Draw Front Right Leg
        femur.color = [94, 221, 95, 1];
        femur.matrix = new Matrix4(tempBodyMatrix);
        femur.matrix.translate(-.075,  -.05, .55);
        femur.matrix.rotate(frontRightLegJoint1, 0, 0, 1);
        tempfemurMatrix = new Matrix4(femur.matrix);
        femur.matrix.rotate(50, 0, 0, 1);
        femur.matrix.scale(.15, -.4, -.1);
        femur.render();

        // let tibia = new Cube();
        tibia.color = [94, 221, 95, 1];
        tibia.matrix = tempfemurMatrix;
        tibia.matrix.translate(.3, -.1, 0);
        tibia.matrix.rotate(frontRightLegJoint2, 0, 0, 1);
        temptibiaMatrix = new Matrix4(tibia.matrix);

        tibia.matrix.rotate(-50, 0, 0, 1);
        tibia.matrix.scale(.15, -.52, -.1);
        tibia.render();

        // let foot = new Cube();
        foot.color = [255, 134, 0, 1];
        foot.matrix = temptibiaMatrix;
        foot.matrix.translate(-.2, -.45, -.125);
        foot.matrix.rotate(frontRightLegJoint3, 0, 0, 1);
        tempfootMatrix = new Matrix4(foot.matrix);
        foot.matrix.rotate(90, 0, 0, 1);
        foot.matrix.scale(.1, .3, .15);
        foot.render();

        toe.color = [255, 134, 0, 1];
        toe.matrix = new Matrix4(tempfootMatrix);
        toe.matrix.translate(-.3, 0, .155);
        toe.matrix.rotate(135, 0, 1, 0);
        toe.matrix.scale(.12, .1, .12);
        toe.render();
}
