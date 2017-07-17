module lxl.interfaces {
	export interface IPackageOut {
        /***
         * 写入string
         */
		writeString(str:string):void;
        /**
         * 写入数组
         */
        writeArray(arr:Array<any>):void;
        /**
         * 获取协议名
         */
        code():string;
        /**
         * 读取变量数量
         */
        getParamLen():number;

        getParamByIndex(index:number):any;

        getFullUrl():string;

        getParam():Array<data.Map>;
	}
}