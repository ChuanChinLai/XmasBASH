//Init Phaser
var game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render});

//Preload function
function preload() 
{
	
	game.load.atlas('gifts', 'assets/gift2a.png', 'assets/gift.json');
	
	game.load.spritesheet('deers', 'assets/deers.png', 100, 160, 2);
	game.load.spritesheet('deer_dance_2', 'assets/deer2.png', 120, 200, 2);
	game.load.spritesheet('deer_dance_3', 'assets/deer3.png', 120, 200, 4);
	
	game.load.spritesheet('tree', 'assets/TREE.png', 240, 320, 3);
	game.load.spritesheet('exp', 'assets/snowballexplode.png', 60, 60, 6);
	
	game.load.image('snow', 'assets/snowball.png');
	game.load.image('wind', 'assets/wind.png');
	game.load.image('bar', 'assets/bar.png');
	
	game.load.image('UI_Start', 'assets/XMASui1.png')
	game.load.image('UI_Over', 'assets/XMASui2.png')
	
	game.load.image('UI_Win', 'assets/winUI.png')
	game.load.image('UI_Lose', 'assets/loseUI.png')
	
	game.load.spritesheet('monster', 'assets/monster.png', 70, 62, 15);
	
	game.load.image('snowline', 'assets/snowline.png');
	game.load.image('santa', 'assets/santa.png');
    game.load.image('starfield', 'assets/background.png');
	game.load.image('logo', 'assets/logoxb.png');
	
	game.load.audio('BGM', 'assets/music/SleighRide.ogg');
	game.load.audio('ouch', 'assets/music/SantaOuch.ogg');
}

function render() 
{
	/*
    game.debug.text('Ball Velocity: ' + VelocityFector_Ball, 32, 32);	
	game.debug.text('Init Ball Velocity: ' + system.Init_VelocityFector_Ball, 32, 64);
	game.debug.text('Gift Wall: ' + MovingSpeed_GiftGroup, 32, 96);	
	game.debug.text('Gift Falling: ' + DropSpeed_Gift, 32, 128);	
	*/
}

var santa;
var monster;

var Group_Gift;
var Group_SnowBall;
var Group_FallingGift;
var Group_GiftRaining;

var BGM;

var isPausedForStacking;
var Gift_line = 300;

var imageManager;
var system;

function InsertCoin()
{
	CREDIT += 1;
}



function create()
 {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.down = true;
	
	system = new System();
	system.Init();
	
	imageManager = new ImageManager();
	imageManager.Init();
	
	Group_GiftRaining = game.add.group();
	Group_GiftRaining.enableBody = true;
    Group_GiftRaining.physicsBodyType = Phaser.Physics.ARCADE;
	
	Group_SnowBall = game.add.group();
    Group_SnowBall.enableBody = true;
    Group_SnowBall.physicsBodyType = Phaser.Physics.ARCADE;
	

	//Create a Santa 
	santa = new Santa();
	santa.Init();
	imageManager.UI_Display();
	
    Group_FallingGift = game.add.group();
    Group_FallingGift.enableBody = true;
    Group_FallingGift.physicsBodyType = Phaser.Physics.ARCADE;

	Group_Gift = game.add.group();
    Group_Gift.enableBody = true;
    Group_Gift.physicsBodyType = Phaser.Physics.ARCADE;
	
	
	monster = new Monster();
	
	//keyboard: 
	key_left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    key_left.onDown.add(santa.Move_Left, santa);
	
    key_right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	key_right.onDown.add(santa.Move_Right, santa);
		
	key_space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	key_space.onDown.add(santa.put_gift, santa);	
	
	key_enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	key_enter.onDown.add(releaseBall, this);	
	
	//background music:
	BGM = game.add.audio('BGM');
    BGM.play();
	
	//For debug
	key_z = game.input.keyboard.addKey(Phaser.Keyboard.Z);
	key_z.onDown.add(create_ball, this);
	
}


function create_gift_rain()
{
	var gift;
	gift = Group_GiftRaining.create(game.rnd.integer()%SCREEN_WIDTH, 0, 'gifts', 'gift_' + game.rnd.integer()%3 + '.png');
	gift.checkWorldBounds = true;
    game.physics.enable(gift, Phaser.Physics.ARCADE);
    gift.body.collideWorldBounds = true;
    gift.body.bounce.set(1);
	
	gift.body.velocity.y = -(game.rnd.integer()%30 + 150);
    gift.body.velocity.x = (game.rnd.integer()%SCREEN_WIDTH * (Math.random() - 0.5 ));
}

function  create_ball()
{
	var ball;
	ball = Group_SnowBall.create(monster.object.x, monster.object.y, 'snow');
	ball.scale.setTo(ballSize, ballSize);
	ball.checkWorldBounds = true;
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);

	ball.body.velocity.y = -(game.rnd.integer()%200 + 200) * VelocityFector_Ball;
    ball.body.velocity.x = -(game.rnd.integer()%200 + 200) * VelocityFector_Ball;
}


function update ()
 {
	if(GameStart == true)
	{
		SpeedManager();
	}

	Mouse_Event();

	Gift_line -= 1.0;
	
	imageManager.update();
	monster.update();
	
	game.physics.arcade.collide(Group_FallingGift, Group_Gift, stack, null, this);
	
	santa.CanPutGift = true;
	game.physics.arcade.collide(Group_Gift, santa.object, CheckCollisionWithGift, null, this);
	Group_GiftRaining.forEach(GiftHitBottom, null, true);
	
	
	if(system.GameState == 'Win' && GameStart == false)
	{
		imageManager.tree.animations.play('shining', 10, true);
		
		if(this.game.time.totalElapsedSeconds() - LastReleaseTime_GiftRaining > 0.075)
		{
			create_gift_rain();
			LastReleaseTime_GiftRaining = this.game.time.totalElapsedSeconds();
		}
	}


    if (GameStart == true)
    {

		Group_SnowBall.forEach(BallHitTop, null, true);
		Group_FallingGift.forEach(update_movingBricks, null, true);
		Group_Gift.forEach(updateBricks, null, true);
		
		if(game.time.totalElapsedSeconds() - LastReleaseTime_Ball > CooldownTime_Ball)
		{
			LastReleaseTime_Ball = game.time.totalElapsedSeconds();
			create_ball();
		}
		game.physics.arcade.collide(Group_SnowBall, santa.object, GameOver, null, this);
        game.physics.arcade.collide(Group_SnowBall, Group_Gift, BallHitGift, null, this);
	    game.physics.arcade.collide(Group_SnowBall, Group_FallingGift, BallHitGift, null, this);
    }
	
}


function GiftHitBottom(gift)
{
	if(gift.y > SCREEN_HEIGHT - 230)
	{
		gift.kill();
	}
}


function BallHitTop(ball)
{
	if(ball.y <= 0)
	{
		ball.kill();
		create_ball();
		create_ball();
	}
}


function updateBricks(brick)
{
	if(brick.y >= Gift_line)
	{
		Gift_line = brick.y;
	}
	
	if(imageManager.SparkLine_1.y + 60 >= SCREEN_HEIGHT - 100)
	{
		monster.object.visible = false;
		Group_FallingGift.removeAll();
		Group_Gift.removeAll();
		Group_SnowBall.removeAll();
	
		system.GameState = 'Win';
		imageManager.UI_OVER.visible = true;
		
		imageManager.IsDeerJumpDisplay(false);
		imageManager.IsDeerDanceDisplay(true);
		
		VelocityFector_Ball = system.Init_VelocityFector_Ball;
		MovingSpeed_GiftGroup = system.Init_MovingSpeed_GiftGroup;
		DropSpeed_Gift = system.Init_DropSpeed_Gift;
		
		
		GameStart = false;
	}
	else
	{
		brick.y += MovingSpeed_GiftGroup;
	}
}


function update_movingBricks(brick)
{
	brick.y += DropSpeed_Gift;
	
	if(brick.y + 60 >= Gift_line)
	{
		var new_brick;
		new_brick = Group_Gift.create(brick.x, Gift_line - 60, 'gifts', 'gift_' + brick.body.color + '.png');
		new_brick.body.bounce.set(1);
		new_brick.body.immovable = true;
		
		brick.destroy();
	}
}

function releaseBall () 
{
    if (GameStart == false && CREDIT > 0)
    {
		GameStart = true;
		
		imageManager.UI_OVER.visible = false;
		imageManager.UI_Close();
	
		santa.object.visible = true;
		monster.object.visible = true;
		
		imageManager.IsDeerJumpDisplay(true);
		imageManager.IsDeerDanceDisplay(false);
		imageManager.UI_WIN.visible = false;
		imageManager.UI_LOSE.visible = false;
		
		Gift_line = 300;
		imageManager.tree.animations.stop();		
		
		CREDIT -= 1;
		
		Group_GiftRaining.removeAll();
		Group_FallingGift.removeAll();
		Group_Gift.removeAll();
		Group_SnowBall.removeAll();
		
		imageManager.SparkLine_1.y = 360;
		imageManager.SparkLine_2.y = 360;
		
		monster.object.x = SCREEN_WIDTH - 150;
		monster.object.velocity = -5;
		
		//create Group_Gift
		GroupGift_Init();
		
		LastReleaseTime_Ball = game.time.totalElapsedSeconds();
		santa.LastReleaseTime_Gift = game.time.totalElapsedSeconds();
		LastSpeedUpTime = game.time.totalElapsedSeconds();
		
		create_ball();
    }
}

function BallHitGift (_ball, _brick) 
{
    var diff_x = 0;
	var diff_y = 0;
	
    if (_ball.x < _brick.x)
    {
        //  Ball is on the left-hand side of the brick
        diff_x = _brick.x - _ball.x;
        _ball.body.velocity.x = (-10 * diff_x) * VelocityFector_Ball;
    }
    else if (_ball.x > _brick.x)
    {
        //  Ball is on the right-hand side of the brick
        diff_x = _ball.x -_brick.x;
        _ball.body.velocity.x = (10 * diff_x) * VelocityFector_Ball;
    }
    else
    {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up!
        _ball.body.velocity.x = 2 + Math.random() * 8 * VelocityFector_Ball;
    }

	
	if (_ball.y < _brick.y)
    {
        //  Ball is on the upper side of the brick
        diff_y = _brick.y - _ball.y;
        _ball.body.velocity.y = (-10 * diff_y) * VelocityFector_Ball;
    }
    else if (_ball.y > _brick.y)
    {
        //  Ball is on the lower side of the brick
        diff_y = _ball.y -_brick.y;
        _ball.body.velocity.y = (10 * diff_y) * VelocityFector_Ball;
    }
    else
    {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up!
        _ball.body.velocity.y = 2 + Math.random() * 8 * VelocityFector_Ball;
    }
	
	_brick.kill();
}

function GroupGift_Init()
{
	//create Group_Gift
	var brick;
	for (var y = 0; y < 3; y++)
	{
		for (var x = 0; x < 10; x++)
		{
			brick = Group_Gift.create(60 + (x * 60), 180 + (y * 60), 'gifts', 'gift_' + y + '.png');
			game.physics.enable(brick, Phaser.Physics.ARCADE);
			brick.body.bounce.set(1);
			brick.body.immovable = true;
			brick.body.color = y;
		}
	}
}


function stack(_moving_brick, _brick)
{
	if (!isPausedForStacking)
	{
		var new_brick;
		new_brick = Group_Gift.create(_brick.x, _brick.y - 60, 'gifts', 'gift_' + _moving_brick.body.color + '.png');
		new_brick.body.bounce.set(1);
		new_brick.body.immovable = true;
		new_brick.body.color = _moving_brick.body.color;
		
		_moving_brick.kill();
	}
	
	if (_moving_brick.x >= 60 && _moving_brick.x <= 600)
	{
		pauseStacking();
	}

}

//For fix bugs
function pauseStacking()
{
	isPausedForStacking = true;
	game.time.events.add(Phaser.Timer.SECOND * .1, allowStacking, this);
}

function allowStacking()
{
	isPausedForStacking = false;
}
