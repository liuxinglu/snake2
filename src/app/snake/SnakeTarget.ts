module app {
	export class SnakeTarget extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "SnakeTarget.exml");
			this.width = lxl.Config.GRID_SIZE;
			this.height = lxl.Config.GRID_SIZE;
		}

		private lab_num:eui.BitmapLabel;
		vd:GridMap;
		value:string = "";
		i:number = 0;

		onActivity() {
			super.onActivity();
			this.lab_num.text = this.value.toString();
		}

		setTarget(num:string, ww:number, hh:number) {
			this.value = num;
			if(this.lab_num != undefined)
				this.lab_num.text = num.toString();
		}
	}
}