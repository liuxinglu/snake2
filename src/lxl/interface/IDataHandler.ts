module lxl.interfaces {
	export interface IDataHandler extends egret.IEventDispatcher {
		/**
		 * 获得协议名
		 */
		getCode():string;
		/**
		 * 处理协议
		 */
		handlerPackage(o:data.BaseData):void;
		/**
		 * 更新协议数据
		 */
		configure(param:IPackageIn):void;
		send(o:data.BaseData):void;
	}
}