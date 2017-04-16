// 这是我们的玩家要躲避的敌人 
//--- 修改1； 严格模式
"use strict";
// 继承
function inherit(father,son){
	//父的副本
	var farCopy = Object.create(father.prototype);
	// 更改自己的constructor
	farCopy.constructor = son;
	son.prototype = farCopy;
}
// ---修改2： 声明父类  角色
var Role = function(x,y,sprite){
	this.x = x;
    this.y = y;
	this.sprite = sprite;
};
Role.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//--- 声明敌人类
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    var y = random(50,240);
    Role.call(this,-30,y,'images/enemy-bug.png');
    this.speed = random(100,200);
};
inherit(Role,Enemy);
//---  我自己的玩家类
var Player = function(){
	// --- 修改玩家y值为405
	 Role.call(this,205,405,'images/char-boy.png');
     this.checkCollisions();
};
inherit(Role,Player);
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

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数

// --- 防止不到河岸就弹出
// --- 修改5 解决玩家没有到达蓝色区域，就提前提示成功
var count = 0;
Player.prototype.update = function(dt){
	// --- 修改4  等于改成小于 去判断 
    if(this.y <= -10){
    	count += 1;// 延迟时间
    	if(count === 3 ){
    		alert("你成功了！");
            this.x = 205;
            // --- 修改3 玩家起始y
            this.y = 405;
            // 不要忘了把count也恢复原值，不然下次计时，从3开始了，就会一直没有提示
            count = 0;
            
    	}
    }
};
//--- 控制玩家的位置
Player.prototype.handleInput = function(movement){
	// --- 修改6  硬编码
	// 玩家的界限
	var left_edge = 3;
	var right_edge = 407;
	var top_edge = 15;
	var down_edge = 405;
	// 移动值
	var bike_x = 101;
	var bike_y = 83;
	  switch (movement) {
	       case 'left':
	          if (this.x > left_edge) {
	            	this.x -= bike_x;
	          } break;
	       case 'right':
	          if (this.x < right_edge) {
	            this.x += bike_x;
	          } break;
	       case 'up':
	          if (this.y > top_edge) {
	            this.y -= bike_y;
	          }break;
	       case 'down':
	          if (this.y < down_edge) {
	             this.y += bike_y;
	          } break;
   }
};

//---实现碰撞函数
Player.prototype.checkCollisions = function(){
    for(var i=0;i<allEnemies.length;i++){
    	// --- 修改7 y值没有取绝对值 导致有些情况  即-40的时候 也会发生碰撞
        if((Math.abs(this.y - allEnemies[i].y))<40){
            if((Math.abs(this.x - allEnemies[i].x))<40){
                this.x = 205;
                // --- 修改3 玩家起始位置设为405
                this.y = 405;
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


