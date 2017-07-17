module lxl {
	export class GTool {
		public constructor() {
		}

		/**
		 * 带箭头的线
		 */
		static drawArrowWithVector(g:egret.Graphics, pnt1:egret.Point, pnt2:egret.Point):void {
				//箭头长度
				var len:number = 10;
				//箭头与直线的夹角
				var _a:number = 30;
				var x1:number = pnt1.x;
				var y1:number = pnt1.y;
				var x2:number = pnt2.x;
				var y2:number = pnt2.y;
				var angle:number = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
				g.lineStyle(5, 0xff5566);
				g.moveTo(x2, y2);
				g.lineTo(x2 + len * Math.cos((angle - _a) * (Math.PI / 180)), y2 + len * Math.sin((angle - _a) * (Math.PI / 180)));
				g.moveTo(x2, y2);
				g.lineTo(x2 + len * Math.cos((angle + _a) * (Math.PI / 180)), y2 + len * Math.sin((angle + _a) * (Math.PI / 180)));
				g.moveTo(x1, y1);
				g.lineTo(x2, y2);   
		}

		/**
		 * color 填充色 
		 * r 半径
		 * pnt 圆心 
		 * pntAngle 旋转角度所在点 
		 */
		static drawFan(g:egret.Graphics, color:number, r:number, pnt:egret.Point, pntAngle:egret.Point): void {
			// g.beginFill(color,50);
			// g.lineStyle(0,0xff0000);
			// g.moveTo(pnt.x, pnt.y);
			// let angle = pnt
			// angle=(Math.abs(angle)>360)?360:angle;
			// var n:Number=Math.ceil(Math.abs(angle)/45);
			// var angleA:Number=angle/n;
			// angleA=angleA*Math.PI/180;
			// startFrom=startFrom*Math.PI/180;
			// g.lineTo(x+r*Math.cos(startFrom),y+r*Math.sin(startFrom));
			// for (var i=1; i<=n; i++) {
			// 	startFrom+=angleA;
			// 	var angleMid=startFrom-angleA/2;
			// 	var bx=x+r/Math.cos(angleA/2)*Math.cos(angleMid);
			// 	var by=y+r/Math.cos(angleA/2)*Math.sin(angleMid);
			// 	var cx=x+r*Math.cos(startFrom);
			// 	var cy=y+r*Math.sin(startFrom);
			// 	g.curveTo(bx,by,cx,cy);
			// }
			// if (angle!=360) {
			// 	g.lineTo(x,y);
			// }
			// g.endFill();
		}
	}
}