module lxl {
	export class Pops extends egret.DisplayObjectContainer {
		
		protected _txtrToastBg:egret.Texture;
    	protected _cont:egret.DisplayObjectContainer;
		protected _w:number = 0;
		protected _h:number = 0;

		public constructor() {
			super();
		}

		public setSize(w:number, h:number):void {
			this._w = w;
			this._h = h;
		}

		public animation():void {
			egret.Tween.get( this )
				.to( { alpha: 1 }, 800, egret.Ease.quintOut )
				.wait( 1600 )
				.to( { alpha: 0 }, 1000, egret.Ease.quintIn  ).call( ()=>{
					if( this.parent ){
						this.parent.removeChild( this );
					}
				} );
		}


		public init( cont:egret.DisplayObjectContainer, txtrToastBg:egret.Texture ):void{
			this._cont = cont;
			this._txtrToastBg = txtrToastBg;
		}
    
	}

	export class Toast extends Pops{
    
		constructor (){
			super();  
		}

		private _tx:egret.TextField;
		private _bg:egret.Bitmap;

		init(cont:egret.DisplayObjectContainer, txtrToastBg:egret.Texture):void {
			super.init(cont, txtrToastBg);
			this._bg = new egret.Bitmap(this._txtrToastBg);
			this._bg.height = 35;
			this._bg.anchorOffsetX = this._bg.width / 2;
			this._bg.anchorOffsetY = this._bg.height / 2;
			this._tx = new egret.TextField;
			this._tx.size = 20;
			this._tx.bold = true;
			this._tx.textColor = 0xFFFFFF;
			this._tx.stroke = 2;
			this._tx.strokeColor = 0;
			this._tx.fontFamily = "微软雅黑";
			this._tx.textAlign = egret.HorizontalAlign.CENTER;
			this.addChild( this._bg );
			this.addChild( this._tx );
		}

		public inits(msg:string = "") {
			this._tx.text = msg;
			this._tx.height = 30;
			this._tx.width = this._w;
			this._tx.anchorOffsetX = this._w / 2;
			this._tx.anchorOffsetY = this._tx.height / 2;
			this._bg.x = this.stage.stageWidth / 2;
			this._bg.y = this.stage.stageHeight / 2;
			this._tx.x = this._bg.x;
			this._tx.y = this._bg.y;
			this.alpha = 1;
		}

		public launch( msg:string, ani:boolean = true):void{
			if( this._cont ){
				this.setSize(this._cont.stage.stageWidth, this._cont.stage.stageHeight);
				this._cont.addChild( this );
				this.inits(msg);
				if(ani)
					this.animation();
			}
		}

		private static _t:Toast;
		public static getInstance():Toast {
			if(this._t == null)
				this._t = new Toast();
			return this._t;
		}

	}
}