function System()
{
	//Opening, Gaming, Win and Lose 
	this.GameState = 'Opening';
	
	this.Init_CooldownTime_Ball;
	this.Init_CooldownTime_Gift;
	this.Init_SpeedManager_UpdateTime;
	
	this.Init_VelocityFector_Ball;
	this.Init_MovingSpeed_GiftGroup;
	this.Init_DropSpeed_Gift;
}

System.prototype.Init = function()
{
	this.Init_CooldownTime_Ball = CooldownTime_Ball;
	this.Init_CooldownTime_Gift = CooldownTime_Gift;
	this.Init_SpeedManager_UpdateTime = SpeedManager_UpdateTime;
	
	this.Init_VelocityFector_Ball = VelocityFector_Ball;
	this.Init_MovingSpeed_GiftGroup = MovingSpeed_GiftGroup;
	this.Init_DropSpeed_Gift = DropSpeed_Gift;
}



 function GameOver()
{
		santa.sound.play();
		GameStart = false;
		
		system.GameState = 'Lose';
		
		imageManager.UI_OVER.visible = true;
		santa.object.visible = false;
		
		imageManager.SparkLine_1.y = 75;
		imageManager.SparkLine_2.y = 75;
		
		VelocityFector_Ball = system.Init_VelocityFector_Ball;
		MovingSpeed_GiftGroup = system.Init_MovingSpeed_GiftGroup;
		DropSpeed_Gift = system.Init_DropSpeed_Gift;
		
		imageManager.IsDeerJumpDisplay(false);
		
		Group_FallingGift.removeAll();
		
		Group_Gift.removeAll();
		
		for(var i = 0; i < 100; i++)
		{
			create_ball();
		}
}
 
function Mouse_Event()
{
	 //  only move when you click  
	if(system.GameState == 'Opening')
	{
		console.log(game.input.x, game.input.y);
		if(game.input.x > 220 && game.input.x < 500 && game.input.y > 600 && game.input.y < 650 && game.input.mousePointer.isDown)
		{
				releaseBall();
		}
	}
	
	
	if(system.GameState == 'Win' || system.GameState == 'Lose')
	{
		if(game.input.x > 90 && game.input.x < 620 && game.input.y > 560 && game.input.y < 620 && game.input.mousePointer.isDown)
			{
				releaseBall();
			}
	}
}