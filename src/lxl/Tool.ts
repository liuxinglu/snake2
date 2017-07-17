module lxl {
	export class Tool {
		public constructor() {
		}
		/**PC模式检测 */
		public static isPC_Mode(): boolean {
			if ("Windows PC" == egret.Capabilities.os) return true;
			if ("Mac OS" == egret.Capabilities.os) return true;
			return false;
		}
		/**TS直接调用JS函数 */
		public static callJS(funcName:string,...param){
			if(egret.Capabilities.runtimeType == "native")
				return "";
			return window[funcName](...param);
			
		}
		static MapToField(m:Array<data.Map>):string {
			let arr = [];
			m.forEach(element => {
				arr.push(element.k + "=" + encodeURIComponent(element.v));
			}, this);
            return arr.join('&');
        }

		static getValueByKey(m:Array<data.Map>, key:string):any {
			let value;
			for(let i = 0; i < m.length; i++) {
				if(m[i].k == key) {
					value = m[i].v;
					return value;
				}
			}
			return null;
		}

		static setMapValue(m:Array<data.Map>, map:data.Map) {
			for(let i = 0; i < m.length; i++) {
				if(m[i].k == map.k) {
					m[i].v = map.v;
					return;
				}
			}
			m.push(map);
		}

		static getMapValue(m:Array<data.Map>, key:string):data.Map {
			for(let i = 0; i < m.length; i++) {
				if(m[i].k == key) 
					return m[i];
			}
			return null;
		}

		static removeMapValue(m:Array<data.Map>, key:string) {
			for(let i = 0; i < m.length; i++) {
				if(m[i].k == key) 
					m.splice(i, 1);
			}
		}

		static createBitmapByName(name: string): egret.Bitmap {
			let result = new egret.Bitmap();
			let texture: egret.Texture = Res.getRes(name);
			result.texture = texture;
			return result;
		}

		static copyObject(e:any):any {
			let a:any = {};
			for(var i in e) {
				a[i] = e[i];
			}
			return a;
		}
	}
}