// 这是我们的玩家要躲避的敌人 
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.x = -30;
    this.y = random(50,240);
    this.speed = random(100,200);
};

//--- 敌人出现的不同位置
function random(minNum,maxNum){
	var num = maxNum -  minNum+1;
	return Math.floor(Math.random() * num + minNum);
}
// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
	// --- 为了使敌人循环出现
	if(this.x > 500){
		this.x = -30;
		this.x += this.speed * dt;
	}else{
		this.x += this.speed * dt;
	}
   
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数

//---  我自己的玩家类
var Player = function(){
	// 玩家图
	 this.sprite = 'images/char-boy.png';
     this.x = 205;
     this.y = 430;
     this.checkCollisions();
};

//--- 画出玩家
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    
};
// --- 防止不到河岸就弹出
Player.prototype.update = function(dt){
    if(this.y === -5){
            alert("你成功了！");
            this.x = 205;
            this.y = 430;
    }
};
//--- 控制玩家的位置
Player.prototype.handleInput = function(movement){
	
	  switch (movement) {
	       case 'left':
	          if (this.x >3 ) {
	            	this.x -= 101;
	          } break;
	       case 'right':
	          if (this.x < 407) {
	            this.x += 101;
	          } break;
	       case 'up':
	          if (this.y > 15) {
	            this.y -= 83;
//	            console.log(this.x+ "---"+ this.y);
	          }else {
	          	this.y -= 20;
	          }break;
	       case 'down':
	          if (this.y < 430) {
	             this.y += 83;
	          } break;
   }
};

//---实现碰撞函数
Player.prototype.checkCollisions = function(){
    for(var i=0;i<allEnemies.length;i++){
        if((this.y - allEnemies[i].y)<40){
            if((Math.abs(this.x - allEnemies[i].x))<40){
                this.x = 205;
                this.y = 430;
            }
       }
    }
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面

var allEnemies = [];
// ---先出来一个敌人对象
var enemy = new Enemy();
allEnemies.push(enemy);
var num = 1;
// ---为了让敌人不成堆的出现，设置间隔
var int=self.setInterval("newObject()",2000);
// ---生产敌人的方法
function newObject(){
	var enemy = new Enemy();
    allEnemies.push(enemy);
    num++;
    if(num > 3){
    	// 3个后就清除定时循环
    	clearInterval(int);
    }
}

// 把玩家对象放进一个叫 player 的变量里面
var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


