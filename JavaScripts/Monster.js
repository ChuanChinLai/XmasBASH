function Monster()
{
	this.object = game.add.sprite(SCREEN_WIDTH - 150, SCREEN_HEIGHT - 190, 'monster');
	this.object.scale.setTo(2, 2);
	this.object.visible = false;
	this.velocity = -5;
	
	var dance_mon
	dance_mon = this.object.animations.add('dance_mon');
	this.object.animations.play('dance_mon', 30, true);
	
}

Monster.prototype.update = function()
{
	if(system.GameState == 'Lose' && GameStart == false)
	{
		this.object.x += this.velocity;
		
		if(this.object.x <= 0 || this.object.x >= SCREEN_WIDTH - 90)
		{
			this.velocity = -this.velocity;
		}
	}
}