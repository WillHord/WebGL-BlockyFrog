class Triangle{
    constructor(){
        this.type = "triangle";
        this.position = [0.0, 0.0, 0.0];
        this.points = null;
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.size = 5;
    }

    render(){
        var xy = this.position;
        var rgba = this.color;
        var size = this.size;

        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        
        gl.uniform1f(u_Size, size);
        // Draw
        if(this.points == null){
            var d = this.size/200.0;
            drawTriangle([xy[0], xy[1], xy[0] + d, xy[1], xy[0], xy[1] + d])
        } else {
            drawTriangle(this.points);
        }
       
    }
}

function drawTriangle(vertices) {
    var n = 3; // The number of vertices
  
    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }
  
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
    
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);
  
    gl.drawArrays(gl.TRIANGLES, 0, n);
  }

  // function drawTriangle3D(vertices) {
  //   var n = 3; // The number of vertices
  
  //   // Create a buffer object
  //   var vertexBuffer = gl.createBuffer();
  //   if (!vertexBuffer) {
  //     console.log('Failed to create the buffer object');
  //     return -1;
  //   }
  
  //   // Bind the buffer object to target
  //   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  //   // Write date into the buffer object
  //   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
    
  //   // Assign the buffer object to a_Position variable
  //   gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  
  //   // Enable the assignment to a_Position variable
  //   gl.enableVertexAttribArray(a_Position);
  
  //   gl.drawArrays(gl.TRIANGLES, 0, n);
  // }
  