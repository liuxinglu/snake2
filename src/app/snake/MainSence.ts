module app {
	export class MainSence extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "MainSence.exml");
		}

		private btn_start:lxl.ui.CButton;
		private btn_help:lxl.ui.CButton;
		private btn_knowledge:lxl.ui.CButton;
		private btn_huyan:lxl.ui.CButton;
		private btn_yanshi:lxl.ui.CButton;

		onActivity():void {
			super.onActivity();
			this.btn_start.addEventListener(lxl.CEvent.CLICK, this._startHandler, this);
			this.btn_help.addEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
			this.btn_knowledge.addEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
			this.btn_huyan.addEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
			this.btn_yanshi.addEventListener(lxl.CEvent.CLICK, this._yanshiHandler, this);
			let info = lxl.Tool.callJS("getInfoToken");
			if(info._userRole == "COORDINATOR") {
				let vd:ViewData = new ViewData();
				vd.type = "show";
				Snake.dataHandler.sendMessageToServer(vd);
			}
		}

		private _yanshiHandler(e:lxl.CEvent) {
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.OPEN));
		}

		private _huyanHandler(e:lxl.CEvent):void {
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.EYE_CHANGE));
		}

		private _changeEyeState(e:lxl.CEvent) {
			lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
		}

		private _startHandler(e:lxl.CEvent) {
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.CLICK));
		}

		private _help:app.DlgHelp;
		private _helpHandler(e:lxl.CEvent):void {
			this._help = new app.DlgHelp();
			this.pop(this._help);
			this.btn_help.touchEnabled  = this.btn_knowledge.touchEnabled = false;
			this._help.addEventListener(lxl.CEvent.CLOSE, this.helpClose, this);
		}

		private helpClose() {
			this._help.removeEventListener(lxl.CEvent.CLOSE, this.helpClose, this)
			this._help.dispose();
			this.btn_help.touchEnabled  = this.btn_knowledge.touchEnabled = true;
		}

		private _zhishi:app.DlgZhishi;
		private _knowledgeHandler(e:lxl.CEvent):void {
			this._zhishi = new app.DlgZhishi();
			this.pop(this._zhishi);
			this.btn_help.touchEnabled = this.btn_knowledge.touchEnabled = false;
			this._zhishi.addEventListener(lxl.CEvent.CLOSE, this.zhishiClose, this);
		}

		private zhishiClose() {
			this._zhishi.removeEventListener(lxl.CEvent.CLOSE, this.zhishiClose, this)
			this._zhishi.dispose();
			this.btn_help.touchEnabled = this.btn_knowledge.touchEnabled = true;
		}
	}
}