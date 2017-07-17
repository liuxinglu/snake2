module app {
	export class TeachWatchView extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "TeacherWatchView.exml");
		}

		private g:eui.Group;
		private img_1:eui.Image;
		private img_2:eui.Image;
		private img_3:eui.Image;
		private lab_target:eui.Label;
		private scrollGroup:eui.Group;
		private svList:Array<StudentItemView> = [];
		private arrSnakeParts:Array<SnakePart> = []; 
		private arrTargets:Array<SnakeTarget> = []; 
		private _curSelStudent:ViewData;

		onActivity() {
			super.onActivity();
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.GET_MESSAGE, this._updateData, this);
		}

		private _updateData(e:lxl.CEvent) {
			let sv:StudentItemView;
			for(let i = 0; i < Snake.studentsList.length; i++) {
				for(let j = 0; j < this.svList.length; j++) {
					if(this.svList[j].data.token == Snake.studentsList[i].token) {
						this.svList[j].data = Snake.studentsList[i];
						break;
					}
				}
				sv = new StudentItemView();
				sv.name = Snake.studentsList[i].token;
				sv.data = Snake.studentsList[i];
				sv.addEventListener(lxl.CEvent.LOAD_SKIN_COMPLETE, ()=>{
					this.svList.push(sv)
				}, this);
			}
			for(let i = 0; i < this.svList.length; i++) {
				if(this.scrollGroup.getChildByName(this.svList[i].name))
					(this.scrollGroup.getChildByName(this.svList[i].name) as StudentItemView).updateData();
				else {
					this.scrollGroup.addChild(this.svList[i])
					this.svList[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this._clickItemHandler, this);
				}
			}
			if(this._curSelStudent) {
				for(let i = 0; i < Snake.studentsList.length; i++) {
					if(Snake.studentsList[i].token == this._curSelStudent.token) {
						this._curSelStudent = Snake.studentsList[i];
						break;
					}
				}
				this._updateTeacherView(this._curSelStudent, "cur");
			}
		}

		private _clickItemHandler(e:egret.TouchEvent) {
			this._curSelStudent = e.currentTarget.data;
			this._updateTeacherView(this._curSelStudent, "new");
		}

		private _updateTeacherView(vd:ViewData, state:string) {
			this.createSnakeOrMove(vd.gridSnake, vd.snakeDir);
			if(state == "new")
				this.createTargets(vd.gridMap, true);
			else if(state == "cur") {
				this.createTargets(vd.gridMap, false);
			}
		}

		private createSnakeOrMove(arr:Array<GridSnake>, dir:string) {
			if(this.arrSnakeParts.length != arr.length) {
				for(let i = 0; i < this.arrSnakeParts.length; i++) {
					this.g.removeChild(this.arrSnakeParts[i]);
				}
				this.arrSnakeParts = [];
				for(var i = 0; i < arr.length; i++) {
					let part:SnakePart = Snake.createPart();
					part.x = Snake.teacherAreaX + Math.floor(lxl.Config.GRID_SIZE * arr[i].loc_x * Snake.scaleGrid);
					part.y = Snake.teacherAreaY + Math.floor(arr[i].loc_y * lxl.Config.GRID_SIZE * Snake.scaleGrid);
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
					this.g.addChild(this.arrSnakeParts[i]);
				}

			} else {
				for(var i = 0; i < arr.length; i++) {
					this.arrSnakeParts[i].x = Snake.teacherAreaX + Math.floor(lxl.Config.GRID_SIZE * arr[i].loc_x * Snake.scaleGrid);
					this.arrSnakeParts[i].y = Snake.teacherAreaY + Math.floor(arr[i].loc_y * lxl.Config.GRID_SIZE * Snake.scaleGrid);
				}
			}
		}

		private createTargets(arr:Array<GridMap>, isUpdate:boolean) {
			if(isUpdate == true) {
				for(let i = 0; i < this.arrTargets.length; i++) {
					this.g.removeChild(this.arrTargets[i]);
				}
				this.arrTargets = [];
				for(let i = 0; i < arr.length; i++) {
					let target:SnakeTarget = Snake.createTarget();
					target.x = Snake.teacherAreaX + arr[i].loc_x * Snake.scaleGrid * lxl.Config.GRID_SIZE;
					target.y = Snake.teacherAreaY + arr[i].loc_y * Snake.scaleGrid * lxl.Config.GRID_SIZE;
					target.setTarget(arr[i].value, Snake.areaW, Snake.areaH);
					target.vd = arr[i];
					this.arrTargets.push(target);
				}
				for(let i = 0; i < this.arrTargets.length; i++) {
					this.g.addChild(this.arrTargets[i]);
				}
			} else {
				for(let i = 0; i < this.arrTargets.length; i++) {
					for(let j = 0; j < arr.length; j++) {
						if(this.arrTargets[i].value == arr[j].value && this.arrTargets[i].vd.loc_x == arr[j].loc_x && this.arrTargets[i].vd.loc_y == arr[j].loc_y) {
							this.g.removeChild(this.arrTargets[i]);
							return;
						}
					}
				}
			}
		}

		dispose() {
			super.dispose();
			lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.GET_MESSAGE, this._updateData, this);
			for(let i = 0; i < this.scrollGroup.numChildren; i++) {
				this.svList[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this._clickItemHandler, this);
			}
		}
	}
}