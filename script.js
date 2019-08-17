var canvas = document.getElementById('canvas');
var graphics = canvas.getContext('2d');

var marioWidth = 32;
var marioHeight = 32;
var marioPositionX = canvas.width / 2;
var marioPositionY = canvas.height;
var marioMoveSpeed = 5;

var goombaWidth = 32;
var goombaHeight = 32;
var goombaPositionX = 100;
var goombaPositionY = canvas.height - goombaHeight;
var goombaSpeed = marioMoveSpeed +2;

var gravity = 10;
var jumpForce = 25;
var jumpForceDecay = 1;
var maxJumpForce = 25;


var marioTexture = new Image();
marioTexture.src = "http://vignette3.wikia.nocookie.net/fantendo/images/5/58/8bitsprite-1-.png/revision/latest?cb=20151029181053";

var goombaTexture = new Image();
goombaTexture.src =
"http://giantbomb1.cbsistatic.com/uploads/scale_super/9/93854/2438851-goomba%20smb%20sprite%20walk%20gif.gif";

function update() {

	// BEGIN UPDATE LOGIC
	//-------------------------------------
	if (isKeyDown(LEFT_KEY)) {
		marioPositionX -= marioMoveSpeed;
	}
  if (isKeyDown(RIGHT_KEY)) {
		marioPositionX += marioMoveSpeed;
	}

  if (isKeyDown(UP_KEY)) {
		marioPositionY -= jumpForce;
    jumpForce -= jumpForceDecay;
	}
  if (isKeyDown(DOWN_KEY)) {
		marioPositionY += marioMoveSpeed;
	}

  // apply gravity so the character falls down
  marioPositionY += gravity;

  // stop the character from falling down the screen
  if(marioPositionY > canvas.height - marioHeight) {
    marioPositionY = canvas.height - marioHeight; 
    jumpForce = maxJumpForce;
  } 

  // wrap character from left to right side of the screen
  if(marioPositionX < 0) {
    marioPositionX = canvas.width;
  }

  // wrap character from right to left side
  if(marioPositionX > canvas.width) {
    marioPositionX = 0;
  }

//  if(goombaPositionX < 0) {
//     goombaPositionX = canvas.width;
//   }

//   if(goombaPositionX > canvas.width) {
//     goombaPositionX = 0;
//   }

if(marioPositionX > goombaPositionX + goombaWidth) {
  goombaPositionX += goombaSpeed;
}

if(marioPositionX + marioWidth < goombaPositionX) {
  goombaPositionX -= goombaSpeed;
}

	//-------------------------------------
	// END UPDATE LOGIC

	// BEGIN DRAW LOGIC
	//-------------------------------------

	graphics.clearRect(0, 0, canvas.width, canvas.height)

	graphics.drawImage(
		marioTexture,
		marioPositionX, marioPositionY, marioWidth, marioHeight);
	//-------------------------------------

  graphics.drawImage(
    goombaTexture,
    goombaPositionX, goombaPositionY, goombaWidth, goombaHeight);

	// ask the browser to call the update function again.
	requestAnimationFrame(update)
}


// DO NOT EDIT BELOW THIS LINE
//--------------------------------------------------------------------

var keys = [];
var LEFT_KEY = 37;
var UP_KEY = 38;
var RIGHT_KEY = 39;
var DOWN_KEY = 40;

// check key down events
window.addEventListener('keydown', function (event) {
	keys[event.keyCode] = true;
}, true);

// check key release events
window.addEventListener('keyup', function (event) {
	keys[event.keyCode] = false;
}, true);

function isKeyDown(key) {
	return keys[key];
}

update();
//--------------------------------------------------------------------