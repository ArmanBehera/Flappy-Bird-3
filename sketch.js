var back1, backgroundImage;

var pipeDown, pipeUp, pipeDownImage, pipeUpImage, pipeGroup;
var bird, birdAnimation;

var fruit, fruitImage1, fruitImage2, fruitImage3, fruitGroup;

var gameOverImage;
var score = 0;
var gameState = "START";

function preload(){

    // Loading the image of the background
    backgroundImage = loadImage("BackgroundImage.png");

    // Loading the image of the pipes
    pipeDownImage = loadImage("Pipe_Down.png");
    pipeUpImage = loadImage("Pipe_Up.png");

    // Loading the animation of the bird
    birdAnimation = loadAnimation("Bird_01.png", "Bird_02.png", "Bird_03.png", "Bird_04.png", "Bird_05.png", "Bird_06.png", "Bird_07.png", "Bird_08.png", );

    // Loading the image of game over 
    gameOverImage = loadImage("gameOver.png");

    // Loading the image of the fruits
    fruitImage1 = loadImage("apple.png");
    fruitImage2 = loadImage("banana.png");
    fruitImage3 = loadImage("melon.png");
}

function setup(){

    // createCanvas (800, 500);
    createCanvas(displayWidth, displayHeight);

    // Creating a group for pipes
    pipeGroup = new Group(); 

    // Creating a group for the sprites
    fruitGroup = new Group();

    // Creating a sprite for the background
    back1 = createSprite(displayWidth / 2, displayHeight / 2);
    backgroundImage.resize(displayWidth, displayHeight);
    back1.addImage(backgroundImage);

    // Creating a sprite for bird
    bird = createSprite(displayWidth / 5, displayHeight / 2);
    bird.addAnimation("Flying", birdAnimation);
    bird.scale = 0.1;
    bird.setCollider("rectangle", 0, 0, 200, 200);
}

function draw(){

    if (gameState === "START"){

        push();

        textSize(20);
        fill("red");
        text("Rules to play the game :", displayWidth / 4, displayHeight / 5);

        textSize(15);
        fill("blue");

        text("If you touch the ground or ceiling, the bird is toast.", displayWidth / 4, displayHeight / 5 + 50);
        text("If you touch the pipes, you will be perished from the face of the Earth. }:-)", displayWidth / 4, displayHeight / 5 + 100);
        text("Press the space bar to give the bird some juice.", displayWidth / 4, displayHeight / 5 + 150);
        text("And press the W to start the game.", displayWidth / 4, displayHeight / 5 + 200);

        pop();

        if (keyDown("W")){

            gameState = "PLAY";
        }

    }

    if (gameState === "PLAY"){
     
        background("red");

        obstacle();
        fruits();

        if (keyDown("SPACE")){

            bird.velocityY = -5;
        }
    
        // If the fruit and the pipe touches, they are destroyed
        if (fruitGroup.isTouching(pipeGroup)){

            fruitGroup.destroyEach();
        }

        //
        if (bird.isTouching(fruitGroup)){

            score += 5;
            fruitGroup.destroyEach();
        }

        /* The y velocity of the bird is not hardcored so as to give a realistic effect
           like when the bird goes down for a long period of time the speed increases */
        bird.velocityY += 0.3;

        // The game ends when the bird touches the ground
        if (bird.y > displayHeight || bird. y < 0 || bird.isTouching(pipeGroup)){

           gameState = "END";
        }

        

        drawSprites();

        push();

        fill("red");
        textSize(15);
        text("Score : "+score, displayWidth  - 300, displayHeight / 6);

        pop();
    }

    if (gameState === "END"){

        background("blue");

        pipeGroup.setLifetimeEach(0);
        bird.visible = false;
        bird.velocityY = 0;

        image(gameOverImage, 400, 250);
    }
}

function obstacle(){

    if (frameCount % 250 === 0){

        // var randUp = Math.round(random(100, displayHeight - 400));
        // var randUp = 100;
        var randUp = Math.round(random(-100, 250));
        var randSpace = Math.round(random(630, 700));
        var speedRand = -((score + 80)/ 20);
 
        // Creating a sprite for the upper pipe

        pipeUp = createSprite(displayWidth, randUp);
        pipeUpImage.resize(50, 550);
        pipeUp.addImage(pipeUpImage);
        pipeUp.velocityX = speedRand;
        pipeUp.lifetime = 600;

        // Creating a sprite for the lower pipe
        pipeDown = createSprite(displayWidth, pipeUp.y + randSpace);
        pipeDownImage.resize(50, 550);
        pipeDown.addImage(pipeDownImage);
        pipeDown.velocityX = speedRand;
        pipeDown.lifetime = 600;

        pipeGroup.add(pipeDown);
        pipeGroup.add(pipeUp);
    }
}

function fruits(){

    if (frameCount % 200 === 0){

        fruit = createSprite(displayWidth, random(100, displayHeight - 100));
        
        var randImage = Math.round(round(1, 3));

        switch(randImage){

            case 1 : fruit.addImage(fruitImage1);
                break;

            case 2 : fruit.addImage(fruitImage2);
                break;

            case 3 : fruit.addImage(fruitImage3);
                break;
        }

        fruit.lifetime = 400;
        fruit.velocityX = Math.round(random(-5, -8));
        
        fruitGroup.add(fruit);
    }
}