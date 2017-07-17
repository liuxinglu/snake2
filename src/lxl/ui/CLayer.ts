module lxl.ui {
	export class CLayer extends eui.UILayer{
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onActivity, this);
			this.addEventListener(eui.UIEvent.REMOVED_FROM_STAGE, this.dispose, this);
		}

		delegate:any;

		onActivity():void {
		}

		dispose():void {
            for(var i = 0; i < this.numChildren; i++) {
                if(this.getChildAt(i).hasOwnProperty("dispose"))
                    this.getChildAt(i)["dispose"]();
            }
			this.parent.removeChild(this);
		}

		pop(com:lxl.CComponent):void {
			
			com.addEventListener(lxl.CEvent.LOAD_SKIN_COMPLETE, ()=>{
				com.anchorOffsetX = com.width / 2;
				com.anchorOffsetY = com.height / 2;
				com.x = this.stage.stageWidth / 2;
				com.y = this.stage.stageHeight / 2;
				this.addChild(com);
			}, this);
			this.addChild(com);
		}

		removeChildByName(name:string):void {
			this.removeChild(this.getChildByName(name));
		}
	}
}