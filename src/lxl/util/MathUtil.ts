module lxl {
	export class MathUtil {
		public constructor() {
		}

		private static _symbol: string[] = ["28", "46", "82", "64", "141", "585", "3", "7", "5", "1", "4321876", "2345678"];
		private static _symbolG: number[] = [0, 	0, 	3, 		3, 		5, 	5, 		6, 	1, 	 7, 	2, 		4, 		4];

		/**
		 * 获取一个数组中除数组元素以外的一个随机值
		 * 如：【9，2，1】得到的是比9小 并且不等于9 2 1的一个随机值
		 */
		static getRandomNumByArr(arr: Array<number>): number {
			arr.sort((a, b) => {
				return b - a;
			});
			let randomArr = [];
			for (var i = 0; i < arr[0] / 10; i = i / 10) {
				i = (++i) * 10;
				let flag: boolean = true;
				for (var j = 0; j < arr.length; j++) {
					if (arr[j] == i) {
						flag = false;
					}
				}
				if (flag == true)
					randomArr.push(i);
			}
			let pos: number = Math.floor(randomArr.length * Math.random()) - 1;
			if (pos < 0)
				pos = 0;
			if (randomArr.length == 0)
				return 10;
			return randomArr[pos];
		}

		/**
		 * 将有序数列打散成无序数列
		 * 如12345打成31452
		 */
		static getRandomArrBySortArr(arr:Array<number>):Array<number> {
			let randomArr:Array<number> = [];
			let rand = Math.random();
			
			if(rand > 0.5) {
				for(let i = arr.length - 1; i > arr.length / 2; i--) {
					randomArr.push(arr[i]);
				}
				for(let i = arr.length / 2; i >= 0; i--) {
					randomArr.push(arr[i]);
				}
				for(let i = 5; i < arr.length / 2 + 5; i++) {
					let temp = randomArr[i];
					randomArr[i] = randomArr[randomArr.length/2 + 5 - i];
					randomArr[randomArr.length/2 + 5 - i] = temp;
				}
				for(let i = arr.length / 2 - 5; i < arr.length; i++) {
					let temp = randomArr[i];
					randomArr[i] = randomArr[randomArr.length - i];
					randomArr[randomArr.length - i] = temp;
				}
				for(let i = 0; i < arr.length / 2; i++) {
					let temp = randomArr[i];
					randomArr[i] = randomArr[randomArr.length/2 - i];
					randomArr[randomArr.length/2 - i] = temp;
				}
			} else {
				for(let i = arr.length / 2; i >= 0; i--) {
					randomArr.push(arr[i]);
				}
				for(let i = arr.length - 1; i > arr.length / 2; i--) {
					randomArr.push(arr[i]);
				}
				for(let i = 0; i < arr.length - 4; i++) {
					let index = Math.floor(Math.random() * 10);
					let temp = randomArr[index];
					randomArr[index] = randomArr[index + 2];
					randomArr[index + 2]  = temp;
				}
				for(let i = 4; i < arr.length; i++) {
					let temp = randomArr[i];
					randomArr[i] = randomArr[randomArr.length - i];
					randomArr[randomArr.length - i] = temp;
				}
				for(let i = arr.length / 2 - 5; i < arr.length; i++) {
					let temp = randomArr[i];
					randomArr[i] = randomArr[randomArr.length - i];
					randomArr[randomArr.length - i] = temp;
				}
			}
			for(let i = 0; i < arr.length - 1; i++) {
				let index = Math.floor(Math.random() * 10);
				let temp = randomArr[index];
				randomArr[index] = randomArr[index + 2];
				randomArr[index + 2]  = temp;
			}
			for(let i = 1; i < 3; i++) {
				let temp = randomArr[i];
				randomArr[i] = randomArr[randomArr.length - i];
				randomArr[randomArr.length - i] = temp;
			}
			
			
			return randomArr;
		}

		/**
		 * 通过两点确定向量所在方位1-12
		 */
		static getPointDir(mouseData:Array<egret.Point>):number {
			let len: number = mouseData.length;
			let dirsArr: Array<number> = [];
			for (var i: number = 0; i < len; i++) {
				if (mouseData[i + 1]) {
					var p1: egret.Point = mouseData[i];
					var p2: egret.Point = mouseData[i + 1];
					var a: number = p1.y - p2.y;
					var b: number = egret.Point.distance(p1, p2);
					var rad: number = Math.asin(a / b);
					var ang: number = rad * 57.2957800; // rad * 180/Math.PI 直接求常量，优化
					var quad: number = this.quadrant(p1, p2);
					var dir: number = this.getDirByAngQuad2(ang, quad);
					dirsArr.push(dir);
				}
			}
			var dirstr: string = this.repDiff(dirsArr);
			return parseInt(dirstr);
		}


		/**
		 * 通过一系列坐标点获得对应方向 
		 * // v 0
			// | 1向上
			// —2向右
			// ^ 3
			// 6 4
			// z 5
			// | 6向下
			// —7向左
		 */
		static parseGestureDir(mouseData: Array<egret.Point>): number {
			let len: number = mouseData.length;
			let dirsArr: Array<number> = [];
			for (var i: number = 0; i < len; i++) {
				if (mouseData[i + 1]) {
					var p1: egret.Point = mouseData[i];
					var p2: egret.Point = mouseData[i + 1];
					var a: number = p1.y - p2.y;
					var b: number = egret.Point.distance(p1, p2);
					var rad: number = Math.asin(a / b);
					var ang: number = rad * 57.2957800; // rad * 180/Math.PI 直接求常量，优化
					var quad: number = this.quadrant(p1, p2);
					var dir: number = this.getDirByAngQuad(ang, quad);
					dirsArr.push(dir);
				}
			}
			var dirstr: string = this.repDiff(dirsArr);
			var rel: number = this.sweep(dirstr);
			return rel;
		}

		/*
		对比去重
		*/
		static repDiff(data: number[]): string {
			var str: string = "";
			var len: number = data.length;
			var currentType: number = 0;
			for (var i: number = 0; i < len; i++) {
				if (currentType != data[i]) {
					currentType = data[i];
					str += data[i];
				}
			}
			return str;
		}

		private static sweep(str: string): number {
			var maxType: number = -1;
			var max: number = -1;
			var len: number = this._symbol.length;
			for (var i: number = 0; i < len; i++) {
				var val: number = this.Levenshtein_Distance_Percent(this._symbol[i], str);
				if (val > max) {
					max = val;
					maxType = this._symbolG[i];
				}
			}

			if (max < 0.4)
				maxType = -1;
			return maxType;
		}

		/*
		根据所在象限与角度计算出方向编号。
		方向编号，以第一象限0度为基础，按照顺时针方向，将圆等分为8份。
		*/
		private static getDirByAngQuad(ang: number, quad: number): number {
			switch (quad) {
				case 1:
					if (ang <= 22.5 && ang >= 0) {
						return 1;
					} else if (ang <= 67.5 && ang > 22.5) {
						return 8;
					} else {
						return 7;
					}
					break;
				case 2:
					if (ang <= 22.5 && ang >= 0) {
						return 5;
					} else if (ang <= 67.5 && ang > 22.5) {
						return 6;
					} else {
						return 7;
					}
					break;
				case 3:
					if (ang <= -67.5 && ang >= -90) {
						return 3;
					} else if (ang <= -22.5 && ang > -67.5) {
						return 4;
					} else {
						return 5;
					}
					break;
				case 4:
					if (ang <= -67.5 && ang >= -90) {
						return 3;
					} else if (ang <= -22.5 && ang > -67.5) {
						return 2;
					} else {
						return 1;
					}
					break;
			}
		}

		/*
		根据所在象限与角度计算出方向编号。
		方向编号，以第一象限0度为基础，按照顺时针方向，将圆等分为12份。
		*/
		private static getDirByAngQuad2(ang:number, quad:number):number {
			switch (quad) {
				case 1:
					if (ang <= 30 && ang >= 0) {
						return 3;
					} else if (ang <= 60 && ang > 30) {
						return 2;
					} else {
						return 1;
					}
					break;
				case 2:
					if (ang <= 30 && ang >= 0) {
						return 10;
					} else if (ang <= 60 && ang > 30) {
						return 11;
					} else {
						return 12;
					}
					break;
				case 3:
					if (ang <= -60 && ang >= -90) {
						return 7;
					} else if (ang <= -30 && ang > -60) {
						return 8;
					} else {
						return 9;
					}
					break;
				case 4:
					if (ang <= -60 && ang >= -90) {
						return 6;
					} else if (ang <= -30 && ang > -60) {
						return 5;
					} else {
						return 4;
					}
					break;
			}
		}

		/*
		计算两点关系所形成的象限
		以P1 作为坐标原点，P2为设定点，判断P2相对于P1时所在象限
		*/
		static quadrant(p1: egret.Point, p2: egret.Point): number {
			if (p2.x >= p1.x) {
				if (p2.y <= p1.y) {
					return 1;
				} else {
					return 4;
				}
			} else {
				if (p2.y <= p1.y) {
					return 2;
				} else {
					return 3;
				}
			}
		}

		private static Levenshtein_Distance(s, t) {
			var n = s.length;// length of s
			var m = t.length;// length of t
			var d = [];// matrix
			var i;// iterates through s
			var j;// iterates through t
			var s_i;// ith character of s
			var t_j;// jth character of t
			var cost;// cost

			// Step 1
			if (n == 0) return m;
			if (m == 0) return n;

			// Step 2
			for (i = 0; i <= n; i++) {
				d[i] = [];
				d[i][0] = i;
			}

			for (j = 0; j <= m; j++) {
				d[0][j] = j;
			}

			// Step 3

			for (i = 1; i <= n; i++) {
				s_i = s.charAt(i - 1);
				// Step 4
				for (j = 1; j <= m; j++) {
					t_j = t.charAt(j - 1);
					// Step 5
					if (s_i == t_j) {
						cost = 0;
					} else {
						cost = 1;
					}

					// Step 6
					d[i][j] = this.Minimum(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
				}
			}

			// Step 7
			return d[n][m];
		}

		private static Levenshtein_Distance_Percent(s, t): number {

			var l = s.length > t.length ? s.length : t.length;
			var d = this.Levenshtein_Distance(s, t);
			return (1 - d / l);//.toFixed(4);

		}

		private static Minimum(a, b, c) {
			return a < b ? (a < c ? a : c) : (b < c ? b : c);
		}
	}
}