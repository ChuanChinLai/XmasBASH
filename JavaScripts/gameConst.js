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
var VelocityFector_Ball = 0.8;
var MAX_VelocityFector_Ball = 1.7;
var CooldownTime_Ball = 15.0;
var CooldownTime_Gift = 0.55;
var SpeedManager_UpdateTime = 4;


var MovingSpeed_GiftGroup = 0.3;
var DropSpeed_Gift = 5.3;


function SpeedManager()
{
	if(game.time.totalElapsedSeconds() - LastSpeedUpTime > SpeedManager_UpdateTime)
	{
		LastSpeedUpTime = game.time.totalElapsedSeconds();
		
		VelocityFector_Ball *= 1.1;
		VelocityFector_Ball = Math.min(VelocityFector_Ball, MAX_VelocityFector_Ball)
		
		MovingSpeed_GiftGroup *= 1.1;
		DropSpeed_Gift *= 1.1;
	}
}
