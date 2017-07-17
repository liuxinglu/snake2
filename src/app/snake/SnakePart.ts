module app {
	export class SnakePart extends lxl.CComponent{
		public constructor() {
			super(lxl.Config.SKIN_PATH + "SnakePart.exml");
			this.width = lxl.Config.GRID_SIZE;
			this.height = lxl.Config.GRID_SIZE;
			this.lab_text = new eui.Label();
			this.lab_text.size = 22;
			this.lab_text.width = 52;
			this.lab_text.textAlign = "center";
		}

		private _value:string = "";
		private img_part:eui.Image;
		private lab_value:eui.BitmapLabel;
		private _rotation:string = "";
		private lab_text:eui.Label;
		i:number = 0;

		set value(v:string) {
			this._value = v;
			if(this.lab_value != undefined) {
				if(this._value == "") {
					this.lab_value.text = "";
					this.lab_text.text = "";
				}
				else {
					// this.lab_value.text = this._value.toString();
					// this.lab_text.text = this._value.toString();
				}
			}
		}

		get value():string {
			return this._value;
		}

		private _rotate:number = 0;
		set partRotation(r:string) {
			let rotate:number = 0;
			switch (r) {
				case "up":
					rotate = 0;
					break;
				case "right":
					rotate = 90;
					break;
				case "down":
					rotate = 180;
					break;
				case "left":
					rotate = 270;
					break;
			}
			this._rotation = r;
			this._rotate = rotate;
			if(this.img_part != undefined)
				this.img_part.rotation = rotate;
		}

		get partRotation():string {
			return this._rotation;
		}

		private _imgSource:string;
		set imgSource(source:string) {
			this._imgSource = source;
			if(this.img_part != undefined)
				this.img_part.source = source;
		}

		onActivity():void {
			super.onActivity();
			this.lab_text.x = -2;
			this.lab_text.y = 13;
			this.addChild(this.lab_text);
			this.img_part.rotation = this._rotate;
			this.img_part.source = this._imgSource;
			if(this._value == "") {
				this.lab_value.text = "";
				this.lab_text.text = "";
			}
			else {
				// this.lab_value.text = this._value.toString();
				// this.lab_text.text = this._value.toString();
			}
		}
	}
}