// import kaboom lib
import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

// initialize kaboom context
kaboom({
    background: [134, 135, 247],
    width: 320,
    height: 240,
    scale: 1.8,
  });

  loadRoot("sprites/mario_sprites/");
  loadAseprite("mario", "Mario.png", "Mario.json");
  loadAseprite("enemies", "enemies.png", "enemies.json");
  loadSprite("ground", "ground.png");
  loadSprite("questionBox", "questionBox.png");
  loadSprite("emptyBox", "emptyBox.png");
  loadSprite("brick", "brick.png");
  loadSprite("coin", "coin.png");
  loadSprite("bigMushy", "bigMushy.png");
  loadSprite("pipeTop", "pipeTop.png");
  loadSprite("pipeBottom", "pipeBottom.png");
  loadSprite("shrubbery", "shrubbery.png");
  loadSprite("hill", "hill.png");
  loadSprite("cloud", "cloud.png");
  loadSprite("castle", "castle.png");

  const LEVELS = [
    [
      "                                                                                                ",
      "                                                                                                ",
      "                                                                                                ",
      "                                                                                                ",
      "                                                                                                ",
      "                                                                                                ",
      "                                                                                                ",
      "      -?-b-                                                                                     ",
      "                                                    ?        ?                                  ",
      "                                                                                                ",
      "                                      _                 ?                                       ",
      "                                 _    |                                                         ",
      "                           _     |    |                _                                        ",
      "       E                   |     |    |   E   E        |                            H           ",
      "================     ===========================================================================",
      "================     ===========================================================================",
    ],
    [
      "                                                                                             ",
      "                                                                                             ",
      "                                                                                             ",
      "                                       ?                                                     ",
      "                                                                                             ",
      "                                   -?-                                                       ",
      "                                                                                             ",
      "      -?-b-                  -?-                                                             ",
      "                                                                                             ",
      "                                                                                             ",
      "                                                                                             ",
      "                                                                                             ",
      "       _                                            _                                        ",
      "       |                                            |          E    E            H           ",
      "================     ========================================================================",
      "================     ========================================================================",
    ]
  ];

  const levelConf = {
    // grid size
    width: 16,
    height: 16,
    pos: vec2(0, 0),
    // define each object as a list of components
    "=": () => [
      sprite("ground"),
      area(),
      solid(),
      origin("bot"),
      "ground"
    ],
    "-": () => [
      sprite("brick"),
      area(),
      solid(),
      origin("bot"),
      "brick"
    ],
    "H": () => [
      sprite("castle"),
      area({ width: 1, height: 240 }),
      origin("bot"),
      "castle"
    ],
    "?": () => [
      sprite("questionBox"),
      area(),
      solid(),
      origin("bot"),
      'questionBox',
      'coinBox'
    ],
    "b": () => [
      sprite("questionBox"),
      area(),
      solid(),
      origin("bot"),
      'questionBox',
      'mushyBox'
    ],
    "!": () => [
      sprite("emptyBox"),
      area(),
      solid(),
     // bump(),
      origin("bot"),
      'emptyBox'
    ],
    "c": () => [
      sprite("coin"),
      area(),
      solid(),
      //bump(64, 8),
      cleanup(),
      lifespan(0.4, { fade: 0.01 }),
      origin("bot"),
      "coin"
    ],
    "M": () => [
      sprite("bigMushy"),
      area(),
      solid(),
      //patrol(10000),
      body(),
      cleanup(),
      origin("bot"),
      "bigMushy"
    ],
    "|": () => [
      sprite("pipeBottom"),
      area(),
      solid(),
      origin("bot"),
      "pipe"
    ],
    "_": () => [
      sprite("pipeTop"),
      area(),
      solid(),
      origin("bot"),
      "pipe"
    ],
    "E": () => [
      sprite("enemies", { anim: 'Walking' }),
      area({ width: 16, height: 16 }),
      solid(),
      body(),
      //patrol(50),
      //enemy(),
      origin("bot"),
      "badGuy"
    ],
    "p": () => [
      sprite("mario", { frame: 0 }),
      area({ width: 16, height: 16 }),
      body(),
      //mario(),
      //bump(150, 20, false),
      origin("bot"),
      "player"
    ]
  };
  
  scene("start", () => {
    add([
      text("Press enter to start", { size: 24 }),
      pos(vec2(160, 120)),
      origin("center"),
      color(255, 255, 255),
    ]);
  
    onKeyRelease("enter", () => {
      go("game");
    })
  });
  go("start");

  scene("game", (levelNumber = 0) => {

    layers([
      "bg",
      "game",
      "ui",
    ], "game");
  
  
    const level = addLevel(LEVELS[levelNumber], levelConf);
  
    add([
      sprite("cloud"),
      pos(20, 50),
      layer("bg")
    ]);
  
    add([
      sprite("hill"),
      pos(32, 208),
      layer("bg"),
      origin("bot")
    ])
  
    add([
      sprite("shrubbery"),
      pos(200, 208),
      layer("bg"),
      origin("bot")
    ])
  
    add([
      text("Level " + (levelNumber + 1), { size: 24 }),
      pos(vec2(160, 120)),
      color(255, 255, 255),
      origin("center"),
      layer('ui'),
      lifespan(1, { fade: 0.5 })
    ]);
  
    const player = level.spawn("p", 1, 10)
  
  });






//Game 2: Wednesday's Nightmare
kaboom({
    background: [0 , 0, 0]
});


//load assets
loadRoot("sprites/wed_sprites/");
loadSprite("wed", "wed_nohand.png");
loadSprite("thing", "thing287x297.png");
loadSprite("gameover_wed", "wed_blood_gameover2.png");

const JUMP_FORCE = 600;
const SPEED = 400;


scene("wed_game", () =>{
    
   //extra define gravity(2400); 

// Game Objects: text, floor, wednesday, thing, and score.
add([
    // list of components 
    text("Wednesday's nightmare below"),
    pos(10, 10)
]);
    //floor
    add([
        rect(width(), 48),
        pos(0, height() - 48),
        outline(1),
        area(),
        solid(),
        color(124, 80 , 0)
    ])
    
    const wed = add([
        sprite("wed"),
        pos(10, 230),
        scale(.6 ),
        area(),
        body()
    ])
    //jump
    onKeyPress("space", () =>{
        if(wed.isGrounded()){
            wed.jump(JUMP_FORCE) //no need for para.
        }
    })
    
    function spawnThing(){
        add([
            sprite("thing"),
            scale(0.2),
            origin("botleft"),
            area(),
            pos(width(), height() - 48),
            move(LEFT, SPEED),
            "thing_tag"
        ]);
        wait(rand(2,3.5), () => {
            spawnThing();
        })
    }
    //call spawnThing()
    spawnThing();
    
    //Wednesday onCollide with everything in "thing_tag"
    wed.onCollide("thing_tag", () => {
        addKaboom(wed.pos);
        shake();
        go("lose", score); // to gameover scene
        //burp(); //optional sound on Wed's death.
    });

    // score
    let score = 0;
    const scoreLabel = add([
        text(score),
        pos(100,100)
    ])
    // increment score every frame
    onUpdate(() => {
        score++;
        scoreLabel.text = score;
    });

});
go("wed_game");

//Game Over -- scenes are called with go()
scene("lose", (score) =>{
    add([
        sprite("gameover_wed"),
        pos(width() / 2, height() / 2 - 80),
        scale(1),
        origin("center"),
        text("Game Over"),
        pos(center()),
        origin("center"),
    ])
    //display score
    add([
        text(score),
        pos(width()/2, height()/2 + 110),
        scale(2),
        origin("center")
    ])
    // go back to game when space pressed
    onKeyPress("space", ()=> go("wed_game"));
    onClick(()=>go("wed_game"));
});







