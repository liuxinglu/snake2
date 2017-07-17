module app {
	export class DlgZhishi extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "DlgZhishiSkin.exml");
		}

		private btn_close:lxl.ui.CButton;
		private btn_huyan:lxl.ui.CButton;

		onActivity():void {
			super.onActivity();
			let shape:egret.Shape;
			shape= new egret.Shape();
			shape.graphics.beginFill(0x000000, 0.4);
			shape.graphics.drawRect(0, 0, this.width, this.height);
			shape.graphics.endFill();
			this.addChildAt(shape, 0);
			this.btn_close.addEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
			this.btn_huyan.addEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
		}

		private _closeHandler(e:lxl.CEvent):void {
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLOSE));
		}

		private _huyanHandler(e:lxl.CEvent):void {
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.EYE_CHANGE));
		}

		private _changeEyeState(e:lxl.CEvent) {
			lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
		}

		dispose() {
			super.dispose();
			this.btn_huyan.removeEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
			this.btn_close.removeEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
		}
	}
}