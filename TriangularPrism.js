class TriangularPrism {
    constructor(){
        this.type = "triangularPrism";
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.matrix = new Matrix4();
    }

    render() {
        var rgba = this.color;

        rgba[0] = rgba[0] / 255.0;
        rgba[1] = rgba[1] / 255.0;
        rgba[2] = rgba[2] / 255.0;

        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        // Top
        drawTriangle3D([0,1,0,  1,1,1,  1,1,0])

        // Side 1
        gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]);
        drawTriangle3D([1,0,0,  1,0,1,  1,1,1])
        drawTriangle3D([1,0,0,  1,1,1,  1,1,0])

        // Bottom
        gl.uniform4f(u_FragColor, rgba[0]*0.8, rgba[1]*0.8, rgba[2]*0.8, rgba[3]);
        drawTriangle3D([0,0,0,  1,0,0,  1,0,1])

        // Side 2
        gl.uniform4f(u_FragColor, rgba[0]*0.7, rgba[1]*0.7, rgba[2]*0.7, rgba[3]);
        drawTriangle3D([0,0,0,  1,1,1,  0,1,0])
        drawTriangle3D([0,0,0,  1,1,1,  1,0,1])

        // Side 3
        gl.uniform4f(u_FragColor, rgba[0]*0.6, rgba[1]*0.6, rgba[2]*0.6, rgba[3]);
        drawTriangle3D([0,0,0,  0,1,0,  1,1,0])
        drawTriangle3D([0,0,0,  1,1,0,  1,0,0])
    }
}
