module lxl {
	export class NumberUtil {
		public constructor() {
		}

		static getNumSp(num:number, qianzhui:string = ""):egret.Sprite {
			let sp = new egret.Sprite();
			let arr = num.toString().split("");
			for(var i = 0; i < arr.length; i++) {
				let img = lxl.Tool.createBitmapByName(qianzhui + arr[i] + "_png");
				img.x = 17 * i;
				sp.addChild(img);
			}
			sp.width = 17 * arr.length;
			sp.height = 40;
			return sp;
		}

		
	}
}