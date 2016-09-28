function Santa()
{
	this.object = game.add.sprite(SpriteSize * 3, 30, 'santa');
	this.sound = game.add.audio('ouch');
	this.CanPutGift = true;
	
	//Bricks Patameters
	this.LastReleaseTime_Gift = 0;
}

Santa.prototype.Init = function()
{
//	this.object.scale.setTo(1.5, 1.5);
    this.object.anchor.setTo(0, 0);
	
	game.physics.enable(this.object, Phaser.Physics.ARCADE);
    this.object.body.collideWorldBounds = true;
    this.object.body.bounce.set(1);
    this.object.body.immovable = true;
	this.object.visible = false;
	
	this.object.body.width = 60;
	this.object.body.height = 60;
}


Santa.prototype.Move_Left = function()
{
	this.object.x -= SpriteSize;
	
	if (this.object.x <= SpriteSize)
    {
        this.object.x = SpriteSize;
    }
}

Santa.prototype.Move_Right = function()
{
	this.object.x += SpriteSize;
	
	if (this.object.x + SpriteSize * 2 >= game.width)
    {
        this.object.x = game.width - SpriteSize * 2;
    }
}


Santa.prototype.put_gift = function()
{
	if(GameStart == true && this.CanPutGift == true && (game.time.totalElapsedSeconds() - this.LastReleaseTime_Gift > CooldownTime_Gift) )
	{
		var index = game.rnd.integer()%3;
		this.LastReleaseTime_Gift = game.time.totalElapsedSeconds();
		
		var brick;
		brick = Group_FallingGift.create(this.object.x, this.object.y + SpriteSize, 'gifts', 'gift_' + index + '.png');
		brick.body.color = index;

//		console.log(brick.number);
	}
}


function CheckCollisionWithGift (_santa, _gift) 
{
	santa.CanPutGift = false;
}
