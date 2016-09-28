//SCREEN SIZE: 
var SCREEN_HEIGHT = 1080;
var SCREEN_WIDTH = 720;

//Game Parameters:
var SpriteSize = 60;
var CREDIT = 99;
var GameStart = false;

//Color index
var Green = 0;
var Blue = 1;
var Yellow = 2;

//Release Parameters, Don't change.
var LastReleaseTime_Ball = 0;
var LastReleaseTime_GiftRaining = 0;
var LastSpeedUpTime = 0;
var ballSize = 1.0

//Parameters for game producers
var CooldownTime_Ball = 720.0;
var CooldownTime_Gift = 0.4;
var SpeedManager_UpdateTime = 2;

var VelocityFector_Ball = 2.0;
var MovingSpeed_GiftGroup = 0.2;
var DropSpeed_Gift = 3.0;


function SpeedManager()
{
	if(game.time.totalElapsedSeconds() - LastSpeedUpTime > SpeedManager_UpdateTime)
	{
		LastSpeedUpTime = game.time.totalElapsedSeconds();
		
		VelocityFector_Ball *= 1.1;
		VelocityFector_Ball = Math.min(VelocityFector_Ball, 1.5)
		
		MovingSpeed_GiftGroup *= 1.1;
		DropSpeed_Gift *= 1.1;
	}
}
