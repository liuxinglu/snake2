module lxl {
	export class CComponent extends eui.Component{
		public constructor(skinName:string) {
			super();
			
			this.addEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
			this.skinName = lxl.Tool.callJS("getURL") + skinName;
			this.funOnActivity = this.onActivity;
			this.funDispose = this.dispose;
		}

		private loadComplete():void {
			egret.Tween.get( this).wait(0.1).call(()=>{
				this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onActivity, this);
				this.dispatchEvent(new lxl.CEvent(CEvent.LOAD_SKIN_COMPLETE, this));
			}, this);
		}

		funOnActivity:Function;
		funDispose:Function;
		hasActivi:boolean = false;
		hasDispos:boolean = false;

		onActivity():void {
			for(var i = 0; i < this.numChildren; i++) {
				this.doAcivity((this.getChildAt(i) as CComponent));
			}
			this.hasActivi = true;
		}

		private doAcivity(com:CComponent) {
			if(com.hasOwnProperty("funOnActivity") && com.hasActivi == false)
				com["funOnActivity"]();
			if(com.numChildren == 0) {
				return;
			} else {
				for(var i = 0; i < com.numChildren; i++) {
					this.doAcivity((com.getChildAt(i) as CComponent));
				}
			}
		}

		dispose() {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
			this.removeEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onActivity, this);
			for(var i = 0; i < this.numChildren; i++) {
				this.doDispos((this.getChildAt(i) as CComponent));
			}
			this.parent.removeChild(this);
			this.hasDispos = true;
		}

		private doDispos(com:CComponent) {
			if(com.hasOwnProperty("funDispose") && com.hasDispos == false)
				com["funDispose"]();
			if(com.numChildren == 0) {
				return;
			} else {
				for(var i = 0; i < com.numChildren; i++) {
					this.doDispos((com.getChildAt(i) as CComponent));
				}
			}
		}

		protected createChildren():void {
			super.createChildren();
		}

		removeChildByName(name:string):void {
			this.removeChild(this.getChildByName(name));
		}

		/**
		 * 在自己上面弹出
		 */
		pop(com:lxl.CComponent, ani:boolean = false):void {
			com.addEventListener(lxl.CEvent.LOAD_SKIN_COMPLETE, ()=>{
				com.anchorOffsetX = com.width / 2;
				com.anchorOffsetY = com.height / 2;
				com.x = this.stage.stageWidth / 2;
				if(ani == false) {
					com.y = this.stage.stageHeight / 2;
				} else {
					com.y = 0;
					com.alpha = 0;
				}
				this.addChild(com);
				if(ani == true) {
						egret.Tween.get(com)
						.to({y : this.stage.stageHeight / 2, alpha : 1}, 200)
						.to({y : this.stage.stageHeight / 2 - 30}, 100)
						.to({y : this.stage.stageHeight / 2 + 10}, 100)
						.to({y : this.stage.stageHeight / 2}, 100);
				}
			}, this);
		}
	}
}