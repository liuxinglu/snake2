module app {
	export class DataHandler{
		public constructor() {
		}

		public sendMessageToServer(vd:ViewData) {
			lxl.Tool.callJS("sendMsg", JSON.stringify(vd));
		}

		public getMessageFromServer(data:any) {
			lxl.CDispatcher.getInstance().dispatch(new lxl.CEvent(lxl.CEvent.GET_MESSAGE_FROM_SERVER, data))
		}

		public getWordsFromServer() {

		}
	}
}