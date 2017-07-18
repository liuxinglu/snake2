module lxl {
	export class CDispatcher extends egret.EventDispatcher{
		public constructor() {
			super()
		}

		private static _instance:CDispatcher;

		public static getInstance():CDispatcher {
			if(this._instance == null)
				this._instance = new CDispatcher();
			return this._instance;
		}

		public addListener(type:string, listener:Function, ctx:any, useCapture:boolean = false, priority:number = 0):void{
			if(this.hasListener(type) == false)
				this.addEventListener(type, listener, ctx, useCapture, priority);
		}
		
		public removeListener(type:string, listener:Function, ctx:any, useCapture:boolean = false):void{
			if(this.hasListener(type) == true)
				this.removeEventListener(type, listener, ctx, useCapture);
		}
		
		public dispatch(event:CEvent):boolean{
			return this.dispatchEvent(event);
		}
		
		public hasListener(type:string):boolean{
			return this.hasEventListener(type);
		}
		
		public willTrigger(type:string):boolean{
			return this.willTrigger(type);
		}

		public once(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number):void {
			return this.once(type, listener, thisObject, useCapture, priority);
		}

	}
}