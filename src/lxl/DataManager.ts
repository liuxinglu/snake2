module lxl {
	export class DataManager extends CDispatcher implements interfaces.IDataManager{
		public constructor() {
			super();
			this._dataHandlers = [];
		}

		private _dataHandlers:Array<data.Map>;
		private _netData:data.NetData;

		public disConnect():void {
			if(this._netData) {
				this._netData.dispose();
				this._netData = null;
			}
		}

		public close():void {

		}

		public setDataConnect(info:string, userId:string):void {
			if(this._netData == null)
				this._netData = new data.NetData(this);
		}

		public addDataHandler(handler:interfaces.IDataHandler):void {
			let map = new data.Map();
			map.k = handler.getCode();
			map.v = handler;
			if(Tool.getValueByKey(this._dataHandlers, handler.getCode()) == null) {
				Tool.setMapValue(this._dataHandlers, map);
			}
		}

		public removeDataHandler(code:string):void {
			if(Tool.getValueByKey(this._dataHandlers, code) != null) {
				Tool.removeMapValue(this._dataHandlers, code);
			}
		}

		public getDataHandler(code:string):interfaces.IDataHandler {
			return Tool.getValueByKey(this._dataHandlers, code);
		}

		public handlerPackage(pkg:interfaces.IPackageIn):void {
			var handler:interfaces.IDataHandler = Tool.getValueByKey(this._dataHandlers, pkg.code());
			if(handler != null) {
				handler.configure(pkg);
				handler.handlerPackage(null);
			}
		}

		public send(pkg:interfaces.IPackageOut, cb:Function, ctx:any):void {
			if(this._netData == null)
				return;
			this._netData.send(pkg, cb, ctx);
		}

		public handlerSecurityError():void {

		}

		public handlerConnect():void {
			this.dispatch(new CEvent(CEvent.CONNECT_SERVER));
		}

	}
}