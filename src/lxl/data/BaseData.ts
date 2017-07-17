module lxl.data {
	export class BaseData extends Object{
		public constructor() {
			super();
			this.str = new egret.ByteArray();
			this.arr = [];
		}

		str:egret.ByteArray;
		arr:Array<Map>;
	}

	export class Map {
		public constructor() {
		}

		k:string;
		v:any;
	}
}