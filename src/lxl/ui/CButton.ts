module lxl.ui {
	export class CButton extends eui.Button{
		public constructor() {
			super();
			this.addEventListener( egret.TouchEvent.TOUCH_TAP, this._onClick, this );
            this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onActivity, this);
		}

        /** 点击频度限制 */
        eps:number = 0.2;
        private _timer:egret.Timer;
        private _clickEps:number = 0.2;
        private _selected:boolean = false;

        public set selected (b:boolean) {
            this._selected = b;
            if(b == false)
                this.currentState = "up";
            else
                this.currentState = "sel";
        }

        public get selected ():boolean {
            return this._selected;
        }

        private onActivity(e:eui.UIEvent):void {
            this.init();
        }

        public init():void {
            if(this.eps > 0){
                this._timer = new egret.Timer(1000 * this.eps);
                this._timer.addEventListener(egret.TimerEvent.TIMER, this._timerHandler, this);
                this._timer.start();
            }
        }

        private _timerHandler(e:egret.TimerEvent):void {
            this._clickEps = this._clickEps == this.eps ? this.eps : (this._clickEps + 0.1);
        }

		private _onClick(e:egret.TouchEvent):void {
            this.scaleX = this.scaleY = 0.9;
            let ee = lxl.Tool.copyObject(e);
            egret.Tween.get( this )
				.to( { scaleX: 0.9, scaleY:0.9 }, 200)
                .to( { scaleX: 1, scaleY: 1 }, 100)
                .call(function() {
                    // if(this.eps == this._clickEps) {
                        this._clickEps = 0;
                        this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLICK, ee));
                    // }
                }, this);
            
        }

	}
}