module app {
	export class MainGrid extends lxl.CComponent{
		public constructor() {
			super("resource/app_skins/MainGrid.exml");
		}

		private btn_up:lxl.ui.CButton;
		private btn_down:lxl.ui.CButton;
		private btn_left:lxl.ui.CButton;
		private btn_right:lxl.ui.CButton;
		private btn_help:lxl.ui.CButton;
		private btn_huyan:lxl.ui.CButton;
		private btn_knowledge:lxl.ui.CButton;
		private btn_home:lxl.ui.CButton;
		private img_1:eui.Image;
		private img_2:eui.Image;
		private img_3:eui.Image;
		private lab_target:eui.Label;
		private lab_value:eui.Label;
		private btn_jian:lxl.ui.CButton;
		private group:eui.Group;
		stageH:number = 0;
		stageW:number = 0;
		private _timer:egret.Timer;
		private arrSnakeParts:Array<SnakePart> = []; 
		private arrTargets:Array<SnakeTarget> = []; 
		

		onActivity():void {
			super.onActivity();
			this.btn_up.eps = 0.4;
			this.btn_right.eps = 0.4;
			this.btn_left.eps = 0.4;
			this.btn_down.eps = 0.4;
			if(!this.btn_up.hasEventListener(lxl.CEvent.CLICK)) {
				this.btn_up.addEventListener(lxl.CEvent.CLICK, this._directionHandler, this);
				this.btn_down.addEventListener(lxl.CEvent.CLICK, this._directionHandler, this);
				this.btn_left.addEventListener(lxl.CEvent.CLICK, this._directionHandler, this);
				this.btn_right.addEventListener(lxl.CEvent.CLICK, this._directionHandler, this);
				this.btn_home.addEventListener(lxl.CEvent.CLICK, this._backHandler, this);
				this.btn_help.addEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
				this.btn_knowledge.addEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
				this.btn_huyan.addEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
				lxl.CDispatcher.getInstance().addListener(SnakeManager.CHANGE_LIFE, this.changeLife, this);
				lxl.CDispatcher.getInstance().addListener(lxl.CEvent.LEFT, this._dirHandler, this);
				lxl.CDispatcher.getInstance().addListener(lxl.CEvent.UP, this._dirHandler, this);
				lxl.CDispatcher.getInstance().addListener(lxl.CEvent.RIGHT, this._dirHandler, this);
				lxl.CDispatcher.getInstance().addListener(lxl.CEvent.DOWN, this._dirHandler, this);
				this.btn_jian.addEventListener(lxl.CEvent.CLICK, this._jianshiHandler, this);
				lxl.CDispatcher.getInstance().addListener(lxl.CEvent.READONLY_CHANGE, this.readOnlyChange, this);
			}
			Snake.lastLife = 3;
			this.stageH = this.stage.stageHeight;
			this.stageW = this.stage.stageWidth;
			let info = lxl.Tool.callJS("getInfoToken");
			if(info._userRole == "COORDINATOR") {
				this.btn_jian.visible = true;
				this.startGame();
			} else {
				
				this.btn_jian.visible = false;
				
				this.group.touchChildren = !Snake.readOnly;
				this.group.touchEnabled = !Snake.readOnly;
				if(Snake.readOnly == false) {
					this.startGame();
				}else {
					lxl.CDispatcher.getInstance().addListener(lxl.CEvent.GET_MESSAGE, this._updateData, this);
					lxl.CDispatcher.getInstance().removeListener(SnakeManager.CHANGE_LIFE, this.changeLife, this);
					lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.LEFT, this._dirHandler, this);
					lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.UP, this._dirHandler, this);
					lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.RIGHT, this._dirHandler, this);
					lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.DOWN, this._dirHandler, this);
					this.btn_up.removeEventListener(lxl.CEvent.CLICK, this._directionHandler, this);
					this.btn_down.removeEventListener(lxl.CEvent.CLICK, this._directionHandler, this);
					this.btn_left.removeEventListener(lxl.CEvent.CLICK, this._directionHandler, this);
					this.btn_right.removeEventListener(lxl.CEvent.CLICK, this._directionHandler, this);
				}
			}
			
		}

		dispose() {
			super.dispose();

			this.btn_up.removeEventListener(lxl.CEvent.CLICK, this._directionHandler, this);
			this.btn_down.removeEventListener(lxl.CEvent.CLICK, this._directionHandler, this);
			this.btn_left.removeEventListener(lxl.CEvent.CLICK, this._directionHandler, this);
			this.btn_right.removeEventListener(lxl.CEvent.CLICK, this._directionHandler, this);
			this.btn_help.removeEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
			this.btn_knowledge.removeEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
			if(this._timer) {
				this._timer.stop();
				if(this._timer.hasEventListener(egret.TimerEvent.TIMER))
					this._timer.removeEventListener(egret.TimerEvent.TIMER, this.viewUpdate, this);
			}
			lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.GET_MESSAGE, this._updateData, this);
			lxl.CDispatcher.getInstance().removeListener(SnakeManager.CHANGE_LIFE, this.changeLife, this);
			lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.LEFT, this._dirHandler, this);
			lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.UP, this._dirHandler, this);
			lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.RIGHT, this._dirHandler, this);
			lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.DOWN, this._dirHandler, this);
			this.btn_jian.removeEventListener(lxl.CEvent.CLICK, this._jianshiHandler, this);
			lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.READONLY_CHANGE, this.readOnlyChange, this);
		}

		private startGame() {
			Snake.createSnake();
			Snake.genTargets();
			let v = "";
			let len = Snake.arrSnakeParts.length;
			for(var i = 0; i < len; i++) {
				if(i == len - 1) {
					Snake.arrSnakeParts[i].imgSource = "img_chongTou_png";
					Snake.arrSnakeParts[i].partRotation = this.moveDistance;
					if(v != "")
						Snake.arrSnakeParts[i].value = v;
				} else {
					Snake.arrSnakeParts[i].imgSource = "img_chongShenTi_png";	
					for(var j = 0; j < len; j++) {
						if(Snake.arrSnakeParts[j].value != "") {
							v = Snake.arrSnakeParts[j].value;
							break;
						}
					}
				}
			}
			for(var i = 0; i < Snake.arrSnakeParts.length; i++) {
				Snake.arrSnakeParts[i].i = i;
				Snake.arrSnakeParts[i].addEventListener(lxl.CEvent.LOAD_SKIN_COMPLETE, (e:lxl.CEvent)=>{
					this.addChildAt(Snake.arrSnakeParts[e.param.i], 1);	
				}, this);
			}
			for(var i = 0; i < Snake.arrTargets.length; i++) {
				Snake.arrTargets[i].i = i;
				Snake.arrTargets[i].addEventListener(lxl.CEvent.LOAD_SKIN_COMPLETE, (e:lxl.CEvent)=>{
					this.addChildAt(Snake.arrTargets[e.param.i], 1);
				}, this);
			}
			if(len != 0)
				this.startTime();
			this.lab_target.text = Snake.trueObj.cn.toString();
			Snake.viewData.trueTarget = Snake.trueObj.cn.toString();
		}

		private readOnlyChange(e:lxl.CEvent) {
			this.group.touchChildren = !Snake.readOnly;
			this.group.touchEnabled = !Snake.readOnly;
			let info = lxl.Tool.callJS("getInfoToken");
			if(info._userRole == "STUDENT") {
				if(Snake.readOnly == false) {
					lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.GET_MESSAGE, this._updateData, this);
					for(let i = 0; i < this.arrSnakeParts.length; i++) {
						this.removeChild(this.arrSnakeParts[i]);
					}
					for(let i = 0; i < this.arrTargets.length; i++) {
						this.removeChild(this.arrTargets[i]);
					}
					this.dispose();
					// this.startGame();
					// lxl.CDispatcher.getInstance().addListener(SnakeManager.CHANGE_LIFE, this.changeLife, this);
					// lxl.CDispatcher.getInstance().addListener(lxl.CEvent.LEFT, this._dirHandler, this);
					// lxl.CDispatcher.getInstance().addListener(lxl.CEvent.UP, this._dirHandler, this);
					// lxl.CDispatcher.getInstance().addListener(lxl.CEvent.RIGHT, this._dirHandler, this);
					// lxl.CDispatcher.getInstance().addListener(lxl.CEvent.DOWN, this._dirHandler, this);
				}
			}
		}

		private _updateData(e:lxl.CEvent) {
			lxl.logs.log("e________" + e.param.gridSnake.length);
			let vd:ViewData = e.param;
			this.createSnakeOrMove(vd.gridSnake, vd.snakeDir);
			this.createTargets(vd.gridMap, true);
			this.lab_target.text = vd.trueTarget;
			this.lab_value.text = vd.curString;
		}

		private createSnakeOrMove(arr:Array<GridSnake>, dir:string) {
			if(this.arrSnakeParts.length != arr.length) {
				for(let i = 0; i < this.arrSnakeParts.length; i++) {
					this.removeChild(this.arrSnakeParts[i]);
				}
				this.arrSnakeParts = [];
				for(var i = 0; i < arr.length; i++) {
					let part:SnakePart = Snake.createPart();
					part.x = Snake.areaX + Math.floor(lxl.Config.GRID_SIZE * arr[i].loc_x);
					part.y = Snake.areaY + Math.floor(arr[i].loc_y * lxl.Config.GRID_SIZE);
					this.arrSnakeParts.push(part);
				}
				for(var i = 0; i < this.arrSnakeParts.length; i++) {
					if(i == this.arrSnakeParts.length - 1) {
						this.arrSnakeParts[i].imgSource = "img_chongTou_png";
						this.arrSnakeParts[i].partRotation = dir;
					} else {
						this.arrSnakeParts[i].imgSource = "img_chongShenTi_png";
					}
				}
				for(let i = 0; i < this.arrSnakeParts.length; i++) {
					this.addChild(this.arrSnakeParts[i]);
				}

			} else {
				for(var i = 0; i < arr.length; i++) {
					this.arrSnakeParts[i].x = Snake.areaX + Math.floor(lxl.Config.GRID_SIZE * arr[i].loc_x);
					this.arrSnakeParts[i].y = Snake.areaY + Math.floor(arr[i].loc_y * lxl.Config.GRID_SIZE);
				}
			}
		}

		private createTargets(arr:Array<GridMap>, isUpdate:boolean) {
			if(isUpdate == true) {
				for(let i = 0; i < this.arrTargets.length; i++) {
					this.removeChild(this.arrTargets[i]);
				}
				this.arrTargets = [];
				for(let i = 0; i < arr.length; i++) {
					let target:SnakeTarget = Snake.createTarget();
					target.x = Snake.areaX + arr[i].loc_x * lxl.Config.GRID_SIZE;
					target.y = Snake.areaY + arr[i].loc_y * lxl.Config.GRID_SIZE;
					target.setTarget(arr[i].value, Snake.areaW, Snake.areaH);
					target.vd = arr[i];
					this.arrTargets.push(target);
				}
				for(let i = 0; i < this.arrTargets.length; i++) {
					this.addChild(this.arrTargets[i]);
				}
			} else {
				for(let i = 0; i < this.arrTargets.length; i++) {
					for(let j = 0; j < arr.length; j++) {
						if(this.arrTargets[i].value == arr[j].value && this.arrTargets[i].vd.loc_x == arr[j].loc_x && this.arrTargets[i].vd.loc_y == arr[j].loc_y) {
							this.removeChild(this.arrTargets[i]);
							return;
						}
					}
				}
			}
		}

		private reset() {
			this._timer.stop();
			for(let i = 0; i < Snake.arrSnakeParts.length; i++)
				this.removeChild(Snake.arrSnakeParts[i]);
			for(let i = Snake.arrTargets.length - 1; i >= 0; i--)
				this.removeChild(Snake.arrTargets[i]);
			Snake.viewData.gridMap = [];
			Snake.viewData.gridSnake = [];
			Snake.viewData.curString = "";
			this.moveDistance = "right";
			this.lab_value.text = "";
			this.lab_target.text = "";
			this.onActivity();
		}

		private startTime() {
			this._timer = new egret.Timer(Snake.timeNum);
			if(!this._timer.hasEventListener(egret.TimerEvent.TIMER))
				this._timer.addEventListener(egret.TimerEvent.TIMER, this.viewUpdate, this);
			this._timer.start();
		}

		

		private _jianshiHandler(e:lxl.CEvent) {
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.OPEN));
		}

		private changeLife(e:lxl.CEvent) {
			if(this.img_1 != undefined && (3 - (3 - Snake.lastLife) != 3) && Snake.lastLife >= 0) {
				egret.Tween.get(this["img_" + (3 - (3 - Snake.lastLife) + 1)])
					.to( { scaleX: 0.8, scaleY: 0.8}, 200)
					.to( { scaleX: 1.1, scaleY: 1.1}, 200)
					.to( { scaleX: 0.7, scaleY: 0.7}, 200)
					.to( { scaleX: 5, scaleY: 5, alpha: 0}, 100)
					.call(()=>{
						for(var i = 0; i < 3; i++) {
							this["img_" + (i + 1)].visible = false;
							this["img_" + (i + 1)].alpha = 1;
							this["img_" + (i + 1)].scaleX = 1;
							this["img_" + (i + 1)].scaleY = 1;
						}
						for(var i = 0; i < Snake.lastLife; i++) {
							this["img_" + (i + 1)].visible = true;
						}
					});
			} else {
				for(var i = 0; i < 3; i++)
					this["img_" + (i + 1)].visible = false;
				for(var i = 0; i < Snake.lastLife; i++)
					this["img_" + (i + 1)].visible = true;
			}
		}

		private _sound:egret.Sound;
		private gameOver() {
			if(Snake.lastLife == 0) {
				this._timer.removeEventListener(egret.TimerEvent.TIMER, this.viewUpdate, this);
				this._showFail();
				return;
			} else {
				this._timer.stop();
				this._sound = Res.getRes("wall_mp3");
				this._sound.play(0, 1);
				this._lock = true;
				Snake.lastLife--;
				this.moveDistance = "right";
				egret.Tween.get(this)
					.wait(1000).call(()=>{
                		Snake.resetSnake();
						this.moveDistance = "right";        
						this._timer.start();
						this._lock = false;
				});
				if(Snake.lastLife == 0) {
					this._timer.removeEventListener(egret.TimerEvent.TIMER, this.viewUpdate, this);
					this._showFail();
					return;
				}
			}
		}
		
		private _showWin() {
			this._lock = true;
			this._timer.removeEventListener(egret.TimerEvent.TIMER, this.viewUpdate, this);
			this._win = new DlgWin();
			this.pop(this._win);
			this._win.addEventListener(lxl.CEvent.CLOSE, this._winClose, this);
		}

		private _showFail() {
			this._lock = true;
			this._timer.removeEventListener(egret.TimerEvent.TIMER, this.viewUpdate, this);
			this._fail = new DlgFail();
			this.pop(this._fail);
			this._fail.addEventListener(lxl.CEvent.CLOSE, this._failClose, this);
		}

		private _win:app.DlgWin;
		private _winClose(e:lxl.CEvent = null) {
			this._lock = false;
			this._win.removeEventListener(lxl.CEvent.CLOSE, this._winClose, this);
			this._win.dispose();
			if(e.param == 1) {
				Snake.curBattle++;
				if(Snake.curBattle >= 5)
					Snake.curBattle = 4;
			}
			this.reset();
		}

		private _fail:app.DlgFail;
		private _failClose() {
			this._lock = false;
			this._fail.removeEventListener(lxl.CEvent.CLOSE, this._failClose, this);
			this._fail.dispose();
			this.reset();
		}

		private _lock:boolean = false;
		private _dirHandler(e:lxl.CEvent) {
			if (e.param == "up" && this.moveDistance != "down") {
				// if(this.moveDistance == "up")
				this.moveDistance = "up";
					this.viewUpdate();
			}else if (e.param == "down" && this.moveDistance != "up") {
				// if(this.moveDistance == "down")
				this.moveDistance = "down";
					this.viewUpdate();
			}else if (e.param == "left" && this.moveDistance != "right") {
				// if(this.moveDistance == "left")
				this.moveDistance = "left";
					this.viewUpdate();
			}else if (e.param == "right" && this.moveDistance != "left") {
				// if(this.moveDistance == "right")
				this.moveDistance = "right";
					this.viewUpdate();
			}
		}

		private moveDistance:string = "right";
		private _directionHandler(e:lxl.CEvent) {
			if (e.target == this.btn_up && this.moveDistance != "down") {
				// if(this.moveDistance == "up")
				this.moveDistance = "up";
					this.viewUpdate();	
			}else if (e.target == this.btn_down && this.moveDistance != "up") {
				// if(this.moveDistance == "down")
				this.moveDistance = "down";
					this.viewUpdate();
			}else if (e.target == this.btn_left && this.moveDistance != "right") {
				// if(this.moveDistance == "left")
				this.moveDistance = "left";
					this.viewUpdate();
			}else if (e.target == this.btn_right && this.moveDistance != "left") {
				// if(this.moveDistance == "right")
				this.moveDistance = "right";
					this.viewUpdate();
			}
			
		}

		private animateTarget(target:any) {
			egret.Tween.get(target)
				.to( {scaleX: 1.3, scaleY: 1.3}, 200)
				.to( { x: this.lab_value.x, y: this.lab_value.y, scaleX: 0.7, scaleY: 0.7}, 200)
				.to( { scaleX: 0.3, scaleY: 0.3, alpha: 0}, 200)
				.call(()=>{
					this.lab_value.text += target.value;
					Snake.viewData.curString = this.lab_value.text;
					this.removeChild(target);
					Snake.viewData.snakeDir = this.moveDistance;
					Snake.viewData.curString = this.lab_value.text;
					Snake.dataHandler.sendMessageToServer(Snake.viewData);
				});
		}

		// private timeUpdate:number = 1;
		private speed:number = 0;
		private score:number = 0;
		private viewUpdate(e:egret.Event = null):void{
			var head = Snake.arrSnakeParts[Snake.arrSnakeParts.length - 1];
			// this.timeUpdate++;
			if(this._lock == true)
				return;
			if (this.speed != 9) {
				this.speed = Math.floor(this.score / 10);
			}
			if(Snake.arrSnakeParts.length == 0) {
				this._showWin();
				return;
			}
			//吃到目标
			let snakeBody = Snake.arrSnakeParts[Snake.arrSnakeParts.length - 1];
			for(var j = 0; j < Snake.arrTargets.length; j++) {
				let target = Snake.arrTargets[j]; 
				if (snakeBody.x == target.x && snakeBody.y == target.y && snakeBody.value != "") {
					if(target.value == Snake.trueTargets[0]){
						this.score++;
						this.removeChild(Snake.arrSnakeParts[0]);
						Snake.arrSnakeParts.shift();
						this.animateTarget(Snake.arrTargets[j]);
						Snake.arrTargets.splice(j, 1);
						Snake.trueTargets.splice(0, 1);
						Snake.viewData.gridSnake.shift();
						Snake.viewData.gridMap.splice(j, 1);
					} else {
						this.gameOver();
						return;
					}
					// for(var i = 0; i < Snake.trueTargets.length; i++) {
					// 	if(target.value == Snake.trueTargets[i]) {
					// 		// snakeBody.value = snakeBody.value / target.value;
					// 		this.score++;
					// 		this.removeChild(Snake.arrSnakeParts[0]);
					// 		Snake.arrSnakeParts.shift();
					// 		this.removeChild(Snake.arrTargets[j]);
					// 		Snake.arrTargets.splice(j, 1);
					// 		Snake.trueTargets.splice(i, 1);
					// 		Snake.viewData.gridSnake.shift();
					// 		Snake.viewData.gridMap.splice(j, 1);
					// 		break;
					// 	} else if(i == Snake.trueTargets.length -1){
					// 		this.gameOver();
					// 		return;
					// 	}
					// }
				}
			}
			//蛇身相撞，游戏结束
			for (var i = 0; i < Snake.arrSnakeParts.length - 1; i++) {
				if (head.x == Snake.arrSnakeParts[i].x && head.y == Snake.arrSnakeParts[i].y) {
					this.gameOver();
					return;
				}
			}
			//蛇身移动
			if (Snake.arrSnakeParts.length != 0)
				this.move();
			Snake.viewData.snakeDir = this.moveDistance;
			Snake.dataHandler.sendMessageToServer(Snake.viewData);
		}

		private move() {
			let head = Snake.arrSnakeParts[Snake.arrSnakeParts.length - 1];
			let headX:number = head.x;
			let headY:number = head.y;
			let tail = Snake.arrSnakeParts[0];
			let tailX = tail.x;
			let tailY = tail.y;
			let headGrid = Snake.viewData.gridSnake[Snake.viewData.gridSnake.length - 1];
			let tailGrid = Snake.viewData.gridSnake[0];
			let headGridX:number = headGrid.loc_x;
			let headGridY:number = headGrid.loc_y;
			let tailGridX:number = tailGrid.loc_x;
			let tailGridY:number = tailGrid.loc_y;

			if (this.moveDistance == "up") {
				if (headY <= Snake.areaY) {
					this.gameOver();
					return;
				} else {
					tail.y = headY - lxl.Config.GRID_SIZE;
					tailGrid.loc_y = headGridY - 1;
				}
				tail.x = headX;
				tailGrid.loc_x = headGridX;
				Snake.arrSnakeParts.shift();
				Snake.arrSnakeParts.push(tail);
				Snake.viewData.gridSnake.shift();
				Snake.viewData.gridSnake.push(tailGrid);
			}else if (this.moveDistance == "down") {
				if (headY + lxl.Config.GRID_SIZE >= Snake.areaH + Snake.areaY) {
					this.gameOver();
					return;
				}else{
					tail.y = headY+lxl.Config.GRID_SIZE;
					tailGrid.loc_y = headGridY + 1;
				}
				tail.x = headX;
				tailGrid.loc_x = headGridX;
				Snake.arrSnakeParts.shift();
				Snake.arrSnakeParts.push(tail);
				Snake.viewData.gridSnake.shift();
				Snake.viewData.gridSnake.push(tailGrid);
			}else if (this.moveDistance == "left") {
				if (headX <= Snake.areaX) {
					this.gameOver();
					return;
				}else{
					tail.x = headX - lxl.Config.GRID_SIZE;
					tailGrid.loc_x = headGridX - 1;
				}
				tail.y = headY;
				tailGrid.loc_y = headGridY;
				Snake.arrSnakeParts.shift();
				Snake.arrSnakeParts.push(tail);
				Snake.viewData.gridSnake.shift();
				Snake.viewData.gridSnake.push(tailGrid);
			}else if (this.moveDistance == "right") {
				if (headX + lxl.Config.GRID_SIZE >= Snake.areaW + Snake.areaX) {
					this.gameOver();
					return;
				}else{
					tail.x = headX + lxl.Config.GRID_SIZE;
					tailGrid.loc_x = headGridX + 1;
				}
				tail.y = headY;
				tailGrid.loc_y = headGridY;
				Snake.arrSnakeParts.shift();
				Snake.arrSnakeParts.push(tail);
				Snake.viewData.gridSnake.shift();
				Snake.viewData.gridSnake.push(tailGrid);
			}
			let len = Snake.arrSnakeParts.length;
			let v = "";
			for(var i = 0; i < len; i++) {
				if(i == len - 1) {
					Snake.arrSnakeParts[i].imgSource = "img_chongTou_png";
					Snake.arrSnakeParts[i].partRotation = this.moveDistance;
					Snake.viewData.gridSnake[i].dir = this.moveDistance;
					Snake.viewData.gridSnake[i].isHead = true;
					if(v != "")
						Snake.arrSnakeParts[i].value = v;
				} else {
					Snake.arrSnakeParts[i].imgSource = "img_chongShenTi_png";	
					for(var j = 0; j < len; j++) {
						if(Snake.arrSnakeParts[j].value != "") {
							v = Snake.arrSnakeParts[j].value;
							break;
						}
					}
					Snake.viewData.gridSnake[i].isHead = false;
					Snake.arrSnakeParts[i].value = "";
				}
			}
		}

		private _help:app.DlgHelp;
		private _helpHandler(e:lxl.CEvent):void {
			this._timer.stop();
			this._help = new app.DlgHelp();
			this.pop(this._help);
			this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_knowledge.touchEnabled = false;
			this._help.addEventListener(lxl.CEvent.CLOSE, this.helpClose, this);
		}

		private helpClose() {
			this._help.removeEventListener(lxl.CEvent.CLOSE, this.helpClose, this)
			this._help.dispose();
			this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_knowledge.touchEnabled = true;
			this._timer.start();
		}

		private _huyanHandler(e:lxl.CEvent):void {
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.EYE_CHANGE));
		}

		private _changeEyeState(e:lxl.CEvent) {
			lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
		}

		private _zhishi:app.DlgZhishi;
		private _knowledgeHandler(e:lxl.CEvent):void {
			this._timer.stop();
			this._zhishi = new app.DlgZhishi();
			this.pop(this._zhishi);
			this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_knowledge.touchEnabled = false;
			this._zhishi.addEventListener(lxl.CEvent.CLOSE, this.knowledgeClose, this);
		}

		private knowledgeClose() {
			this._zhishi.removeEventListener(lxl.CEvent.CLOSE, this.knowledgeClose, this)
			this._zhishi.dispose();
			this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_knowledge.touchEnabled = true;
			this._timer.start();
		}

		private _backHandler(e:lxl.CEvent) {
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.BACK));
		}

	}
}