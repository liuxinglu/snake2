module lxl.interfaces {
	export interface IDataManager{
		/**
		 * 断开连接
		 */
		disConnect():void;
		/**
		 * 关闭连接
		 */
		close():void;
		/**
		 * 设置连接
		 */
		setDataConnect(info:string, userId:string);
		/**
		 * 添加包处理方法
		 */
		addDataHandler(handler:IDataHandler):void;
		/**
		 * 删除包处理方法
		 */
		removeDataHandler(code:string):void;
		/**
		 * 获取包处理方法
		 */
		getDataHandler(code:string):IDataHandler;
		/**
		 * 处理协议
		 */
		handlerPackage(pkg:IPackageIn):void;
		/**
		 * 发送协议
		 */
		send(pkg:IPackageOut, cb:Function, ctx:any):void;
		/**
		 * 安全错误处理
		 */
		handlerSecurityError():void;
		/**
		 * 连接反馈处理
		 */
		handlerConnect():void;
	}
}