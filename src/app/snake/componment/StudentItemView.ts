module app {
	export class StudentItemView extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "StudentItemViewSkin.exml");
		}

		private lab_name:eui.Label;
		private progress:eui.ProgressBar;
		private _data:ViewData;

		set data(d:ViewData) {
			this._data = d;
		}

		get data():ViewData {
			return this._data;
		}

		updateData(){
			this.lab_name.text = this._data.userName;
			this.progress.maximum = this._data.totalNum;
			this.progress.value = this._data.completeNum;
		}
		

		onActivity() {
			super.onActivity();
		}

		dispose() {
			super.dispose();
		}
	}
}