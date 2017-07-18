module app {
	export class DataHandler{
		public constructor() {
		}

		public sendMessageToServer(vd:ViewData) {
			let tempvd = lxl.Tool.copyObject(vd);
			let o:Object = {action:'publicMessage', data:tempvd};
			lxl.Tool.callJS("sendMsg", o);
		}

		public getMessageFromServer(data:any) {
			lxl.logs.log("getMessageFromServer");
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.GET_MESSAGE_FROM_SERVER, data))
		}

		public getWordsFromServer() {

		}
	}
}