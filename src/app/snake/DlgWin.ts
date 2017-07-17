module app {
	export class DlgWin extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "DlgWinSkin.exml");
		}

		private btn_jixu:lxl.ui.CButton;
		private btn_again:lxl.ui.CButton;
		private _sound:egret.Sound;
		private btn_huyan:lxl.ui.CButton;
		private btn_zhishi:lxl.ui.CButton;
		private btn_help:lxl.ui.CButton;

		onActivity():void {
			super.onActivity();
			let shape:egret.Shape;
			shape= new egret.Shape();
			shape.graphics.beginFill(0x000000, 0.4);
			shape.graphics.drawRect(0, 0, this.width, this.height);
			shape.graphics.endFill();
			this.addChildAt(shape, 0);
			this.btn_jixu.addEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
			this.btn_again.addEventListener(lxl.CEvent.CLICK, this._close2Handler, this);
			this.btn_help.addEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
			this.btn_zhishi.addEventListener(lxl.CEvent.CLICK, this._knowledgeHandler,this);
			this.btn_huyan.addEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
			this._sound = Res.getRes("win_mp3");
			this._sound.play(0, 1);
			if(Snake.curBattle == 4) {
				this.btn_jixu.visible = false;
				this.btn_again.x = 446;
			}
		}

		private _closeHandler(e:lxl.CEvent):void {
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLOSE, 1));
		}

		private _close2Handler(e:lxl.CEvent):void {
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.CLOSE, 0));
		}

		private _help:app.DlgHelp;
		private _helpHandler(e:lxl.CEvent):void {
			this._help = new app.DlgHelp();
			this.pop(this._help);
			this._help.addEventListener(lxl.CEvent.CLOSE, this.helpClose, this);
		}

		private helpClose() {
			this._help.removeEventListener(lxl.CEvent.CLOSE, this.helpClose, this)
			this._help.dispose();
			this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_zhishi.touchEnabled = true;
		}

		private _huyanHandler(e:lxl.CEvent):void {
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.EYE_CHANGE));
		}

		private _changeEyeState(e:lxl.CEvent) {
			lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
		}

		private _zhishi:app.DlgZhishi;
		private _knowledgeHandler(e:lxl.CEvent):void {
			this._zhishi = new app.DlgZhishi();
			this.pop(this._zhishi);
			this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_zhishi.touchEnabled = false;
			this._zhishi.addEventListener(lxl.CEvent.CLOSE, this.knowledgeClose, this);
		}

		private knowledgeClose() {
			this._zhishi.removeEventListener(lxl.CEvent.CLOSE, this.knowledgeClose, this)
			this._zhishi.dispose();
			this.btn_help.touchEnabled = this.btn_huyan.touchEnabled = this.btn_zhishi.touchEnabled = true;
		}

		dispose() {
			super.dispose();
			this.btn_jixu.removeEventListener(lxl.CEvent.CLICK, this._closeHandler, this);
			this.btn_again.removeEventListener(lxl.CEvent.CLICK, this._close2Handler, this);
			this.btn_help.removeEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
			this.btn_zhishi.removeEventListener(lxl.CEvent.CLICK, this._knowledgeHandler,this);
			this.btn_huyan.removeEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
		}
	}
}