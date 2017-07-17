module app { 
	export class SnakeManager {
		public constructor() {
			this.dataHandler = new DataHandler();
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.GET_MESSAGE_FROM_SERVER, this.getMessageHandler, this);
			lxl.logs.log("manager中监听完成");
		}

		static CHANGE_LIFE:string = "SNAKEMANAGER::CHANGE_LIFE";//生命值改变

		arrSnakeParts:Array<SnakePart> = [];//蛇身
		arrTargets:Array<SnakeTarget> = [];//恶魔果实
		curBattle:number = 0;//当前关卡 0-4
		private _lastLife:number = 3;//当前剩余生命
		snakeLens:Array<number> = [3, 4, 5, 5, 6];//每一关蛇的长度
		targetsLens:Array<number> = [8, 12, 12, 16, 16];//每一关目标的个数
		timeNum:number = 500;//每步的移动时间
		areaX:number = 161;
		areaY:number = 79;
		areaW:number = 816;
		areaH:number = 480;
		scaleGrid:number = 0.8;
		teacherAreaX:number = 139;
		teacherAreaY:number = 67;
		viewData:ViewData = new ViewData();
		dataHandler:DataHandler;
		battleTargets:Array<Array<Object>> = [
			[{en:"cat", cn:"猫"}, {en:"dog", cn:"狗"}, {en:"god", cn:"上帝"}, {en:"car", cn:"汽车"}, {en:"fat", cn:"胖"}, {en:"one", cn:"一"}, {en:"two", cn:"二"}, {en:"sad", cn:"悲伤"}],
			[{en:"edge", cn:"边缘"}, {en:"girl", cn:"女孩"}, {en:"hair", cn:"头发"}, {en:"lake", cn:"湖"}, {en:"desk", cn:"桌子"}, {en:"bike", cn:"自行车"}, {en:"ball", cn:"球"}, {en:"foot", cn:"脚"}, {en:"door", cn:"门"}],
			[{en:"flash", cn:"闪动"}, {en:"floor", cn:"地板"}, {en:"heart", cn:"心脏"}, {en:"blood", cn:"血液"}, {en:"apple", cn:"苹果"}, {en:"eagle", cn:"鹰"}, {en:"email", cn:"电子邮件"}, {en:"image", cn:"图片"}, {en:"mouse", cn:"老鼠"}],
			[{en:"flash", cn:"闪动"}, {en:"floor", cn:"地板"}, {en:"heart", cn:"心脏"}, {en:"blood", cn:"血液"}, {en:"apple", cn:"苹果"}, {en:"eagle", cn:"鹰"}, {en:"email", cn:"电子邮件"}, {en:"image", cn:"图片"}, {en:"mouse", cn:"老鼠"}],
			[{en:"family", cn:"家庭"}, {en:"dinner", cn:"晚饭"}, {en:"winter", cn:"冬天"}, {en:"winner", cn:"胜者"}]
		]
		private _trueObj:Object = {};
		private _trueTargets = [];
		studentsList:Array<ViewData> = [];
		readOnly:boolean = true;
		set lastLife(num:number) {
			this._lastLife = num;
			this.viewData.life = num;
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(SnakeManager.CHANGE_LIFE));
		}

		get lastLife():number {
			return this._lastLife;
		}

		get trueTargets():Array<any> {
			return this._trueTargets;
		}

		get trueObj():any {
			return this._trueObj;
		}

		private getMessageHandler(e:lxl.CEvent) {
			lxl.logs.log("e:" + e.param.toString());
			let info = lxl.Tool.callJS("getInfoToken");
			if(info._userRole == "COORDINATOR") {
				for(let i = 0; i < this.studentsList.length; i++) {
					if(this.studentsList[i].token == e.param.token) {
						this.studentsList[i] = e.param;
						lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.GET_MESSAGE));
						break;
					} else if(i == this.studentsList.length - 1) {
						this.studentsList.push(e.param);
						lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.GET_MESSAGE));
					}
				}
				if(this.studentsList.length == 0) {
					this.studentsList.push(e.param);
					lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.GET_MESSAGE));
				}
			} else {
				lxl.logs.log("type:--------" + e.param.type);
				lxl.logs.log(this.readOnly.toString());
				if(e.param.type == "show") {
					if(this.readOnly == false) {
						this.readOnly = true;
						lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.READONLY_CHANGE));
					}
					lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.GET_MESSAGE, e.param));
				} else if(e.param.type == "normal") {
					if(this.readOnly == true) {
						this.readOnly = false;
						lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.READONLY_CHANGE));
					}
				}
			}
			
		}

		/**
		 * 创建一个目标
		 */
		createTarget():SnakeTarget {
			var tar:SnakeTarget = new SnakeTarget();
			return tar;
		}

		/**
		 * 创建一个蛇身
		 */
		createPart():SnakePart {
			var part:SnakePart = new SnakePart();
			return part;
		}

		/**
		 * 生成目标组
		 */
		genTargets() {
			this.arrTargets = [];
			
			for(var i = 0; i < this.targetsLens[this.curBattle]; i++) {
				let target = this.createTarget();
				let pnt = this.getRandomPos();
				let grid = new GridMap();
				grid.loc_x = (pnt.x - Snake.areaX) / lxl.Config.GRID_SIZE;
				grid.loc_y = (pnt.y - Snake.areaY) / lxl.Config.GRID_SIZE;
				if(this._trueTargets[i] != null) {
					target.x = pnt.x;
					target.y = pnt.y;
					target.setTarget(this._trueTargets[i], this.areaW, this.areaH);
					this.arrTargets.push(target);
					grid.value = this._trueTargets[i];
					grid.isTarget = true;
				} else {
					target.x = pnt.x;
					target.y = pnt.y;
					let temp = String.fromCharCode(97 + Math.floor(Math.random() * 26));
					target.setTarget(temp, this.areaW, this.areaH);
					this.arrTargets.push(target);
					grid.value = temp.toString();
					grid.isTarget = false;
				}
				this.viewData.gridMap.push(grid);
			}
			let info = lxl.Tool.callJS("getInfoToken");
			this.viewData.token = info._loginToken;
			this.viewData.userName = info._userName;
			this.viewData.totalNum = this.battleTargets.length;
			this.viewData.completeNum = this.curBattle + 1;
		}

		getRandomPos():egret.Point {
			let xx = Snake.areaX + Math.floor(Math.random() * (this.areaW / lxl.Config.GRID_SIZE)) * lxl.Config.GRID_SIZE;
			let yy = Snake.areaY + Math.floor(Math.random() * (this.areaH / lxl.Config.GRID_SIZE)) * lxl.Config.GRID_SIZE;
			let pnt = new egret.Point(xx, yy);
			for(let j = 0; j < this.arrSnakeParts.length; j++) {
				if(this.arrSnakeParts[j].x == xx) {
					pnt = this.getRandomPos();
					break;
				}
				for(let i = 0; i < this.arrTargets.length; i++) {
					if(this.arrTargets[i].x == xx && this.arrTargets[i].y == yy) {
						pnt = this.getRandomPos();
						break;
					}
				}
				if(this.arrSnakeParts[j].x != xx && j == this.arrSnakeParts.length - 1) {
					return pnt;
				}
			}
			return pnt;
		}

		/**
		 * 生成蛇
		 */
		createSnake() {
			this.arrSnakeParts = [];
			let t:Object = this.battleTargets[this.curBattle][Math.floor(Math.random() * this.battleTargets[this.curBattle].length)];
			this._trueObj = t;
			this._trueTargets = this._trueObj["en"].split("");
			let yy = this.areaY + Math.floor(Math.random() * 10) * lxl.Config.GRID_SIZE;
			for(var i = 0; i < this.snakeLens[this.curBattle]; i++) {
				let part:SnakePart = this.createPart();
				let gridSnake:GridSnake = new GridSnake();
				gridSnake.loc_x = i;
				gridSnake.loc_y = (yy - this.areaY) / lxl.Config.GRID_SIZE;
				gridSnake.dir = "right";
				part.x = this.areaX + lxl.Config.GRID_SIZE * i;
				part.y = yy;
				if(i == this.snakeLens[this.curBattle]-1) {
					part.value = this._trueObj["cn"];
					gridSnake.isHead = true;
				} else
					gridSnake.isHead = false;
				this.arrSnakeParts.push(part);
				this.viewData.gridSnake.push(gridSnake);
			}
			this.viewData.life = 3;
		}

		resetSnake() {
			let yy = this.areaY + Math.floor(Math.random() * 10) * lxl.Config.GRID_SIZE;
			this.viewData.gridSnake = [];
			for(var i = 0; i < this.arrSnakeParts.length; i++) {
				this.arrSnakeParts[i].y = yy;
				this.arrSnakeParts[i].x = this.areaX + lxl.Config.GRID_SIZE * i;
				let gridSnake:GridSnake = new GridSnake();
				gridSnake.loc_x = i;
				gridSnake.loc_y = (yy - this.areaY) / lxl.Config.GRID_SIZE;
				gridSnake.dir = "right";
				if(i == this.snakeLens[this.curBattle]-1) {
					gridSnake.isHead = true;
				} else
					gridSnake.isHead = false;
				this.viewData.gridSnake.push(gridSnake);
			}
		}

		private static _snake:SnakeManager;
		public static getInstance():SnakeManager {
			if(this._snake == null)
				this._snake = new SnakeManager();
			return this._snake;
		}
	}
}