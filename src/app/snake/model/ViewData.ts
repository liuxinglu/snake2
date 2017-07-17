module app {
	export class GridMap {
		public constructor() {

		}

		loc_x:number;
		loc_y:number;
		value:string;
		isTarget:boolean;
	}

	export class GridSnake {
		public constructor() {

		}

		loc_x:number;
		loc_y:number;
		dir:string;
		isHead:boolean;
	}

	export class ViewData {
		public constructor() {
		}

		type:string = "";//show normal
		userName:string = "";
		completeNum:number = 0;
		totalNum:number = 0;
		token:string = "";
		gridMap:Array<GridMap> = [];
		gridSnake:Array<GridSnake> = [];
		life:number = 0;

		dispose() {
			this.gridMap = [];
			this.gridSnake = [];
			this.life = 0;
			this.token = "";
			this.userName = "";
			this.completeNum = 0;
			this.totalNum = 0;
		}
	}
}