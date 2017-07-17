module lxl.data {
	export class NetData extends egret.HashObject{
		public constructor(dataManager:interfaces.IDataManager) {
			super();
			this._dataManager = dataManager;
			this._netConnet = new egret.HttpRequest();
		}

		private errorHandler(e:egret.IOErrorEvent):void {
			logs.log(e.type);
			this._dataManager.handlerSecurityError();
		}

		private _netConnet:egret.HttpRequest;
		private _dataManager:interfaces.IDataManager;
		private _cb:Function;
		private _ctx:any;

		public send(pkg:interfaces.IPackageOut, cb:Function, ctx:any) {
			this._netConnet.open(pkg.getFullUrl(), egret.HttpMethod.POST);
			this._cb = cb;
			this._ctx = ctx;
			this._netConnet.addEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
			this._netConnet.addEventListener(egret.Event.COMPLETE, this._completeHandler, this);
			if(pkg.getParamLen() > 0) {
				this._netConnet.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				let param = Tool.MapToField(pkg.getParam());
				this._netConnet.send(param);
			} else {
				this._netConnet.send();
			}
		}

		private _completeHandler(e:egret.Event):void {
			this._cb(this._netConnet.response, this._ctx);
			this.dispose();
		}

		public dispose():void {
			if(this._netConnet.hasEventListener(egret.IOErrorEvent.IO_ERROR)) {
				this._netConnet.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
				this._netConnet.removeEventListener(egret.Event.COMPLETE, this._cb, this._ctx);
			}
		}

	}
}