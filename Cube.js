class Cube {
    constructor(){
        this.type = "cube";
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.matrix = new Matrix4();
        this.vertices = null;

        this.buffer = null;
    }

    render() {
        var rgba = this.color;

        rgba[0] = rgba[0] / 255.0;
        rgba[1] = rgba[1] / 255.0;
        rgba[2] = rgba[2] / 255.0;
        
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        let verts = [
            [0,0,0,  1,1,0,  1,0,0,
            0,0,0,  0,1,0,  1,1,0],
            [0,1,0,  0,1,1,  1,1,1,
            0,1,0,  1,1,1,  1,1,0],
            [0,0,1,  0,1,1,  1,1,1,
            0,0,1,  1,1,1,  1,0,1],
            [0,0,0,  0,0,1,  0,1,1,
            0,0,0,  0,1,1,  0,1,0],
            [1,0,0,  1,1,0,  1,1,1,
            1,0,0,  1,1,1,  1,0,1],
            [0,0,0,  1,0,0,  1,0,1,
            0,0,0,  1,0,1,  0,0,1]
        ]

        let colors = [
            [rgba[0], rgba[1], rgba[2], rgba[3]],
            [rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]],
            [rgba[0]*0.8, rgba[1]*0.8, rgba[2]*0.8, rgba[3]],
            [rgba[0]*0.7, rgba[1]*0.7, rgba[2]*0.7, rgba[3]],
            [rgba[0]*0.6, rgba[1]*0.6, rgba[2]*0.6, rgba[3]],
            [rgba[0]*0.5, rgba[1]*0.5, rgba[2]*0.5, rgba[3]]
        ]
        
        // gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        for(let i = 0; i < verts.length; i ++){
            gl.uniform4f(u_FragColor, colors[i][0], colors[i][1], colors[i][2], colors[i][3]);
            this.buffer = gl.createBuffer();
            this.vertices = new Float32Array(verts[i]);
            this.draw();
        }

    }

    draw(){
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        // Write date into the buffer object
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
        
        // Assign the buffer object to a_Position variable
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    
        // Enable the assignment to a_Position variable
        gl.enableVertexAttribArray(a_Position);
    
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length/3);
    }
}


function drawTriangle3D(vertices) {
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
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);
  
    gl.drawArrays(gl.TRIANGLES, 0, n);
  }
