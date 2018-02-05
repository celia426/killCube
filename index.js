var speed = 4;
var clock = null;
var flg = 0;

//游戏初始化
function init()
{
	document.getElementById('score').innerHTML = 0;	//设置初始分数
	speed = 4;	//设置初始速度

	for(var i = 0; i < 4; i++)	//创建初始的四行
	{
		createrow();
	}

	//事件冒泡允许多个操作被集中处理（把事件处理器添加到一个父级元素上，避免把事件处理器添加到多个子级元素上）
	document.getElementById('main').onclick = function(ev)
	{
		judge(ev);
	}

	clock = window.setInterval('move()',30);
}

//判断是否点击黑块
function judge(ev)
{
	if(ev.target.className.indexOf('black') == -1)
	{
		if(flg == 1)
		{
			fail();
			flg = 0;
		}
	}
	else
	{
		ev.target.className = 'cell';
		ev.target.parentNode.pass = 1;
		score();
	}
}

//游戏结束
function fail()
{
	clearInterval(clock);
	var con = document.getElementById('con');
	var score = document.getElementById('score');
	var msc = document.getElementById('maxScore');

	//弹出最终得分
	main.removeChild(con);
	confirm("你的最终得分是：" + parseInt(score.innerHTML));

	//记录最高分
	if(parseInt(score.innerHTML) > parseInt(msc.innerHTML))
	{
		msc.innerHTML = score.innerHTML;
	}
	
	//将布局恢复原样
	var div = document.createElement('div');
	div.setAttribute('id','con');
	main.appendChild(div);
	score.innerHTML = 0;
}

//创建div,className是div的类名
function creatediv(className)
{
	var div = document.createElement('div');
	div.className = className;
	return div;
}

//创建 <div class="row">
function createrow()
{
	var con = document.getElementById('con');
	var row = creatediv('row');
	var arr = createcell();
	con.appendChild(row);
	for(var i = 0; i < 4; i++)
	{
		row.appendChild(creatediv(arr[i]));
	}

	if(con.firstChild == null)
	{
		con.appendChild(row);
	}
	else
	{
		con.insertBefore(row,con.firstChild);
	}
}

//创建一个类名数组
function createcell()
{
	var temp = ['cell','cell','cell','cell'];
	var i = Math.floor(Math.random()*4);
	temp[i] = 'cell black';
	return temp;
}

//让黑块动起来
function move()
{
	var con = document.getElementById('con');
	var top = parseInt(window.getComputedStyle(con,null)['top']);

	if(speed + top > 0)
	{
		top = 0;
	}
	else
	{
		top += speed;
	}
	con.style.top = top + 'px';

	if(top == 0)
	{
		createrow();
		con.style.top = '-100px';
		delrow();
	}
	else if( top == (-100 + speed) )
	{
		var rows = con.childNodes;
        if((rows.length == 5) && (rows[rows.length - 1].pass !== 1))
        {
            fail();
        }
	}
}

//删除行
function delrow()
{
	var con = document.getElementById('con');
	if(con.childNodes.length == 6)
	{
		con.removeChild(con.lastChild);
	}
}

//下降加速
function speedup()
{
	speed += 2;
	if(speed == 18)
	{
		alert('不错哦');
	}
}

//记录得分
function score()
{
	var sc = document.getElementById('score');
	var newscore = parseInt(sc.innerHTML) + 1;
	sc.innerHTML = newscore;

	if(newscore % 10 == 0)
	{
		speedup();
	}
}

//取开始按钮的ID
var car = document.getElementById('start');

//点击开始游戏按钮
car.onclick = function()
{
	init();
	flg = 1;
}
