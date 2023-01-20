function drawImage(){
    // Draw two triangles as a blue background
    var backgroundTriangle1 = new Triangle();
    backgroundTriangle1.color = [0.52, 0.80, 0.92, 1.0];
    backgroundTriangle1.points = [1, 1, -1, 1, 1, -1];
    g_shapesList.push(backgroundTriangle1);

    var backgroundTriangle2 = new Triangle();
    backgroundTriangle2.color = [0.52, 0.80, 0.92, 1.0];
    backgroundTriangle2.points = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0];
    g_shapesList.push(backgroundTriangle2);

    var groundTriangle1 = new Triangle();
    groundTriangle1.color = [0.0, 0.684, 0.094, 1.0];
    groundTriangle1.points = [-1, -0.75, -1.0, -1.0, 1.0, -0.75];
    g_shapesList.push(groundTriangle1);

    var groundTriangl2 = new Triangle();
    groundTriangl2.color = [0.0, 0.684, 0.094, 1.0];
    groundTriangl2.points = [1.0, -0.75, 1.0, -1.0, -1.0, -1.0];
    g_shapesList.push(groundTriangl2);

    // Draw a sun
    var sun = new Circle();
    sun.color = [1.0, 0.8, 0.0, 1.0];
    sun.position = [0.75, 0.75];
    sun.segments = 16;
    sun.size = 40
    g_shapesList.push(sun);

    // Left mountain
    var mLeft = new Triangle();
    mLeft.color = [0.58, 0.29, 0.0, 1.0];
    mLeft.points = [-1, -0.75, -.6, -0.2, -0.25, -0.75];
    g_shapesList.push(mLeft);

    //left mountain cap
    var mLeftCap = new Triangle();
    mLeftCap.color = [1, 1, 1, 1.0];
    mLeftCap.points = [-0.6, -0.2, -0.75, -0.4, -0.47, -0.4];
    g_shapesList.push(mLeftCap);

    // Left mountain undercap triangles
    var mLeftUnderCap1 = new Triangle();
    mLeftUnderCap1.color = [1, 1, 1, 1.0];
    mLeftUnderCap1.points = [-0.6, -0.4, -0.75, -0.4, -0.675, -0.45];
    g_shapesList.push(mLeftUnderCap1);

    var mLeftUnderCap2 = new Triangle();
    mLeftUnderCap2.color = [1, 1, 1, 1.0];
    mLeftUnderCap2.points = [-0.6, -0.4, -0.47, -0.4, -0.55, -0.45];
    g_shapesList.push(mLeftUnderCap2);

    // Right mountain
    var mRight = new Triangle();
    mRight.color = [0.58, 0.29, 0.0, 1.0];
    mRight.points = [1, -0.75, 0.6, -0.2, 0.25, -0.75];
    g_shapesList.push(mRight);

    // Right mountain cap
    var mRightCap = new Triangle();
    mRightCap.color = [1, 1, 1, 1.0];
    mRightCap.points = [0.6, -0.2, 0.75, -0.4, 0.47, -0.4];
    g_shapesList.push(mRightCap);

    // Right mountain undercap triangles
    var mRightUnderCap1 = new Triangle();
    mRightUnderCap1.color = [1, 1, 1, 1.0];
    mRightUnderCap1.points = [0.6, -0.4, 0.75, -0.4, 0.675, -0.45];
    g_shapesList.push(mRightUnderCap1);

    var mRightUnderCap2 = new Triangle();
    mRightUnderCap2.color = [1, 1, 1, 1.0];
    mRightUnderCap2.points = [0.6, -0.4, 0.47, -0.4, 0.55, -0.45];
    g_shapesList.push(mRightUnderCap2);

    // Middle mountain
    var mMiddle = new Triangle();
    mMiddle.color = [0.58, 0.29, 0.0, 1.0];
    mMiddle.points = [0.4, -0.75, 0, 0.15, -0.4, -0.75];
    g_shapesList.push(mMiddle);

    // Middle mountain cap
    var mMiddleCap = new Triangle();
    mMiddleCap.color = [1, 1, 1, 1.0];
    mMiddleCap.points = [0, 0.15, -0.15, -0.15, 0.15, -0.15];
    g_shapesList.push(mMiddleCap);

    // Middle mountain undercap triangles
    var mMiddleUnderCap1 = new Triangle();
    mMiddleUnderCap1.color = [1, 1, 1, 1.0];
    mMiddleUnderCap1.points = [0.1, -0.2, 0.15, -0.15, 0.05, -0.15];
    g_shapesList.push(mMiddleUnderCap1);

    var mMiddleUnderCap2 = new Triangle();
    mMiddleUnderCap2.color = [1, 1, 1, 1.0];
    mMiddleUnderCap2.points = [-0.1, -0.2, -0.15, -0.15, -0.05, -0.15];
    g_shapesList.push(mMiddleUnderCap2);

    var mMiddleUnderCap3 = new Triangle();
    mMiddleUnderCap3.color = [1, 1, 1, 1.0];
    mMiddleUnderCap3.points = [-0.05, -0.15, 0.05, -0.15, 0, -0.2];
    g_shapesList.push(mMiddleUnderCap3);

    // Middle mountain eyes
    var mMiddleEye1 = new Circle();
    mMiddleEye1.color = [0, 0, 0, 1.0];
    mMiddleEye1.position = [-0.1, -0.3];
    mMiddleEye1.segments = 16;
    mMiddleEye1.size = 8
    g_shapesList.push(mMiddleEye1);

    var mMiddleEye2 = new Circle();
    mMiddleEye2.color = [0, 0, 0, 1.0];
    mMiddleEye2.position = [0.1, -0.3];
    mMiddleEye2.segments = 16;
    mMiddleEye2.size = 8
    g_shapesList.push(mMiddleEye2);

    // Middle mountain mouth
    var mMiddleMouth = new Triangle();
    mMiddleMouth.color = [0, 0, 0, 1.0];
    mMiddleMouth.points = [-0.1, -0.5, 0.1, -0.5, 0, -0.6];
    g_shapesList.push(mMiddleMouth);

    // Cloud Circles
    var cloud1 = new Circle();
    cloud1.color = [1, 1, 1, 1.0];
    cloud1.position = [-0.75, 0.75];
    cloud1.segments = 16;
    cloud1.size = 20
    g_shapesList.push(cloud1);

    var cloud2 = new Circle();
    cloud2.color = [1, 1, 1, 1.0];
    cloud2.position = [-0.65, 0.8];
    cloud2.segments = 16;
    cloud2.size = 20
    g_shapesList.push(cloud2);

    var cloud3 = new Circle();
    cloud3.color = [1, 1, 1, 1.0];
    cloud3.position = [-0.5, 0.75];
    cloud3.segments = 16;
    cloud3.size = 25
    g_shapesList.push(cloud3);

    var cloud4 = new Circle();
    cloud4.color = [1, 1, 1, 1.0];
    cloud4.position = [-0.4, 0.8];
    cloud4.segments = 16;
    cloud4.size = 20
    g_shapesList.push(cloud4);

    var cloud5 = new Circle();
    cloud5.color = [1, 1, 1, 1.0];
    cloud5.position = [-0.68, 0.6];
    cloud5.segments = 16;
    cloud5.size = 23
    g_shapesList.push(cloud5);

    var cloud6 = new Circle();
    cloud6.color = [1, 1, 1, 1.0];
    cloud6.position = [-0.53, 0.64];
    cloud6.segments = 16;
    cloud6.size = 30
    g_shapesList.push(cloud6);

    var cloud7 = new Circle();
    cloud7.color = [1, 1, 1, 1.0];
    cloud7.position = [-0.4, 0.6];
    cloud7.segments = 16;
    cloud7.size = 25
    g_shapesList.push(cloud7);

    renderAllShapes();

}
