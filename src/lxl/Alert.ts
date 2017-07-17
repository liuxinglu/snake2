/**
 * Created by 刘兴禄 on 2016/12/19.
 */
module lxl {
    import AlertPanel = lxl.ui.AlertPanel;
    import ConfirmPanel = lxl.ui.ConfirmPanel;
    export class Alert extends lxl.ui.CLayer {
        private _alertPanel: AlertPanel;
        private _confirmPanel:ConfirmPanel;

        public constructor() {
            super();
            this.touchEnabled = true;
        }

        private get alertPanel(): AlertPanel {
            if (this._alertPanel == null) {
                this._alertPanel = new AlertPanel();
                this.addChildAt(this._alertPanel, 0);
            }
            return this._alertPanel;
        }

        private get confirmPanel(): ConfirmPanel {
            if (this._confirmPanel == null) {
                this._confirmPanel = new ConfirmPanel();
                this.addChildAt(this._confirmPanel, 0);
            }
            return this._confirmPanel;
        }
        //////////////////////STATIC//////////////////////
        private static _instance:Alert;

        private static get instance():Alert {
            if(this._instance == null)
                this._instance = new Alert();
            return this._instance;
        }

        public static showAlert(text:string, okHandler:Function = null, ctx:any = null):void {
            this.instance.alertPanel.show(text, okHandler, ctx);
        }

        public static showConfirm(text:string, okHandler:Function, cancelHandler:Function = null, ctx:any = null):void {
            this.instance.confirmPanel.show(text, okHandler, cancelHandler, ctx);
        }
    }
}