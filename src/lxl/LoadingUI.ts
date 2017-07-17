module lxl {

    export class LoadingUI extends egret.Sprite {

        public constructor() {
            super();
        }

        private textField: egret.TextField;

        createView(): void {
            this.textField = new egret.TextField();
            this.textField.textColor = 0xff6699;
            this.textField.size = 20;
            this.textField.width = 280;
            this.textField.height = 100;
            this.textField.textAlign = "center";
            this.textField.x = (this.width / 2) - this.textField.width / 2;
            let bitmap:egret.Bitmap = lxl.Tool.createBitmapByName("logo_png");//img_loading
            let tw = this.height * 1.775;
            let h = this.height * (bitmap.height / 1080);
            let w = tw * (bitmap.width / 1920);
            bitmap.width = w;
            bitmap.height = h;
            bitmap.anchorOffsetX = bitmap.width / 2;
            bitmap.anchorOffsetY = bitmap.height / 2;
            bitmap.x = this.width / 2;
            bitmap.y = this.height / 2;
            this.textField.y = this.height - 100;
            this.addChild(bitmap);
            this.addChild(this.textField);
        }

        public setProgress(current: number, total: number): void {
            this.textField.text = `Loading...${current}/${total}`;
        }
    }
}