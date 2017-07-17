module lxl {
	export class TimerUtils {
		public constructor() {
		}

		static formatTimeBySecond(s:number):string {
			let str = "";
			let min = Math.floor(s / 60);
			let sec = s % 60;
			str = this.formatMinite(min) + ":" + this.formatSecond(sec);
			return str;
		}

		static formatMinite(min:number):string {
			let str = "";
			if(min < 10) {
				str = "0" + min;
				return str;
			} else if(min < 60) {
				str = "" + min;
				return str;
			}
			return str;
		}

		static formatSecond(sec:number):string {
			let str = "";
			if(sec < 10) {
				str = "0" + sec;
				return str;
			} else if(sec <= 59) {
				str = "" + sec;
				return str;
			}
			return str;
		}
	}
}