/**
 * Created by 刘兴禄 on 2016/12/19.
 */
module lxl.ui {
    export class AlertPanel extends CComponent {
        protected btn_ok:CButton;
        protected btn_cancel:CButton;
        protected label:eui.Label;
        okHandler:Function;
        ctx:any;

        public constructor () {
            super("");
        }

        protected onOK():void {
            close();
            if (this.okHandler == null)
                return;
            this.okHandler.call(this.ctx);
        }

        public show(txt:string, funOk:Function, ctx:any):void {
            this.okHandler = funOk;
            this.ctx = ctx;
            this.label.text = txt;
            egret.Tween.get( this )
                .to( { alpha: 1 }, 800, egret.Ease.quintOut );
        }

        protected close():void {
            egret.Tween.get( this )
                .to( { alpha: 0 }, 1200, egret.Ease.quintIn  ).call( ()=>{      /*  y: this.y - 50, */
                if( this.parent ){
                    this.parent.removeChild( this );
                }
            } );
        }

        onActivity ():void {
            super.onActivity();
            this.btn_ok.addEventListener(CEvent.CLICK, this.onOK, this);
        }
    }
}