function ImageManager()
{
	this.LOGO;
	this.tree;
	
	this.UI_START;
	this.UI_OVER;
	
	this.UI_WIN;
	this.UI_LOSE;
	
	this.SparkLine_1;
	this.SparkLine_2;
	
	this.Deer_1;
	this.Deer_2;
	
	this.Deer_Dance_1;
	this.Deer_Dance_2;
}

ImageManager.prototype.Init = function()
{
	game.add.tileSprite(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, 'starfield');
	game.add.tileSprite(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, 'wind');
	
	
	this.tree = game.add.sprite(-20, SCREEN_HEIGHT - 380, 'tree');
	this.tree.scale.setTo(1, 1);
	this.tree.animations.add('shining');
	this.tree.animations.play('shining', 10, true);
	
	
	this.LOGO = game.add.tileSprite(game.world.centerX, 300, 600, 600, 'logo');
	this.LOGO.anchor.setTo(0.5, 0.5);
	
	this.SparkLine_1 = game.add.tileSprite(0, 420, SCREEN_WIDTH, 100, 'snowline');
	this.SparkLine_2 = game.add.tileSprite(SCREEN_WIDTH, 420, SCREEN_WIDTH, 100, 'snowline');
	
	this.Deer_1 = game.add.sprite(game.world.centerX - 150, SCREEN_HEIGHT - 200, 'deers');
	this.Deer_1.animations.add('jump');
	this.Deer_1.animations.play('jump', 10, true);
	
	this.Deer_2 = game.add.sprite(game.world.centerX, SCREEN_HEIGHT - 200, 'deers');
	this.Deer_2.animations.add('jump');
	this.Deer_2.animations.play('jump', 10, true);
		
	game.add.tileSprite(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, 'bar');
	
	
	this.Deer_Dance_1 = game.add.sprite(game.world.centerX - 160, SCREEN_HEIGHT - 260, 'deer_dance_2');
	this.Deer_Dance_1.animations.add('dance');
	this.Deer_Dance_1.animations.play('dance', 10, true);
	this.Deer_Dance_1.visible = false;
	
	this.Deer_Dance_2 = game.add.sprite(game.world.centerX - 10, SCREEN_HEIGHT - 260, 'deer_dance_3');
	this.Deer_Dance_2.animations.add('dance');
	this.Deer_Dance_2.animations.play('dance', 10, true);
	this.Deer_Dance_2.visible = false;
}

ImageManager.prototype.UI_Display = function()
{
	this.UI_START = game.add.tileSprite(0, 550, SCREEN_WIDTH, 100, 'UI_Start');
	this.UI_OVER = game.add.tileSprite(0, 500, SCREEN_WIDTH, 140, 'UI_Over');
	this.UI_OVER.visible = false;
	
	this.UI_WIN = game.add.tileSprite(0, 400, SCREEN_WIDTH, 100, 'UI_Win');
	this.UI_WIN.visible = false;
	
	this.UI_LOSE = game.add.tileSprite(0, 400, SCREEN_WIDTH, 100, 'UI_Lose');
	this.UI_LOSE.visible = false;
}


ImageManager.prototype.update = function()
{
	this.SparkLine_1.x -= 1.0;
	this.SparkLine_2.x -= 1.0;
	
	if(this.SparkLine_1.x == -SCREEN_WIDTH)
	{
		this.SparkLine_1.x = 0;
	}
	
	if(this.SparkLine_2.x == 0)
	{
		this.SparkLine_2.x = SCREEN_WIDTH;
	}
	
	
	if (GameStart == true)
    {
		if(imageManager.SparkLine_1.y < SCREEN_HEIGHT - 100)
		{
			imageManager.SparkLine_1.y = Gift_line;
			imageManager.SparkLine_2.y = Gift_line;
		}
	}
	else
	{
		if(system.GameState == 'Win') 
		{
			this.UI_WIN.visible = true;
		}
		else if(system.GameState == 'Lose')
		{
			this.UI_LOSE.visible = true;
		}
	}
	
}

ImageManager.prototype.IsDeerJumpDisplay = function(decision)
{
	this.Deer_1.visible = decision;
	this.Deer_2.visible = decision;
}


ImageManager.prototype.IsDeerDanceDisplay = function(decision)
{
	this.Deer_Dance_1.visible = decision;
	this.Deer_Dance_2.visible = decision;
}



ImageManager.prototype.UI_Close = function()
{
	this.LOGO.visible = false;
	this.UI_START.visible = false;
}