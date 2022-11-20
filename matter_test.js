

// module aliases
var Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
Composites = Matter.Composites,
Common = Matter.Common,
MouseConstraint = Matter.MouseConstraint,
Mouse = Matter.Mouse,
World = Matter.World,
Composite = Matter.Composite,
Bodies = Matter.Bodies;
Body = Matter.Body;

// create an engine
var matterCanvas = document.getElementById('matterCanvas');


var engine = Engine.create();
world = engine.world;

var vw = window.innerWidth;
var vh = window.innerHeight;

// create a renderer
var render = Render.create({
    element: matterCanvas,
    engine: engine,
    options:{
    wireframes:false,
    showSleeping:false,
    width:vw,
    height:vh,
    background:"transparent",
    },
});

var explosion = function(engine) {
    var bodies = Composite.allBodies(world);

    for (var i = 0; i < bodies.length; i++) {
        var body = bodies[i];

        if (!body.isStatic && body.position.y >= 500) {
            var forceMagnitude = 0.02 * body.mass;

            Body.applyForce(body, body.position, {
                x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]), 
                y: -forceMagnitude + Common.random() * -forceMagnitude
            });
        }
    }
};

engine.gravity.y = 1;
engine.enableSleeping = false;
// create two boxes and a ground

var intervalIDY = setInterval(function() {
    changeGravityy()},
     3000)

function changeGravityy(){
    console.log(engine.gravity.y)
    if(engine.gravity.y == 1){
        engine.gravity.y = 0.07;
        explosion();
       
    }else if(engine.gravity.y == 0.07){
        engine.gravity.y = 1
        // Body.applyForce(boxA,boxA.position,{x:-4,y:2})
        
    }
}





const ball = {restitution:1,friction: 1,render: {fillStyle: '#ffffff',opacity:0.3}};








// 增加隨機球體
World.add(world, Composites.stack(20, 50, 30 , 3, 20, 40, function(x, y) {
    return Bodies.circle(x, y, Common.random(10, 20), ball);
}));
// add some larger random bouncy objects
World.add(world, Composites.stack(50, 50, 30, 3, 0, 0, function(x, y) {
    switch (Math.round(Common.random(0, 1))) {

    case 0:
        if (Common.random() < 0.8) {
            return Bodies.rectangle(x, y, Common.random(20, 50), Common.random(20, 50), ball);
        } else {
            return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(20, 30), ball);
        }
    case 1:
        return Bodies.polygon(x, y, Math.round(Common.random(4, 8)), Common.random(20, 50), ball);

    }
}));


const wallOption = {
    render: {
      fillStyle: "transparent",
    },
    isStatic: true,
  };

var groundLeft = Bodies.rectangle(0.02*vw, 0.5*vh, 0.04*vw, vh ,wallOption);
var groundRight = Bodies.rectangle(0.98*vw, 0.5*vh, 0.04*vw, vh, wallOption);
var groundTop =    Bodies.rectangle(0.5*vw,0.02*vh, 0.92*vw, 0.04*vh, wallOption);
var groundBottom = Bodies.rectangle(0.5*vw,0.98*vh, 0.92*vw, 0.04*vh, wallOption);

// add all of the bodies to the world
Composite.add(engine.world, [groundBottom, groundLeft, groundRight,groundTop]);









// add mouse control
var mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

Composite.add(world, mouseConstraint);
// keep the mouse in sync with rendering
render.mouse = mouse;








window.addEventListener('resize',()=>{
    if(window.innerWidth>400){
    render.bounds.max.x = window.innerWidth;
    render.bounds.max.y = window.innerHeight;
    render.options.width = window.innerWidth;
    render.options.height = window.innerHeight;
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;
    Composite.clear(world, false)
    var vw = window.innerWidth;
    var vh = window.innerHeight;

const ball = {restitution:1,friction: 1,render: {fillStyle: '#ffffff',opacity:0.3}};

// 增加隨機球體
World.add(world, Composites.stack(20, 200, 30 , 3, 20, 40, function(x, y) {
    return Bodies.circle(x, y, Common.random(10, 20), ball);
}));
// add some larger random bouncy objects
World.add(world, Composites.stack(50, 200, 30, 3, 0, 0, function(x, y) {
    switch (Math.round(Common.random(0, 1))) {

    case 0:
        if (Common.random() < 0.8) {
            return Bodies.rectangle(x, y, Common.random(20, 50), Common.random(20, 50), ball);
        } else {
            return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(20, 30), ball);
        }
    case 1:
        return Bodies.polygon(x, y, Math.round(Common.random(4, 8)), Common.random(20, 50), ball);

    }
}));

var groundLeft = Bodies.rectangle(0.02*vw, 0.5*vh, 0.04*vw, vh ,wallOption);
var groundRight = Bodies.rectangle(0.98*vw, 0.5*vh, 0.04*vw, vh, wallOption);
var groundTop =    Bodies.rectangle(0.5*vw,0.02*vh, 0.92*vw, 0.04*vh, wallOption);
var groundBottom = Bodies.rectangle(0.5*vw,0.98*vh, 0.92*vw, 0.04*vh, wallOption);
// add all of the bodies to the world
Composite.add(engine.world, [groundBottom, groundLeft, groundRight,groundTop]);
// add mouse control
var mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});
mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

Composite.add(world, mouseConstraint);
// keep the mouse in sync with rendering
render.mouse = mouse;
}})


// run the renderer
Render.run(render);
// fit the render viewport to the scene


// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

