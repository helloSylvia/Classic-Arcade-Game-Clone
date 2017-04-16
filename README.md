# 项目一 经典街机游戏
## 使用技术
js函数、Html5 canvas
## 游戏规则
1、玩家需要穿过石板路到河岸边<br/>
2、通过键盘上的上下左右按键来移动玩家的位置<br/>
3、玩家碰到出来的瓢虫就会回到原位，重新开始游戏<br/>
4、玩家到达河岸后，提示成功，自动回到原位
## 难点
1、瓢虫循环出现<br/>
2、碰撞检测函数<br/>
3、玩家到达蓝色处，才提示成功
## 项目修改
1、开启严格模式<br/>
2、使用子父类继承来创建对象<br/>
3、修改玩家起始位置，方便移动<br/>
4、成功y值判断，太绝对 <br/>
5、玩家到达蓝色区域后，方才提醒成功<br/>
6、玩家移动硬编码<br/>
7、碰撞函数y值判断时，取绝对值，解决玩家即使跟虫子不在同一行依然会被干掉的问题