module app {
	export class SelBattle extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "SelBattle.exml");
		}

		private btn_1:lxl.ui.CButton;
		private btn_2:lxl.ui.CButton;
		private btn_3:lxl.ui.CButton;
		private btn_4:lxl.ui.CButton;
		private btn_5:lxl.ui.CButton;
		private btn_s1:lxl.ui.CButton;
		private btn_s2:lxl.ui.CButton;
		private btn_s3:lxl.ui.CButton;
		private _battle:number = -1;
		private _speed:number = -1;
		private btn_home:lxl.ui.CButton;
		private btn_help:lxl.ui.CButton;
		private btn_zhishi:lxl.ui.CButton;
		private btn_huyan:lxl.ui.CButton;
		private img_1:eui.Image;
		private img_2:eui.Image;
		private img_3:eui.Image;
		private img_4:eui.Image;
		private img_5:eui.Image;
		private img_s1:eui.Image;
		private img_s2:eui.Image;
		private img_s3:eui.Image;

		onActivity() {
			super.onActivity();
			this.btn_1.addEventListener(lxl.CEvent.CLICK, this._btnHandler, this);
			this.btn_2.addEventListener(lxl.CEvent.CLICK, this._btnHandler, this);
			this.btn_3.addEventListener(lxl.CEvent.CLICK, this._btnHandler, this);
			this.btn_4.addEventListener(lxl.CEvent.CLICK, this._btnHandler, this);
			this.btn_5.addEventListener(lxl.CEvent.CLICK, this._btnHandler, this);
			this.btn_s1.addEventListener(lxl.CEvent.CLICK, this._sHandler, this);
			this.btn_s2.addEventListener(lxl.CEvent.CLICK, this._sHandler, this);
			this.btn_s3.addEventListener(lxl.CEvent.CLICK, this._sHandler, this);
			this.btn_home.addEventListener(lxl.CEvent.CLICK, this._homeHandler, this);
			this.btn_help.addEventListener(lxl.CEvent.CLICK, this._helpHandler, this);
			this.btn_zhishi.addEventListener(lxl.CEvent.CLICK, this._knowledgeHandler, this);
			this.btn_huyan.addEventListener(lxl.CEvent.CLICK, this._huyanHandler, this);
			let shape:egret.Shape;
			shape= new egret.Shape();
			shape.graphics.beginFill(0x000000, 0.6);
			shape.graphics.drawRect(0, 0, this.width, this.height);
			shape.graphics.endFill();
			this.addChildAt(shape, 0);
		}

		showAct1(num:number) {
			for(let i = 0; i < 5; i++) {
				this["img_" + (i + 1)].visible = false;
			}
			this["img_" + num].visible = true;
		}

		showAct2(num:number) {
			for(let i = 0; i < 3; i++) {
				this["img_s" + (i + 1)].visible = false;
			}
			this["img_s" + num].visible = true;
		}

		private _huyanHandler(e:lxl.CEvent):void {
			lxl.CDispatcher.getInstance().addListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.EYE_CHANGE));
		}

		private _changeEyeState(e:lxl.CEvent) {
			lxl.CDispatcher.getInstance().removeListener(lxl.CEvent.PROTECTE_EYE, this._changeEyeState, this);
		}

		private _help:app.DlgHelp;
		private _helpHandler(e:lxl.CEvent):void {
			this._help = new app.DlgHelp();
			this.pop(this._help);
			this.btn_help.touchEnabled  = this.btn_zhishi.touchEnabled = false;
			this._help.addEventListener(lxl.CEvent.CLOSE, this.helpClose, this);
		}

		private helpClose() {
			this._help.removeEventListener(lxl.CEvent.CLOSE, this.helpClose, this)
			this._help.dispose();
			this.btn_help.touchEnabled  = this.btn_zhishi.touchEnabled = true;
		}

		private _zhishi:app.DlgZhishi;
		private _knowledgeHandler(e:lxl.CEvent):void {
			this._zhishi = new app.DlgZhishi();
			this.pop(this._zhishi);
			this.btn_help.touchEnabled = this.btn_zhishi.touchEnabled = false;
			this._zhishi.addEventListener(lxl.CEvent.CLOSE, this.zhishiClose, this);
		}

		private zhishiClose() {
			this._zhishi.removeEventListener(lxl.CEvent.CLOSE, this.zhishiClose, this)
			this._zhishi.dispose();
			this.btn_help.touchEnabled = this.btn_zhishi.touchEnabled = true;
		}

		private _homeHandler(e:lxl.CEvent) {
			this.dispatchEvent(new lxl.CEvent(lxl.CEvent.BACK));
		}

		private _btnHandler(e:lxl.CEvent) {
			if (e.param.target == this.btn_1) {
				Snake.curBattle = 0;
			}else if (e.param.target == this.btn_2) {
				Snake.curBattle = 1;
			}else if (e.param.target == this.btn_3) {
				Snake.curBattle = 2;
			}else if (e.param.target == this.btn_4) {
				Snake.curBattle = 3;
			}else if (e.param.target == this.btn_5) {
				Snake.curBattle = 4;
			}
			this._battle = Snake.curBattle;
			this.showAct1(Snake.curBattle + 1);
			if(this._speed != -1) {
				this.dispatchEvent(new lxl.CEvent(lxl.CEvent.SEL_COMPLETE));
			}
		}

		private _sHandler(e:lxl.CEvent) {
			if(e.param.target == this.btn_s1) {
				Snake.timeNum = app.Config.SPEED3;
				this.showAct2(1);
			}else if(e.param.target == this.btn_s2) {
				Snake.timeNum = app.Config.SPEED2;
				this.showAct2(2);
			}else if(e.param.target == this.btn_s3) {
				Snake.timeNum = app.Config.SPEED1;
				this.showAct2(3);
			}
			this._speed = Snake.timeNum;
			if(this._battle != -1){
				this.dispatchEvent(new lxl.CEvent(lxl.CEvent.SEL_COMPLETE));
			}
		}
	}
}